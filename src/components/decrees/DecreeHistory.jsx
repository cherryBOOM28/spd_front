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
import { ImUserMinus } from "react-icons/im";
import { RiExchangeBoxFill } from "react-icons/ri";
import { BsFillSuitcase2Fill } from "react-icons/bs";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCalendarNumber } from "react-icons/io5";



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
      if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.error || 'Неизвестная ошибка';
      NotificationManager.error(errorMessage, 'Ошибка', 3000);
      } else {
          NotificationManager.error('Произошла ошибка', 'Ошибка', 3000);
      }
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
      return decree.forms.some((form) => {
          if (form.person) {
              const fullName = `${form.person.surname} ${form.person.firstName} ${form.person.patronymic}`.toLowerCase();
              return fullName.includes(inputValue);
          }
          return false; // Если объект person не существует
      });
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
              <FaFilter style={{ color: '#1B3884', fontSize: '20px' }} />
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
                <MenuItem value="Командировка">Командировка</MenuItem>
                <MenuItem value="Увольнение">Увольнение</MenuItem>
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
        <h1 className={cl.headline}><GoHistory  /> Журнал приказов</h1>
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
                            <Button onClick={() => openModal(decree.decreeId)} style={{ textTransform: 'none', color: '#1b3884' }}>Согласовать</Button>
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

            {decreeInfo && decreeInfo.transferInfo && decreeInfo.transferInfo.decreeInfo && (
              <div className={cl.form_wrapper}>
              <div className={cl.worker_info}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '25px' }}>
                    <div className={cl.info_text_block}>
                      <Paper className={cl.info_text_2}>
                        <label className={cl.label_2}>Вид приказа</label>
                        {decreeInfo.transferInfo.decreeInfo.decreeType}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper className={cl.info_text_2}>
                        <label className={cl.label_2}>Дата приказа</label>
                        {decreeInfo.transferInfo.decreeInfo.decreeDate}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                      <Paper className={cl.info_text_2}>
                        <label className={cl.label_2}>Номер приказа</label>
                        {decreeInfo.transferInfo.decreeInfo.decreeNumber}
                      </Paper>
                    </div>
                    <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Основание</label>
                          {decreeInfo.transferInfo.decreeInfo.bases.map((base, index, array) => (
                              <React.Fragment key={index}>
                                  {base}
                                  {index !== array.length - 1 && ", "} {/* Вставляем запятую и пробел после каждого слова, кроме последнего */}
                              </React.Fragment>
                          ))}
                        </Paper>
                      </div>
                  </div>
            
                  {/* Проверяем наличие данных о лице в приказе */}
                  {decreeInfo.transferInfo && decreeInfo.transferInfo.decreeInfo && decreeInfo.transferInfo.decreeInfo.forms && decreeInfo.transferInfo.decreeInfo.forms.map((personInfo, personIndex) => (
                    <div key={personIndex}>
                      <div className={cl.childModalBtnWrapper}>
                        <Button 
                          onClick={() => handleOpenChildModal(personIndex)} 
                          variant="contained"
                          className={cl.childModalBtn}
                          style={{ textTransform: 'none', marginBottom: '10px', backgroundColor: '#1b3884' }}
                        >
                          {/* Выводим фото и данные о лице */}
                          <img src={`data:image/jpeg;base64,${personInfo.person.photo.photoBinary}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <p style={{ margin: 0 }}>{personInfo.person.surname} {personInfo.person.firstName}</p>
                          </div>
                        </Button>
                      </div>

                      {/* Отображаем модальное окно с информацией о лице, если оно видимо */}
                      {isChildModalVisible && selectedPersonIndex === personIndex && (
                        <ChildModal visibleChild={isChildModalVisible} setVisibleChild={setIsChildModalVisible}>
                          <div className={cl.worker_info}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <div>
                                {/* Выводим фото */}
                                <img className={cl.workerPic} src={`data:image/jpeg;base64,${personInfo.person.photo?.photoBinary}`} alt=""  />
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>

                                <div className={cl.worker_info_fio}>
                                  <Paper className={cl.info_text_long}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                      {/* Выводим ФИО */}
                                      <p>{personInfo.person.surname}</p>
                                      <p>{personInfo.person.firstName}</p>
                                      <p>{personInfo.person.patronymic}</p>
                                    </div>
                                  </Paper>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  <div style={{ display: 'flex', gap: '10px' }}>
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text}>
                                        <label className={cl.label}>ПИН</label>
                                        {personInfo.person.pin}
                                      </Paper>
                                    </div>
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text}>
                                        <label className={cl.label}>Звание</label>
                                        {/* Выводим звание */}
                                        {personInfo.person.rankInfo ? personInfo.person.rankInfo.rankTitle : "Нет звания"}
                                      </Paper>
                                    </div>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_3}>
                                      <label className={cl.label_3}>Должность</label>
                                      {/* Выводим должность */}
                                      {personInfo.person.positionInfo.position.positionTitle}
                                    </Paper>
                                  </div>
                                </div>
                              </div>
                              </div>

                              <div className={cl.info_text_block}>
                                <Paper className={cl.info_text_4}>
                                  <label className={cl.label_4}>Департамент</label>
                                  {/* Выводим информацию о департаменте */}
                                  {personInfo.person.positionInfo.department.DepartmentName}
                                </Paper>
                              </div>
                            

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                              

                            <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '40px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                                <BsFillBriefcaseFill style={{ color: '#1b3884', fontSize: '20px' }} />
                                <p className={cl.headline_2}>Предыдущяя должность</p>
                              </div>
                                <div className={cl.info_text_block}>
                                  <Paper  className={cl.info_text_4}>
                                    <label className={cl.label_4}>Департамент</label>
                                    {personInfo.previousPosition.previousDepartment}
                                  </Paper>
                                </div>
                                <div className={cl.info_text_block}>
                                  <Paper  className={cl.info_text_4}>
                                    <label className={cl.label_4}>Должность</label>
                                    {personInfo.previousPosition.previousPosition}
                                  </Paper>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                              <IoIosArrowDown style={{ fontSize: '28px', color: '#1B3884' }} />
                            </div>

                            <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                                <BsFillBriefcaseFill style={{ color: '#1b3884', fontSize: '20px' }} />
                                <p className={cl.headline_2}>Новая должность</p>
                              </div>
                              <div className={cl.info_text_block}>
                                <Paper  className={cl.info_text_4}>
                                  <label className={cl.label_4}>Департамент</label>
                                  {personInfo.newPosition.newDepartment}
                                </Paper>
                              </div>
                              <div className={cl.info_text_block}>
                                <Paper  className={cl.info_text_4}>
                                  <label className={cl.label_4}>Новая должность</label>
                                  {personInfo.newPosition.newPosition}
                                </Paper>
                              </div>
                            </div>


                            </div>
                          </div>
                        </ChildModal>
                      )}
                    </div>
                  ))}

            
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                    <Button variant="contained" style={{ width: '100%', backgroundColor: '#1b3884' }} onClick={() => handleConfirmation(decreeInfo.transferInfo.decreeInfo.decreeId)}>Согласовать</Button>
                    <Button variant="outlined" style={{ width: '100%', color: '#1b3884', borderColor: '#1b3884' }} onClick={closeModal}>Отменить</Button>
                  </div>
                </div>
              </div>
              </div>
            )}

            {decreeInfo && decreeInfo.appointmentInfo && decreeInfo.appointmentInfo.decreeInfo && (
              <div className={cl.form_wrapper}>
                <div className={cl.worker_info}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '25px' }}>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Вид приказа</label>
                          {decreeInfo.appointmentInfo.decreeInfo.decreeType}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Дата приказа</label>
                          {decreeInfo.appointmentInfo.decreeInfo.decreeDate}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Номер приказа</label>
                          {decreeInfo.appointmentInfo.decreeInfo.decreeNumber}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Основание</label>
                          {decreeInfo.appointmentInfo.decreeInfo.bases.map((base, index, array) => (
                              <React.Fragment key={index}>
                                  {base}
                                  {index !== array.length - 1 && ", "} {/* Вставляем запятую и пробел после каждого слова, кроме последнего */}
                              </React.Fragment>
                          ))}
                        </Paper>
                      </div>
                    </div>
              
                    {/* Проверяем наличие данных о лице в приказе */}
                    {decreeInfo.appointmentInfo && decreeInfo.appointmentInfo.decreeInfo && decreeInfo.appointmentInfo.decreeInfo.forms && decreeInfo.appointmentInfo.decreeInfo.forms.map((personInfo, personIndex) => (
                      <div key={personIndex}>
                        <div className={cl.childModalBtnWrapper}>
                          <Button 
                            onClick={() => handleOpenChildModal(personIndex)} 
                            variant="contained"
                            className={cl.childModalBtn}
                            style={{ textTransform: 'none', marginBottom: '10px', backgroundColor: '#1b3884' }}
                          >
                            {/* Выводим фото и данные о лице */}
                            <img src={`data:image/jpeg;base64,${personInfo.person.photo.photoBinary}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <p style={{ margin: 0 }}>{personInfo.person.surname} {personInfo.person.firstName}</p>
                            </div>
                          </Button>
                        </div>

                        {/* Отображаем модальное окно с информацией о лице, если оно видимо */}
                        {isChildModalVisible && selectedPersonIndex === personIndex && (
                          <ChildModal visibleChild={isChildModalVisible} setVisibleChild={setIsChildModalVisible}>
                            <div className={cl.worker_info}>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <div>
                                  {/* Выводим фото */}
                                  <img className={cl.workerPic} src={`data:image/jpeg;base64,${personInfo.person.photo?.photoBinary}`} alt=""  />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                  <div className={cl.worker_info_fio}>
                                    <Paper className={cl.info_text_long}>
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        {/* Выводим ФИО */}
                                        <p>{personInfo.person.surname}</p>
                                        <p>{personInfo.person.firstName}</p>
                                        <p>{personInfo.person.patronymic}</p>
                                      </div>
                                    </Paper>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>ПИН</label>
                                          {personInfo.person.pin}
                                        </Paper>
                                      </div>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>Звание</label>
                                          {/* Выводим звание */}
                                          {personInfo.person.rankInfo ? personInfo.person.rankInfo.rankTitle : "Нет звания"}
                                        </Paper>
                                      </div>
                                    </div>
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text_3}>
                                        <label className={cl.label_3}>Должность</label>
                                        {/* Выводим должность */}
                                        {personInfo.person.positionInfo.position.positionTitle}
                                      </Paper>
                                    </div>
                                  </div>
                                </div>
                                </div>

                                <div className={cl.info_text_block}>
                                  <Paper className={cl.info_text_4}>
                                    <label className={cl.label_4}>Департамент</label>
                                    {/* Выводим информацию о департаменте */}
                                    {personInfo.person.positionInfo.department.DepartmentName}
                                  </Paper>
                                </div>
                              

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                                    <BsFillBriefcaseFill style={{ color: '#1b3884', fontSize: '20px' }} />
                                    <p className={cl.headline_2}>Новая должность</p>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Департамент</label>
                                      {/* Выводим новый департамент */}
                                      {personInfo.newDepartment}
                                    </Paper>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Новая должность</label>
                                      {/* Выводим новую должность */}
                                      {personInfo.newPosition}
                                    </Paper>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Тип назначения</label>
                                      {/* Выводим тип назначения */}
                                      {personInfo.appointmentType}
                                    </Paper>
                                  </div>
                                  {/* Проверяем, если тип назначения не "Вновь принятый", и отображаем испытательный срок */}
                                  {personInfo.appointmentType !== 'Вновь принятый' && (
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text_4}>
                                        <label className={cl.label_4}>Испытательный срок</label>
                                        {/* Выводим информацию об испытательном сроке */}
                                        {personInfo.probationMonthCount}
                                      </Paper>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </ChildModal>
                        )}
                      </div>
                    ))}

              
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%', backgroundColor: '#1b3884' }} onClick={() => handleConfirmation(decreeInfo.appointmentInfo.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%', color: '#1b3884', borderColor: '#1b3884' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {decreeInfo && decreeInfo.rankUpInfo && decreeInfo.rankUpInfo.decreeInfo && (
              <div className={cl.form_wrapper}>
                <div className={cl.worker_info}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '25px' }}>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Вид приказа</label>
                          {decreeInfo.rankUpInfo.decreeInfo.decreeType}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Дата приказа</label>
                          {decreeInfo.rankUpInfo.decreeInfo.decreeDate}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Номер приказа</label>
                          {decreeInfo.rankUpInfo.decreeInfo.decreeNumber}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Основание</label>
                          {decreeInfo.rankUpInfo.decreeInfo.bases.map((base, index, array) => (
                              <React.Fragment key={index}>
                                  {base}
                                  {index !== array.length - 1 && ", "} {/* Вставляем запятую и пробел после каждого слова, кроме последнего */}
                              </React.Fragment>
                          ))}
                        </Paper>
                      </div>
                    </div>
              
                    {decreeInfo.rankUpInfo && decreeInfo.rankUpInfo.decreeInfo && decreeInfo.rankUpInfo.decreeInfo.forms && decreeInfo.rankUpInfo.decreeInfo.forms.map((personInfo, personIndex) => (
                      <div key={personIndex}>
                        <div className={cl.childModalBtnWrapper}>
                          <Button 
                            onClick={() => handleOpenChildModal(personIndex)} 
                            variant="contained"
                            className={cl.childModalBtn}
                            style={{ textTransform: 'none', marginBottom: '10px', backgroundColor: '#1b3884' }}
                          >
                            {/* Выводим фото и данные о лице */}
                            <img src={`data:image/jpeg;base64,${personInfo.person.photo.photoBinary}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <p style={{ margin: 0 }}>{personInfo.person.surname} {personInfo.person.firstName}</p>
                            </div>
                          </Button>
                        </div>

                        {/* Отображаем модальное окно с информацией о лице, если оно видимо */}
                        {isChildModalVisible && selectedPersonIndex === personIndex && (
                          <ChildModal visibleChild={isChildModalVisible} setVisibleChild={setIsChildModalVisible}>
                            <div className={cl.worker_info}>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <div>
                                  {/* Выводим фото */}
                                  <img className={cl.workerPic} src={`data:image/jpeg;base64,${personInfo.person.photo?.photoBinary}`} alt=""  />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                  <div className={cl.worker_info_fio}>
                                    <Paper className={cl.info_text_long}>
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        {/* Выводим ФИО */}
                                        <p>{personInfo.person.surname}</p>
                                        <p>{personInfo.person.firstName}</p>
                                        <p>{personInfo.person.patronymic}</p>
                                      </div>
                                    </Paper>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>ПИН</label>
                                          {personInfo.person.pin}
                                        </Paper>
                                      </div>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>Звание</label>
                                          {/* Выводим звание */}
                                          {personInfo.person.rankInfo ? personInfo.person.rankInfo.rankTitle : "Нет звания"}
                                        </Paper>
                                      </div>
                                    </div>
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text_3}>
                                        <label className={cl.label_3}>Должность</label>
                                        {/* Выводим должность */}
                                        {personInfo.person.positionInfo.position.positionTitle}
                                      </Paper>
                                    </div>
                                  </div>
                                </div>
                                </div>

                                <div className={cl.info_text_block}>
                                  <Paper className={cl.info_text_4}>
                                    <label className={cl.label_4}>Департамент</label>
                                    {/* Выводим информацию о департаменте */}
                                    {personInfo.person.positionInfo.department.DepartmentName}
                                  </Paper>
                                </div>
                              

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                                  <div style={{ display: 'flex',   flexDirection: 'column', gap: '10px', marginTop: '0px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
                                      <GiRank3 style={{ color: '#1b3884', fontSize: '20px' }} />
                                      <p className={cl.headline_2}>Новое звание</p>
                                    </div>
                                    <div className={cl.info_text_block}>
                                      <Paper  className={cl.info_text_2}>
                                        <label className={cl.label_2}>Новое звание</label>
                                        {personInfo.newRank}
                                      </Paper>
                                    </div>
                                    <div className={cl.info_text_block}>
                                      <Paper  className={cl.info_text_2}>
                                        <label className={cl.label_2}>Предыдущее звание</label>
                                        {personInfo.previousRank}
                                      </Paper>
                                    </div>
                                  </div>
                                  </div>
                              </div>
                            </div>
                          </ChildModal>
                        )}
                      </div>
                    ))}

              
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%', backgroundColor: '#1b3884' }} onClick={() => handleConfirmation(decreeInfo.rankUpInfo.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%', color: '#1b3884', borderColor: '#1b3884' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {decreeInfo && decreeInfo.firingInfo && decreeInfo.firingInfo.decreeInfo && (
              <div className={cl.form_wrapper}>
                <div className={cl.worker_info}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '25px' }}>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Вид приказа</label>
                          {decreeInfo.firingInfo.decreeInfo.decreeType}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Дата приказа</label>
                          {decreeInfo.firingInfo.decreeInfo.decreeDate}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Номер приказа</label>
                          {decreeInfo.firingInfo.decreeInfo.decreeNumber}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Основание</label>
                          {decreeInfo.firingInfo.decreeInfo.bases.map((base, index, array) => (
                              <React.Fragment key={index}>
                                  {base}
                                  {index !== array.length - 1 && ", "} {/* Вставляем запятую и пробел после каждого слова, кроме последнего */}
                              </React.Fragment>
                          ))}
                        </Paper>
                      </div>
                    </div>
              
                    {/* Проверяем наличие данных о лице в приказе */}
                    {decreeInfo.firingInfo && decreeInfo.firingInfo.decreeInfo && decreeInfo.firingInfo.decreeInfo.forms && decreeInfo.firingInfo.decreeInfo.forms.map((personInfo, personIndex) => (
                      <div key={personIndex}>
                        <div className={cl.childModalBtnWrapper}>
                          <Button 
                            onClick={() => handleOpenChildModal(personIndex)} 
                            variant="contained"
                            className={cl.childModalBtn}
                            style={{ textTransform: 'none', marginBottom: '10px', backgroundColor: '#1b3884' }}
                          >
                            {/* Выводим фото и данные о лице */}
                            <img src={`data:image/jpeg;base64,${personInfo.person.photo.photoBinary}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <p style={{ margin: 0 }}>{personInfo.person.surname} {personInfo.person.firstName}</p>
                            </div>
                          </Button>
                        </div>

                        {/* Отображаем модальное окно с информацией о лице, если оно видимо */}
                        {isChildModalVisible && selectedPersonIndex === personIndex && (
                          <ChildModal visibleChild={isChildModalVisible} setVisibleChild={setIsChildModalVisible}>
                            <div className={cl.worker_info}>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <div>
                                  {/* Выводим фото */}
                                  <img className={cl.workerPic} src={`data:image/jpeg;base64,${personInfo.person.photo?.photoBinary}`} alt=""  />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                  <div className={cl.worker_info_fio}>
                                    <Paper className={cl.info_text_long}>
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        {/* Выводим ФИО */}
                                        <p>{personInfo.person.surname}</p>
                                        <p>{personInfo.person.firstName}</p>
                                        <p>{personInfo.person.patronymic}</p>
                                      </div>
                                    </Paper>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>ПИН</label>
                                          {personInfo.person.pin}
                                        </Paper>
                                      </div>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>Звание</label>
                                          {/* Выводим звание */}
                                          {personInfo.person.rankInfo.militaryRank ? personInfo.person.rankInfo.militaryRank.rankTitle : "Нет звания"}
                                        </Paper>
                                      </div>
                                    </div>
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text_3}>
                                        <label className={cl.label_3}>Должность</label>
                                        {/* Выводим должность */}
                                        {personInfo.person.positionInfo.position.positionTitle}
                                      </Paper>
                                    </div>
                                  </div>
                                </div>
                                </div>

                                <div className={cl.info_text_block}>
                                  <Paper className={cl.info_text_4}>
                                    <label className={cl.label_4}>Департамент</label>
                                    {/* Выводим информацию о департаменте */}
                                    {personInfo.person.positionInfo.department.DepartmentName}
                                  </Paper>
                                </div>
                              

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                                    <ImUserMinus style={{ color: '#1b3884', fontSize: '20px' }} />
                                    <p className={cl.headline_2}>Дата увольнения</p>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Дата увольнения</label>
                                      {personInfo.firingDate}
                                    </Paper>
                                  </div>
                                 
                                 
                                </div>
                              </div>
                            </div>
                          </ChildModal>
                        )}
                      </div>
                    ))}
                   
                    
              
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%', backgroundColor: '#1b3884' }} onClick={() => handleConfirmation(decreeInfo.firingInfo.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%', color: '#1b3884', borderColor: '#1B3884' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {decreeInfo && decreeInfo.komandirovka_info && decreeInfo.komandirovka_info.decreeInfo && (
              <div className={cl.form_wrapper}>
                <div className={cl.worker_info}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '25px' }}>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Вид приказа</label>
                          {decreeInfo.komandirovka_info.decreeInfo.decreeType}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Дата приказа</label>
                          {decreeInfo.komandirovka_info.decreeInfo.decreeDate}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Номер приказа</label>
                          {decreeInfo.komandirovka_info.decreeInfo.decreeNumber}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Основание</label>
                          {decreeInfo.komandirovka_info.decreeInfo.bases.map((base, index, array) => (
                              <React.Fragment key={index}>
                                  {base}
                                  {index !== array.length - 1 && ", "} {/* Вставляем запятую и пробел после каждого слова, кроме последнего */}
                              </React.Fragment>
                          ))}
                        </Paper>
                      </div>
                    </div>
              
                    {/* Проверяем наличие данных о лице в приказе */}
                    {decreeInfo.komandirovka_info && decreeInfo.komandirovka_info.decreeInfo && decreeInfo.komandirovka_info.decreeInfo.forms && decreeInfo.komandirovka_info.decreeInfo.forms.map((personInfo, personIndex) => (
                      <div key={personIndex}>
                        <div className={cl.childModalBtnWrapper}>
                          <Button 
                            onClick={() => handleOpenChildModal(personIndex)} 
                            variant="contained"
                            className={cl.childModalBtn}
                            style={{ textTransform: 'none', marginBottom: '10px', backgroundColor: '#1b3884'  }}
                          >
                            {/* Выводим фото и данные о лице */}
                            <img src={`data:image/jpeg;base64,${personInfo.person.photo.photoBinary}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <p style={{ margin: 0 }}>{personInfo.person.surname} {personInfo.person.firstName}</p>
                            </div>
                          </Button>
                        </div>

                        {/* Отображаем модальное окно с информацией о лице, если оно видимо */}
                        {isChildModalVisible && selectedPersonIndex === personIndex && (
                          <ChildModal visibleChild={isChildModalVisible} setVisibleChild={setIsChildModalVisible}>
                            <div className={cl.worker_info}>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <div>
                                  {/* Выводим фото */}
                                  <img className={cl.workerPic} src={`data:image/jpeg;base64,${personInfo.person.photo?.photoBinary}`} alt=""  />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                  <div className={cl.worker_info_fio}>
                                    <Paper className={cl.info_text_long}>
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        {/* Выводим ФИО */}
                                        <p>{personInfo.person.surname}</p>
                                        <p>{personInfo.person.firstName}</p>
                                        <p>{personInfo.person.patronymic}</p>
                                      </div>
                                    </Paper>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>ПИН</label>
                                          {personInfo.person.pin}
                                        </Paper>
                                      </div>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>Звание</label>
                                          {/* Выводим звание */}
                                          {personInfo.person.rankInfo.militaryRank ? personInfo.person.rankInfo.militaryRank.rankTitle : "Нет звания"}
                                        </Paper>
                                      </div>
                                    </div>
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text_3}>
                                        <label className={cl.label_3}>Должность</label>
                                        {/* Выводим должность */}
                                        {personInfo.person.positionInfo.position.positionTitle}
                                      </Paper>
                                    </div>
                                  </div>
                                </div>
                                </div>

                                <div className={cl.info_text_block}>
                                  <Paper className={cl.info_text_4}>
                                    <label className={cl.label_4}>Департамент</label>
                                    {/* Выводим информацию о департаменте */}
                                    {personInfo.person.positionInfo.department.DepartmentName}
                                  </Paper>
                                </div>
                              

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                                    <RiExchangeBoxFill style={{ color: '#1b3884', fontSize: '20px' }} />
                                    <p className={cl.headline_2}>Информация о командировке</p>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Дата начала</label>
                                      {personInfo.startDate}
                                    </Paper>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Дата конца</label>
                                      {personInfo.endDate}
                                    </Paper>
                                  </div>

                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Департамент</label>
                                      {personInfo.departure}
                                    </Paper>
                                  </div>
                                 
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Выбор поездки</label>
                                      {personInfo.travelChoice}
                                    </Paper>
                                  </div>

                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Транспорт</label>
                                      {personInfo.transport}
                                    </Paper>
                                  </div>
                                 
                                </div>


                              </div>
                            </div>
                          </ChildModal>
                        )}
                      </div>
                    ))}
                   
                    
              
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%', backgroundColor: '#1b3884'  }} onClick={() => handleConfirmation(decreeInfo.komandirovka_info.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%', color: '#1b3884', borderColor: '#1b3884' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {decreeInfo && decreeInfo.otpuskData && decreeInfo.otpuskData.decreeInfo && (
              <div className={cl.form_wrapper}>
                <div className={cl.worker_info}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', marginBottom: '25px' }}>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Вид приказа</label>
                          {decreeInfo.otpuskData.decreeInfo.decreeType}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Дата приказа</label>
                          {decreeInfo.otpuskData.decreeInfo.decreeDate}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Номер приказа</label>
                          {decreeInfo.otpuskData.decreeInfo.decreeNumber}
                        </Paper>
                      </div>
                      <div className={cl.info_text_block}>
                        <Paper className={cl.info_text_2}>
                          <label className={cl.label_2}>Основание</label>
                          {decreeInfo.otpuskData.decreeInfo.bases.map((base, index, array) => (
                              <React.Fragment key={index}>
                                  {base}
                                  {index !== array.length - 1 && ", "} {/* Вставляем запятую и пробел после каждого слова, кроме последнего */}
                              </React.Fragment>
                          ))}
                        </Paper>
                      </div>
                    </div>
              
                    {/* Проверяем наличие данных о лице в приказе */}
                    {decreeInfo.otpuskData && decreeInfo.otpuskData.decreeInfo && decreeInfo.otpuskData.decreeInfo.forms && decreeInfo.otpuskData.decreeInfo.forms.map((personInfo, personIndex) => (
                      <div key={personIndex}>
                        <div className={cl.childModalBtnWrapper}>
                          <Button 
                            onClick={() => handleOpenChildModal(personIndex)} 
                            variant="contained"
                            className={cl.childModalBtn}
                            style={{ textTransform: 'none', marginBottom: '10px', backgroundColor: '#1b3884' }}
                          >
                            {/* Выводим фото и данные о лице */}
                            <img src={`data:image/jpeg;base64,${personInfo.person.photo.photoBinary}`} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                              <p style={{ margin: 0 }}>{personInfo.person.surname} {personInfo.person.firstName}</p>
                            </div>
                          </Button>
                        </div>

                        {/* Отображаем модальное окно с информацией о лице, если оно видимо */}
                        {isChildModalVisible && selectedPersonIndex === personIndex && (
                          <ChildModal visibleChild={isChildModalVisible} setVisibleChild={setIsChildModalVisible}>
                            <div className={cl.worker_info}>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <div>
                                  {/* Выводим фото */}
                                  <img className={cl.workerPic} src={`data:image/jpeg;base64,${personInfo.person.photo?.photoBinary}`} alt=""  />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>

                                  <div className={cl.worker_info_fio}>
                                    <Paper className={cl.info_text_long}>
                                      <div style={{ display: 'flex', gap: '8px' }}>
                                        {/* Выводим ФИО */}
                                        <p>{personInfo.person.surname}</p>
                                        <p>{personInfo.person.firstName}</p>
                                        <p>{personInfo.person.patronymic}</p>
                                      </div>
                                    </Paper>
                                  </div>

                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>ПИН</label>
                                          {personInfo.person.pin}
                                        </Paper>
                                      </div>
                                      <div className={cl.info_text_block}>
                                        <Paper className={cl.info_text}>
                                          <label className={cl.label}>Звание</label>
                                          {/* Выводим звание */}
                                          {personInfo.person.rankInfo.militaryRank ? personInfo.person.rankInfo.militaryRank.rankTitle : "Нет звания"}
                                        </Paper>
                                      </div>
                                    </div>
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text_3}>
                                        <label className={cl.label_3}>Должность</label>
                                        {/* Выводим должность */}
                                        {personInfo.person.positionInfo.position.positionTitle}
                                      </Paper>
                                    </div>
                                  </div>
                                </div>
                                </div>

                                <div className={cl.info_text_block}>
                                  <Paper className={cl.info_text_4}>
                                    <label className={cl.label_4}>Департамент</label>
                                    {/* Выводим информацию о департаменте */}
                                    {personInfo.person.positionInfo.department.DepartmentName}
                                  </Paper>
                                </div>
                              

                              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
                                    <BsFillSuitcase2Fill style={{ color: '#1b3884', fontSize: '20px' }} />
                                    <p className={cl.headline_2}>Информация об отпуске</p>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Вид отпуска</label>
                                      {personInfo.otpuskType}
                                    </Paper>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Дата начала</label>
                                      {personInfo.startDate}
                                    </Paper>
                                  </div>
                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Дата конца</label>
                                      {personInfo.endDate}
                                    </Paper>
                                  </div>

                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Пособие</label>
                                      {personInfo.benefitChoice}
                                    </Paper>
                                  </div>
                                 
                                  {personInfo.otpuskType === 'Отпуск Отзыв' && (
                                    <div className={cl.info_text_block}>
                                      <Paper className={cl.info_text_4}>
                                        <label className={cl.label_4}>Дата отзыва</label>
                                        {personInfo.otzivDate}
                                      </Paper>
                                    </div>
                                  )}

                                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px', marginTop: '20px' }}>
                                    <IoCalendarNumber style={{ color: '#1b3884', fontSize: '20px' }} />
                                    <p className={cl.headline_2}>Значения отпускных дней</p>
                                  </div>

                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Календарные дни</label>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        {personInfo.oldBasicDaysCount} 
                                        <IoIosArrowRoundForward  style={{ fontSize: '20px' }} />
                                        {personInfo.newBasicDaysCount} 
                                      </div>
                                    </Paper>
                                  </div>

                                  <div className={cl.info_text_block}>
                                    <Paper className={cl.info_text_4}>
                                      <label className={cl.label_4}>Отпускные дни за выслуги лет</label>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        {personInfo.oldExperienceDaysCount} 
                                        <IoIosArrowRoundForward  style={{ fontSize: '20px' }}  />
                                        {personInfo.newExperienceDaysCount} 
                                      </div>
                                    </Paper>
                                  </div>

                                </div>

                              </div>
                            </div>
                          </ChildModal>
                        )}
                      </div>
                    ))}
              
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', marginTop: '20px' }}>
                      <Button variant="contained" style={{ width: '100%', backgroundColor: '#1b3884'  }} onClick={() => handleConfirmation(decreeInfo.otpuskData.decreeInfo.decreeId)}>Согласовать</Button>
                      <Button variant="outlined" style={{ width: '100%', color: '#1b3884', borderColor: '#1b3884' }} onClick={closeModal}>Отменить</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </Modal>
      <NotificationContainer />
    </div>
  );
}

export default DecreeHistory;
