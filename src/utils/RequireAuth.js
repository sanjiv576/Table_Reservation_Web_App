import { Navigate } from "react-router-dom"
import { useAuth } from "./authContext"

export const RequireAuth = ({ children }) => {
    const auth = useAuth()
    if (!auth.username) {
        return <Navigate to={'/'} />
    }

    return children
}