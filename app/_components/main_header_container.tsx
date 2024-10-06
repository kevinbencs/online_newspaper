'use client';

import { ReactNode, useEffect, useRef, useState } from "react";
import Header from "./header/header";

import { AudioProvider } from "./audio/audioprovider";


const Main_header_container = (props: { Children: ReactNode }) => {
    const [mainPos, setMainPos] = useState<number>(10);
    const mainRef = useRef<HTMLElement>(null);



    useEffect(() => {
        const handleScroll = () => {
            if (mainRef.current) {
                setMainPos(mainRef.current?.getBoundingClientRect().top);
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
            <main ref={mainRef} className="mt-10 desktop:pl-[calc(50%-600px)] desktop:pr-[calc(50%-600px)] pl-1 pr-1">
                <AudioProvider>
                    {props.Children}
                </AudioProvider>
            </main>
        </>
    )
}

export default Main_header_container;