"use client";

import Link from "next/link";
import NavBar from "@/components/nav-bar";

export default function SiteHeader() {
    return (
        <header
            className="App-header bg-mid shadow-lg shadow-dark border-b-4 border-border bg-gradient-to-t from-mid to-dark lg:sticky lg:top-0 z-50"
        >
            <div className="flex flex-row items-end p-4 pb-4 pt-10 justify-items-start w-full lg:w-3/4 xl:w-1/2">
                <h1 className="font-bold italic text-2xl pb-0 text-white">
                    DIGITULP Ltd
                </h1>
                {/*<Link href={"/"} className={"font-extrabold text-3xl p-4 md:text-4xl lg:text-5xl text-primary pt-10 pb-10"}>Naylor Love Sign In Monitor</Link>*/}
            </div>
        </header>
    );
}