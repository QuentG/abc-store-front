import { useEffect, useState } from "react"
import * as Api from "../../api/ApiRequest"
import { ProductCard } from "./ProductCard"
import { NavLink } from "react-router-dom"

export const Products = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Api.getProducts()
            .then(res => setProducts(res.data.data))
            .finally(() => setIsLoading(false))
            .catch(e => console.log(e))
    }, [])

    const productsList = products.map((p, index) => {
        return (
            <NavLink key={p.id} to={{
                pathname:`/products/${p.id}`,
                state: { product: p }
            }}>
                <ProductCard product={p} index={index} />
            </NavLink>
        )
    })

    return (
        <div className="container py-5">
            <div className="row">
                {isLoading ?
                    <p>Chargement en cours...</p>
                    : productsList
                }
            </div>
        </div>
    )
}