'use client'

import { updateUser } from "@/actions/updateuser";
import Link from "next/link"
import { SyntheticEvent, useState, KeyboardEvent, useTransition } from "react"
import { ZodIssue } from "zod";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import DeleteSavedArticle from "@/app/_components/about/deleteSavedArticle";
import { useLogged } from "@/app/_components/islogged/isloggedprovider";

const Filter = (saveArt:{url: string, title: string}, deleteArts: {title: string}[]) => {
    return !deleteArts.some((item) => {return item.title === saveArt.title} )
}

const Page = () => {
    const { WhoLogged, email, saveArtUrls, subscribe, setLogged, setSaveArtUrls, setSubscribe } = useLogged()
    const [name, setName] = useState<string>(WhoLogged);
    const [Email, setEmail] = useState<string>(email);
    const [Subscribe, SetSubscribe] = useState<boolean>(subscribe);
    const [articles, setArticles] = useState<{ title: string, url: string }[]>(saveArtUrls);
    const [error, setError] = useState<undefined | string>('');
    const [failed, setFailed] = useState<undefined | ZodIssue[]>([]);
    const [isPending, startTransition] = useTransition();
    const [deleteArticle, setDeleteArticles] = useState<{ title: string }[]>([])
    const { push } = useRouter();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        startTransition(() => {
            updateUser({ name, email: Email, newsletter: Subscribe, articles: deleteArticle })
                .then(res => {
                    setError(res.error)
                    setFailed(res.failed);
                    if (res.success) {
                        setLogged(name);
                        setSubscribe(Subscribe);
                        setSaveArtUrls(saveArtUrls.filter((item) => Filter(item, deleteArticle)))
                        push(`/about?message=${res.success.replaceAll(' ', '-')}`);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setError('Something went wrong, please try again')
                })
        })
    }

    const handleKeyboard = (e: KeyboardEvent<SVGRectElement>) => {
        if (e.code === 'Space' || e.code === 'Enter') SetSubscribe(!Subscribe);
    }

    return (
        <div className="w-full lg:w-[60%]">
            <div className="ml-3 lg:ml-0">
                {error &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
                        {error}
                    </div>
                }

                {(failed && failed.length > 0) &&
                    <div className='text-red-700 font-bold dark:bg-red-400/15 dark:text-red-500 bg-red-700/25 rounded-lg mb-5  p-2'>
                        {failed.map(e => <p key={uuid()}>{e.message}</p>)}
                    </div>
                }

                <form onSubmit={handleSubmit}>
                    <h1 className="mb-5 text-2xl border-b dark:border-white border-black font-bold">Profile</h1>
                    <label htmlFor="name" className="pl-2 flex gap-2 items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Name
                    </label>
                    <input type="text" name="name" id="name" className="mb-5 p-2 bg-[#121212] dark:bg-slate-50 dark:text-black text-white rounded" value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="name" className="pl-2 flex gap-2 items-center mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                        </svg>
                        Email
                    </label>
                    <input type="text" className="mb-12 p-2 bg-[#121212] dark:bg-slate-50 dark:text-black text-white rounded" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <h2 className="mb-5 text-2xl border-b dark:border-white border-black font-bold">Subscribe for newsletter</h2>
                    <div className="checkbox-wrapper-62 mb-12" >
                        <input type="checkbox" className='check' id="check1-62" checked={Subscribe} readOnly disabled={isPending} name='subscribe' />
                        <label htmlFor="check1-62" className="label1 flex gap-2 items-center cursor-pointer" onClick={() => {SetSubscribe(!Subscribe)}}>
                            <svg width="30" height="30" viewBox="0 0 90 90">
                                <rect x="30" y="20" width="50" height="50" stroke="currentColor" fill="none" className='focus:outline  outline-base-content' tabIndex={0} onKeyDown={handleKeyboard} />
                                <g transform="translate(0,-952.36218)">
                                    <path d="m 13,983 c 33,6 40,26 55,48 " stroke="currentColor" strokeWidth="3" className="path1" fill="none" />
                                    <path d="M 75,970 C 51,981 34,1014 25,1031 " stroke="currentColor" strokeWidth="3" className="path1" fill="none" />
                                </g>
                            </svg>
                            <span>Subscribe</span>
                        </label>
                    </div>

                    <h2 className="mb-5 text-2xl border-b dark:border-white border-black font-bold">Favorite articles</h2>
                    <ul className="pl-2">
                        {articles.map(item => <DeleteSavedArticle articles={articles} deleteArticle={deleteArticle} setArticles={setArticles} setDeleteArticles={setDeleteArticles} title={item.title} key={`delete-${uuid()}`} />)}
                    </ul>
                    <div className="flex justify-end gap-2">
                        <Link href={'/about'} className="mt-5 bg-slate-600 text-white hover:bg-slate-400 dark:hover:text-white hover:text-white rounded p-2">Cancel</Link>
                        <input type="submit" value="Save" className="mt-5 bg-slate-600 text-white hover:bg-slate-400 dark:hover:text-white hover:text-white rounded p-2 block cursor-pointer" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Page