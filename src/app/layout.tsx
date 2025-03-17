"use client";
import "./globals.css";
import cn from '@sindresorhus/class-names';

import { Gabarito, Chango } from "next/font/google";

const gabarito = Gabarito({
    variable: "--font-gabarito",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // Adjust weights as needed
});

const chango = Chango({
    variable: "--font-chango",
    subsets: ["latin"],
    weight: ["400"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // dbConnect().then(r => console.log("Connected to database"));
    return (
        <html
            lang="en"
            className={cn(gabarito.variable, chango.variable)}
        >
        <head>
            <title>Digitulp</title>
        </head>
        <body
            className={`font-gabarito antialiased bg-mid text-text `}
        >

        <div className={"flex flex-col justify-between min-h-screen bg-gradient-to-t from-mid to-dark"}>
            {/*Header*/}
            {/*<SiteHeader />*/}

            {/*Main Content*/}
            <main id="container" className="mb-auto flex flex-col items-center">
                {/*<div className="flex items-start p-4 w-full h-full lg:w-3/4 xl:w-1/2 bg-dark shadow-md border-x-2 border-border">*/}
                {/*<div className="flex items-start p-4 w-full h-full lg:w-3/4 xl:w-1/2">*/}
                {/*</div>*/}
                {children}
            </main>

            <footer className="bg-mid text-text p-10 w-full border-t-2 border-border">
                <p>© 2025 Digitulp Ltd</p>
            </footer>
        </div>
        </body>
        </html>
    );
}