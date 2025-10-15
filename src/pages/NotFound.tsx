import styles from "../assets/styles/index.module.css";
function NotFound() {
    return <>
        <div className={styles.NNbackground}>
            <div className={styles.NNt404}>
                <h1>404 - СТРАНИЦА НЕ НАЙДЕНА</h1>
                <p>К сожалению, запрашиваемая вами страница не была найдена.</p>
                <a href="/">Вернутся на главную</a>
            </div>
        </div>
    </>;
}

export default NotFound;
