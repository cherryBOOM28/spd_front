import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cl from './Registration.module.css';
import logo from '../../assets/icons/logo.svg';
import Button from '../../components/UI/button/Button';

const Registration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      console.log('Registration successful:', formData);
      navigate('/login');
    } else {
      alert('Passwords do not match.');
    }
  };

  return (
    <div className={cl.registrationWrapper}>
      <div className={cl.container}>
        <form className={cl.registrationForm} onSubmit={handleSubmit}>
          <div className={cl.logo}>
            <img src={logo} alt="logo" className={cl.logoImg} />
            <p className={cl.logoText}>Система кадрового учета</p>
          </div>
          <p className={cl.registration}>Регистрация</p>
          <input
            className={cl.registrationInput}
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            required={true}
            placeholder="E-mail"
          />
          <input
            className={cl.registrationInput}
            value={formData.password}
            onChange={handleChange}
            type="password"
            name="password"
            required={true}
            placeholder="Пароль"
          />
          <input
            className={cl.registrationInput}
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            required={true}
            placeholder="Повторите пароль"
          />
          {formData.password !== formData.confirmPassword ? <p style={{ marginTop: '10px', fontSize: '14px', color: 'red' }}>Пароли не совпадают</p> : '' }
          <p className={cl.passw}>
            Уже есть аккаунт? <Link to="/login" className={cl.link}>Войти</Link>
          </p>
          <Button type="submit" className={cl.signInButton}>
            Зарегистрироваться
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
