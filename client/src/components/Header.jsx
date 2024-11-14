import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import userContext from "./userContext";

export default function Header() {
    const { user } = useContext(userContext.userContext);

    // Función para obtener las iniciales
    const getInitials = () => {
        if (user && user.nombre && user.apellido) {
            return `${user.nombre[0]}${user.apellido[0]}`;
        }
        return '';
    };

    return (
        <>
            <header className='flex align-middle text-center justify-around'>
                <Link to={'/'} className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 h-6 -rotate-90">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    <span className='font-bold text-xl'>App-eite</span>
                </Link>
                
                <Link to={!user ? '/login' : '/account'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                    
                    <div className="bg-primary text-white rounded-full flex items-center justify-center w-8 h-8 text-sm font-semibold">
                        {user ? getInitials() : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>

                    {!!user && (
                        <div>
                            {user.nombre} {user.apellido}
                        </div>
                    )}
                </Link>
            </header>
        </>
    );
}