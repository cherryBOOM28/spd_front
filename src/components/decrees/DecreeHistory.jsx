import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import cl from './DecreeHistory.module.css';
import { GoHistory } from "react-icons/go";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import Modal from '../UI/modal/Modal';
import { IoIosArrowDown } from "react-icons/io";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { BsFillBriefcaseFill } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
import { GiRank2 } from "react-icons/gi";
import { GiRank3 } from "react-icons/gi";
import Loader from '../loader _/Loader ';
import { FaCheck } from "react-icons/fa6";

function DecreeHistory() {
  const [decreeList, setDecreeList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDecreeId, setSelectedDecreeId] = useState(null);
  const [decreeInfo, setDecreeInfo] = useState([]);

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
        // console.log("decrees",response.data.decrees)
      } catch (error) {
        console.error('Error fetching decree list:', error);
      }
    };

    fetchDecrees();
  }, []); // Run the effect only once on mount

  const handleWorkerClick = () => {
    // navigate(`/${personId}`) 
  };

  const openModal = async (decreeId) => {
    setIsModalVisible(true);
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/get-decree-info/?decreeId=${decreeId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      setDecreeInfo(response.data)
      console.log("deleted decree Id", response.data)
      // closeModal();
      // window.location.reload();
    } catch (error) {
      console.error('Error confirming transfer cancellation:', error);
    }
  };
  
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirmation = async (decreeId) => {
    try {
      const accessToken = Cookies.get('jwtAccessToken');
      const response = await axios.post('http://127.0.0.1:8000/api/v1/confirm-decree/', { decreeId }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

       // Update the local state or data structure with the confirmation status
        const updatedDecreeList = decreeList.map((decree) =>
        decree.decreeId === decreeId ? { ...decree, decreeIsConfirmed: true } : decree
        );
        setDecreeList(updatedDecreeList);

      console.log("deleted decree Id", response)
      closeModal();
      NotificationManager.success('Приказ успешно согласован!', 'Успех', 3000)
      // window.location.reload();
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
                <TableCell>Согласование</TableCell>
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
                    {decree.decreeIsConfirmed ? (
                      <div style={{ color: '#2E7D32', display: 'flex', alignItems: 'center', gap: '5px' }}> <FaCheck />Согласовано</div>
                    ) : (
                      <Button onClick={() => openModal(decree.decreeId)} style={{ textTransform: 'none' }}>Согласовать</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal visible={isModalVisible} setVisible={setIsModalVisible} decreeId={selectedDecreeId}>
        <div className={cl.modal_wrapper}>
          <h2 className={cl.headline} style={{ marginBottom: '35px' }}>Согласование приказа</h2>
          <div>
            {decreeInfo.transferInfo && decreeInfo.transferInfo.map((info) => (
              <div className={cl.form_wrapper} key={info.decreeInfo.decreeId}>
                <div className={cl.worker_info}>
                  <div>
                    <img src={`data:image/jpeg;base64,${info.decreeInfo.person.photo}`} alt=""  className={cl.workerPic} />
                  </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className={cl.worker_info_fio}>
                        <Paper className={cl.info_text_long}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <p>{info.decreeInfo.person.surname}</p>
                            <p>{info.decreeInfo.person.firstName}</p>
                            <p>{info.decreeInfo.person.patronymic}</p>
                          </div>
                        </Paper>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div className={cl.info_text_block}>
                            <Paper className={cl.info_text_long}>
                              <label className={cl.label}>ИИН</label>
                              {info.decreeInfo.person.iin}
                            </Paper>
                          </div>
                          <div style={{ display: 'flex', gap: '10px'  }}>
                            <div className={cl.info_text_block}>
                              <Paper  className={cl.info_text}>
                                <label className={cl.label}>ПИН</label>
                                {info.decreeInfo.person.pin}
                              </Paper>
                            </div>
                            <div className={cl.info_text_block}>
                              <Paper  className={cl.info_text}>
                                <label className={cl.label}>Звание</label>
                                {info.decreeInfo.person.rankInfo}
                              </Paper>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
                <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Вид приказа</label>
                      {info.decreeInfo.decreeType}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Номер приказа</label>
                      {info.decreeInfo.decreeNumber}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Дата приказа</label>
                      {info.decreeInfo.decreeDate}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Должность</label>
                      {info.decreeInfo.person.positionInfo}
                    </Paper>
                  </div>
                </div>
                <div style={{ marginTop: '30px',  }}>
                  <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                      <BsFillBriefcaseFill style={{ color: '#1976D2', fontSize: '20px' }} />
                      <p className={cl.headline_2}>Предыдущяя должность</p>
                    </div>
                      <div className={cl.info_text_block}>
                        <Paper  className={cl.info_text_2}>
                          <label className={cl.label_2}>Департамент</label>
                          {info.previousPosition.previousDepartment}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper  className={cl.info_text_2}>
                          <label className={cl.label_2}>Должность</label>
                          {info.previousPosition.previousPosition}
                        </Paper>
                      </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <IoIosArrowDown style={{ fontSize: '28px', color: '#1565C0' }} />
                  </div>
                  <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '0px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                      <BsFillBriefcaseFill style={{ color: '#1976D2', fontSize: '20px' }} />
                      <p className={cl.headline_2}>Новая должность</p>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Департамент</label>
                        {info.newPosition.newDepartment}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Новая должность</label>
                        {info.newPosition.newPosition}
                      </Paper>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%' }} onClick={() => handleConfirmation(info.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {decreeInfo.appointmentInfo && decreeInfo.appointmentInfo.map((info) => (
              <div className={cl.form_wrapper} key={info.decreeInfo.decreeId}>
                <div className={cl.worker_info}>
                  <div>
                    <img src={`data:image/jpeg;base64,${info.decreeInfo.person.photo}`} alt=""  className={cl.workerPic} />
                  </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className={cl.worker_info_fio}>
                        <Paper className={cl.info_text_long}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <p>{info.decreeInfo.person.surname}</p>
                            <p>{info.decreeInfo.person.firstName}</p>
                            <p>{info.decreeInfo.person.patronymic}</p>
                          </div>
                        </Paper>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div className={cl.info_text_block}>
                            <Paper className={cl.info_text_long}>
                              <label className={cl.label}>ИИН</label>
                              {info.decreeInfo.person.iin}
                            </Paper>
                          </div>
                          <div style={{ display: 'flex', gap: '10px'  }}>
                            <div className={cl.info_text_block}>
                              <Paper  className={cl.info_text}>
                                <label className={cl.label}>ПИН</label>
                                {info.decreeInfo.person.pin}
                              </Paper>
                            </div>
                            <div className={cl.info_text_block}>
                              <Paper  className={cl.info_text}>
                                <label className={cl.label}>Звание</label>
                                {info.decreeInfo.person.rankInfo}
                              </Paper>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
                <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Вид приказа</label>
                      {info.decreeInfo.decreeType}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Номер приказа</label>
                      {info.decreeInfo.decreeNumber}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Дата приказа</label>
                      {info.decreeInfo.decreeDate}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Должность</label>
                      {info.decreeInfo.person.positionInfo}
                    </Paper>
                  </div>
                </div>
                <div style={{ marginTop: '30px',  }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  </div>
                  <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '0px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                      <BsFillBriefcaseFill style={{ color: '#1976D2', fontSize: '20px' }} />
                      <p className={cl.headline_2}>Новая должность</p>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Департамент</label>
                        {info.newPosition.newDepartment}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Новая должность</label>
                        {info.newPosition.newPosition}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Испытательный срок</label>
                        {info.newPosition.probationMonthCount}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Основание</label>
                        {info.newPosition.base}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Вид назначения</label>
                        {info.newPosition.appointmentType}
                      </Paper>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%' }} onClick={() => handleConfirmation(info.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {decreeInfo.rankUpInfo && decreeInfo.rankUpInfo.map((info) => (
              <div className={cl.form_wrapper} key={info.decreeInfo.decreeId}>
                <div className={cl.worker_info}>
                  <div>
                    <img src={`data:image/jpeg;base64,${info.decreeInfo.person.photo}`} alt=""  className={cl.workerPic} />
                  </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <div className={cl.worker_info_fio}>
                        <Paper className={cl.info_text_long}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <p>{info.decreeInfo.person.surname}</p>
                            <p>{info.decreeInfo.person.firstName}</p>
                            <p>{info.decreeInfo.person.patronymic}</p>
                          </div>
                        </Paper>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div className={cl.info_text_block}>
                            <Paper className={cl.info_text_long}>
                              <label className={cl.label}>ИИН</label>
                              {info.decreeInfo.person.iin}
                            </Paper>
                          </div>
                          <div style={{ display: 'flex', gap: '10px'  }}>
                            <div className={cl.info_text_block}>
                              <Paper  className={cl.info_text}>
                                <label className={cl.label}>ПИН</label>
                                {info.decreeInfo.person.pin}
                              </Paper>
                            </div>
                            <div className={cl.info_text_block}>
                              <Paper  className={cl.info_text}>
                                <label className={cl.label}>Звание</label>
                                {info.decreeInfo.person.rankInfo}
                              </Paper>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
                <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Вид приказа</label>
                      {info.decreeInfo.decreeType}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Номер приказа</label>
                      {info.decreeInfo.decreeNumber}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Дата приказа</label>
                      {info.decreeInfo.decreeDate}
                    </Paper>
                  </div>
                  <div className={cl.info_text_block}>
                    <Paper  className={cl.info_text_2}>
                      <label className={cl.label_2}>Должность</label>
                      {info.decreeInfo.person.positionInfo}
                    </Paper>
                  </div>
                </div>
                <div style={{ marginTop: '30px',  }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  </div>
                  <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '0px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                      <GiRank3 style={{ color: '#1976D2', fontSize: '20px' }} />
                      <p className={cl.headline_2}>Новое звание</p>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Новое звание</label>
                        {info.newRank}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper  className={cl.info_text_2}>
                        <label className={cl.label_2}>Предыдущее звание</label>
                        {info.previousRank}
                      </Paper>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%' }} onClick={() => handleConfirmation(info.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </Modal>
      <NotificationContainer />
    </div>
  );
}

export default DecreeHistory;
