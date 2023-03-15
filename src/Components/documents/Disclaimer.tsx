import React from "react";
import styles from '../../../styles/Document.module.css';
import cn from 'classnames';

const Disclaimer: React.FC = () => {
    return (
        <div className={styles.document}>
            <h1 className={styles.headTitle}>Оферта и договор на услуги Friendly Carrier</h1>
            <p className={styles.data}>Last updated March 15, 2023</p>
            <p className={styles.text}>Friendly Carrier предлагает заключить договор на условиях оферты:</p>
            <p className={styles.text}>1. Клиенты — физические лица.</p>
            <p className={styles.text}>2. Предмет — услуга предоставления Перевозчика или Получателя клиенту.</p>
            <p className={styles.text}>3. Договор считается заключенным на неопределенный срок с момента акцепта оферты — нажатия на кнопку 
            “Начать сделку” или “Start the deal”.</p>
            <p className={styles.text}>4. Friendly Carrier вправе изменить оферту и договор. Изменения вступают в силу через 2 дня с момента 
            публикации на сайте <a href="https://friendlycarrier.com/ru">https://friendlycarrier.com/ru</a>.</p>
            <p className={styles.text}>5. Стоимость услуги составляет 1500 рублей при оплате в рублях, 20 долларов при оплате в долларах. </p>
            <p className={styles.text}>6. Клиенты оплачивают услугу по безналичному расчету.</p>
            <p className={styles.text}>7. Friendly Carrier и клиенты не подписывают акты. Оплата и получение вознаграждения подтверждают 
            качество услуг.</p>
            <p className={styles.text}>8. Friendly Carrier предоставляет клиентам право находить Перевозчика/Получателя, заключать с ними сделку и 
            не предоставляет другие права.</p>
            <p className={styles.text}>9. Досудебный порядок урегулирования споров обязателен. Подсудность споров — описывается в Пользовательском
            Соглашении по ссылке: <a href="https://friendlycarrier.com/ru/user-agreement">https://friendlycarrier.com/ru/user-agreement</a></p>
            <p className={styles.text}>10. В случае конфликтных ситуаций между пользователями Friendly Carrier не несет никакой ответственности. </p>
            <p className={cn(styles.textInfo, styles.textInfoBlock)}>ИП Газукин Артём Юрьевич</p>
            <p className={styles.textInfo}> 656048, РОССИЯ, Алтайский, Барнаул, Улица Алтайская, д. 30а </p> 
            <p className={styles.textInfo}> ИНН: 222262127729, ОГРН: 323220200021810</p>
            <p className={styles.textInfo}>Счет: 40802810523100007474</p>
            <p className={styles.textInfo}>в СИБИРСКОЕ ГУ БАНКА РОССИИ ФИЛИАЛ &quot;НОВОСИБИРСКИЙ&quot; АО &quot;АЛЬФА-БАНК&quot;</p>
            <p className={styles.textInfo}>БИК: 045004774, К/C: 30101810600000000774</p>
        </div>
    )
}

export default Disclaimer;