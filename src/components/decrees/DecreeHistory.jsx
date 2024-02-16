import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import cl from './DecreeHistory.module.css';
import { GoHistory } from "react-icons/go";
import { Paper, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Select, MenuItem } from '@mui/material';
import Modal from '../UI/modal/Modal';
import { IoIosArrowDown } from "react-icons/io";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { BsFillBriefcaseFill } from "react-icons/bs";
import { GiRank3 } from "react-icons/gi";
import { FaCheck } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import ChildModal from '../UI/childModal/ChildModal';
import { IoMdInformationCircleOutline } from "react-icons/io";


function DecreeHistory() {
  const [decreeList, setDecreeList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDecreeId, setSelectedDecreeId] = useState(null);
  const [decreeInfo, setDecreeInfo] = useState([]);
  const [selectedDecreeType, setSelectedDecreeType] = useState(''); // Состояние для отслеживания выбранного вида приказа
  const [ searchText, setSearchText ] = useState('');
  const [ showClearBtn, setShowClearBtn ] = useState(false);
  const [filteredDecreesList, setFilteredDecreesList] = useState([]);

  const [isChildModalVisible, setIsChildModalVisible] = useState(false);
  const [selectedPersonIndex, setSelectedPersonIndex] = useState(null);

  // const [filteredDecrees, setFilteredDecrees] = useState([]);


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
        console.log(response.data.decrees);

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

  // child modal
  const handleOpenChildModal = (index) => {
    setSelectedPersonIndex(index);
    setIsChildModalVisible(true);
  };

  const handleCloseChildModal = () => {
    setIsChildModalVisible(false);
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

  
  const filteredDecrees = () => {
    const filteredDecrees = selectedDecreeType
      ? decreeList.filter((decree) => {
          const trimmedSelectedDecreeType = selectedDecreeType.trim();
          const trimmedDecreeType = decree.decreeType.trim();

          if (trimmedSelectedDecreeType === "Все приказы") {
            return true;
          }

          return trimmedDecreeType === trimmedSelectedDecreeType;
        })
      : decreeList;

    setFilteredDecreesList(filteredDecrees); // Установка отфильтрованных приказов в состояние
  };
  useEffect(() => {
    filteredDecrees();
  }, [selectedDecreeType, decreeList]);
  

  const handleInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase(); // Приводим введенный текст к нижнему регистру
    setSearchText(inputValue);
  
    // Фильтруем список приказов на основе введенного текста
    const filtered = decreeList.filter((decree) => {
      const fullName = `${decree.person.surname} ${decree.person.firstName} ${decree.person.patronymic}`.toLowerCase(); // Собираем ФИО из данных приказа и приводим к нижнему регистру
      // console.log('Filtered full names:', fullName);
      return fullName.includes(inputValue); // Проверяем включает ли ФИО в себя введенный текст
    });
  
    setFilteredDecreesList(filtered);
  };
  
  const handleClearClick = () => {
    setSearchText('');
    setShowClearBtn(false);
  };


  return (
    <div className={cl.container}>
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '25px', marginBottom: '25px' }}>
        <div className={cl.filters}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px'}}>
              <FaFilter style={{ color: '#1565C0', fontSize: '20px' }} />
              {/* Выпадающий список для выбора вида приказа */}
              <Select
                labelId="decreeTypeLabel"
                id="decreeTypeSelect"
                value={selectedDecreeType}
                placeholder='Вид приказа'
                className={cl.select_type}
                onChange={(e) => setSelectedDecreeType(e.target.value)}
              >
                <MenuItem value="" disabled>Выберите вид приказа</MenuItem>
                <MenuItem value="Все приказы">Все приказы</MenuItem>
                <MenuItem value="Назначение">Приказ о назначении</MenuItem>
                <MenuItem value="Перемещение">Приказ о перемещении</MenuItem>
                <MenuItem value="Присвоение звания">Присвоение звания</MenuItem>
              </Select>
            </div>

            <div className={cl.searchWrapper}>
              <RiSearchLine className={cl.searchIcon} />
              <input
                type="text"
                className={cl.search__input}
                placeholder="Введите ФИО"
                value={searchText}
                onChange={handleInputChange} 
                onKeyPress={handleInputChange}
              />
              {showClearBtn && (
                <button className={cl.clearBtn} onClick={handleClearClick}>
                  &#x2715;
                </button>
              )}
            </div>
        </div>
        <h1 className={cl.headline}><GoHistory style={{ color: '#1565C0' }} /> Журнал приказов</h1>
      </div>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 840 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Вид приказа</TableCell>
                <TableCell>Дата получения</TableCell>
                <TableCell>ФИО</TableCell>
                <TableCell>Должность</TableCell>
                <TableCell>Звание</TableCell>
                <TableCell>Согласование</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDecreesList.map((decree, decreeIndex) => (
                decree.forms.map((person, personIndex) => (
                  <TableRow key={personIndex}>
                    {personIndex === 0 && ( // Проверяем первого человека в списке, чтобы выводить данные о приказе только один раз
                      <>
                        <TableCell rowSpan={decree.forms.length}>{decree.decreeType}</TableCell>
                        <TableCell rowSpan={decree.forms.length}>{decree.decreeDate}</TableCell>
                      </>
                    )}
                    <TableCell>{`${person.person.surname} ${person.person.firstName} ${person.person.patronymic}`}</TableCell>
                    <TableCell>{person.person.positionInfo ? person.person.positionInfo.position.positionTitle : 'Нет информации о должности'}</TableCell>
                    <TableCell>{person.person.rankInfo ? person.person.rankInfo.militaryRank.rankTitle : 'Нет звания'}</TableCell>
                    {personIndex === 0 && ( // Проверяем первого человека в списке, чтобы выводить данные о приказе только один раз
                      <>
                        <TableCell rowSpan={decree.forms.length}>
                          {decree.decreeIsConfirmed ? (
                            <div style={{ color: '#2E7D32', display: 'flex', alignItems: 'center', gap: '5px' }}> <FaCheck />Согласовано</div>
                          ) : (
                            <Button onClick={() => openModal(decree.decreeId)} style={{ textTransform: 'none' }}>Согласовать</Button>
                          )}
                        </TableCell>
                      </>
                    )}
                    
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
  
      <Modal visible={isModalVisible} setVisible={setIsModalVisible} decreeId={selectedDecreeId}>
        <div className={cl.modal_wrapper}>
          <h2 className={cl.headline} style={{ marginBottom: '35px' }}>Согласование приказа</h2>
          <div>

            {decreeInfo.transferInfo && decreeInfo.transferInfo.map((info, decreeIndex) => (
              <div className={cl.form_wrapper} key={decreeIndex}>
                <div className={cl.worker_info}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '25px' }}>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Вид приказа</label>
                          {info.decreeInfo.decreeType}
                        </Paper>
                      </div>
                     
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Дата приказа</label>
                          {info.decreeInfo.decreeDate}
                        </Paper>
                      </div>

                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Номер приказа</label>
                          {info.decreeInfo.decreeNumber}
                        </Paper>
                      </div>
                    </div>

                    {info.decreeInfo.person && info.decreeInfo.person.map((personInfo, personIndex) => (
                      <div key={personIndex}>
                         <div  className={cl.childModalBtnWrapper}>
                            <Button 
                              onClick={() => handleOpenChildModal(personIndex)} 
                              variant="contained"
                              className={cl.childModalBtn}
                              style={{ textTransform: 'none', marginBottom: '10px' }}
                            >   
                                <IoMdInformationCircleOutline style={{ fontSize: '18px' }} />
                                <div>
                                  <p style={{ margin: 0 }}>{personInfo.surname} {personInfo.firstName}</p>
                                </div>
                            </Button>
                            <div></div>
                          </div>
                            {isChildModalVisible && selectedPersonIndex === personIndex &&
                              <ChildModal visibleChild={isChildModalVisible} setVisibleChild={setIsChildModalVisible}>
                                  <div className={cl.worker_info}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                     
                                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                                          <div className={cl.worker_info_fio}>
                                            <Paper className={cl.info_text_3}>
                                              <div style={{ display: 'flex', gap: '8px' }}>
                                                <p>{personInfo.surname}</p>
                                                <p>{personInfo.firstName}</p>
                                                <p>{personInfo.patronymic}</p>
                                              </div>
                                            </Paper>
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', gap: '10px'  }}>
                                              <div className={cl.info_text_block}>
                                                <Paper  className={cl.info_text_4}>
                                                  <label className={cl.label}>ПИН</label>
                                                  {personInfo.pin}
                                                </Paper>
                                              </div>
                                              <div className={cl.info_text_block}>
                                                <Paper  className={cl.info_text_4}>
                                                  <label className={cl.label_4}>Звание</label>
                                                  {personInfo.rankInfo ? personInfo.rankInfo : "Нет звания"}
                                                </Paper>
                                              </div>
                                            </div>
                                            <div className={cl.info_text_block}>
                                              <Paper  className={cl.info_text_3}>
                                                <label className={cl.label_3}>Должность</label>
                                                {personInfo.positionInfo.position.positionTitle}
                                              </Paper>
                                            </div>
                                          </div>

                                          
                                      </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                      <div className={cl.info_text_block}>
                                        <Paper  className={cl.info_text_3}>
                                          <label className={cl.label_3}>Департамент</label>
                                          {personInfo.positionInfo.department.DepartmentName}
                                        </Paper>
                                      </div>

                                      <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '40px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                                          <BsFillBriefcaseFill style={{ color: '#1976D2', fontSize: '20px' }} />
                                          <p className={cl.headline_2}>Предыдущяя должность</p>
                                        </div>
                                          <div className={cl.info_text_block}>
                                            <Paper  className={cl.info_text_3}>
                                              <label className={cl.label_3}>Департамент</label>
                                              {personInfo.previousPosition.previousDepartment}
                                            </Paper>
                                          </div>
                                          <div className={cl.info_text_block}>
                                            <Paper  className={cl.info_text_3}>
                                              <label className={cl.label_3}>Должность</label>
                                              {personInfo.previousPosition.previousPosition}
                                            </Paper>
                                          </div>
                                      </div>

                                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        <IoIosArrowDown style={{ fontSize: '28px', color: '#1565C0' }} />
                                      </div>

                                      <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                                          <BsFillBriefcaseFill style={{ color: '#1976D2', fontSize: '20px' }} />
                                          <p className={cl.headline_2}>Новая должность</p>
                                        </div>
                                        <div className={cl.info_text_block}>
                                          <Paper  className={cl.info_text_3}>
                                            <label className={cl.label_3}>Департамент</label>
                                            {personInfo.newPosition.newDepartment}
                                          </Paper>
                                        </div>
                                        <div className={cl.info_text_block}>
                                          <Paper  className={cl.info_text_3}>
                                            <label className={cl.label_3}>Новая должность</label>
                                            {personInfo.newPosition.newPosition}
                                          </Paper>
                                        </div>
                                      </div>

                                    </div>
                                  </div>
                              </ChildModal>
                            }
                      </div>
                    ))}

                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%' }} onClick={() => handleConfirmation(info.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
     
              </div>
            ))}

            {decreeInfo.appointmentInfo && decreeInfo.appointmentInfo.map((info, decreeIndex) => (
              <div className={cl.form_wrapper} key={decreeIndex}>
                <div className={cl.worker_info}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '25px' }}>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Вид приказа</label>
                          {info.decreeInfo.decreeType}
                        </Paper>
                      </div>
                     
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Дата приказа</label>
                          {info.decreeInfo.decreeDate}
                        </Paper>
                      </div>

                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Номер приказа</label>
                          {info.decreeInfo.decreeNumber}
                        </Paper>
                      </div>
                    </div>

                    {info.decreeInfo.person && info.decreeInfo.person.map((personInfo, personIndex) => (
                      <div key={personIndex}>
                         <div  className={cl.childModalBtnWrapper}>
                            <Button 
                              onClick={() => handleOpenChildModal(personIndex)} 
                              variant="contained"
                              className={cl.childModalBtn}
                              style={{ textTransform: 'none', marginBottom: '10px' }}
                            >
                               <img src={`data:image/jpeg;base64,${personInfo.photo}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                                <div>
                                  <p style={{ margin: 0 }}>{personInfo.surname} {personInfo.firstName}</p>
                                </div>
                            </Button>
                            <div></div>
                          </div>
                            {isChildModalVisible && selectedPersonIndex === personIndex &&
                              <ChildModal visibleChild={isChildModalVisible} setVisibleChild={setIsChildModalVisible}>
                                  <div className={cl.worker_info}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <div>
                                        <img src={`data:image/jpeg;base64,${personInfo.photo}`} alt=""  className={cl.workerPic} />
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                                          <div className={cl.worker_info_fio}>
                                            <Paper className={cl.info_text_long}>
                                              <div style={{ display: 'flex', gap: '8px' }}>
                                                <p>{personInfo.surname}</p>
                                                <p>{personInfo.firstName}</p>
                                                <p>{personInfo.patronymic}</p>
                                              </div>
                                            </Paper>
                                          </div>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <div style={{ display: 'flex', gap: '10px'  }}>
                                              <div className={cl.info_text_block}>
                                                <Paper  className={cl.info_text}>
                                                  <label className={cl.label}>ПИН</label>
                                                  {personInfo.pin}
                                                </Paper>
                                              </div>
                                              <div className={cl.info_text_block}>
                                                <Paper  className={cl.info_text}>
                                                  <label className={cl.label}>Звание</label>
                                                  {personInfo.rankInfo ? personInfo.rankInfo : "Нет звания"}
                                                </Paper>
                                              </div>
                                            </div>
                                            <div className={cl.info_text_block}>
                                              <Paper  className={cl.info_text_2}>
                                                <label className={cl.label_2}>Должность</label>
                                                {personInfo.positionInfo.position.positionTitle}
                                              </Paper>
                                            </div>
                                          </div>

                                          
                                      </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                      <div className={cl.info_text_block}>
                                        <Paper  className={cl.info_text_3}>
                                          <label className={cl.label_3}>Департамент</label>
                                          {personInfo.positionInfo.department.DepartmentName}
                                        </Paper>
                                      </div>

                                      <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                                          <BsFillBriefcaseFill style={{ color: '#1976D2', fontSize: '20px' }} />
                                          <p className={cl.headline_2}>Новая должность</p>
                                        </div>
                                        <div className={cl.info_text_block}>
                                          <Paper  className={cl.info_text_3}>
                                            <label className={cl.label_3}>Департамент</label>
                                            {personInfo.newPosition.newDepartment}
                                          </Paper>
                                        </div>
                                        <div className={cl.info_text_block}>
                                          <Paper  className={cl.info_text_3}>
                                            <label className={cl.label_3}>Новая должность</label>
                                            {personInfo.newPosition.newPosition}
                                          </Paper>
                                        </div>
                                        <div className={cl.info_text_block}>
                                          <Paper  className={cl.info_text_3}>
                                            <label className={cl.label_3}>Тип назначения</label>
                                            {personInfo.newPosition.appointmentType}
                                          </Paper>
                                        </div>
                                        {personInfo.newPosition.appointmentType !== 'Вновь принятый' && (
                                          <div className={cl.info_text_block}>
                                            <Paper  className={cl.info_text_3}>
                                              <label className={cl.label_3}>Испытательный срок</label>
                                              {personInfo.newPosition.probationMonthCount}
                                            </Paper>
                                          </div>
                                        )}
                                        
                                      </div>

                                    </div>
                                  </div>
                              </ChildModal>
                            }
                      </div>
                    ))}

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
                      {info.decreeInfo.person.positionInfo.position.positionTitle}
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
