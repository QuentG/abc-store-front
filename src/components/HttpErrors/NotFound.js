import { NavLink } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="page-wrap d-flex flex-row align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12 text-center">
                        <span className="display-1 d-block">404</span>
                        <div className="mb-4 lead">The page you are looking for was not found.</div>
                        <NavLink to="/">
                            <button className="btn btn-info">Back to Home</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}