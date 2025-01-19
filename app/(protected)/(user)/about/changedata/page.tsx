import { getUserData } from "@/actions/getuserdata";
import { getAllSaveArticle } from "@/actions/savearticle";
import Client from "./Client";

const Page = async () => {
    const userData = await getUserData();
    const savedArticle = await getAllSaveArticle();

   
    return (
        <div className="w-full lg:w-[60%]">
            <Client userData={userData} savedArticle = {savedArticle}/>
        </div>
    )
}

export default Page