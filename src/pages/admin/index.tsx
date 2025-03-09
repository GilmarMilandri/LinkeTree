import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { FiTrash } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";

interface linkProps {
    id: string;
    name: string;
    url: string;
    textColor: string;
    bg: string;
}

export function Admin(){
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#121212")

    const [links, setLinks] = useState<linkProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links");
        const queryRef = query(linksRef, orderBy("createdAt", "asc"));
        
        const unsub = onSnapshot(queryRef, (snapshot) => {
            let lista = [] as linkProps[];

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    textColor: doc.data().textColor,
                    bg: doc.data().bg,
                })
            })

            setLinks(lista);

        })

        return () => {
            unsub();
        }

    }, [])


    function handleRegister(e: FormEvent){
        e.preventDefault();

        if(nameInput === "" || urlInput === ""){
            alert("Preencha todos os campos!")
            return;
        }

        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            textColor: textColorInput,
            bg: backgroundColorInput,
            createdAt: new Date()
        })
        .then(() => {
            setNameInput("")
            setUrlInput("")
            setTextColorInput("#f1f1f1")
            setBackgroundColorInput("#121212")
        })
        .catch((error) => {
            console.error("Erro ao cadatras no banco ", error);
        });

    }
a
    async function handleDeleteLink(id: string){
        const docRef = doc(db, "links", id);
        await deleteDoc(docRef);
    }

    return (
        <div className="flex flex-col min-h-screen items-center pb-7 px-2">
            <Header/>

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-2">Nome do Link</label>
                <Input
                placeholder="Digite o nome do Link..."
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-2">URL do Link</label>
                <Input
                type="url"
                placeholder="Digite a URL..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2">Cor do Link</label>
                    <input 
                    type="color" 
                    value={textColorInput}
                    onChange={(e) => setTextColorInput(e.target.value)}
                    />
                    </div>

                    <div className="flex gap-2">
                    <label className="text-white font-medium mt-2 mb-2">Fundo do Link</label>
                    <input 
                    type="color" 
                    value={backgroundColorInput}
                    onChange={(e) => setBackgroundColorInput(e.target.value)}
                    />
                    </div>
                </section>

                {nameInput !== '' && (
                    <div className="flex flex-col items-center justify-start mb-7 p-1 border-gray-100/25 border rounded-md">
                    <label className="text-white font-medium mt-2 mb-2">Veja como está ficando:</label>
                    <article 
                    className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                    style={{marginBottom: 8, marginTop:8, background: backgroundColorInput}}
                    >
                        <p className="font-medium" style={{color: textColorInput}}>{nameInput}</p>
                    </article>
                    </div>
                )}

                <button type="submit" className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">
                    Cadastrar
                </button>


            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus Links
            </h2>

            {links.map( (link) => (
                <article
                key={link.id} 
                className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                style={{background: link.bg, color: link.textColor}}
            >
                <p>{link.name}</p>
                <div>
                    <button
                    onClick={ () => handleDeleteLink(link.id) }
                    className="border p-1 rounded cursor-pointer bg-red-700"
                    >
                        <FiTrash size={20} color="#FFF"/>
                    </button>
                </div>
            </article>
            ))}


        </div>
    )
}