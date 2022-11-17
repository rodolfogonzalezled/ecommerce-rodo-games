import { productService } from "../services/service.js";

const getProducts = async (req, res) => {
    const result = await productService.getAll();
    res.send({ status: "success", payload: result })
}

const getProductById = async (req, res) => {
    const result = await productService.getBy({ _id: req.params.id });
    res.send({ status: "success", payload: result })
}

const register = async (req, res) => {
    let { name, description, price, stock } = req.body;
    try {
        if (!req.file) return res.status(500).send({ status: "error", error: "No se pudo cargar la imagen" });
        const newProduct = {
            name,
            description,
            price,
            stock,
            img: req.file.location
        }
        let result = await productService.save(newProduct);
        res.send({ status: "success", message: "Product added" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const update = async (req, res) => {
    let { name, description, price, stock } = req.body;
    try {
        if (!req.file) return res.status(500).send({ status: "error", error: "No se pudo cargar la imagen" });
        const product = {
            name,
            description,
            price,
            stock,
            img: req.file.location
        }
        let result = await productService.update(req.params.id, product);
        res.send({ status: "success", message: "Product update" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        let result = await productService.delete(req.params.id);
        res.send({ status: "success", message: "Product delete" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

export default {
    getProducts,
    getProductById,
    register,
    update,
    deleteProduct
}