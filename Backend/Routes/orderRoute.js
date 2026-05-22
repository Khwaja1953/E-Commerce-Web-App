const express = require ('express');
const { protectedMiddleware } = require('../middleware/protected');
const router = express.Router();

const {buyItem} = require('../Controllers/orderController')

const {protectedMiddleware} = require('../middleware/protected');

router.use(protectedMiddleware);

Router.post("/buyItem", protectedMiddleware, buyItem)

module.exports = router