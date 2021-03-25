import axios from "./includes/axios"

// Products requests
export const getProducts = () => axios.get('/products')

export const getProduct = id => axios.get(`/products/${id}`)

export const getProductChildrens = (id, attr) => axios.get(`/products/${id}/childrens/${attr}`)

