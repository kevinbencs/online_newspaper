'use client'

import Link from "next/link";
import { useLogged } from "../islogged/isloggedprovider"
import { MdEdit } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

const EditSave = (props: { name: string, url: string }) => {
    const { WhoLogged, RoleLogged } = useLogged();
    
    const handleClick = () => {

    }

    return (
        <>
            {RoleLogged === 'user' &&
                <button onClick={handleClick} className='bg-black text-white rounded p-2 pt-1 pb-1 flex items-center gap-2 hover:text-gray-300 dark:bg-white dark:text-gray-950 dark:hover:text-gray-500'>
                    <FaStar /> Save
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