import { useState } from "react";
import styles from "../assets/styles/index2.module.css";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
const articles = [
    { title: "Статья 1", content: "Содержание статьи 1..." },
    { title: "Статья 2", content: "Содержание статьи 2..." },
    { title: "Статья 3", content: "Содержание статьи 3..." },
    { title: "Статья 4", content: "Содержание статьи 4..." },
    { title: "Статья 5", content: "Содержание статьи 5..." },
    { title: "Статья 6", content: "Содержание статьи 6..." },
    { title: "Статья 7", content: "Содержание статьи 7..." },
    { title: "Статья 8", content: "Содержание статьи 8..." },
    { title: "Статья 9", content: "Содержание статьи 9..." },
    { title: "Статья 10", content: "Содержание статьи 10..." },
    { title: "Статья 11", content: "Содержание статьи 11..." },
    { title: "Статья 12", content: "Содержание статьи 12..." },
    { title: "Статья 13", content: "Содержание статьи 13..." },
    { title: "Статья 14", content: "Содержание статьи 14..." },
    { title: "Статья 15", content: "Содержание статьи 15..." },
    { title: "Статья 16", content: "Содержание статьи 16..." },
    { title: "Статья 17", content: "Содержание статьи 17..." },
    { title: "Статья 18", content: "Содержание статьи 18..." },
    { title: "Статья 19", content: "Содержание статьи 19..." },
    { title: "Статья 20", content: "Содержание статьи 20..." },
];

