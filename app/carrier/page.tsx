import { getCarriers } from "@/actions/getcarrier"
import Link from "next/link"

interface Car {
    _id: string,
    title: string
}

const Page = async () => {
    const data: { success: Car[], error: undefined } | { success: undefined, error: string } = await getCarriers()


    return (
        <div className="min-h-screen">
            {data.error &&
                <div>{data.error}</div>
            }
            {data.success &&
                <section className="text-xl">
                    {data.success.map(item => <Link className="mb-4" href={`/carrier/${item.title.replaceAll(' ','_')}`} key={item._id}>{item.title}</Link>)}
                </section>
            }
        </div>
    )
}

export default Page