import React, { useState } from 'react';
import cl from './NewLaborActivity.module.css';
import Button from '../../../components/UI/button/Button';
import { useForm } from '../formProvider/FormProvider';


const NewLaborActivity = (props) => {
   
    const { workingHistory, setWorkingHistory } = useForm();


    // ДОБАВЛЕНИЕ НАГРАДЫ
    const [showForm, setShowForm] = useState(true);

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {

            // if (!inputData.working_start || !inputData.working_end || !inputData.departament || !inputData.jposition || !inputData.organization_name || !inputData.organization_addres) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
              positionName: inputData.positionName,
              startDate: inputData.startDate,
              endDate: inputData.endDate,
              department: inputData.department,
              organizationName: inputData.organizationName,
              organizationAddress: inputData.organizationAddress,
            };
            // console.log(newData)

            // setLaborActivity((prevArray) => {
            //     // Create a new array by copying the previous array and adding a new element
            //     const updatedArray = [...prevArray, newData];
            //     return updatedArray;
            //   });

            setWorkingHistory((prevArray) => [...prevArray, newData]);

            setInputData(
                {
                positionName: '',
                startDate: '',
                endDate: '',
                department: '',
                organizationName: '',
                organizationAddress: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        positionName: '',
        startDate: '',
        endDate: '',
        department: '',
        organizationName: '',
        organizationAddress: '',
    });

     // eslint-disable-next-line
    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.totalInfoWrapper}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Трудовая деятельность </p>
            </div>
        </div>
        <div>
            <div>
            {/* <Button onClick={handleShowForm}>Добавить трудовую деятельность </Button> */}
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
                                        name='startDate'
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
                                        name='endDate'
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
                                        name='positionName'
                                        value={inputData.positionName}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={cl.formInput}
                                        name='department'
                                        placeholder="Подразделение"
                                        value={inputData.department}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={cl.formInput}
                                        placeholder="Учреждение"
                                        name='organizationName'
                                        value={inputData.organizationName}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={cl.formInput}
                                        name='organizationAddress'
                                        placeholder="Местонахождение организации"
                                        value={inputData.organizationAddress}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td><Button type="submit"  onClick={handleShowForm}>Добавить</Button></td>
                            </tr>
                            
                        </tbody>
                    </table>
                </form>
                {showForm && (
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
                            {workingHistory.slice(1).map((d, i) => (
                                <tr key={i}> 
                                    <td>
                                      {editingId === d.id ? (
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                placeholder="Начало периода"
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
                                    <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.positionName} onChange={(e) => setEditedData({ ...editedData, positionName: e.target.value })} /> : d.positionName}</td>
                                    <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.department} onChange={(e) => setEditedData({ ...editedData, department: e.target.value })} /> : d.department}</td>
                                    <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.organizationName} onChange={(e) => setEditedData({ ...editedData, organizationName: e.target.value })} /> : d.organizationName}</td>
                                    <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.organizationAddress} onChange={(e) => setEditedData({ ...editedData, organizationAddress: e.target.value })} /> : d.organizationAddress}</td>
                                   
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                )}
            </div>
         
        </div>
    </div>
    );
}

export default NewLaborActivity;