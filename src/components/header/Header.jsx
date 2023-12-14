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


function Header(props) {
    const { id } = useParams();
    //create group
    const [isClicked, setIsClicked] = useState();

    const [ personalData, setPersonalData ] = useState([]);
    const [ selectedIds, setSelectedIds ] = useState([]);
    const [ groupName, setGroupName ] = useState([]);
    const [ photo, setPhoto ] = useState({});
    
    const accessToken = Cookies.get('jwtAccessToken');

    useEffect(() => {

        axios.get(`http://localhost:8000/api/v1/person/`, {
            headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        })
          .then(response => {
            setPersonalData(response.data);
            // console.log("response", response.data)
        })

        // axios.get(`http://localhost:8000/api/v1/person/${id}`)
        //   .then(response => {
        //     setPhoto(response.data)
        //     console.log("response", response.data.Person)
        // })
        .catch(error => {
            // console.error("Error fetching personal data:", error);
        });
    }, []);

    const { user, logout } = useAuth();

    

    const handleGroupOnCheck = (_id) => {
        if (selectedIds.includes(_id)) {
            setSelectedIds(selectedIds.filter(id => id !== _id));
        } else {
            setSelectedIds([...selectedIds, _id]);
        }

        console.log(selectedIds)
    }

    // const handleCreateGroup = async () => {
    //     try {
    //         const data = {
    //             'group_name': groupName,
    //             'general_info': selectedIds,
    //         };
        
    //         // console.log(data)

    //         const response = await axios.post('', data);
        
    //         // console.log('Response:', response.data);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }



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
                        <div className={cl.profile}>
                            {/* <img src={`data:image/jpeg;base64,`} alt="profilePic" /> */}
                            <Link to="/8" className={cl.profileName}>Louisa Sapina </Link>
                        </div>
                        <div>
                            { user ? (
                                <div>
                                    <Link to="/login" className={cl.logout}>Выйти</Link>
                                </div>
                            ) : (
                                <p><Link to="/login" className={cl.logout}>Выйти</Link></p>
                            ) }
                        </div>
                        
                    </div>
                </div>           
            </div>
        </div>
    );
}

export default Header;