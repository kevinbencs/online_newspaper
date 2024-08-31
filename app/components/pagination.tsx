import Link from "next/link"

const Pagination = (props: {searchParams: {theme: string, title: string,   text: string, date: string, page: number}, lastPage: number}) => {
  return (
    <section className="join mb-10">
        {(props.searchParams.page > 2 && props.lastPage > 3) &&
          <Link href={`/search?theme=${props.searchParams.theme}&title=${props.searchParams.title}&text=${props.searchParams.text}&date=${props.searchParams.date}&page=${1}`} className="join-item btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M3.22 7.595a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 0 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06l-3.25 3.25Zm8.25-3.25-3.25 3.25a.75.75 0 0 0 0 1.06l3.25 3.25a.75.75 0 1 0 1.06-1.06l-2.72-2.72 2.72-2.72a.75.75 0 0 0-1.06-1.06Z" clipRule="evenodd" />
            </svg>
          </Link>
        }
        {props.searchParams.page > 1 &&
          <Link href={`/search?theme=${props.searchParams.theme}&title=${props.searchParams.title}&text=${props.searchParams.text}&date=${props.searchParams.date}&page=${props.searchParams.page - 1}`} className="join-item btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>
          </Link>
        }

        <Link href={`/search?theme=${props.searchParams.theme}&title=${props.searchParams.title}&text=${props.searchParams.text}&date=${props.searchParams.date}&page=${props.searchParams.page < 3 ? 1 : props.searchParams.page == props.lastPage ? props.searchParams.page - 2 : props.searchParams.page - 1}`} className="join-item btn btn-square">{props.searchParams.page < 3 ? 1 : props.searchParams.page == props.lastPage ? props.searchParams.page - 2 : props.searchParams.page - 1}</Link>
        <Link href={`/search?theme=${props.searchParams.theme}&title=${props.searchParams.title}&text=${props.searchParams.text}&date=${props.searchParams.date}&page=${props.searchParams.page != 1 ? props.searchParams.page != props.lastPage ? props.searchParams.page : props.searchParams.page - 1 : 2}`} className="join-item btn btn-square">{props.searchParams.page != 1 ? props.searchParams.page != props.lastPage ? props.searchParams.page : props.searchParams.page - 1 : 2}</Link>
        <Link href={`/search?theme=${props.searchParams.theme}&title=${props.searchParams.title}&text=${props.searchParams.text}&date=${props.searchParams.date}&page=${props.searchParams.page < props.lastPage ? props.searchParams.page == 1 ? 3 : Number(props.searchParams.page) + 1 : props.lastPage}`} className="join-item btn btn-square">{props.searchParams.page < props.lastPage ? props.searchParams.page == 1 ? 3 : Number(props.searchParams.page) + 1 : props.lastPage}</Link>
        {props.searchParams.page < props.lastPage &&
          <Link href={`/search?theme=${props.searchParams.theme}&title=${props.searchParams.title}&text=${props.searchParams.text}&date=${props.searchParams.date}&page=${Number(props.searchParams.page) + 1}`} className="join-item btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </Link>
        }
        {(props.lastPage > 3 && props.searchParams.page < props.lastPage - 1) &&
          <Link href={`/search?theme=${props.searchParams.theme}&title=${props.searchParams.title}&text=${props.searchParams.text}&date=${props.searchParams.date}&page=${props.lastPage}`} className="join-item btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
              <path fillRule="evenodd" d="M12.78 7.595a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06l3.25 3.25Zm-8.25-3.25 3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
            </svg>
          </Link>
        }
      </section>
  )
}

export default Pagination