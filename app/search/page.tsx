import Link from "next/link"
import Pagination from "../components/pagination";

const Page = ({ searchParams }: { searchParams: { theme: string, title: string, text: string, date: string, page: number } }) => {
  const lastPage: number = 40;
  return (
    <div>
      <div>
        {searchParams.text} {searchParams.title} {searchParams.theme} {searchParams.page}
      </div>
      <Pagination searchParams={searchParams} lastPage={lastPage} />
    </div>
  )
}

export default Page