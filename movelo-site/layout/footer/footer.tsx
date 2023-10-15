import React from 'react'
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Footer() {
    return (
        <div className={`${montserrat.className}`}>
            Footer
        </div>
    )
}