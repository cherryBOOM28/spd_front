import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import cl from './DecreeHistory.module.css';
import { GoHistory } from "react-icons/go";

function DecreeHistory() {
  const [decreeList, setDecreeList] = useState([]);

  useEffect(() => {
    const fetchDecrees = async () => {
      try {
        const accessToken = Cookies.get('jwtAccessToken');

        const response = await axios.get('http://127.0.0.1:8000/api/v1/get-decree-list', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          }
        });
        setDecreeList(response.data.decrees);
      } catch (error) {
        console.error('Error fetching decree list:', error);
      }
    };

    fetchDecrees();
  }, []); // Run the effect only once on mount

  return (
    <div className={cl.container}>
      <h1 className={cl.headline}><GoHistory /> История приказов</h1>
      <table className={cl.customTable}>
        <thead>
          <tr>
            <th></th>
            <th>Вид приказа</th>
            <th>Вид подприказа</th>
            <th>Дата получения</th>
            <th>ИИН</th>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Звание</th>
          </tr>
        </thead>
        <tbody>
          {decreeList.map((decree) => (
            <tr key={decree.decreeId}>
              <td><img src={`data:image/jpeg;base64,${decree.person.photo}`} alt="worker " className={cl.workerImg}/></td>
              <td>{decree.decreeType}</td>
              <td>{decree.decreeSubType}</td>
              <td>{decree.decreeDate}</td>
              <td>{decree.person.iin}</td>
              <td>
                <div  className={cl.fio}>
                  <div>
                    {decree.person.firstName}
                  </div>
                  <div>
                    {decree.person.surname}
                  </div>
                  <div>
                    {decree.person.patronymic}
                  </div>
                </div>
              </td>
              <td>{decree.person.positionInfo}</td>
              <td>{decree.person.rankInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DecreeHistory;
