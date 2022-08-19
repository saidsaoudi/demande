const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const requestRoute = require('./request.route');
const productRoute = require('./stock.route');
const outStockRoute = require('./outStock.route');
const declarationRoute = require('./declaration.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/requests',
    route: requestRoute,
  },
  {
    path: '/products',
    route: productRoute,
  },
  {
    path: '/out-of-stock',
    route: outStockRoute,
  },
  {
    path: '/declarations',
    route: declarationRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
