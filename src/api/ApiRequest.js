import axios from "./includes/axios"

// Products requests
export const getProducts = () => axios.get('/products')

export const getProduct = id => axios.get(`/products/${id}`)

export const getProductChildrens = (id, attr) => axios.get(`/products/${id}/childrens/${attr}`)

// Cart requests
export const getCart = () => axios.get('/cart')

export const addToCart = (id, quantity) => axios.post('/cart/add', { id, quantity })

export const deleteToCart = id => axios.delete(`/cart/delete/${id}`)