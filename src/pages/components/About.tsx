import React from "react";
import styles from "../../assets/styles/index2.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.Sabout}>
      <h2>О нас</h2>
      <p>
        Мы помогаем с подбором и покупкой недвижимости в Дубае. Юридическая безопасность и персональный подход.
      </p>
    </div>
  );
};

export default About;
