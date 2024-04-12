import Navbar from "@/components/ui/Navbar"
import sytles from "@/styles/Team.module.scss"

export default function Home(){
    return(
        <>
            <Navbar />
            <div className={sytles.mainWrapper}>
                <div className={sytles.wesWrapper}>
                    <img src="wes-pfp.png"></img>
                    <h1>Wes</h1>
                    <div className={sytles.thinLine}></div>
                    <div className={sytles.description}>
                        <p>
                            - Project Lead <br/>
                            - Sales <br/>
                            - Finance <br/>
                            - Solidity Dev <br/>
                        </p>
                    </div>
                </div>
                <div className={sytles.saadWrapper}>
                    <img src="saad-pfp.png"></img>
                    <h1>Saad</h1>
                    <div className={sytles.thinLine}></div>
                    <div className={sytles.description}>
                        <p>
                            - Backend Software Dev <br/>
                            - App Dev <br/>
                        </p>
                    </div>
                </div>
                <div className={sytles.collinWrapper}>
                    <img src="collin-pfp.png"></img>
                    <h1>Collin</h1>
                    <div className={sytles.thinLine}></div>
                    <div className={sytles.description}>
                        <p>
                            - Map Dev <br/>
                            - App Dev <br/>
                        </p>
                    </div>
                </div>
            </div>
        </>  
    )
}