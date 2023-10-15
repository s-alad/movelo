import Head from 'next/head'
import Image from 'next/image'
const comfortaa = Comfortaa({ subsets: ['latin'] })
import s from '@/pages/index.module.scss'
import { Comfortaa } from 'next/font/google'


export default function Home() {
  return (
    <main className={`${comfortaa.className} ${s.index}`}>
      <div className={s.intro}>
        Get <span>rewarded</span> for making the planet a better place.
        <div className={s.explanation}>
          movelo encourages users to take enviormentally friendly transportation methods through rewards sponsored by businesses & companies looking to reduce their carbon footprint.
        </div>
      </div>
    </main>
  )
}
