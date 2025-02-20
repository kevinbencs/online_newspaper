import { GetTask } from '@/actions/gettasks';
import Client from './client';


interface TaskType {
    _id: string,
    name: string,
    task: string
}

const Page = async () => {
    const res = await GetTask();

    return (
        <>
            <Client tasks={res.tasks} error={res.error}/>
        </>
    )
}

export default Page