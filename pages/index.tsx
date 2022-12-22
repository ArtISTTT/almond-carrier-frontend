import styles from '../styles/MainMage.module.css';
import { Button, Container, TextField } from '@mui/material';

export default function Home() {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.name}>Friendly Carrier</div>
                <div className={styles.description}>
                    We care about our clients.
                    <br /> Reliability is our most important advantage
                </div>
                <div className={styles.email}>
                    <TextField
                        id='email'
                        label='Email'
                        variant='outlined'
                        color='primary'
                        className={styles.emailInput}
                    />
                    <Button
                        color='primary'
                        className={styles.button}
                        variant='contained'
                    >
                        Register Now
                    </Button>
                </div>
            </div>




            <Container maxWidth={false}>  
                <div className={styles.whiteBlockTitle}>Whom you can be</div>
                <div className={styles.whiteBlockInfo}>
                    <img src='/static/images/mainPage/first-whiteBlock-photo-first.png' alt='qwe'/>
                    <div>
                        <span>Carrier</span>
                        <div>You are planning to visit another country, then you can agree to the delivery of something or offer it, from where you are leaving, to the country where you are going.</div>
                        <Button variant='contained'>Register as a Carrier</Button>
                    </div>
                </div>
                <div className={styles.whiteBlockInfo}>
                    <div>
                        <span>Receiver</span>
                        <div>You are in a country where you don't have anything you need. Then you can request something and wait for the carrier to respond or respond to the carrier's offer yourself.</div>
                       <Button variant='contained'>Register as a Receiver</Button>
                    </div>
                    <img src='/static/images/mainPage/first-whiteBlock-photo-second.png' alt='qwe'/>
                </div>
            </Container>






            <Container className={styles.blueBlock} maxWidth={false}>
                <div className={styles.blueBlock_title}>Our advantages</div>
                <div className={styles.blueBlock_content}>

                    <div className={styles.content_part}>
                        <img src='/static/images/mainPage/blueBlock-photo-first.png' alt='first'/>
                        <div className={styles.content_firstText}>
                            <span>Reliability</span>
                            <div>Receiver gives us money, then we hold them until receiver doesn’t approve that he got goods. After that we send money to carrier. </div>
                        </div>
                    </div>
                    <div className={styles.content_part}>
                        <div className={styles.content_secondText}>
                            <span>Low commision</span>
                            <div>We charge a commission for what we found for your carrier/receiver, but the price will be low</div>
                        </div>
                        <img src='/static/images/mainPage/blueBlock-photo-second.png' alt='first'/>
                    </div>
                    <div className={styles.content_part}>
                        <img src='/static/images/mainPage/blueBlock-photo-third.png' alt='first'/>
                        <div className={styles.content_firstText}>
                            <span>Safety</span>
                            <div>All your data will be confident. Your money also will be safe. </div>
                        </div>
                    </div>
                </div>
            </Container>







            <Container maxWidth={false}>  
                <div className={styles.whiteBlockTitle}>How does it work</div>
                <div className={styles.whiteBlockInfo}>
                    <img src='/static/images/mainPage/second-whiteBlock-photo-first.png' alt='qwe' />
                    <div>
                        <span>1. Choose</span>
                        <div>If you are a receiver, than you need to choose carrier, who will buy you a good you need. If you are a carrier, you need to choose a receiver you want to delivery a good.</div>
                    </div>
                </div>
                <div className={styles.whiteBlockInfo}>
                    <div>
                        <span>2. Purchase</span>
                        <div>Carrier points the price of good, then to the result sum added our commission and profit for carrier. Receiver pays the sum. We hold it on our servers. Carrier buys a good himself, after he sees that the sum in the cloud.</div>
                    </div>
                    <img src='/static/images/mainPage/second-whiteBlock-photo-second.png' alt='qwe' />
                </div>
                <div className={styles.whiteBlockInfo}>
                    <img src='/static/images/mainPage/second-whiteBlock-photo-third.png' alt='qwe' />
                    <div>
                        <span>3. Receiving</span>
                        <div>Carrier brings the good to the country where receiver lives. Then if receiver sees that the good is suitable for him, he proves it in the app, and carrier gets his money.</div>
                    </div>
                </div>
            </Container>
        </>
    );
}
