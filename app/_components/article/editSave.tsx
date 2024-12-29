'use client'

import Link from "next/link";
import { useLogged } from "../islogged/isloggedprovider"
import { MdEdit } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { deleteArticle, saveArticle } from "@/actions/savearticle";
import useSWR from 'swr'

const fetcher = async (params: string[]): Promise<{ saved: boolean }> => {
    if (params[1] === 'user') {
        const res = await fetch(params[0]);

        if (!res.ok) {
            const error = new Error();
            error.cause = res.json().then((data: { error: string }) => data.error)
            console.error(error.cause);

            throw error
        }

        return res.json()
    }
    return { saved: false }
}

const EditSave = (props: { name: string, url: string }) => {
    const { WhoLogged, RoleLogged, numOfSavedArt, setNumOfSavedArt } = useLogged();
    const { data, error, mutate } = useSWR([`/api/articlesaved/${props.url}`, RoleLogged], fetcher)

    const handleClick = async () => {
        if (numOfSavedArt < 20) {
            mutate({ saved: true }, false)
            const res = await saveArticle({url: props.url});
            if (res.failed) return alert(res.failed)
            mutate();
            setNumOfSavedArt(numOfSavedArt + 1)
        }


    }

    const handleDelete = async () => {
        mutate({ saved: false }, false)
        const res = await deleteArticle({url: props.url});
        mutate()
        setNumOfSavedArt(numOfSavedArt - 1)
    }

    return (
        <>
            {(RoleLogged === 'user' && data?.saved === false) &&
                <button onClick={handleClick} className='bg-black text-white rounded p-2 pt-1 pb-1 flex items-center gap-2 hover:text-gray-300 dark:bg-white dark:text-gray-950 dark:hover:text-gray-500'>
                    <FaStar /> Save
                </button>
            }

            {(RoleLogged === 'user' && data?.saved) &&
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