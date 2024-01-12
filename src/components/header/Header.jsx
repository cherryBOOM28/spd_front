import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cl from './Header.module.css';
import profilePic from '../../assets/images/pic.svg';
import SearchInput from '../../components/search/SearchInput';
import Modal from '../UI/modal/Modal';
import closeImg from '../../assets/icons/close.svg';
import { Button } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';



function Header() {
    const { id } = useParams();
    //create group
    const [isClicked, setIsClicked] = useState();

    const [ personalData, setPersonalData ] = useState([]);
    const [ selectedIds, setSelectedIds ] = useState([]);
    const [ groupName, setGroupName ] = useState([]);
    const [ photo, setPhoto ] = useState({});
    const [fullName, setFullName] = useState('');

    const navigate = useNavigate();
    
    const accessToken = Cookies.get('jwtAccessToken');
    const userFullName = localStorage.getItem('userFullName');

    useEffect(() => {

        axios.get(`http://localhost:8000/api/v1/person/`, {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        })
          .then(response => {
            setPersonalData(response.data);
            if (response.data && response.data.length > 0) {
                // const photoBinary = response.data[0].photo.photoBinary;
                const surname = response.data[0].surname;
                const firstName = response.data[0].firstName;
        
                // setPhoto(photoBinary);
                setFullName(`${surname} ${firstName}`);
            } else {
                console.error('Данные пользователя не содержат ожидаемых свойств');
            }
        })

        .catch(error => {
            console.error("Error fetching personal data:", error);
        });
    }, []);

    const { user, logout } = useAuth();

    const handleLogout = () => {
        Cookies.remove('jwtAccessToken', { path: '/login' });
        Cookies.remove('jwtRefreshToken', { path: '/login' });
        
        logout();
        navigate('/login')
    }

    const handleGroupOnCheck = (_id) => {
        if (selectedIds.includes(_id)) {
            setSelectedIds(selectedIds.filter(id => id !== _id));
        } else {
            setSelectedIds([...selectedIds, _id]);
        }

        // console.log(selectedIds)
    }

    return (
        <div className={cl.headerWrapper}>
            <div className={cl.container}>
                <div className={cl.headerContent}>
                    <div className={cl.buttons}>
                        <Link to="/create" className={cl.link}>
                            <Button variant="contained">Добавить</Button>
                        </Link>
                        {/* <button  onClick={() => setIsClicked(true)} className={cl.btn}>Создать группу</button> */}
                        <Modal visible={isClicked}>
                           <div className={cl.modal_wrapper}>
                                <div className={cl.closeBtn}>
                                    <img
                                        onClick={() => setIsClicked(false)}
                                        src={closeImg} alt="close"
                                        className={cl.closeImg}
                                    />
                                </div>
                                <p className={cl.create_group_text}>Создание группы</p>
                                <form>
                                    <div className={cl.group_name}>
                                        <label className={cl.label}>Название группы</label>
                                        <input
                                            type="text"
                                            className={cl.workerInfo}
                                            name="firstname"
                                            value={groupName}
                                            onChange={(e) => {
                                                setGroupName(e.target.value);
                                            }}
                                        />
                                        <p style={{ marginTop: '30px' }}>Добавить работников:</p>
                                        <div className={cl.group_list}>
                                            {/* {console.log("ffa", props.personalData)} */}
                                            {personalData.map((data, index) => {
                                                return (
                                                    <div key={index} className={cl.worker}>
                                                        <div className={cl.worker_detail}>
                                                            <div className={cl.worker_info}>
                                                                <p>{data.surname || ''}</p>
                                                                <p>{data.firstname || ''}</p>
                                                                <p>{data.patronymic || ''}</p>
                                                            </div>
                                                            <p>{data.iin_general || ''}</p>
                                                        </div>
                                                        <div>
                                                            <input type="checkbox" onChange={() => handleGroupOnCheck(data.id)}/>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                                        <Button className={cl.addBtn} onClick={(e) => {
                                            e.preventDefault();
                                            // handleCreateGroup();
                                            setIsClicked(false)
                                        }}>Добавить</Button>
                                    </div>
                                </form>
                           </div>
                    
                        </Modal>
                    </div>
                    <div className={cl.headerContentRight}>
                        <SearchInput />
                        {userFullName ?? (
                            <div className={cl.profile}>
                                {/* <img src={`data:image/jpeg;base64,${photo}`} alt="profilePic" className={cl.profileImg} /> */}
                                {/* <Link to="/8" className={cl.profileName}>Louisa Sapina </Link> */}
                                <p className={cl.profileName}>{userFullName}</p>
                            </div>
                        )}
                        <div>
                            { user ? (
                                <div>
                                    <Button variant="text" onClick={handleLogout}>Выйти</Button>
                                    {/* <Link to="/login" className={cl.logout}>Войти</Link> */}
                                </div>
                            ) : (
                                <p>
                                    <Button variant="text" onClick={handleLogout}>Выйти</Button>
                                </p>
                            ) }
                        </div>
                        
                    </div>
                </div>           
            </div>
        </div>
    );
}

export default Header;