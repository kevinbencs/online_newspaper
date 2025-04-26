import Search from "./search";
import Rightsidebar from "../_components/category_menu_search/rightsidebar";


const Loading = async () => {

    return (
        <div className="relative">
            <Search />

            <h1 className="text-center mt-32 mb-40 text-5xl text-slate-400"> Loading <span className="loading loading-dots loading-xl"></span></h1>

            <div className="lg:flex mt-10 mb-10 lg:gap-32 lg:flex-wrap">
                <div className="lg:w-[calc(100%-450px)] text-center">
                    <div className="mb-10 justify-center gap-1 flex items-center font-bold text-xl">
                        Loading <span className="loading loading-dots loading-sm"></span>
                    </div>
                </div>
                <div className="lg:w-80">
                    <Rightsidebar />
                </div>
            </div>
        </div>
    )
}

export default Loading