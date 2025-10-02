import React from "react";
import styles from "../../assets/styles/index2.module.css";

const Home: React.FC = () => {
  return (
    <div className={styles.Shome}>
      <h1>Квартиры и дома в Дубае</h1>
      <p>Рассмотрите варианты недвижимости в Дубае для жизни и инвестиций.</p>
      <button className={styles.Sbutton}>Начать подбор</button>
    </div>
  );
};

export default Home;