export default function App() {
    const [activeNav, setActiveNav] = useState("Главная");
    const [selectedArticle, setSelectedArticle] = useState<null | { title: string; content: string }>(null);
    const [burgerOpen, setBurgerOpen] = useState(false);
    const [phone_cont2, set_phone_cont2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [success_send_phone2, setSuccess_send_phone2] = useState(false);
    const act_next_phone2 = async () => {
        if (!phone_cont2.trim()) {
            setErrorMessage("Пожалуйста, введите номер телефона.");
            return;
        }
        try {
            const r = await axios.post("/api/v1/phone", { phone: phone_cont2 });
            if (r.data.success) {
                setSuccess_send_phone2(true);
                set_phone_cont2("");
                setErrorMessage("");

                setTimeout(() => setSuccess_send_phone2(false), 5000);
            } else {
                setErrorMessage("Произошла ошибка при отправке. Попробуйте позже.");
            }
        } catch (err) {
            console.error(err);
            setErrorMessage("Ошибка соединения. Попробуйте позже.");
        }
    };
    const advantages = [
        {
            title: "Юридическая информация",
            text: "Проверяем застройщиков и объекты, защищаем ваши интересы",
            path: "/public/assets/img/Vector.svg"
        },
        {
            title: "Персональный подбор",
            text: "Учитываем ваш бюджет, стиль жизни и пожелания, чтобы предложить лучшие объекты",
            path: "/public/assets/img/Vector2.svg"
        },
        {
            title: "Экспертное знание рынка",
            text: "Команда специалистов, которые знают все районы и новостройки Дубая",
            path: "/public/assets/img/Vector3.svg"
        },
        {
            title: "Сотрудничество с застройщиками",
            text: "Актуальные цены и доступ к эксклюзивным предложениям",
            path: "/public/assets/img/Vector4.svg"
        },
    ];
    const HeroMain = () => (
        <div className={styles.SSminiBlocks}>
            <div className={`${styles.SSminiBlock} ${styles.SSminiBlockMain}`}>
                <h2>КВАРТИРЫ И ДОМА В ДУБАЕ</h2>
                <p>
                    Расскажите нам о своих желаниях, бюджете и предпочтениях — и мы подберём для вас идеальный дом в Дубае, где каждый день будет начинаться с ощущения мечты.
                </p>
                <button onClick={() => setActiveNav("О нас")}>Начать подбор</button>
            </div>
            <div className={`${styles.SSminiBlock} ${styles.SSminiBlockMain}`}>
                <h2>Свяжитесь с нами</h2>
                <div className={styles.gr}>
                    <Link to="tel:+971542236053"><img src="public/assets/img/telegram_logo_icon_147228.svg" /></Link>
                    <Link to={import.meta.env.VITE_WHATSAPP_LINK}><img src="public/assets/img/whatsapp_logo_icon_147205.svg" /></Link>
                </div>
                <div className={styles.SSinputGroup}>
                    <input type="tel"
                        placeholder="+"
                        value={phone_cont2}
                        onChange={(e) => set_phone_cont2(e.target.value)} />
                    <button onClick={act_next_phone2}>Отправить</button>
                </div>
                {success_send_phone2 && (
                    <p className={styles.modal_st_s_s}>
                        Спасибо! Мы получили ваш номер и свяжемся с вами в ближайшее время.
                    </p>
                )}
                {errorMessage && (
                    <p className={styles.modal_error}>{errorMessage}</p>
                )}
            </div>
        </div>
    );
    const HeroArticles = () => {
        if (selectedArticle) {
            return (
                <div className={styles.SSminiBlocks}>
                    <div className={`${styles.SSminiBlock} ${styles.SSminiBlockMain}`}>
                        <button className={styles.ppl} onClick={() => setSelectedArticle(null)}>← Назад к статьям</button>
                        <h2 className={styles.pks}>{selectedArticle.title}</h2>
                        <p>{selectedArticle.content}</p>
                    </div>
                </div>
            );
        }

        return (
            <div className={styles.SSminiBlocks}>
                <div className={`${styles.SSminiBlock} ${styles.SSminiBlockMain}`}>
                    <h2 className={styles.h2im}>СТАТЬИ</h2>
                    <div className={styles.SSSContainer}>
                        <Swiper navigation={true} spaceBetween={20} slidesPerView={1}>
                            <SwiperSlide>
                                <div className={styles.SSSRow}>
                                    {articles.filter((_, i) => i % 2 === 0).map((item) => (
                                        <div
                                            key={item.title}
                                            className={styles.SSSBlock}
                                            onClick={() => setSelectedArticle(item)}
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.SSSRow}>
                                    {articles.filter((_, i) => i % 2 !== 0).map((item) => (
                                        <div
                                            key={item.title}
                                            className={styles.SSSBlock}
                                            onClick={() => setSelectedArticle(item)}
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        );
    };

    const HeroContact = () => (
        <div className={styles.SSminiBlocks}>
            <div className={`${styles.SSminiBlock} ${styles.SSminiBlockMain}`}>
                <h2>Свяжитесь с нами</h2>
                <div className={styles.gr}>
                    <Link to="tel:+971542236053"><img src="public/assets/img/telegram_logo_icon_147228.svg" /></Link>
                    <Link to={import.meta.env.VITE_WHATSAPP_LINK}><img src="public/assets/img/whatsapp_logo_icon_147205.svg" /></Link>
                </div>
                <div className={styles.SSinputGroup}>
                    <input type="tel"
                        placeholder="+"
                        value={phone_cont2}
                        onChange={(e) => set_phone_cont2(e.target.value)} />
                    <button onClick={act_next_phone2}>Отправить</button>
                </div>
                {success_send_phone2 && (
                    <p className={styles.modal_st_s_s}>
                        Спасибо! Мы получили ваш номер и свяжемся с вами в ближайшее время.
                    </p>
                )}
                {errorMessage && (
                    <p className={styles.modal_error}>{errorMessage}</p>
                )}
            </div>
        </div>
    );
    const renderHeroContent = () => {
        switch (activeNav) {
            case "Главная": return <HeroMain />;
            case "Статьи": return <HeroArticles />;
            case "О нас": return <HeroContact />;
            default: return <HeroMain />;
        }
    };
    return (
        <div className={styles.SSapp}>
            <header className={styles.SSheader}>
                <div className={styles.SSlogo}>
                    <img src="public/assets/img/logo2.svg" />
                    <span>AZUR-RESIDENCE</span>
                </div>
                <nav className={`${styles.SSnav} ${burgerOpen ? styles.SSnavOpen : ""}`}>
                    {["Главная", "Статьи", "О нас"].map((item) => (
                        <span
                            key={item}
                            className={activeNav === item ? styles.SSnavItemActive : styles.SSnavItem}
                            onClick={() => { setActiveNav(item); setBurgerOpen(false); }}
                        >
                            {item.toUpperCase()}
                        </span>
                    ))}
                </nav>
                <div className={styles.SSburger} onClick={() => setBurgerOpen(!burgerOpen)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </header>
            <section className={styles.SShero}>
                <div className={styles.SSheroGlass}>
                    {renderHeroContent()}
                </div>
            </section>
            <footer className={styles.SSfooter}>
                <h2 className={styles.SSfooterTitle}>Наши преимущества</h2>
                <div className={styles.SSadvantages}>
                    {advantages.map((adv) => (
                        <React.Fragment key={adv.title}>
                            <div className={styles.SSadvantage}>
                                <img src={adv.path} alt={adv.title} />
                                <h3>{adv.title}</h3>
                                <p>{adv.text}</p>
                            </div>
                        </React.Fragment>
                    ))}
                </div>
                <div className={styles.SSpolicy}>Политика конфиденциальности</div>
            </footer>
        </div>
    );
}
