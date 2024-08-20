'use client';

import { ReactNode, useEffect, useRef, useState } from "react";
import Header from "./header/header";


const Main_header_container = (props: { Children: ReactNode }) => {
    const [mainPos, setMainPos] = useState<number>(10);
    const mainRef = useRef<HTMLElement>(null);

    

    useEffect(() => {
    const handleScroll = () => {
            if (mainRef.current) {
                setMainPos(mainRef.current?.getBoundingClientRect().top);
                console.log(2);
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener("scroll", handleScroll, { passive: true });
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener("scroll", handleScroll);
            }
        };

    }, [])
    return (
        <>
            <Header mainPos={mainPos} />
            <main ref={mainRef} className="mt-10 lg:pl-[calc(50%-600px)] lg:pr-[calc(50%-600px)] pl-1 pr-1 overflow-hidden">
                {props.Children}
            </main>
        </>
    )
}

export default Main_header_container;