
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

FROM node:22-alpine

WORKDIR /app

COPY --from=build --chown=node:node /app /app

# npm and its bundled dependencies are not needed to run the application
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/lib/node_modules/corepack \
    && rm -f /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/corepack

USER node

EXPOSE 4000

CMD ["node", "src/index.js"]
