import styles from "@/styles/Home.module.scss";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import Navbar from "@/components/ui/Navbar";
import CyclingWord from '@/components/ui/CyclingWord';
import Link from "next/link";

//Color pallate
let mainGreen = '#047a08ff';

interface BobArrowProps {
  showArrow: boolean;
  hasScrolled: boolean;
}

const BobArrow: React.FC<BobArrowProps> = ({ showArrow, hasScrolled }) => {
  return showArrow ? (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: hasScrolled ? 0 : 1 }}
      transition={{ duration: 1.5 }}
    >
      <div>
        <p className={styles.scrollTitle}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Scroll to learn more
          </motion.span>
        </p>
        <div className={styles.bobArrowContainer}>
          <motion.img
            src="/arrow.svg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 1 },
              y: { duration: 3, repeat: Infinity, repeatType: "mirror" },
            }}
            className={styles.bobArrow}
          />
        </div>
      </div>
    </motion.div>
  ) : null;
};

export default function Home() {
  const [showArrow, setShowArrow] = useState(false);
  const ref = useRef<IParallax>(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  function scrollListener() {
      const container = ref.current?.container
          .current as HTMLDivElement

      container.onscroll = () => {
          setHasScrolled(true);
      }
      return () => {
          container.onscroll = null
      }
  }

  useEffect(scrollListener, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!hasScrolled) {
        setShowArrow(true);
      }
    }, 30000); 

    return () => {
      clearTimeout(timeout);
    };
  }, [hasScrolled]);

  return (
    <>
      <Navbar />

      <Parallax pages={8} className={styles.parallax} ref={ref}>
        <ParallaxLayer></ParallaxLayer>
        <ParallaxLayer 
          sticky={{start: 0.92, end: 4}}
          offset={0}
        >
          <div className={styles.firstCardWrapper}>
            <div className={styles.firstCard}>
              <div className={styles.socialsWrapper}>
                <a href="https://github.com/s-alad/movelo" target=" "><img src="github-mark.svg"></img></a>
                <a href="https://twitter.com/moveloapp" target=" "><img src="X_logo.svg"></img></a>
              </div>
              <h1>Employees Are Rewarded For Sustainable Travel</h1>
              <div className={styles.firstCardBottomText}>
                <div>
                  <p>Use the Movelo app while commuting</p>
                  <img src="movelo-phone.svg"></img>
                </div>
                <div className={styles.firstMiddleElement}>
                  <p>Travel in a sustainable way</p>
                  <div className={styles.travel}>
                    <img src="walking.svg"></img>
                    <img src="bike-ride.svg"></img>
                  </div>
                </div>
                <div className={styles.money}>
                  <p>Get rewarded with cash</p>
                  <img src="moneybagyo.svg"></img>
                </div>
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{start: 2.5, end: 5}}
          className={styles.interimCard}
        >
          <h1>At Movelo we belive that by having employees start and end their days 
            with sustainability it not only reduces carbon emissions in the short term but 
            creates a culture of sustainability that leads to sustainibility savings in every
            aspect of a company</h1>
            <img src="circle-arrows.svg"></img>
        </ParallaxLayer>
        <ParallaxLayer 
          sticky={{start: 3.9, end: 8}}
          className={styles.secondCard}
        >
          <div >
            <h1>Businesses Gather ESG Data</h1>
            <div className={styles.scendCardBottom}>
              <div>
                <p>Employees use Movelo while commuting</p>
                <img src="movelo-phone.svg"></img>
              </div>
              <div className={styles.data}>
                <p>Movelo collects valuable commuting data</p>
                <img src="gather-data.svg"></img>
              </div>
              <div className={styles.esg}>
                <p>Report ESG more accurately</p>
                <img src="esg.svg"></img>
              </div>
            </div>
          </div>
        </ParallaxLayer>
        <ParallaxLayer
          sticky={{start: 5.4, end: 8}}
          className={styles.thirdCard}
        >
          <h1>Interested<span style={{ color: mainGreen }}>?</span></h1>
          <Link href="/contact">
            <button>Contact Us</button>
          </Link>
        </ParallaxLayer>
      </Parallax>
      <div className={styles.mainLayer}>
        <h1>
          A <span style={{ color: mainGreen }}>New</span> Way To Commute
        </h1>
        <p>Pay for your morning coffee with your morning <CyclingWord /></p>
        <BobArrow showArrow={showArrow} hasScrolled={hasScrolled}/>
      </div>
    </>
  );
}