import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import { initialCategories, initialProducts, initialOrders } from '../data/initialData.js';

// In-memory / local state for rapid local testing or when Supabase keys are not yet input
let categoriesStore = [...initialCategories];
let productsStore = [...initialProducts];
let ordersStore = [...initialOrders];

export const dbService = {
  // ==========================================
  // CATEGORIES
  // ==========================================
  async getCategories() {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });
      if (!error && data) return data;
      console.warn('Fallback to local store for categories:', error?.message);
    }
    return categoriesStore;
  },

  async getCategoryById(id) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) return data;
    }
    return categoriesStore.find(c => c.id === id || c.slug === id);
  },

  async createCategory(categoryData) {
    const newCategory = {
      id: categoryData.id || `cat-${Date.now()}`,
      name: categoryData.name,
      slug: categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: categoryData.description || '',
      icon: categoryData.icon || 'Smartphone',
      image_url: categoryData.image_url || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('categories')
        .insert([newCategory])
        .select()
        .single();
      if (!error && data) return data;
    }

    categoriesStore.push(newCategory);
    return newCategory;
  },

  async updateCategory(id, updates) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    }

    const index = categoriesStore.findIndex(c => c.id === id);
    if (index !== -1) {
      categoriesStore[index] = { ...categoriesStore[index], ...updates };
      return categoriesStore[index];
    }
    return null;
  },

  async deleteCategory(id) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);
      if (!error) return true;
    }

    const initialLength = categoriesStore.length;
    categoriesStore = categoriesStore.filter(c => c.id !== id);
    return categoriesStore.length < initialLength;
  },

  // ==========================================
  // PRODUCTS
  // ==========================================
  async getProducts(filters = {}) {
    if (isSupabaseConfigured && supabase) {
      let query = supabase
        .from('products')
        .select('*, product_images(image_url, is_primary, display_order), categories(name, slug)');

      if (filters.category) {
        query = query.eq('category_id', filters.category);
      }
      if (filters.brand) {
        query = query.ilike('brand', `%${filters.brand}%`);
      }
      if (filters.featured === 'true' || filters.featured === true) {
        query = query.eq('is_featured', true);
      }
      if (filters.promo === 'true' || filters.promo === true) {
        query = query.eq('is_promo', true);
      }
      if (filters.isNew === 'true' || filters.isNew === true) {
        query = query.eq('is_new', true);
      }
      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`);
      }
      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }

      // Sort
      if (filters.sort === 'price-asc') query = query.order('price', { ascending: true });
      else if (filters.sort === 'price-desc') query = query.order('price', { ascending: false });
      else if (filters.sort === 'newest') query = query.order('created_at', { ascending: false });
      else query = query.order('is_featured', { ascending: false });

      const { data, error } = await query;
      if (!error && data) {
        // Normalize products
        return data.map(p => ({
          ...p,
          category_name: p.categories?.name,
          images: p.product_images?.length
            ? p.product_images.sort((a,b) => (a.display_order || 0) - (b.display_order || 0)).map(i => i.image_url)
            : []
        }));
      }
    }

    // Local Filtering
    let results = [...productsStore];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== 'all') {
      results = results.filter(p => p.category_id === filters.category || p.category_name?.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.brand && filters.brand !== 'all') {
      results = results.filter(p => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }

    if (filters.featured === 'true' || filters.featured === true) {
      results = results.filter(p => p.is_featured);
    }

    if (filters.promo === 'true' || filters.promo === true) {
      results = results.filter(p => p.is_promo);
    }

    if (filters.isNew === 'true' || filters.isNew === true) {
      results = results.filter(p => p.is_new);
    }

    if (filters.minPrice) {
      results = results.filter(p => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      results = results.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    // Sort
    if (filters.sort === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (filters.sort === 'newest') {
      results.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
    } else if (filters.sort === 'popularity') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return results;
  },

  async getProductById(identifier) {
    if (isSupabaseConfigured && supabase) {
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
      let query = supabase
        .from('products')
        .select('*, product_images(image_url, is_primary, display_order), categories(id, name, slug)');

      if (isUUID) query = query.eq('id', identifier);
      else query = query.eq('slug', identifier);

      const { data, error } = await query.single();
      if (!error && data) {
        return {
          ...data,
          category_name: data.categories?.name,
          images: data.product_images?.length
            ? data.product_images.sort((a,b) => (a.display_order || 0) - (b.display_order || 0)).map(i => i.image_url)
            : []
        };
      }
    }

    return productsStore.find(p => p.id === identifier || p.slug === identifier) || null;
  },

  async createProduct(productData) {
    const slug = productData.slug || productData.name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newProduct = {
      id: productData.id || `prod-${Date.now()}`,
      category_id: productData.category_id,
      category_name: productData.category_name || (categoriesStore.find(c => c.id === productData.category_id)?.name || 'Général'),
      name: productData.name,
      slug,
      brand: productData.brand || 'Mobytek',
      price: parseFloat(productData.price) || 0,
      original_price: productData.original_price ? parseFloat(productData.original_price) : null,
      stock: parseInt(productData.stock, 10) || 0,
      is_featured: Boolean(productData.is_featured),
      is_new: Boolean(productData.is_new),
      is_promo: Boolean(productData.is_promo),
      description: productData.description || '',
      specs: typeof productData.specs === 'object' ? productData.specs : {},
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
      compatible_accessories: Array.isArray(productData.compatible_accessories)
        ? productData.compatible_accessories
        : [],
      rating: 5.0,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: prod, error } = await supabase
          .from('products')
          .insert([{
            category_id: newProduct.category_id,
            name: newProduct.name,
            slug: newProduct.slug,
            brand: newProduct.brand,
            price: newProduct.price,
            original_price: newProduct.original_price,
            stock: newProduct.stock,
            is_featured: newProduct.is_featured,
            is_new: newProduct.is_new,
            is_promo: newProduct.is_promo,
            description: newProduct.description,
            specs: newProduct.specs,
            compatible_accessories: newProduct.compatible_accessories
          }])
          .select()
          .single();

        if (!error && prod) {
          if (newProduct.images?.length) {
            const imageInserts = newProduct.images.map((img, idx) => ({
              product_id: prod.id,
              image_url: img,
              is_primary: idx === 0,
              display_order: idx + 1
            }));
            await supabase.from('product_images').insert(imageInserts);
          }
          return { ...prod, images: newProduct.images };
        }
      } catch (err) {
        console.warn('Supabase createProduct fallback to memory:', err.message);
      }
    }

    productsStore.unshift(newProduct);
    return newProduct;
  },

  async updateProduct(id, updates) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('products')
          .update({
            ...(updates.name && { name: updates.name }),
            ...(updates.brand && { brand: updates.brand }),
            ...(updates.category_id && { category_id: updates.category_id }),
            ...(updates.price !== undefined && { price: parseFloat(updates.price) }),
            ...(updates.original_price !== undefined && { original_price: updates.original_price ? parseFloat(updates.original_price) : null }),
            ...(updates.stock !== undefined && { stock: parseInt(updates.stock, 10) }),
            ...(updates.is_featured !== undefined && { is_featured: updates.is_featured }),
            ...(updates.is_new !== undefined && { is_new: updates.is_new }),
            ...(updates.is_promo !== undefined && { is_promo: updates.is_promo }),
            ...(updates.description && { description: updates.description }),
            ...(updates.specs && { specs: updates.specs }),
            ...(updates.compatible_accessories && { compatible_accessories: updates.compatible_accessories }),
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase updateProduct fallback to memory:', err.message);
      }
    }

    const index = productsStore.findIndex(p => p.id === id);
    if (index !== -1) {
      productsStore[index] = {
        ...productsStore[index],
        ...updates,
        ...(updates.price !== undefined && { price: parseFloat(updates.price) }),
        ...(updates.stock !== undefined && { stock: parseInt(updates.stock, 10) }),
        updated_at: new Date().toISOString()
      };
      return productsStore[index];
    }
    return null;
  },

  async deleteProduct(id) {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) return true;
    }

    const initialLen = productsStore.length;
    productsStore = productsStore.filter(p => p.id !== id);
    return productsStore.length < initialLen;
  },

  // ==========================================
  // ORDERS
  // ==========================================
  async getOrders(filters = {}) {
    if (isSupabaseConfigured && supabase) {
      let query = supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });

      if (filters.status) query = query.eq('status', filters.status);
      if (filters.search) {
        query = query.or(`customer_name.ilike.%${filters.search}%,customer_phone.ilike.%${filters.search}%,order_number.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;
      if (!error && data) return data;
    }

    let orders = [...ordersStore];
    if (filters.status && filters.status !== 'all') {
      orders = orders.filter(o => o.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      orders = orders.filter(o =>
        o.order_number.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_phone.toLowerCase().includes(q)
      );
    }
    return orders;
  },

  async getOrderById(id) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('id', id)
        .single();
      if (!error && data) return data;
    }
    return ordersStore.find(o => o.id === id || o.order_number === id) || null;
  },

  async createOrder(orderData) {
    const orderNumber = `MOB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const totalAmount = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const newOrder = {
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      customer_email: orderData.customer_email || '',
      delivery_address: orderData.delivery_address,
      city: orderData.city || 'Tunis',
      notes: orderData.notes || '',
      total_amount: totalAmount,
      payment_method: orderData.payment_method || 'cash_on_delivery',
      payment_status: 'pending',
      status: 'en attente',
      items: orderData.items.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        price: item.price,
        quantity: item.quantity
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data: order, error } = await supabase
          .from('orders')
          .insert([{
            order_number: newOrder.order_number,
            customer_name: newOrder.customer_name,
            customer_phone: newOrder.customer_phone,
            customer_email: newOrder.customer_email,
            delivery_address: newOrder.delivery_address,
            city: newOrder.city,
            notes: newOrder.notes,
            total_amount: newOrder.total_amount,
            payment_method: newOrder.payment_method,
            payment_status: newOrder.payment_status,
            status: newOrder.status
          }])
          .select()
          .single();

        if (!error && order) {
          const itemsToInsert = newOrder.items.map(it => ({
            order_id: order.id,
            product_id: it.product_id,
            product_name: it.product_name,
            price: it.price,
            quantity: it.quantity
          }));
          await supabase.from('order_items').insert(itemsToInsert);
          return { ...order, items: newOrder.items };
        }
      } catch (err) {
        console.warn('Supabase createOrder fallback to memory:', err.message);
      }
    }

    // Decrement stock for ordered items
    for (const item of newOrder.items) {
      const prod = productsStore.find(p => p.id === item.product_id);
      if (prod && prod.stock >= item.quantity) {
        prod.stock -= item.quantity;
      }
    }

    ordersStore.unshift(newOrder);
    return newOrder;
  },

  async updateOrderStatus(id, status) {
    const validStatuses = ['en attente', 'confirmée', 'en préparation', 'expédiée', 'livrée', 'annulée'];
    if (!validStatuses.includes(status)) {
      throw new Error(`Statut invalide. Statuts acceptés: ${validStatuses.join(', ')}`);
    }

    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    }

    const order = ordersStore.find(o => o.id === id || o.order_number === id);
    if (order) {
      order.status = status;
      order.updated_at = new Date().toISOString();
      return order;
    }
    return null;
  },

  // ==========================================
  // STATS & DASHBOARD OVERVIEW
  // ==========================================
  async getDashboardStats() {
    const products = await this.getProducts({});
    const orders = await this.getOrders({});

    const totalRevenue = orders
      .filter(o => o.status !== 'annulée')
      .reduce((acc, curr) => acc + (parseFloat(curr.total_amount) || 0), 0);

    const pendingOrdersCount = orders.filter(o => o.status === 'en attente').length;
    const lowStockProducts = products.filter(p => p.stock < 5);

    return {
      totalRevenue: Number(totalRevenue.toFixed(3)),
      totalOrders: orders.length,
      pendingOrders: pendingOrdersCount,
      totalProducts: products.length,
      lowStockCount: lowStockProducts.length,
      recentOrders: orders.slice(0, 5),
      popularProducts: products.slice(0, 4)
    };
  }
};
