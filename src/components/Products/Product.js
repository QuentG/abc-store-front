import { useHistory, useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as Api from "../../api/ApiRequest"

export const Product = () => {
    const location = useLocation()
    const params = useParams()
    const history = useHistory()

    const [product, setProduct] = useState(null)
    const [productSelected, setProductSelected] = useState(null)
    const [optionsSelected, setOptionsSelected] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (location.state && location.state.product) {
            setProduct(location.state.product)
            setIsLoading(false)
        } else {
            Api.getProduct(params.id)
                .then(res => setProduct(res.data))
                .finally(() => setIsLoading(false))
        }
    }, [location, params])

    const handleChangeProduct = attr => e => {
        if (!optionsSelected.includes(attr.label)) {
            setOptionsSelected([]) // Reset values
            optionsSelected.push(attr.label)
        }
        Api.getProductChildrens(product.id, JSON.stringify(optionsSelected))
            .then(res => setProductSelected(res?.data?.data[0]))
            .catch(e => console.log(e))
    }

    const handleDeleteOptionSelected = () => {
        setProductSelected(null)
        setOptionsSelected([])
    }

    const handleSubmit = e => {
        e.preventDefault()
        const id = null === productSelected ? product.id : productSelected.id
        Api.addToCart(id, quantity)
            .then(r => history.push('/cart'))
            .catch(e => console.log(e))
    }

    const productOptions = product?.options?.map((opt, index) => {
        return (
            <>
                <h6>{opt.name}</h6>
                <ul className="list-group" key={index}>
                    <li className="list-group-item">
                        <input
                            type="radio"
                            name={opt.name}
                            onClick={handleDeleteOptionSelected}
                        /> Rien
                    </li>
                    {
                        opt?.attributes?.map((attr, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    <input
                                        type="radio"
                                        name={opt.name}
                                        onClick={handleChangeProduct(attr)}
                                    /> {attr.label}
                                </li>
                            )
                        })
                    }
                </ul>
                <br />
            </>
        )
    })

    return (
        <div className="container py-5">
            {!isLoading ?
                <>
                    <div className="jumbotron">
                        <div className="container">
                            <h1>{product.title}</h1>
                            <br />
                            <h5>Description du produit :</h5>
                            <p>{product.description}</p>
                            <h5>Prix : {productSelected?.price ?? product.price}€</h5>
                            <br />

                            <h5>Options :</h5>
                            {productOptions}
                            <div className="mb-2">
                                <label htmlFor="quantity">
                                    Quantité :
                                    <select name="quantity" onChange={(e) => setQuantity(e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </label>
                            </div>
                            <button className="btn btn-primary" onClick={handleSubmit}>
                                Ajouter au panier
                            </button>
                        </div>
                    </div>
                </>
                : <p>Chargement...</p>
            }
        </div>
    )
}