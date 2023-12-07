import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './LaborActivity.module.css';
import Button from '../../../components/UI/button/Button';
import Cookies from 'js-cookie';

import { getWorkingHistory } from '../../../api/working_history/getWorkingHistotry';
import { deleteWorkingHistory } from '../../../api/working_history/deleteWorkingHistory';
import { UpdateWorkingHistory } from '../../../api/working_history/updateWorkingHistory';

function LaborActivity({ workingHistory, setWorkingHistory }, props) {
    const { id } = useParams();
    // console.log(`id: ${id}`);

    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        positionName: '',
        startDate: '',
        endDate: '',
        department: '',
        organizationName: '',
        organizationAddress: '',
    });

    const handleAddNewData = async (e, id) => {
        e.preventDefault();
        // console.log("Current id:", id); 
        try {
            // if (!inputData.working_start || !inputData.working_end || !inputData.departament || !inputData.jposition || !inputData.orfanization_name || !inputData.organization_addres) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
              personId: id,
              positionName: inputData.positionName,
              startDate: inputData.startDate,
              endDate: inputData.endDate,
              department: inputData.department,
              organizationName: inputData.organizationName,
              organizationAddress: inputData.organizationAddress,
            };

            // console.log(
            //     { newData },
            //     {id}
            // )
            const accessToken = Cookies.get('jwtAccessToken');

            const response = await axios.post('http://localhost:8000/api/v1/working-history/', newData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (response.status === 201) {
                setWorkingHistory(prevData => {
                    // Проверяем, что prevData является объектом и содержит workingHistories
                    if (typeof prevData === 'object' && Array.isArray(prevData.workingHistories)) {
                      return {
                        ...prevData,
                        workingHistories: [...prevData.workingHistories, newData],
                      };
                    } else {
                      console.error("prevData is not an object or does not contain workingHistories");
                      return prevData; // возвращаем prevData без изменений
                    }
                });
                setInputData({
                  personId: id,
                  positionName: '',
                  startDate: '',
                  endDate: '',
                  department: '',
                  organizationName: '',
                  organizationAddress: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            // Вызываем функцию для удаления данных на сервере
            await deleteWorkingHistory(id);
        
            // Обновляем локальное состояние, исключая удаленный объект
            setWorkingHistory(prevData => {
            //   console.log("Type of prevData:", typeof prevData);
        
              // Проверяем, что prevData является объектом и содержит workingHistories
              if (typeof prevData === 'object' && Array.isArray(prevData.workingHistories)) {
                return {
                  ...prevData,
                  workingHistories: prevData.workingHistories.filter(tableData => tableData.id !== id),
                };
              } else {
                // console.error("prevData is not an object or does not contain workingHistories");
                return prevData; // возвращаем prevData без изменений
              }
            });
        
            console.log("Successfully deleted");
          } catch (error) {
            console.error("Error deleting data in table:", error);
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
        positionName: '',
        startDate: '',
        endDate: '',
        department: '',
        organizationName: '',
        organizationAddress: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  personId: id,
                  positionName: editedTableData.positionName,
                  startDate: editedTableData.startDate,
                  endDate: editedTableData.endDate,
                  department: editedTableData.department,
                  organizationName: editedTableData.organizationName,
                  organizationAddress: editedTableData.organizationAddress,
                  isPravoOhranka: editedTableData.isPravoOhranka,
                  HaveCoefficient: editedTableData.HaveCoefficient,
                };

                // console.log("updatedData", {updatedData});

                await UpdateWorkingHistory(id, updatedData);

                setWorkingHistory(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.id === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });
                // console.log(updatedData)

                setEditingId(null);
                setEditedData({
                    id: id,
                    positionName: '',
                    startDate: '',
                    endDate: '',
                    department: '',
                    organizationName: '',
                    organizationAddress: '',
                    isPravoOhranka: '',
                    HaveCoefficient: ''
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = workingHistory.workingHistories.find(tableData => tableData.id === id);
            if(dataToEdit) {
                setEditedData(dataToEdit);
            }
            // console.log(personnelData)
        }
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedData = {
                id: id,
                personId: editedData.personId,
                positionName: editedData.positionName,
                startDate: editedData.startDate,
                endDate: editedData.endDate,
                department: editedData.department,
                organizationName: editedData.organizationName,
                organizationAddress: editedData.organizationAddress,
                isPravoOhranka: editedData.isPravoOhranka,
                HaveCoefficient: editedData.HaveCoefficient,
            };
            // console.log("personId", id);
            // console.log("updatedData", {updatedData});

    
            const response = await UpdateWorkingHistory(id, updatedData);
  
            if (response.status === 200) {
                setWorkingHistory((prevData) => ({
                    ...prevData,
                    workingHistories: prevData.workingHistories.map((tableData) =>
                        tableData.id === id ? updatedData : tableData
                    ),
                }));
                setEditingId(null); // Завершаем режим редактирования
                console.log("Successfully updated table data");
            } else {
                console.error("Error updating table data");
            }
            // console.log(updatedData);
            // window.location.reload();
        } catch (error) {
            console.error('Error updating table data:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
    };

    const handleDownload = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/generate_work_reference/${id}/`, {
            responseType: 'arraybuffer', // Указываем, что ожидаем бинарные данные
          });
    
          // Создаем объект Blob из полученных данных
          const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    
          // Создаем ссылку для скачивания файла
          const url = window.URL.createObjectURL(blob);
    
          // Создаем временную ссылку, добавляем атрибуты и эмулируем клик
          const a = document.createElement('a');
          a.href = url;
          a.download = 'work_reference.docx';
          document.body.appendChild(a);
          a.click();
    
          // Освобождаем ресурсы
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        } catch (error) {
          console.error('Ошибка при скачивании файла', error);
        }
    };
    
    return (
        <div className={cl.totalInfoWrapper}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Трудовая деятельность </p>
            </div>
        </div>
        <div>
            <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={handleShowForm}>Добавить трудовую деятельность </Button>
                <Button onClick={handleDownload}>Скачать данные</Button>
            </div>
                {showForm && (
                    <form onSubmit={(e) => handleAddNewData(e, id)} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                              <tr>   
                                <td>
                                  <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Начало периода"
                                            value={inputData.startDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                startDate: newDate,
                                                }));
                                            }}
                                        />
                                    </div>
                                  </td>
                                  <td>
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Конец периода"
                                            value={inputData.endDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                endDate: newDate,
                                                }));
                                            }}
                                        />
                                    </div>
                                  </td>
                                  <td>
                                      <input
                                          type="text"
                                          className={cl.formInput}
                                          placeholder="Должность"
                                          value={inputData.positionName}
                                          onChange={(e) => setInputData({ ...inputData, positionName: e.target.value })}
                                      />
                                  </td>
                                  <td>
                                      <input
                                          type="text"
                                          className={cl.formInput}
                                          placeholder="Подразделение"
                                          value={inputData.department}
                                          onChange={(e) => setInputData({ ...inputData, department: e.target.value })}
                                      />
                                  </td>
                                  <td>
                                      <input
                                          type="text"
                                          className={cl.formInput}
                                          placeholder="Учреждение"
                                          value={inputData.organizationName}
                                          onChange={(e) => setInputData({ ...inputData, organizationName: e.target.value })}
                                      />
                                  </td>
                                  <td>
                                      <input
                                          type="text"
                                          className={cl.formInput}
                                          placeholder="Местонахождение организации"
                                          value={inputData.organizationAddress}
                                          onChange={(e) => setInputData({ ...inputData, organizationAddress: e.target.value })}
                                      />
                                  </td>
                                  <td><Button type="submit">Добавить</Button></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </form>
                )}
            </div>
            <div>
                <table className={cl.customTable} style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                          <td>Начало периода</td>
                          <td>Конец периода </td>
                          <td>Должность</td>
                          <td>Подразделение</td>
                          <td>Учреждение</td>
                          <td>Местонахожден. организации</td>
                          <td>Коэфициент</td>
                          <td>Правохран. орган</td>
                          <td>Действие</td>
                        </tr>
                    </thead>
                    <tbody>
                        {workingHistory && workingHistory.workingHistories && workingHistory.workingHistories.map((d, i) => (
                            <tr key={i}> 
                                <td>
                                  {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Начало периода"
                                            name='startDate'
                                            value={editedData.startDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setEditedData((prevData) => ({
                                                ...prevData,
                                                startDate: newDate,
                                                }));
                                            }}
                                        />
                                    </div>
                                ) : (
                                    d.startDate
                                )}
                                </td>
                                <td>
                                  {editingId === d.id ? (
                                    <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Конец периода"
                                            name='endDate'
                                            value={editedData.endDate || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setEditedData((prevData) => ({
                                                ...prevData,
                                                endDate: newDate,
                                                }));
                                            }}
                                        />
                                    </div>
                                ) : (
                                    d.endDate
                                )}
                                </td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='department' value={editedData.department} onChange={(e) => setEditedData({ ...editedData, department: e.target.value })} /> : d.department}</td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='positionName' value={editedData.positionName} onChange={(e) => setEditedData({ ...editedData, positionName: e.target.value })} /> : d.positionName}</td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='organizationName' value={editedData.organizationName} onChange={(e) => setEditedData({ ...editedData, organizationName: e.target.value })} /> : d.organizationName}</td>
                                <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='organizationAddress' value={editedData.organizationAddress} onChange={(e) => setEditedData({ ...editedData, organizationAddress: e.target.value })} /> : d.organizationAddress}</td>
                                <td>
                                    {editingId === d.id ? (
                                        <input
                                        type="checkbox"
                                        name="isPravoOhranka"
                                        checked={editedData.isPravoOhranka || false}
                                        onChange={(e) =>
                                            setEditedData((prevData) => ({
                                            ...prevData,
                                            isPravoOhranka: e.target.checked,
                                            }))
                                        }
                                        />
                                    ) : (
                                        d.isPravoOhranka ? "Да" : "Нет"
                                    )}
                                </td>
                                <td>
                                    {editingId === d.id ? (
                                        <input
                                        type="checkbox"
                                        name="HaveCoefficient"
                                        checked={editedData.HaveCoefficient || false}
                                        onChange={(e) =>
                                            setEditedData((prevData) => ({
                                            ...prevData,
                                            HaveCoefficient: e.target.checked,
                                            }))
                                        }
                                        />
                                    ) : (
                                        d.HaveCoefficient ? "Да" : "Нет"
                                    )}
                                </td>
                                <td className={cl.relativesActionBtns} style={{}}>
                                    {editingId === d.id ? (
                                        <>
                                            <div onClick={() => handleSaveEdit(d.id)}>&#10003;</div>
                                            <div onClick={handleCancelEdit}>&#x2715;</div>
                                        </>
                                    ) : (
                                        <>
                                            <div onClick={() => handleEdit(d.id)}>&#9998;</div>
                                            <div onClick={() => handleDelete(d.id)}>Удалить</div>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className={cl.customTable} style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                          <td>Общий стаж</td>
                          <td>Стаж в правохранительных органах</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                            {workingHistory['Overall experience'] && (
                                <div className={cl.experience}>
                                    <p>Год: {workingHistory['Overall experience'].years}</p>
                                    <p>Месяц: {workingHistory['Overall experience'].months}</p>
                                    <p>День: {workingHistory['Overall experience'].days}</p>
                                </div>
                            )}
                            </td>
                            <td>
                                {workingHistory['PravoOhranka experience'] && (
                                    <div className={cl.experience}>
                                        <p>Год: {workingHistory['PravoOhranka experience'].years}</p>
                                        <p>Месяц: {workingHistory['PravoOhranka experience'].months}</p>
                                        <p>День: {workingHistory['PravoOhranka experience'].days}</p>
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

        </div>
    </div>
    );
}

export default LaborActivity;