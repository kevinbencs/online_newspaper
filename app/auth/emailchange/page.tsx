import { emailChange } from "@/actions/emailchange"

const Page = async ({searchParams}: {searchParams:{tokenHash:string,}}) => {
    const data = await emailChange(searchParams.tokenHash)
  return (
    <div className="h-[90vh]">
        <div className="mt-14 text-center text-3xl">{data.success} {data.error}</div>
    </div>
  )
}

export default Page