import Pagination from "@/app/_components/category_menu_search/pagination2";
import Rightsidebar from "../../../_components/category_menu_search/rightsidebar";
import Category_menu_articles from "@/app/_components/category_menu_search/category_menu_articles";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { catArt, catArtNum, getCategory } from "@/actions/getCategory";


export async function generateMetadata({ params, searchParams }: { params: { name: string }, searchParams: { page: number } }, parent: ResolvingMetadata): Promise<Metadata> {

    return {
        metadataBase: new URL(`${process.env.URL}`),
        title: `${params.name.replace('_', ' & ')} news`,
        description: `${params.name.replace('_', ' & ')} news of Word Times`,
        alternates: {
            canonical: `/${params.name}/1`
        },
        keywords: params.name.replace('_', ' & '),
        openGraph: {
            title: `${params.name.replace('_', ' & ')} news`,
            description: `${params.name.replace('_', ' & ')} news of Word Times`,
            type: 'article',
            url: `${process.env.URL}/${params.name}/1`,
            images: [
                {
                    url: 'https://www.dropbox.com/scl/fi/fdbmbhk9caauk7aysp2a5/cover.png?rlkey=d4ypc3jz596br56jnauvi4wlx&dl=1',
                    alt: 'Cover image of Word Times',
                }
            ],
        },
        twitter: {
            card: 'summary',
            title: `${params.name.replace('_', ' & ')} news`,
            description: `${params.name.replace('_', ' & ')} news of Word Times`,
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
    const authors = await getCategory()
    const auths = authors.success
    const arr = [];
    for(let j = 0; j< auths!.length; j++){
        const lastPage = (await catArtNum(auths![j].name)).res
        for (let i = 1; i <= Math.ceil(typeof(lastPage) === 'number' ? lastPage / 20 : 0); i++) {
            arr.push({name:auths![j].name.replaceAll(' ', '_'), number: i })
        }
    }
    
    return arr.map(item => ({name: item.name, page: String(item.number) })) ?? []
}

export const dynamic = 'force-static'
export const dynamicParams = true;
/*export const revalidate = 60*/




const Page = async ({ params }: { params: { name: string, page: number } }) => {


    if (!Number.isInteger(Number(params.page))) notFound();
    if (Number(params.page) < 1) notFound();

    
    const lastPage = (await catArtNum(params.name.slice(0, 1).toUpperCase() + params.name.slice(1, params.name.length).replace('_', ' & '))).res
    if (lastPage === undefined || (Number(params.page) > Math.ceil(lastPage / 20) && Number(params.page) !== 1 )) notFound();
    const ResApi = await catArt(params.page, params.name.slice(0, 1).toUpperCase() + params.name.slice(1, params.name.length).replace('_', ' & '))
    const res = ResApi.res 


    if (ResApi.error || res?.error) return (
        <div className="relative">

            <h1 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replace('_', ' & ')}</h1>

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

    if (res?.data) return (
        <div className="relative">

            <h2 className="text-center mt-32 mb-40 text-5xl text-slate-400">{params.name.replace('_', ' & ')}</h2>

            <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
                <div className="lg:w-[calc(100%-450px)] text-center">
                    <div className="mb-10">
                        {res.data.map(item => <Category_menu_articles paywall={item.paywall} link={'/' + params.name.toLowerCase().replaceAll(' ', '').replace('&', '_') + '/' + item.date.slice(0, 4) + '/' + item.date.slice(6, 8) + '/' + item.date.slice(10, 12) + '/' + item.title.replaceAll(' ', '_').replace('?', 'nb20')}
                            date={item.date} detail={item.detail} category_name={item.author} category_name_link={`/authors/${item.author.replaceAll(' ', '_')}`} imageId={item.cover_img_id} title={item.title} key={item.id} />)}
                    </div>
                    {lastPage !== null && <Pagination url={`category/${params.name}?`} page={params.page} lastPage={Math.round(Number(lastPage) / 20)} />}
                </div>
                <div className="lg:w-80">
                    <Rightsidebar />
                </div>
            </div>
        </div>
    )

}

export default Page;