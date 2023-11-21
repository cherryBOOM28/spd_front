// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cl from './Login.module.css';
// import logo from '../../assets/icons/logo.svg';
// import Button from '../../components/UI/button/Button';
// import axios from 'axios';

// // import axios from 'axios';
// // import Cookies from 'js-cookie';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
    
//     const navigate = useNavigate();
    
//     const handleSubmit = async(event) => {
//         event.preventDefault();

//         try {
//             const loginData = {
//                 username,
//                 password
//             };

//             const response = await axios.post('http://localhost:8000/api/token/', loginData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log("response", loginData);

//             if(response === 200) {
//                 const token = response.data.token;

//                 localStorage.setItem('token', token);
//                 navigate('/');
//             } else {
//                 console.log("Error with Login");
//             }
//         } catch(error) {
//             console.log(error);
//         };
//     };


    
//     return (
//         <div className={cl.loginWrapper}>
//             <div className={cl.container}>
//                 <form onSubmit={handleSubmit} className={cl.loginForm}>
//                     <div className={cl.logo}>
//                         <img src={logo} alt="logo" className={cl.logoImg} />
//                         <p className={cl.logoText}>Система кадрового учета</p>
//                     </div>
//                     <p className={cl.login}>Вход</p>
//                     <input 
//                         className={cl.loginInput} 
//                         value={username} 
//                         onChange={(e) => setUsername(e.target.value)}
//                         type="text" 
//                         name="username"
//                         required={true} 
//                         placeholder="Пин" 
//                     />
//                     <input 
//                         className={cl.loginInput} 
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         type="password" 
//                         name="password"
//                         required={true} 
//                         placeholder="Пароль" 
//                     />
//                     <p className={cl.passw}>Забыли пароль?</p>
//                     <Button className={cl.button} onClick={handleSubmit}>Войти</Button>
                   
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;


import cl from './Login.module.css';
import logo from '../../assets/icons/logo.svg';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

import Button from '../../components/UI/button/Button';
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

    useEffect(() => {
        
    }, [formData])

    const [errorMessage,
        setErrorMessage] = useState('');
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
    
            // Успешный ответ
            const { access, refresh } = response.data;
    
            // Сохранение токенов в куки с помощью js-cookie
            Cookies.set('jwtAccessToken', access, { expires: 1, path: '/' }); // куки истекут через 1 дней
            Cookies.set('jwtRefreshToken', refresh, { expires: 1, path: '/' });
    
            console.log("jwtAccessToken",response.data);
            navigate('/');
        } catch (error) {
            // Обработка ошибки
            console.error('Login failed:', error);
    
            if (error.response) {
                console.error('Server Error:', error.response.data);
                // Обработка ошибки с сервера
            } else if (error.request) {
                console.error('Request Error:', error.request);
                // Проблемы с отправкой запроса
            } else {
                console.error('Error:', error.message);
                // Общие ошибки
            }
        }
    };
      

    return (
        <div className={cl.loginWrapper}>
            <div className={cl.container}>
                <form onSubmit={handleSubmit} className={cl.loginForm}>
                    <div className={cl.logo}>
                        <img src={logo} alt="logo" className={cl.logoImg} />
                        <p className={cl.logoText}>Система кадрового учета</p>
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
                    <p className={cl.passw}>Забыли пароль?</p>
                    <Button className={cl.button} onClick={handleSubmit}>Войти</Button>
                   
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
                                    <AiFillEyeInvisible style={{cursor: 'pointer'}} size={23} onClick={() => {
                                        setShowPassword(prev => !prev)
                                    }}/>
                                :
                                    <AiFillEye style={{cursor: 'pointer'}} size={23} onClick={() => {
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
