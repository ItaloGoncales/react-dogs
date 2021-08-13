import React, { Fragment } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";

import styles from "./UserHeaderNav.module.css";

import { ReactComponent as Feed } from "../../Assets/feed.svg";
import { ReactComponent as Stats } from "../../Assets/estatisticas.svg";
import { ReactComponent as Post } from "../../Assets/adicionar.svg";
import { ReactComponent as Sair } from "../../Assets/sair.svg";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const mobile = useMedia("(max-width: 40rem)");
  const { pathname } = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink
          to="/conta"
          aria-label="Feed"
          end
          activeClassName={styles.active}
        >
          <Feed /> {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink
          to="/conta/estatisticas"
          aria-label="Estatísticas"
          activeClassName={styles.active}
        >
          <Stats /> {mobile && "Estatísticas"}
        </NavLink>
        <NavLink
          to="/conta/postar"
          aria-label="Nova Postagem"
          activeClassName={styles.active}
        >
          <Post /> {mobile && "Nova Postagem"}
        </NavLink>
        <button onClick={userLogout}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
