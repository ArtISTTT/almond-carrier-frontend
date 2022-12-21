import styles from '../styles/MainMage.module.css';
import { Input, Button } from '@mui/material';

export default function Home() {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.name}>Friendly Carrier</div>
        <div className={styles.description}>
          We care about our clients. Reliability is our most important advantage
        </div>
        <div className={styles.email}>
          <Input color="primary" placeholder="Your email" />
          <Button color="primary" className={styles.button} variant="contained">
            Register Now
          </Button>
        </div>
      </div>
    </>
  );
}
