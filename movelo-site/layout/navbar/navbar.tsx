import { Montserrat, Comfortaa, Roboto } from "next/font/google"
import s from './navbar.module.scss'
import { TbWalk } from "react-icons/tb";
const montserrat = Montserrat({ subsets: ['latin'] })
const comfortaa = Comfortaa({ subsets: ['latin'] })
const roboto = Roboto({
    subsets: ['latin'],
    weight: "400"
})

import Link from "next/link";

export default function Navbar() {
    return (
        <nav className={`${comfortaa.className} ${s.navbar}`}>
            <div className={s.left}>
                <div className={s.movelo}>
                    <TbWalk />
                    <div>movelo</div>
                </div>
                <div className={s.links}>
                    <Link href={""}>
                        about us
                    </Link>
                    <Link href={""}>
                        roadmap
                    </Link>
                    <Link href={""}>
                        contact
                    </Link>
                </div>
            </div>
            
            <div className={s.right}>
                <button>
                    Join Waitlist
                </button>
            </div>
        </nav>
    )
}