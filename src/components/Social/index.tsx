import { ReactNode } from "react"

interface SocialProps{
    url: string;
    children: ReactNode;
    title: string;
}

export function Social({ url, children, title }: SocialProps){
    return(
        <a href={url}
        title={title}
        rel="noopener noreferrer"
        target="_blank"
        >
            {children}
        </a>
    )
}