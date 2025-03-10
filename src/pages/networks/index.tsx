import { FormEvent, useState } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export function Networks(){
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("")
    const [linkedin, setLinkedin] = useState("")

    function handleRegister(e: FormEvent){
        e.preventDefault();
        console.log({
            facebook,
            instagram,
            linkedin
        })
    }   


    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4 ">Minhas redes sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                type="url"
                placeholder="Digite a url do facebook..."
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                type="url"
                placeholder="Digite a url do instagram..."
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">Link do facebook</label>
                <Input
                type="url"
                placeholder="Digite a url do linkedin..."
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                />

                <button 
                type="submit" 
                className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 font-medium"
                >

                </button>
                
            </form>

        </div>
        

    )
}