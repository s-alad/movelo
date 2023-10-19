import React from 'react'
import { Montserrat } from "next/font/google"
import s from './footer.module.scss'
const montserrat = Montserrat({ subsets: ['latin'] })

export default function Footer() {
    return (
        <div className={`${montserrat.className} ${s.footer}`} id="footer">
            contact@movelo.app
        </div>
    )
}