import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './LaborActivity.module.css';
import Button from '../../../components/UI/button/Button';

import { getWorkingHistory } from '../../../api/working_history/getWorkingHistotry';
import { deleteWorkingHistory } from '../../../api/working_history/deleteWorkingHistory';
import { UpdateWorkingHistory } from '../../../api/working_history/updateWorkingHistory';

function LaborActivity({ workingHistory }, props) {
    const { id } = useParams();
    console.log(`id: ${id}`);
    // const id = props.id;

    const [personnelData, setPersonnelData] = useState([]); // Данные из бэка

    useEffect(() => {
        fetchData()
    }, [])

        const fetchData = async () => {
            try {
                // GET PERSONAL DATA
                const response = await getWorkingHistory(id) 
                setPersonnelData(response.data);
                // console.log(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

            // TABLE DATA

    // ДОБАВЛЕНИЕ НАГРАДЫ
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        working_start: '',
        working_end: '',
        departament_work: '',
        jposition_work: '',
        orfanization_name: '',
        organization_addres: '',
    });

    const handleAddNewData = async (e, id) => {
        e.preventDefault();
        try {
            // if (!inputData.working_start || !inputData.working_end || !inputData.departament || !inputData.jposition || !inputData.orfanization_name || !inputData.organization_addres) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
              iin: props.id,
              working_start: inputData.working_start,
              working_end: inputData.working_end,
              departament_work: inputData.departament_work,
              jposition_work: inputData.jposition_work,
              orfanization_name: inputData.orfanization_name,
              organization_addres: inputData.organization_addres,
            };

            // console.log(
            //     { newData }
            // )

            const response = await axios.post('http://localhost:8000/working_history/create/', newData);

            if (response === 201) {
                // const updatedWorkingHistory = {
                //     ...personnelData,
                //     working_history: [
                //         ...personnelData.working_history,
                //         newData
                //     ]
                // }

                setPersonnelData(prevRecords => [...prevRecords, newData]);
                // setPersonnelData(updatedWorkingHistory);
                setInputData({
                  iin: id,
                  working_start: '',
                  working_end: '',
                  departament_work: '',
                  jposition_work: '',
                  orfanization_name: '',
                  organization_addres: '',
                });
                handleShowForm(false)
            } else {
                console.error('Error adding new data');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // УДАЛЕНИЕ DATA
    const handleDelete = async (id) => {
        try {
            const response = await deleteWorkingHistory(id)
            if (response.status === 200) {
                // Успешно удалено, теперь обновляем состояние
                setPersonnelData(prevData => prevData.filter(tableData => tableData.id !== id));
                // console.log("Successfully deleted");
            } else {
                console.log("Error deleting data in table");
            }
            window.location.reload();
        } catch(error) {
            console.log(error)
        }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
      working_start: '',
      working_end: '',
      departament_work: '',
      jposition_work: '',
      orfanization_name: '',
      organization_addres: '',
    });

    const [editingId, setEditingId] = useState(null);

    const handleEdit = async (id, editedTableData) => {
        if(editingId === id) {
            try {
                const updatedData = {
                  id: id,
                  iin: props.id,
                  working_start: editedTableData.working_start,
                  working_end: editedTableData.working_end,
                  departament_work: editedTableData.departament_work,
                  jposition_work: editedTableData.jposition_work,
                  orfanization_name: editedTableData.orfanization_name,
                  organization_addres: editedTableData.organization_addres,
                };

                await UpdateWorkingHistory(id, updatedData);

                setPersonnelData(prevData => {
                    return prevData.map(tableData => {
                        if(tableData.iin === id) {
                            return {...tableData, ...updatedData}
                        }
                        return tableData;
                    })
                });
                // console.log(updatedData)

                setEditingId(null);
                setEditedData({
                  id: id,
                  working_start: '',
                  working_end: '',
                  departament_work: '',
                  jposition_work: '',
                  orfanization_name: '',
                  organization_addres: '',
                });
                // console.log('Successfully updated table data')
            } catch(error) {
                console.error('Error updating table data:', error);
            }
           
        } else {
            setEditingId(id)
            const dataToEdit = personnelData.find(tableData => tableData.id === id);
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
              iin: props.id,
              working_start: editedData.working_start,
              working_end: editedData.working_end,
              departament_work: editedData.departament_work,
              jposition_work: editedData.jposition_work,
              orfanization_name: editedData.orfanization_name,
              organization_addres: editedData.organization_addres,
            };
            console.log(id);
    
            const response = await UpdateWorkingHistory(id, updatedData);
    
            if (response === 200) {
                setPersonnelData((prevData) =>
                    prevData.map((tableData) => (tableData.id === id ? updatedData : tableData))
                );
                setEditingId(null); // Завершаем режим редактирования
            } else {
                console.log('Error updating table data');
            }
            // console.log(updatedData);
            window.location.reload();
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
                    <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                        <table className={cl.customTable}>
                            <tbody >
                              <tr>   
                                <td>
                                  <div className={cl.datePickerContainer}>
                                        <input
                                            type="date"
                                            className={cl.formInput}
                                            placeholder="Начало периода"
                                            value={inputData.working_start || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                working_start: newDate,
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
                                            value={inputData.working_end || ''}
                                            onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                working_end: newDate,
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
                                          value={inputData.departament_work}
                                          onChange={(e) => setInputData({ ...inputData, departament_work: e.target.value })}
                                      />
                                  </td>
                                  <td>
                                      <input
                                          type="text"
                                          className={cl.formInput}
                                          placeholder="Подразделение"
                                          value={inputData.jposition_work}
                                          onChange={(e) => setInputData({ ...inputData, jposition_work: e.target.value })}
                                      />
                                  </td>
                                  <td>
                                      <input
                                          type="text"
                                          className={cl.formInput}
                                          placeholder="Учреждение"
                                          value={inputData.orfanization_name}
                                          onChange={(e) => setInputData({ ...inputData, orfanization_name: e.target.value })}
                                      />
                                  </td>
                                  <td>
                                      <input
                                          type="text"
                                          className={cl.formInput}
                                          placeholder="Местонахождение организации"
                                          value={inputData.organization_addres}
                                          onChange={(e) => setInputData({ ...inputData, organization_addres: e.target.value })}
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
                          <td>Местонахождение организации</td>
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
            </div>
        </div>
    </div>
    );
}

export default LaborActivity;