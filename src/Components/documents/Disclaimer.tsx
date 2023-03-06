import React from "react";
import styles from '../../../styles/Document.module.css';
import cn from 'classnames';

const Disclaimer: React.FC = () => {
    return (
        <div className={styles.document}>
            <h1 className={styles.headTitle}>DISCLAIMER</h1>
            <p className={styles.data}>Last updated March 06, 2023</p>
            <p className={styles.title}>WEBSITE DISCLAIMER</p>
            <p className={styles.text}>The information provided by Friendly Carrier (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on 
            <a href="https://friendlycarrier.com/"> https://friendlycarrier.com/</a>  (the &quot;Site&quot;) is for general informational purposes 
            only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or 
            implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site. 
            UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE 
            SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS 
            SOLELY AT YOUR OWN RISK.</p>
            <p className={styles.title}>TESTIMONIALS DISCLAIMER</p>
            <p className={styles.text}>The Site may contain testimonials by users of our products and/or services. These testimonials reflect the 
            real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not 
            necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all 
            users will have the same experiences. YOUR INDIVIDUAL RESULTS MAY VARY.</p>
            <p className={styles.text}>The testimonials on the Site are submitted in various forms such as text, audio and/or video, and are 
            reviewed by us before being posted. They appear on the Site verbatim as given by the users, except for the correction of grammar 
            or typing errors. Some testimonials may have been shortened for the sake of brevity where the full testimonial contained extraneous 
            information not relevant to the general public.</p>
            <p className={styles.text}>The views and opinions contained in the testimonials belong solely to the individual user and do not 
            reflect our views and opinions. We are not affiliated with users who provide testimonials, and users are not paid or otherwise 
            compensated for their testimonials.</p>
        </div>
    )
}

export default Disclaimer;