import { useEffect, useState } from "react"
import { Social } from "../../components/Social"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa"
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
                        textColor: doc.data().textColor,
                    })
                })

                setLinks(lista);

            })
           
        }

            loadLinks();
    }, [])

    useEffect (() => {
        function loadSocialLinks(){
            const docRef = doc(db, "social", "link")
        getDoc(docRef)
        .then((snapshot) => {
            if(snapshot.data() !== undefined){
                setSociallinks({
                    facebook: snapshot.data()?.facebook,
                    instagram: snapshot.data()?.instagram,
                    linkedin: snapshot.data()?.linkedin,
                })
            }
        })
        }

        loadSocialLinks();

    }, [])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl  text-3xl font-bold text-white mt-20">Gilmar Milandri</h1>
            <span className="text-gray-50 mb-5 mt-3">Veja meus links 👇</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
            
                {links.map((link) => (
                    <section 
                    style={{backgroundColor: link.bg }}
                    key={link.id}
                    className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer">
                    <a href={link.url}>
                        <p className="text-base md:text-lg" style={{color: link.textColor}}>
                            {link.name}
                        </p>
                    </a>
                </section>
                ))}

                { socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4">

                    <Social title="Facebook" url={socialLinks?.facebook}>
                    <FaFacebook className="transition-transform hover:scale-110" size={35} color="#FFF"/>
                    </Social>

                    <Social title="Linkedin" url={socialLinks?.linkedin}>
                    <FaLinkedin className="transition-transform hover:scale-110" size={35} color="#FFF"/>
                    </Social>

                    <Social title="Instagram" url={socialLinks?.instagram}>
                    <FaInstagram className="transition-transform hover:scale-110" size={35} color="#FFF"/>
                    </Social>
                    
                </footer>
                )}
                
            </main>

        </div>
    )
}