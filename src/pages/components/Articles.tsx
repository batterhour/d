import React from "react";
import styles from "../../assets/styles/index2.module.css";

const Articles: React.FC = () => {
  const articles = [
    "Инвестиции в недвижимость Дубая",
    "Как выбрать квартиру в Дубае",
    "Лучшие районы для инвестиций",
    "Преимущества аренды в Дубае",
  ];

  return (
    <div className={styles.Sarticles}>
      <h2>Статьи</h2>
      <div className={styles.Sgrid}>
        {articles.map((title, i) => (
          <div key={i} className={styles.Scard}>
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
