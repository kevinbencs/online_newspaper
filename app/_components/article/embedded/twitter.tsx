import { Tweet } from 'react-tweet';

const Twitter = (props: { id: string }) => {
    return (
        <>
            <Tweet id={props.id} />
        </>
    )
}

export default Twitter