import React, {  useEffect, useState} from "react";
import axios from "axios";
import cl from './NotificationButton.module.css';
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NotificationButton = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationData, setNotificationData] = useState([]);

    const navigate = useNavigate();

    const handleWorkerClick = (personId) => {
        // navigate(`/${personId}`) 
    };

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/get-rank-up-info/`);
                setNotificationData(response.data);
                setShowNotifications(true);
                // console.log("NotificationButton",response);
            } catch (error) {
                console.log("Error", error);
            }
        }    
        fetchNotifications();
    }, []);

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
    }


    

    return (
        <div className={`${cl.notification_container} ${showNotifications ? cl.open : ''} ${!showNotifications ? cl.closed : ''}`}>
            <button className={cl.notification_button} onClick={handleNotificationClick}>
                <IoNotifications />
            </button>
            {showNotifications && (
                <div className={cl.notification_list}>
                    <h2 className={cl.notification_headline}>
                        <IoNotifications />
                        Предстоящие повышения
                    </h2>
                    <p className={cl.paragraph}>Количество людей: {notificationData.count}</p>
                    <ul>
                        {notificationData.persons.map((notification, index) => (
                            <li key={index}>
                                <div className={cl.notification_data} onClick={() => handleWorkerClick(notification.id)} >
                                    <img 
                                        src={`data:image/jpeg;base64,${notification.photo}`} 
                                        className={cl.profilePic} 
                                        alt="profile pic" 
                                    />
                                    <p className={cl.notification_text}>{notification.firstName}</p>
                                    <p className={cl.notification_text}>{notification.surname}</p>
                                    <p className={cl.notification_text}>{notification.patronymic}</p>

                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    )
};

export default NotificationButton;