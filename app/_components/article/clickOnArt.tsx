'use client'

import { clickOnArt } from "@/actions/clickOnArt";
import { useEffect } from "react";

const ClickOnArt = (props:{title: string, date: string, source: string}) => {

    useEffect(() => {
        clickOnArt({ Article: decodeURIComponent(props.title.replaceAll('_', ' ').replace('nb20','?')), date: props.date, source: props.source });
    }, [])

    return (
        <></>
    )
}

export default ClickOnArt