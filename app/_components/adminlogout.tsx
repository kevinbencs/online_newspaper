'use client'

import { adminLogOut } from "@/actions/adminlogout"
import { useLogged } from "../_components/islogged/isloggedprovider"
import { useRouter } from "next/navigation"
import { SyntheticEvent } from "react"

export default function AdminLogout() {
    const { setLogged, setRole } = useLogged();
    const { push } = useRouter();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        adminLogOut()
            .then(val => {
                if (val) {
                    setLogged('');
                    setRole('');
                    push('/')
                }
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <button className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 md:min-w-32 lg:min-w-64 min-w-full'>Log out</button>
        </form>
    )

}