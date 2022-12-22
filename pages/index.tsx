import styles from '../styles/WelcomePage.module.css';
import { Button, TextField } from '@mui/material';
import Layout from '../src/Components/Layout';

export default function Welcome() {
    return (
        <Layout>
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
        </Layout>
    );
}
