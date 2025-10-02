import React from "react";
import styles from "../../assets/styles/index2.module.css";

interface NavbarProps {
  activeTab: "home" | "articles" | "about";
  setActiveTab: (tab: "home" | "articles" | "about") => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className={styles.Snavbar}>
      <div className={styles.Slogo}><svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M29.9561 0.000976562L32.7793 0.015625V18.5742C32.7322 18.5736 32.685 18.5713 32.6377 18.5713C26.3681 18.5713 21.2852 23.6882 21.2852 30C21.2852 36.3118 26.3681 41.4287 32.6377 41.4287C32.685 41.4287 32.7322 41.4254 32.7793 41.4248V59.9844L29.9561 59.999C29.9421 59.9991 29.9283 59.9987 29.8994 59.999C29.8747 59.9993 29.8382 60 29.7988 60C13.3414 59.9998 0 46.5684 0 30C1.58386e-05 13.4316 13.3414 0.000190909 29.7988 0C29.8519 0 29.9403 0.000895083 29.9561 0.000976562Z" fill="#A24E2B"/>
<path d="M32.9238 2.85742C47.8788 2.85745 60.0019 15.0094 60.002 30C60.002 44.9906 47.8788 57.1425 32.9238 57.1426C32.8763 57.1426 32.8287 57.1418 32.7812 57.1416V41.4277C39.0776 41.4272 44.1816 36.3115 44.1816 30C44.1816 23.6885 39.0777 18.5718 32.7812 18.5713V2.8584C32.8287 2.85815 32.8763 2.85742 32.9238 2.85742Z" fill="#081F35"/>
</svg>
AZURE-RESIDENCE</div>
      <div className={styles.Slinks}>
        <button
          className={activeTab === "home" ? styles.Sactive : ""}
          onClick={() => setActiveTab("home")}
        >
          Главная
        </button>
        <button
          className={activeTab === "articles" ? styles.Sactive : ""}
          onClick={() => setActiveTab("articles")}
        >
          Статьи
        </button>
        <button
          className={activeTab === "about" ? styles.Sactive : ""}
          onClick={() => setActiveTab("about")}
        >
          О нас
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
