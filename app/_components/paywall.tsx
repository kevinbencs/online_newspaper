import Link from "next/link"

const Paywall = () => {
  return (
    <div className="h-96 dark:bg-zinc-600 bg-zinc-800 text-white rounded-xl flex flex-col justify-center content-center">
        <div className="text-center">
        <div className="text-5xl mb-4">Paywall</div>
        <p className="text-xl">If you wanna see the article, please <Link href={'/signin'} className="link">sign in</Link>.</p>
        </div>
    </div>
  )
}

export default Paywall