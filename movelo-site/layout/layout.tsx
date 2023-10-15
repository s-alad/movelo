import { Inter, Roboto, Oxygen_Mono, Montserrat } from 'next/font/google'
import Navbar from './navbar/navbar'
import Footer from './footer/footer'
import Head from 'next/head'

const montserrat = Montserrat({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <title>Movelo</title>
                <meta name="description" content="movelo" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            {children}
            <Footer />
        </>
    )
}