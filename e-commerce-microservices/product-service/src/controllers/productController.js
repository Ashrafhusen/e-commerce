const Product = require('../models/Product')


exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, imageUrl } = req.body;

        // Using Product.create() instead of new Product().save()
        const newProduct = await Product.create({ name, description, price, category, stock, imageUrl });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

exports.getProducts = async(req , res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message : "No Products / Error getting products" , error})
    }



}


exports.getProductById = async(req , res) => {
    try {

        const product = await Product.findById(req.params.id);
        if(!product) return res.status(404).json({mesage : 'No product Found'})

            res.json(product)
        
    } catch (error) {
        res.status(500).json({message : "Error" , error})
    }
}

exports.updateProduct = async(req , res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id , req.body,
            {
            new : true
        })
        if(!updateProduct) res.status(404).json({message : "Product Not Found" , error})
            res.json(updateProduct);
    } catch (error) {

        res.status(500).json({message : "Error finding procut" , error})
        
    }
}


exports.deleteProduct = async(req , res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deleteProduct) res.status(404).json({message : "product Not found"})

            res.json({message : "Product deleted Succesfully"})
        
    } catch (error) {
res.status(500).json({message : "Error deleting Product" , error})
        
    }
}