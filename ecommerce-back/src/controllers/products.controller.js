import { productService } from "../services/service.js";
import ProductsDTO from "../dtos/products.dto.js";
import { JOI_VALIDATOR } from "../utils/joi-validator.js";

const getProducts = async (req, res) => {
    try {
        const products = await productService.getAll();
        const productParsed = products.map(prod => new ProductsDTO(prod));
        res.send({ status: "success", payload: productParsed })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await productService.getBy({ _id: req.params.id });
        if (!product) return res.status(404).send({ status: "error", error: "Producto no encontrado" });
        const productParsed = new ProductsDTO(product);
        res.send({ status: "success", payload: productParsed })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
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
        };
        
        //validación de producto 
        const { error } = JOI_VALIDATOR.product.validate(newProduct);
        if (error) {
            return res.status(400).send({ status: "error", error: error.details[0].message });
        }

        let result = await productService.save(newProduct);
        res.send({ status: "success", message: "Producto agregado" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getBy({ _id: id });
        if (!product) return res.status(404).send({ status: "error", error: "Producto no encontrado" });

        let { name, description, price, stock } = req.body;
        const updateProduct = {
            name: name || product.name,
            description: description || product.name,
            price: price || product.price,
            stock: stock || product.stock,
            img: req?.file?.location || product.img
        }

        //validación de producto 
        const { error } = JOI_VALIDATOR.product.validate(updateProduct);
        if (error) {
            return res.status(400).send({ status: "error", error: error.details[0].message });
        }

        await productService.update(req.params.id, updateProduct);
        res.send({ status: "success", message: "Producto actualizado" })
    } catch (error) {
        res.status(500).send({ status: "error", error: "Error del servidor" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        let result = await productService.delete(req.params.id);
        if (result.deletedCount > 0) {
            res.send({ status: "success", message: "Producto eliminado" })
        } else {
            return res.status(500).send({ status: "error", error: "No se pudo eliminar el producto" });
        }
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