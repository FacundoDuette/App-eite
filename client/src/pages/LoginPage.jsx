export default function LoginPage() {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">

                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                    <input type="email" placeholder="Escriba su correo..." name="" id="" />
                    <input type="password" placeholder="Escriba su contraseña..." name="" id="" />
                    <button className="primary">Login</button>
                </form>
            </div>
        </div>
    )
}