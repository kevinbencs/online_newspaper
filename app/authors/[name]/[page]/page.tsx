import Pagination from "@/app/_components/category_menu_search/pagination2";
import Rightsidebar from "../../../_components/category_menu_search/rightsidebar";
import Category_menu_articles from "@/app/_components/category_menu_search/category_menu_articles";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { AuthArt, AuthArtNum, getAuthor } from "@/actions/getauthor";


export async function generateMetadata({ params }: { params: { name: string }, }, parent: ResolvingMetadata): Promise<Metadata> {

    return {
        metadataBase: new URL(`${process.env.URL}`),
        title: `${params.name.replaceAll('_', ' ')}`,
        description: `Articles of ${params.name.replaceAll('_', ' ')} on Word Times`,
        alternates: {
            canonical: `/authors/${params.name.replaceAll('_', ' ')}/1`
        },
        openGraph: {
            title: `${params.name.replaceAll('_', ' ')}`,
            description: `Articles of ${params.name.replaceAll('_', ' ')} on Word Times`,
            type: 'website',
            url: `${process.env.URL}/authors/${params.name}/1`,
            images: [
                {
                    url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                    alt: 'Cover image of Word Times',
                }
            ],
        },
        twitter: {
            card: 'summary',
            title: `${params.name.replaceAll('_', ' ')}`,
            description: `Articles of ${params.name.replaceAll('_', ' ')} on Word Times`,
            site: '',
            images: [
                {
                    url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                    alt: 'Cover image of Word Times',
                }
            ],
        },

    }
}

export async function generateStaticParams() {
    const authors = await getAuthor()
    const auths = authors.success
    const arr = [];
    for(let j = 0; j< auths.length; j++){
        const lastPage = (await AuthArtNum(auths[j].name)).res
        for (let i = 1; i <= Math.ceil(lastPage / 20); i++) {
            arr.push({name:auths[j].name.replaceAll(' ', '_'), number: i })
        }
    }
    
    return arr.map(item => ({name: item.name, page: String(item.number) })) ?? []
}

export const dynamic = 'force-static'
export const dynamicParams = true;
//export const revalidate = 60



const Page = async ({ params }: { params: { name: string, page: number } }) => {
    /*const authors = await getAuthor()
    console.log(authors)*/

    if (!Number.isInteger(Number(params.page))) notFound();
    if (Number(params.page) < 1) notFound();

    const lastPage = (await AuthArtNum(params.name.replaceAll('_', ' '))).res

    if (Number(params.page) > Math.ceil(lastPage / 20)) notFound();

    

    const res = (await AuthArt(params.page, params.name.replaceAll('_', ' '))).res

    if (res.error) return (
        <div className="relative">


            <h1 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replaceAll('_', ' ')}</h1>

            <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
                <div className="lg:w-[calc(100%-450px)] text-center">
                    <div className="mb-10">
                        Server error
                    </div>
                </div>
                <div className="lg:w-80">
                    <Rightsidebar />
                </div>
            </div>
        </div>
    )
    if (res.data)
        return (
            <div className="relative">


                <h1 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replaceAll('_', ' ')}</h1>

                <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
                    <div className="lg:w-[calc(100%-450px)] text-center">
                        <div className="mb-10">
                            {res.data.map(item => <Category_menu_articles imageId={item.cover_img_id} title={item.title} paywall={item.paywall}
                                detail={item.detail} category_name={item.category} category_name_link={`/category/${item.category.toLowerCase().replaceAll(' ', '').replace('&', '_')}`} date={item.date}
                                link={`/${item.category.toLowerCase().replaceAll(' ', '').replace('&', '_')}/${item.date.slice(0, 4)}/${item.date.slice(6, 8)}/${item.date.slice(10, 12)}/${item.title.replaceAll(' ', '_').replace('?', 'nb20')}`} key={item.id} />)}
                        </div>
                        {lastPage !== null && <Pagination url={`authors/${params.name}?`} page={params.page} lastPage={Math.ceil(lastPage / 20)} />}
                    </div>
                    <div className="lg:w-80">
                        <Rightsidebar />
                    </div>
                </div>
            </div>
        )

}

export default Page;