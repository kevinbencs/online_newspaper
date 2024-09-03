import Pagination from "../components/pagination";
import Search from "./search";



const Page = ({ searchParams }: { searchParams: { category: string,  text: string, date_from: string, date_to:string, author: string, page: number, filter: string } }) => {
  const lastPage: number = 40;
  //filter, title theme, text
  return (
    <div>
      <Search/>
      <div className="mt-10">
       <Pagination searchParams={searchParams} lastPage={lastPage} /> 
      </div>
      <div>

      </div>
      
    </div>
  )
}

export default Page