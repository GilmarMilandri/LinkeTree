import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { useState, FormEvent } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login(){
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        
        if(Email === "" || Password === ""){
            alert("Preencha todos os campos!");
            return;
        }

        signInWithEmailAndPassword(auth, Email, Password)
        .then(() => {
            console.log("Logado com sucesso");
            navigate("/admin", { replace: true}) 
        })
        .catch((error) => {
            console.log("Erro ao logar");
            console.log(error);
        })
    }

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Link to="/">
            <h1 className="mt-11 text-white mb-7 font-bold text-5xl">Dev
                <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span>
                </h1>
            </Link>
            
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
                <Input
                placeholder="Digite o seu Email..."
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                placeholder="********"
                type="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button 
                type="submit"
                className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white">
                    Acessar
                </button>

            </form>
        </div>
    )
}
