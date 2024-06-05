import React, {useState, useEffect} from "react"
import Navbar from "../components/Navbar"
import PageSection from "../components/PageSection"
import styles from "../css/LandingPage.module.css"
import { useInView } from "react-intersection-observer";
import useDocumentTitle from "../components/useDocumentTitle";


export default function LandingPage() {
    useDocumentTitle("Home")
    const reviewList = [
        {
            image: "https://images.pexels.com/photos/240561/pexels-photo-240561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Mary Lungenbe",
            review: "Definitely recommend this to others, I feel so much more productive while using this app. I can even reflect on myself at night with its journal feature",
            reviewDate: "24/7/19"
        },
        {
            image: "https://images.pexels.com/photos/8517921/pexels-photo-8517921.jpeg?auto=compress&cs=tinysrgb&w=600",
            name: "Suzana",
            review: "Great application to plan your schedule as well as tasks that need to be completed. Can’t live without this app",
            reviewDate: "18/01/18"
        },
        {
            image: "https://images.pexels.com/photos/746386/pexels-photo-746386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Timothy Pacom",
            review: "After using this app, I feel that I no longer procrastinate on work that I need to complete. I use it ot organize by day, all day everyday",
            reviewDate: "11/01/12"
        },
        {
            image: "https://images.pexels.com/photos/853151/pexels-photo-853151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Josh Emanual",
            review: "This app is amazing, I needed this in my life. It really works in increasing your productivity. 10/10 would recommend",
            reviewDate: "20/03/03"
        }
    ]


    const { ref:refComments, inView:inViewComments } = useInView({
        triggerOnce:true
    });
    const { ref:refPower, inView:inViewPower } = useInView({
    });

    function Card ({image, name, review, reviewDate}){
        return (
            <div className={styles.card}>
                <div className={styles.info}>
                <img src="images/quote.png" alt="" />
                <p>{review}</p>
                </div>
                <div className={styles.profile}>
                    <img src={image} alt="" />
                    <div className={styles.details}>
                        <h2>{name}</h2>
                        <span>Reviewed: {reviewDate}</span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <main>
            <section className={styles.landingSection}>
                <Navbar />
                <div className={styles.introduction}>
                    <div className={`${styles.title} poppins`}>
                        <div className={styles.type_1}>
                            <h1>Plan your <span className="highlight-1">Journey</span></h1>
                        </div>
                        <div className={styles.type_2}>
                            <h1><span className="highlight-2">Journal</span> your Experience</h1>
                        </div>
                    </div>
                    <p className={styles.description}>
                        Streamline Your Day with Ease, Take Control of Your Schedule, and Reflect on the Past.  Exclusively through Us.
                    </p>

                    <div className={`${styles.get_started} poppins`}>
                        <p>Get Started</p>
                        <i className='bx bx-right-arrow-alt'></i>
                    </div>                   
                </div>
            </section>
            <section className={`${styles.detailsSection} poppins`} >
                <div className={styles.left_image}>
                    <img src="images/hand_writing.png" alt="" />
                </div>
                <div className={styles.description}>
                    <div className={styles.desc_head}>
                        <p>WHY US?</p>
                        <div className={styles.block}></div>
                    </div>
                    <h2>Elevate Your <span className="highlight-1">Journey</span> with Our Integrated <span className="highlight-1">Planner</span></h2>
                    <p className="lato">
                        Discover the ultimate tool to enhance your daily life. Our platform seamlessly allows intuitive planning features , empowering you to navigate life with clarity and purpose.
                        <br/><br/>With our app, you'll embark on a trans-formative journey with better time management, guiding you towards a more balanced lifestyle
                    </p>
                </div>
            </section>
            <section className={`${styles.detailsSection} poppins`} >
                <div className={styles.description}>
                    <div className={styles.desc_head}>
                        <p>WHY US?</p>
                        <div className={styles.block}></div>
                    </div>
                    <h2>A Corner to <span className="highlight-2">Reflect</span> on your Thoughts Digitally!</h2>
                    <p className="lato">
                    With intuitive prompts you can effortlessly capture the essence of your experiences and explore the nuances of your inner world.
                    <br /><br />Whether you're seeking clarity, gratitude, or simply a moment of reflection, our platform provides a sanctuary for your words to unfold.
                    <br /><br />Unlock a deeper understanding of yourself with every entry.
                    </p>
                </div>

                <div className={styles.right_image}>
                    <img   src="images/blob.png" alt="" />
                    <img className={styles.phone} src="images/phone.png" alt="" />
                    <img className={styles.notebook}  src="images/notepad.png" alt="" />
                </div>
            </section>
            <section className={`${styles.laptop} poppins`} >
                <h1><span className="highlight-1">Planning</span> every event, <span className="highlight-2">Capturing</span> every experience</h1>
                <p className="lato">A place where every individual organizes and reflects on themselves</p>
                <img src="images/laptop.png" alt="" />
            </section>

            <section ref={refPower} className={inViewPower?`${styles.powered_by} ${styles.powered_by_animate}`:`${styles.powered_by}`} >
            <h2>Powered By</h2>

            <div className={styles.speed_carousel}>
                <div className={styles.track}>
                <div>
                    <img src="images/firebase.png" alt="" />
                </div>
                <div>
                    <img src="images/github.png" alt="" />
                </div>
                <div>
                    <img src="images/vercel.png" alt="" />
                </div>
                <div>
                    <img src="images/node.png" alt="" />
                </div>
                <div>
                    <img src="images/react.png" alt="" />
                </div>
            
                </div>
                <div className={styles.track}>
                <div>
                    <img src="images/firebase.png" alt="" />
                </div>
                <div>
                    <img src="images/github.png" alt="" />
                </div>
                <div>
                    <img src="images/vercel.png" alt="" />
                </div>
                <div>
                    <img src="images/node.png" alt="" />
                </div>
                <div>
                    <img src="images/react.png" alt="" />
                </div>
            
                </div>
            </div>
            </section>
            <section  className={inViewComments?`${styles.comment_section} poppins ${styles.comment_section_animate}`:`${styles.comment_section} poppins`} ref={refComments}>
                <div className={styles.description}>
                    <h2>What <span className="highlight-1">People</span> say <span className="highlight-2">About</span> Us</h2>
                    <p className="lato">Check out the reviews of users that have used our service</p>
                </div>
                <div className={styles.cards}>
                    {reviewList.map((data, index) => {
                        return <Card key={index} name={data.name} image={data.image} review={data.review} reviewDate={data.reviewDate} />
                    })}                    
                </div>
            </section>
        </main>
    )

}