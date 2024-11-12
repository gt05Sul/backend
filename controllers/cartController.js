const { Cart, CartItems, Product } = require('../models');

const createCart = async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ error: error.message })
    }
}

const addItemToCart = async (req, res) => {
    const { cartId, productId, quantity } = req.body;
    if (!cartId || !productId || !quantity) {
        return res.status(400).json({ error: error.message })
    }

    try {
        const cartItem = await CartItems.create({
            cart_id: cartId,
            product_id: productId,
            quantity: quantity
        });
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getCartItems = async (req, res) => {
    const { user_id: userId } = req.params;
    try {
        const cart = await Cart.findOne({
            where: { userId },
            include: [
                {
                    model: CartItems,
                    as: 'cartItems',
                    include: [
                        {
                            model: Product,
                            as: 'product',
                            attributes: ['id', 'name', 'price']
                        }
                    ]
                }
            ]
        });
        if (!cart) {
            return res.status(400).json({ error: 'Carrinho não encontrado!' })
        }
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createCart,
    addItemToCart,
    getCartItems
}