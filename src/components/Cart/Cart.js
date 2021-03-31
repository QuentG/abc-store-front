import { useEffect, useState } from "react"
import * as ApiRequest from "../../api/ApiRequest"

export const Cart = () => {
    const [cart, setCart] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        ApiRequest.getCart()
            .then(r => {
                setCart(r.data?.data ?? [])
                setProducts(r.data?.data?.products ?? [])
            })
            .catch(e => console.log(e))
    }, [])

    const handleDelete = id => e => {
        e.preventDefault()
        ApiRequest.deleteToCart(id)
            .then(r => {
                ApiRequest.getCart()
                    .then(r => {
                        setCart(r.data?.data ?? [])
                        setProducts(r.data?.data?.products ?? [])
                    })
                    .catch(e => console.log(e))
            })
            .catch(e => console.log(e))
    }

    const productsList = products?.map((p, index) => {
        const parsedProduct = JSON.parse(p)
        const product = parsedProduct.product

        return (
            <tr key={index}>
                <th scope="row">{product.name}</th>
                <td>{product.price}</td>
                <td>{parsedProduct.quantity}</td>
                <td>{product.optionSelected.join(',')}</td>
                <td>
                    <button className="btn btn-danger" onClick={handleDelete(product.id)}>Supprimer</button>
                </td>
            </tr>
        )
    })

    return (
        <div className="container">
            <h1 className="py-5">Panier</h1>
            {products.length === 0 ?
                <h4>Vide</h4>
                :
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Prix</th>
                                <th scope="col">Quantité</th>
                                <th scope="col">Options</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList}
                        </tbody>
                    </table>
                    <h3 className="py-2">
                        Total : <strong>{cart.total}€</strong>
                    </h3>
                </>
            }
        </div>
    )
}