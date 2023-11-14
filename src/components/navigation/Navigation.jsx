import React from "react";
import { NavLink } from "react-router-dom";
import cl from './Navigation.module.css';
import logo from '../../assets/icons/logow.svg';
// import homeIcon from '../../assets/icons/home.svg';
import homeWhightIcon from '../../assets/icons/homew.svg';
import adminIcon from '../../assets/icons/admin.svg';
import ordersIcon from '../../assets/icons/orders.svg';
import fileIcon from '../../assets/icons/file.svg';
import docIcon from '../../assets/icons/doc.svg';


const Navigation = () => {
  return (
    <div className={cl.navigationMenu}>
        <div className={cl.logo}>
            <img src={logo} alt="logo" />
            <p className={cl.logoText}>Система кадрового учета</p>
        </div>
        <ul>
            <NavLink  to="/" className={cl.navLink}>
                <li className={cl.navLi}>
                    <img src={homeWhightIcon} alt="homeIcon" className={cl.navImg} />
                    Главная
                </li>
            </NavLink>
            <NavLink  to="/administration" className={cl.navLink}>
                <li className={cl.navLi}>
                    <img src={adminIcon} alt="homeWhightIcon" className={cl.navImg} />
                    Администратирование
                </li>
            </NavLink>
            <NavLink to="/basic-orders" className={cl.navLink}>
                <li className={cl.navLi}>
                    <img src={ordersIcon} alt="ordersIcon" className={cl.navImg} />
                    Основные приказы
                </li>
            </NavLink>
            <NavLink to="/reports" className={cl.navLink}>
                <li className={cl.navLi}>
                    <img src={fileIcon} alt="fileIcon" className={cl.navImg} />
                    Отчеты
                </li>
            </NavLink>
            <NavLink to="/other-orders" className={cl.navLink}>
                <li className={cl.navLi}>
                    <img src={docIcon} alt="docIcon" className={cl.navImg} />
                    Прочие приказы
                </li>
            </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
