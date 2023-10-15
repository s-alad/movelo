import Head from 'next/head'
import Image from 'next/image'
const comfortaa = Comfortaa({ subsets: ['latin'] })
import s from '@/pages/index.module.scss'
import { Comfortaa } from 'next/font/google'

import { PiPersonArmsSpreadFill } from 'react-icons/pi';
import { FaPerson } from 'react-icons/fa6';
import { BsPersonFill } from 'react-icons/bs';
import { TbWalk } from "react-icons/tb";
import { IoBusinessSharp } from "react-icons/io5";
import { MdOutlineWork } from "react-icons/md";

export default function Home() {

	let examples = [
		{
			graphic: <TbWalk />,
			type: "users",
			details: "get real rewards for walking to your favorite places."
		},
		{
			graphic: <IoBusinessSharp />,
			type: "companies",
			details: "get users to walk and check out your business by sponsoring rewards."
		},
		{
			graphic: <MdOutlineWork />,
			type: "employers",
			details: "encourage your employees to walk to work."
		}
	]

	return (
		<main className={`${comfortaa.className} ${s.index}`}>
			<div className={s.intro}>
				Get <span>rewarded</span> for making the planet a better place.
				<div className={s.explanation}>
					movelo encourages users to take enviormentally friendly transportation methods through rewards sponsored by businesses & companies looking to reduce their carbon footprint.
				</div>
				<div>
					<button>
						Join Waitlist
					</button>
					<button className={s.learn}>
						Learn More
					</button>
				</div>
			</div>

			<div className={s.examples}>
				{
					examples.map((example, i) => {
						return (
							<div className={s.example}>
								<div className={s.graphic}>
									{example.graphic}
								</div>
								<div className={s.content}>
									<div className={s.type}>{example.type}</div>
									<div className={s.details}>{example.details}</div>
								</div>
							</div>
						)
					})
				}
			</div>

			<section>

			</section>
		</main>
	)
}
