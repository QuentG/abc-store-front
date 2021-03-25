export const ProductCard = ({ product, index }) => {
    return (
        <div className="col-md-4">
            <div className="card" style={{ width: '18rem' }} key={index}>
                <img className="card-img-top" src="https://via.placeholder.com/350x150" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{product?.title}</h5>
                    <p className="card-text">{product?.description}</p>
                    <h6 className="card-text"><strong>{product?.price}€</strong></h6>
                    <p className="card-text"><small className="text-muted">{product?.brand}</small></p>
                    <button className="btn btn-primary">Voir le produit</button>
                </div>
            </div>
        </div>
    )
}