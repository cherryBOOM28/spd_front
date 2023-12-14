import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import cl from './DecreeHistory.module.css';
import { GoHistory } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import Modal from '../UI/modal/Modal';
import { IoIosArrowForward } from "react-icons/io";


function DecreeHistory() {
  const [decreeList, setDecreeList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transferInfo, setTransferInfo] = useState(null);
  const [selectedDecreeId, setSelectedDecreeId] = useState(null);

  const navigate = useNavigate();

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

  const handleWorkerClick = (personId) => {
    // navigate(`/${personId}`) 
  };

  const openModal = (decreeId) => {
    setSelectedDecreeId(decreeId);
    setIsModalVisible(true);
    fetchTransferInfo(decreeId);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const fetchTransferInfo = async (decreeId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/get-transfer-info?decreeId=${decreeId}`);
      setTransferInfo(response.data.transferInfo[0]); // Assuming there is only one transferInfo object
    } catch (error) {
      console.error('Error fetching transfer info:', error);
    }
  };

  

  return (
    <div className={cl.container}>
      <h1 className={cl.headline}><GoHistory /> История приказов</h1>
      {/* <table className={cl.customTable}>
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
            <th></th>

          </tr>
        </thead>
        <tbody>
          {decreeList.map((decree) => (
            <tr key={decree.decreeId} onClick={() => handleWorkerClick(decree.person.id)} className={cl.workerRow}>
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
              <td>
                <Button>Откат</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 840 }}>
          <Table className={cl.customTable}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Вид приказа</TableCell>
                <TableCell>Вид подприказа</TableCell>
                <TableCell>Дата получения</TableCell>
                <TableCell>ИИН</TableCell>
                <TableCell>ФИО</TableCell>
                <TableCell>Должность</TableCell>
                <TableCell>Звание</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {decreeList.map((decree) => (
                <TableRow key={decree.decreeId} onClick={() => handleWorkerClick(decree.person.id)} className={cl.workerRow}>
                  <TableCell><img src={`data:image/jpeg;base64,${decree.person.photo}`} alt="worker" className={cl.workerImg} /></TableCell>
                  <TableCell>{decree.decreeType}</TableCell>
                  <TableCell>{decree.decreeSubType}</TableCell>
                  <TableCell>{decree.decreeDate}</TableCell>
                  <TableCell>{decree.person.iin}</TableCell>
                  <TableCell>
                    <div className={cl.fio}>
                      <div>{decree.person.firstName}</div>
                      <div>{decree.person.surname}</div>
                      <div>{decree.person.patronymic}</div>
                    </div>
                  </TableCell>
                  <TableCell>{decree.person.positionInfo}</TableCell>
                  <TableCell>{decree.person.rankInfo}</TableCell>
                  <TableCell>
                    <Button  onClick={() => openModal(decree.decreeId)}>Откат</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal visible={isModalVisible} setVisible={setIsModalVisible}  decreeId={selectedDecreeId}>
        <div className={cl.modal_wrapper}>
          <h2 className={cl.headline}>Вы уверены в откате приказа?</h2>
          {transferInfo ? (
            <div className={cl.position_wrapper}>
              <div className={cl.position_box}>
                <p>Новая должность</p>
                <p>Департамент: {transferInfo.newPosition.newDepartment}</p>
                <p>Должность: {transferInfo.newPosition.newPosition}</p>
              </div>
              <IoIosArrowForward style={{ fontSize: '30px', color: '#1565C0' }} />
              <div className={cl.position_box}>
                <p>Предыдущая должность</p>
                <p>Департамент: {transferInfo.previousPosition.previousDepartment}</p>
                <p>Должность: {transferInfo.previousPosition.previousPosition}</p>
              </div>
            </div>
          ) : (
            <p>Loading transfer info...</p>
          )}
          <div className={cl.btn_wrapper}>
            <Button variant="contained">Подтвердить</Button>
            <Button variant="outlined" onClick={closeModal}>Закрыть</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DecreeHistory;
