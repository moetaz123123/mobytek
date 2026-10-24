export const errorHandler = (err, req, res, next) => {
  console.error('❌ Erreur serveur:', err);
  const status = err.statusCode || 500;
  const message = err.message || 'Une erreur interne est survenue sur le serveur.';

  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};
