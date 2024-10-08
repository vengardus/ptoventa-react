import { Routes, Route } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

import { LoginPage } from "../pages/login/LoginPage"
import { ConfigPage } from "../pages/config/ConfigPage"
import { UserAuth } from "../context/AuthContext"
import { HomePage } from "../pages/home/HomePage"
import { SpinnerLoader } from "../components/moleculas/SpinnerLoader"
import { Error } from "../components/moleculas/Error"
import { useInitLoadQuery } from "../hooks/useInitLoadQuery"
import CategoriesPage from "../pages/categories/CategoriesPage"
import BrandsPage from "../pages/brands/BrandsPage"
import ProductsPage from "../pages/produtcs/ProductsPage"
import { PosPage } from "../pages/pos/PosPage"


export function MyRoutes() {
    const { user } = UserAuth()
    const { isLoading, error } = useInitLoadQuery()

    if (isLoading) return <SpinnerLoader />
    if (error) return <Error />

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<LoginPage />} />
            <Route
                element={<ProtectedRoutes
                    user={user}
                    redirectTO="/login" />}
            >
                <Route path="/" element={<HomePage />} />
                <Route path="/config" element={<ConfigPage />} />
                <Route path="/config/categories" element={<CategoriesPage />} />
                <Route path="/config/brands" element={<BrandsPage />} />
                <Route path="/config/products" element={<ProductsPage />} />

                <Route path="/pos" element={<PosPage />} />
            </Route>
        </Routes>

    )
}

const ProtectedRoutes = ({ user, redirectTO, children }) => {
    if (user == null) return <Navigate replace to={redirectTO} />
    return children ? children : <Outlet />
}