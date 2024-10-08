'use client'

import { logout } from "@/actions/logout"
import { useLogged } from "../_components/islogged/isloggedprovider"
import { useRouter } from "next/navigation"
import { SyntheticEvent } from "react"

export default function Logout() {
    const { setLogged } = useLogged();
    const { push } = useRouter();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        logout()
            .then(val => {
                if (val) {
                    setLogged(false);
                    push('/')
                }
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <button className='border-zinc-500 border hover:dark:bg-slate-500 hover:text-white hover:dark:text-white hover:bg-gray-700 text-center inline-block p-2 min-w-32'>Log out</button>
        </form>
    )

}