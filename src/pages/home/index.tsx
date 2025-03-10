import { useEffect, useState } from "react"
import { Social } from "../../components/Social"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { db } from "../../services/firebaseConnection"
import { getDocs, collection, orderBy, query, doc, getDoc  } from "firebase/firestore"


export function Home(){

    interface LinkProps {
        id: string;
        name: string;
        url: string;
        textColor: string;
        bg: string;
    }

    interface SocialLinksProps{
        facebook: string,
        linkedin: string,
        instagram: string
    }

    const [links, setLinks] = useState<LinkProps[]>([]);
    const [socialLinks, setSociallinks] = useState<SocialLinksProps>()

    useEffect(() => {
        function loadLinks(){
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
            .then((snapshot) => {
                let lista = [] as LinkProps[];

                snapshot.forEach((doc) =>{
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        textColor: doc.data().textColor
                    })
                })

                setLinks(lista);

            })
           
        }

        loadLinks();
    }, [])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">Gilmar Milandri</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                {links.map((Link) =>(
                    <section className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                    <a href="">
                        <p className="text-base md:text-lg ">
                            Canal no youtube
                        </p>
                    </a>
                </section>
                ))}

                <footer className="flex justify-center gap-3 my-4">

                    <Social url="https://youtube.com/sujeitoprogramador">
                    <FaFacebook size={35} color="#FFF"/>
                    </Social>

                    <Social url="https://youtube.com/sujeitoprogramador">
                    <FaYoutube size={35} color="#FFF"/>
                    </Social>

                    <Social url="https://youtube.com/sujeitoprogramador">
                    <FaInstagram size={35} color="#FFF"/>
                    </Social>
                    
                </footer>
                
            </main>

        </div>
    )
}