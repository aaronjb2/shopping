module.exports = {
    async getProducts(req,res,next){
        let db = req.app.get('db');
        let products = await db.get_products([]);
        res.status(200).send(products);
    },
    async getCart(req,res,next){
        let db = req.app.get('db');
        let cart = await db.get_cart([]);
        res.status(200).send(cart);
    },
    async addToCart(req,res,next){
        let db = req.app.get('db');
        let {id,quantity} = req.body;
        let foundProduct = await db.check_for_product([id]);
        if (!foundProduct[0]){
            await db.add_to_cart([id,quantity]);
        }else{
            await db.change_quantity([quantity,id]);
        }
        let cart = await db.get_cart([]);
        res.status(200).send(cart);
    },
    async updateQuantity(req,res,next){
        let db = req.app.get('db');
        let {id,quantity} = req.body;
        if (quantity == 0){
            await db.delete_from_cart([id]);
        }else{
            await db.update_quantity([quantity,id]);
        }
        let cart = await db.get_cart([]);
        res.status(200).send(cart);
    },
    async deleteFromCart(req,res,next){
        let db = req.app.get('db');
        let {id} = req.params;
        await db.delete_from_cart([id]);
        let cart = await db.get_cart([]);
        res.status(200).send(cart);
    },
    async deleteAll(req,res,next){
        let db = req.app.get('db');
        await db.delete_all([]);
        let cart = await db.get_cart([]);
        res.status(200).send(cart);
    }
}