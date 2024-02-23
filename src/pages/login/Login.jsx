import cl from './Login.module.css';
import logo from '../../assets/icons/logo-b.png';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import Button from '../../components/UI/button/Button';
import { Button } from '@mui/material';
import axios from 'axios';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import base_url from '../../api/base_url/base_url';
import Cookies from 'js-cookie';



const Login = () => {
    const [formData, setFormData] = useState({
        username: '', 
        password: '', 
    });

    const [rememberMe, setRememberMe] = useState(true);
    const [userFullName, setUserFullName] = useState('');

    useEffect(() => {
        
    }, [formData])

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e, name) => {
        e.preventDefault();
        setFormData({...formData, [name]: e.target.value});
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post(`${base_url}/api/v1/login/`, {
                "username": formData['username'],
                "password": formData['password'],
            });
            console.log(response.data); 
            console.log('Username entered:', formData['username']);
            console.log('Password entered:', formData['password']);
            // Успешный ответ
            const { access, refresh } = response.data;
    
            // Сохранение токенов в куки с помощью js-cookie 
            Cookies.set('jwtAccessToken', access, { expires: 1, path: '/' }); // куки истекут через 1 д
            
            Cookies.set('jwtRefreshToken', refresh, { expires: 1, path: '/' });
           
            console.log("jwtAccessToken",response.data);
            navigate('/');
        } catch (error) {
            // Обработка ошибки
            console.error('Login failed:', error);
    
            if (error.response && error.response.status === 401) {
                setErrorMessage("Неправильный логин или пароль")
                console.error('Server Error:', error.response.data);
                // Обработка ошибки с сервера
            } else {
                console.error('Error:', error.message);
                // Общие ошибки
                setErrorMessage("Произошла ошибка. Пожалуйста, попробуйте еще раз.")
            }
        }
    };

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            handleSubmit(event);
        }
    }
      

    return (
        <div className={cl.loginWrapper}>
            <div className={cl.container}>
                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className={cl.loginForm}>
                    <div className={cl.logo}>
                        <img src={logo} alt="logo" className={cl.logoImg} />
                        {/* <p className={cl.logoText}>Система кадрового учета</p> */}
                    </div>
                    <p className={cl.login}>Вход</p>
                    <InputField 
                        formData={formData} 
                        handleChange={handleChange} 
                        name={'username'} 
                        label={'Пин'} 
                        hint={'Введите пин'}
                    />
                    <InputField 
                        formData={formData} 
                        handleChange={handleChange} 
                        name={'password'} 
                        label={'Пароль'} 
                        hint={'Введите пароль'}
                        isPassword={true}
                    />
                    {errorMessage && <p className={cl.error}>{errorMessage}</p>}
                    {/* <p className={cl.passw}>Забыли пароль?</p> */}
                    <Button variant="contained" style={{ backgroundColor: '#1b3884' }} className={cl.button} onClick={handleSubmit}>Войти</Button>
                </form>
            </div>
        </div>
    );
};

const InputField = ({ name, label, hint, isPassword, formData, handleChange }) => {
    const [showPassword, setShowPassword] = useState(
        isPassword
    );

    return (
        <div className={cl.field}>
            <label htmlFor={name}>{label}</label>
            
            <div>
                <input
                    className={cl.loginInput}
                    placeholder={hint}
                    value={formData[name]}
                    type={showPassword
                                ? 'password'
                                : 'text'}
                    name={name}
                    onChange={(e) => handleChange(e, name)}
                />
                {isPassword 
                    ? (
                        <div className={cl.show_password}> 
                            {
                                !showPassword ?
                                    <AiFillEyeInvisible style={{cursor: 'pointer', color: '#1B3884'}} size={23} onClick={() => {
                                        setShowPassword(prev => !prev)
                                    }}/>
                                :
                                    <AiFillEye style={{cursor: 'pointer', color: '#1B3884'}} size={23} onClick={() => {
                                        setShowPassword(prev => !prev)
                                    }}/>
                            } 
                        </div> 
                    ) : null
                }
            </div>
        </div>
    )
}

export default Login;
