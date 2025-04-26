'use client'

import Link from "next/link";
import { useLogged } from "../islogged/isloggedprovider"
import { MdEdit } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { deleteArticle, saveArticle } from "@/actions/savearticle";
import { useState } from "react";


const checkIsSaved = (item: {url: string, title: string}, url: string, title: string) => {
    return item.url === url && item.title === title;
}


const EditSave = (props: { name: string, url: string, title: string}) => {
    const {WhoLogged, RoleLogged,  saveArtUrls, setSaveArtUrls} = useLogged();
    const [isSaved, setIsSaved] = useState<boolean>( saveArtUrls.some((item) => checkIsSaved(item,props.url,props.title)))

    const handleClick = async () => {
        if (saveArtUrls.length < 20) {
            const arr = [...saveArtUrls, {url: props.url, title: props.title}]
            setSaveArtUrls(arr)
            setIsSaved(true)
            const res = await saveArticle({ url: props.url });
            if (res.failed) {
                setIsSaved(false)
                setSaveArtUrls(arr.filter((item) =>  item.title !== props.title && item.url !== props.url))
                return alert(res.failed);
            }
        }
    }


    const handleDelete = async () => {
        setIsSaved(false);
        const arr = [...saveArtUrls];
        setSaveArtUrls(arr.filter((item) =>  item.title !== props.title && item.url !== props.url))
        const res = await deleteArticle({ url: props.url });
        if (res.error) {
            setIsSaved(true);
            setSaveArtUrls(arr);
            return alert(res.error)
        }
    }

    return (
        <>
            {(RoleLogged === 'user' && isSaved === false) &&
                <button onClick={handleClick} className='bg-black text-white rounded p-2 pt-1 pb-1 flex items-center gap-2 hover:text-gray-300 dark:bg-white dark:text-gray-950 dark:hover:text-gray-500'>
                    <FaStar /> Save
                </button>
            }

            {(RoleLogged === 'user' && isSaved === true) &&
                <button onClick={handleDelete} className='bg-black text-white rounded p-2 pt-1 pb-1 flex items-center gap-2 hover:text-gray-300 dark:bg-white dark:text-gray-950 dark:hover:text-gray-500'>
                    <FaStar /> Delete form saved articles
                </button>
            }

            {(RoleLogged === 'Admin' || RoleLogged === 'Editor' || (RoleLogged === 'Author' && props.name === WhoLogged)) &&
                <Link href={`/editarticle/${props.url}`} className='bg-black text-white rounded p-2 pt-1 pb-1 flex items-center gap-2 hover:text-gray-300 dark:bg-white dark:text-gray-950 dark:hover:text-gray-500'>
                    <MdEdit /> Edit
                </Link>
            }
        </>
    )
}

export default EditSave