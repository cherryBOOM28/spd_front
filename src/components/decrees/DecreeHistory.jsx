import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import cl from './DecreeHistory.module.css';
import { GoHistory } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import Modal from '../UI/modal/Modal';
import { IoIosArrowDown } from "react-icons/io";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { GiRank2 } from "react-icons/gi";
import { GiRank3 } from "react-icons/gi";
import Loader from '../loader _/Loader ';

function DecreeHistory() {
  const [decreeList, setDecreeList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [transferInfo, setTransferInfo] = useState(null);
  const [rankUp, setRankUp] = useState(null);
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
        console.log("decrees",response.data.decrees)
      } catch (error) {
        console.error('Error fetching decree list:', error);
      }
    };

    fetchDecrees();
  }, []); // Run the effect only once on mount

  const handleWorkerClick = (personId) => {
    // navigate(`/${personId}`) 
  };

  const openModal = async (decreeId, decreeType) => {
    console.log('Decree Type:', decreeType); // Log the decreeType
    setSelectedDecreeId(decreeId);
    setIsModalVisible(true);
  
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      let response;
  
      if (decreeType === 'Перемещение') { // Check for "Перемещение"
        response = await axios.get(`http://127.0.0.1:8000/api/v1/get-transfer-info?decreeId=${decreeId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setTransferInfo(response.data.transferInfo[0]);
        setRankUp(null);
      } else if (decreeType === 'Присвоение звания') { // Check for "Присвоение звания"
        response = await axios.get(`http://127.0.0.1:8000/api/v1/get-rankup-info?decreeId=${decreeId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        setRankUp(response.data.rankUpInfo[0]);
        setTransferInfo(null);
      }
    } catch (error) {
      console.error('Error fetching information:', error);
    }
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmation = async () => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/cancel-transfer/', { decreeId: selectedDecreeId }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log("deleted decree Id", response)
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error confirming transfer cancellation:', error);
    }
  };

  const handleConfirmationRankUp = async () => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/cancel-rankup/', { decreeId: selectedDecreeId }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      console.log("deleted decree Id", response)
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Error confirming transfer cancellation:', error);
    }
  };

  return (
    <div className={cl.container}>
      <h1 className={cl.headline}><GoHistory /> Журнал приказов</h1>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 840 }}>
          <Table className={cl.customTable}>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Вид приказа</TableCell>
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
                  <Button onClick={() => openModal(decree.decreeId, decree.decreeType)}>Откат</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal visible={isModalVisible} setVisible={setIsModalVisible} decreeId={selectedDecreeId}>
        <div className={cl.modal_wrapper}>
          <h2 className={cl.headline} style={{ marginBottom: '35px' }}>Вы уверены в откате приказа?</h2>
          {transferInfo ? (
            <div className={cl.position_wrapper}>
              <Paper className={cl.position_box}>
                <p className={cl.h2}>Новая должность</p>
                <p className={cl.position_text}>
                  <BsFillBriefcaseFill style={{ color: '#1565C0' }} />
                  Департамент: {transferInfo.newPosition.newDepartment}
                </p>
                <p className={cl.position_text}>
                  <BsPersonFill style={{ color: '#1565C0' }} />
                  Должность: {transferInfo.newPosition.newPosition}
                </p>
              </Paper>
              <IoIosArrowDown style={{ fontSize: '30px', color: '#1565C0' }} />
              <Paper className={cl.position_box}>
                <p className={cl.h2}>Предыдущая должность</p>
                <p className={cl.position_text}>
                  <BsFillBriefcaseFill style={{ color: '#1565C0' }} />
                  Департамент: {transferInfo.previousPosition.previousDepartment}
                </p>
                <p className={cl.position_text}>
                  <BsPersonFill style={{ color: '#1565C0' }} />
                  Должность: {transferInfo.previousPosition.previousPosition}
                </p>
              </Paper>
              <div className={cl.btn_wrapper}>
                <Button variant="contained" onClick={handleConfirmation} className={cl.act_btn}>Подтвердить</Button>
                <Button variant="outlined" onClick={closeModal} className={cl.act_btn}>Закрыть</Button>
              </div>
            </div>
          ) : rankUp ? (
            <div className={cl.position_wrapper}>
              <Paper className={cl.position_box}>
                <p className={cl.h2}>Новое звание</p>
                <p className={cl.position_text}>
                  <GiRank3 style={{ color: '#1565C0' }} />
                  {rankUp.newRank}
                </p>
              </Paper>
              <IoIosArrowDown style={{ fontSize: '30px', color: '#1565C0' }} />
              <Paper className={cl.position_box}>
                <p className={cl.h2}>Предыдущее звание</p>
                <p className={cl.position_text}>
                  <GiRank2 style={{ color: '#1565C0' }} />
                  {rankUp.previousRank}
                </p>
              </Paper>
              <div className={cl.btn_wrapper}>
                <Button variant="contained" onClick={handleConfirmationRankUp} className={cl.act_btn}>Подтвердить</Button>
                <Button variant="outlined" onClick={closeModal} className={cl.act_btn}>Закрыть</Button>
              </div>
            </div>
          ) : (
            <div style={{ margin: '45px 0' }}><Loader /></div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default DecreeHistory;
