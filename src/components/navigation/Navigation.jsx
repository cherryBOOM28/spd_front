import React from "react";
import { NavLink } from "react-router-dom";
import cl from './Navigation.module.css';
import logo3 from '../../assets/icons/logo-w.png';
import { FaFile } from "react-icons/fa6";
import { IoFileTrayStacked } from "react-icons/io5";
import { BiSolidHomeAlt2 } from "react-icons/bi";
import {  useLocation } from 'react-router-dom';


const Navigation = () => {
    const location = useLocation();

    const activeStyle = {
        background: '#fff',
    };

    const isActive = location.pathname === '/basic-orders';

  return (
    <div className={cl.navigationMenu}>
        <div className={cl.logo}>
            <img src={logo3} alt="logo" style={{ width: "80%" }} />
        </div>
        <ul >
            <NavLink  to="/" className={cl.navLink}>
                <li  className={cl.navLi}>
                    <BiSolidHomeAlt2 />
                    Главная
                </li>
            </NavLink>
        
            <NavLink to="/basic-orders" className={cl.navLink} style={isActive ? activeStyle : {}}>
                <li className={cl.navLi}>
                    <IoFileTrayStacked />
                    Основные приказы
                </li>
            </NavLink>
            <NavLink to="/reports" className={cl.navLink}>
                <li className={cl.navLi}>
                    <FaFile />
                    Отчеты
                </li>
            </NavLink>
      </ul>
    </div>
  );
};

export default Navigation;
