export const options = [
    {path:"/", label: "Productos", showWhen:'user'},
    {path:"/register", label: "Registrar Usuario", showWhen:false},
    {path:"/login", label: "Login", showWhen:false},
    {path:"/cart", label: "Carrito", showWhen:"user"},
    {path:"/new-product", label: "Registrar Productos", showWhen:"admin"},
]