import React, {  useEffect, useState} from "react";
import axios from "axios";
import cl from './NotificationButton.module.css';
import { IoNotifications } from "react-icons/io5";
import { useNavigate, useParams  } from "react-router-dom";
import { IoCalendarClear } from "react-icons/io5";

const NotificationButton = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationData, setNotificationData] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    const handleWorkerClick = (personId) => {
        navigate(`/${personId}`) 
    };

    const list = [
      {
        "firstName": "Георгий",
        "surname": "Нефедов",
        "patronymic": "Вячеславович",
        "photo": "465"
      },
      {
        "firstName": "Георгий",
        "surname": "Нефедов",
        "patronymic": "Вячеславович",
        "photo": "465"
    },
    {
      "firstName": "Георгий",
      "surname": "Нефедов",
      "patronymic": "Вячеславович",
      "photo": "465"
  }, {
    "firstName": "Георгий",
    "surname": "Нефедов",
    "patronymic": "Вячеславович",
    "photo": "465"
}, {
  "firstName": "Георгий",
  "surname": "Нефедов",
  "patronymic": "Вячеславович",
  "photo": "465"
},
{
  "firstName": "Георгий",
  "surname": "Нефедов",
  "patronymic": "Вячеславович",
  "photo": "465"
},
    ]

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
        <div className={cl.notification_wrapper}>
          <div
          className={`${cl.notification_container} ${
            showNotifications ? cl.open : ""
          } ${!showNotifications ? cl.closed : ""}`}
        >
           
          <button className={cl.notification_button} onClick={handleNotificationClick}>
            <IoNotifications />
            <div className={cl.count}>
              {notificationData.count}
            </div>
          </button>
          
          {showNotifications && (
            <div className={cl.notification_list}>
              <h2 className={cl.notification_headline}>
                <IoNotifications style={{ color: '#1B3884', fontSize: '30px' }}/>
                Предстоящие повышения
              </h2>
             
              <div
                className={`${cl.scrollable_content} ${
                  notificationData.persons.length > 2 ? cl.scrollable : ""
                }`}
              >
                <ul>
                {notificationData.persons.length > 0 ? (
                      notificationData.persons.map((notification, index) => (
                          <li key={notification.personId}>
                              <div
                                  className={cl.notification_data}
                                  onClick={() => handleWorkerClick(notification.personId)}
                              >
                                  <img
                                      src={`data:image/jpeg;base64,${notification.photo}`}
                                      className={cl.profilePic}
                                      alt="profile pic"
                                  />
                                  <div className={cl.inner_notification_data}>
                                      <div className={cl.box}>
                                          <p className={cl.notification_text}>{notification.firstName}</p>
                                          <p className={cl.notification_text}>{notification.surname}</p>
                                          <p className={cl.notification_text}>{notification.patronymic}</p>
                                      </div>
                                      <div className={cl.box}>
                                          <IoCalendarClear style={{ color: '#707070' }} />
                                          <p className={cl.notification_text}>{notification.rankUpDate}</p>
                                      </div>
                                  </div>
                              </div>
                          </li>
                      ))
                  ) : (
                      <div style={{ width: '221px', padding: '5px 8px 12px', display: 'flex', alignItems: 'center' }}>
                          <p style={{ color: '#585858' }}>Нет предстоящих повышений</p>
                      </div>
                )}

                </ul>
              </div>
            </div>
          )}
          </div>
        </div>
      );
};

export default NotificationButton;