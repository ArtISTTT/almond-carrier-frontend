import React from "react";
import styles from '../../../styles/Document.module.css';
import cn from 'classnames';

const ContactDetails: React.FC = () => {
    return (
        <div className={styles.document}>
            <h1 className={styles.title}>Contact details</h1>
            <p className={styles.text}>
                <p className={styles.bold}>Friendly Carrier</p>
                <p>Altayskaya street, b. 30a</p>
                <p>Barnaul, Altai Krai 656048</p>
                <p>Russia</p>
            </p>
            <p className={cn(styles.textInfo, styles.textInfoBlock)}>ИП Газукин Артём Юрьевич</p>
            <p className={styles.textInfo}> 656048, РОССИЯ, Алтайский, Барнаул, Улица Алтайская, д. 30а </p> 
            <p className={styles.textInfo}> ИНН: 222262127729, ОГРН: 323220200021810</p>
            <p className={styles.textInfo}>Счет: 40802810523100007474</p>
            <p className={styles.textInfo}>в СИБИРСКОЕ ГУ БАНКА РОССИИ ФИЛИАЛ &quot;НОВОСИБИРСКИЙ&quot; АО &quot;АЛЬФА-БАНК&quot;</p>
            <p className={styles.textInfo}>БИК: 045004774, К/C: 30101810600000000774</p>
            <p className={styles.text}></p>
            <p className={styles.text}>Write to this email in case of any questions: <span className={styles.bold}>support@friendlycarrier.com</span></p>
        </div>
    )
}

export default ContactDetails;