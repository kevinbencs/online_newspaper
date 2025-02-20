'use client'

import { SetStateAction, Dispatch } from "react"
import { BiMinusCircle } from "react-icons/bi";

type Dispatcher<T> = Dispatch<SetStateAction<T>>

const DeleteSavedArticle = (props: { title: string, articles:{title:string, url:string}[], setDeleteArticles: Dispatcher<{ title: string }[]>, setArticles: Dispatcher<{ title: string, url: string }[]>, deleteArticle:{title:string}[] }) => {
    const handleClick = () => {
        props.setDeleteArticles([...props.deleteArticle, {title:props.title}])
        props.setArticles(props.articles.filter(item=> item.title !== props.title))
    }

    return (
        <li className="mb-1 flex gap-3 justify-start items-center">
            <button onClick={handleClick}>
                <BiMinusCircle className="bg-red-700 text-white rounded-full" />
            </button>
            {props.title}
        </li>
    )
}

export default DeleteSavedArticle