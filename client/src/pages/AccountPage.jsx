import { useContext } from "react";
import userContext from "../components/userContext";
import { Navigate } from "react-router-dom";

const AccountPage = () => {
    const { user, cargado } = useContext(userContext.userContext);

    if (cargado && !user) {
        return <Navigate to={'/login'} />
    }

    if (!cargado) {
        return <p>Cargando...</p>
    }

    return (
        <div>
            <h1>{user.nombre} {user.apellido}</h1>
            <p>{user.email}</p>
        </div>
    )
}

export default AccountPage;