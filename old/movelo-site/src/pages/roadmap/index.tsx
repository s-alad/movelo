import styles from "@/styles/Roadmap.module.scss"
import Navbar from "@/components/ui/Navbar"

export default function Home(){
    return(
        <>
            <Navbar />
            <div className={styles.main}>
                <div className={styles.points}>
                    <span className={styles.line}></span>
                    <span className={styles.circle} id={styles.left}>
                        <span className={styles.number}>1.0</span>
                    </span>
                    <span className={styles.circle} id={styles.center}>
                        <span className={styles.number}>2.0</span>
                    </span>
                    <span className={styles.circle} id={styles.right}>
                        <span className={styles.number}>3.0</span>
                    </span>
                </div>
                <div className={styles.boxes}>
                    <div className={styles.box}>
                        <ul>
                            <li>Focus on employees/employers</li>
                            <li>Use data to increase app usage by improving app & rewards</li>
                            <li>Get employees used to using even when not commuting through gamification aspects</li>
                        </ul>
                    </div>
                    <div className={styles.box}>
                        <ul>
                            <li>Expand to public</li>
                            <li>Allow anyone to create campaigns</li>
                            <li>Introduce coupons as rewards</li>
                            <li>Increase daily usage</li>
                            <li>Integrate public API's (Citibike, Bluebike)</li>
                        </ul>
                    </div>
                    <div className={styles.box}>
                        <ul>
                            <li>Reexamine how mapping could be made better</li>
                            <li>AR Directions</li>
                            <li>Use public data to improve directions</li>
                            <li>Become the most used mapping app</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>  
    )
}