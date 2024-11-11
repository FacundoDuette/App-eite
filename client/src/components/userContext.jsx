import axios from "axios";
import { createContext, useEffect, useState } from "react";

const userContext = createContext({})

const userContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [cargado, setCargado] = useState(false)

    useEffect(() => {
        if (!user) {
            axios.get('/api/session/session').then(async ({ data }) => {
                const userData = await axios.get(`/api/usuario/${data.id}`)
                // console.log(userData.data)
                setUser(userData.data)
            })
            setCargado(true)
        }
    }, [])

    return (
        <userContext.Provider value={{ user, setUser, cargado }}>
            {children}
        </userContext.Provider >
    )
}

export default {
    userContext,
    userContextProvider
};