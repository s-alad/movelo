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
import Divider from '@/components/divider/divider'
import Link from 'next/link'

export default function Home() {

	const examples = [
		{
			graphic: <TbWalk />,
			type: "users",
			details: "get real rewards for walking to your favorite places."
		},
		{
			graphic: <MdOutlineWork />,
			type: "employers",
			details: "encourage your employees to walk to work."
		},
		{
			graphic: <IoBusinessSharp />,
			type: "companies",
			details: "get users to walk and check out your business by sponsoring rewards."
		},
	]

	const backers = [
		{
			logo: "/logos/vechain.png",
			name: "VeChain",
		},
		{
			logo: '/logos/bcg.png',
			name: "Boston Consulting Group",
		},
		{
			logo: '/logos/buni.png',
			name: "Boston University",
		},
		{
			logo: '/logos/harvard.png',
			name: "Harvard University",
		}
	]

	return (
		<main className={`${comfortaa.className} ${s.index}`}>

			<section className={s.main}>
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
			</section>

			<section className={s.trusted}>
				<div className={s.backed}>
					Winner of the EasyA x VeChain x BCG 2023 hackathon at Harvard
				</div>
				<div className={s.backers}>
					{
						backers.map((backer, i) => {
							return (
								<div className={s.backer}>
									<Image src={backer.logo} width={300} height={200} alt={backer.name} />
								</div>
							)
						})
					}
				</div>
			</section>

			<Divider />

			<section className={s.about}>
				<div className={s.problem}>
					<div className={s.details}>
						<span>The Problem</span>
						<div className={s.statement}>Transportation is the largest contributor of greenhouse gasses in the  <Link href={'https://www.rff.org/publications/explainers/federal-climate-policy-104-the-transportation-sector/'}>US</Link>. 
						Companies are constantly looking for ways to advance their green initiatives but this is often done 
						through carbon credits which aren’t tangible </div>
					</div>

					<div className={s.graphics}>
						<div className={s.graphic}>
							<Image src="/graphics/donut.png" width={600} height={300} alt="donut" />
						</div>
						<div className={s.graphic}>
							<Image src="/graphics/stats.png" width={600} height={300} alt="donut" />
						</div>
					</div>
				</div>
			</section>

		</main>
	)
}
