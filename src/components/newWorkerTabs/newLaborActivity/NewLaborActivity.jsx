import React, { useState } from 'react';
import cl from './NewLaborActivity.module.css';
import Button from '../../../components/UI/button/Button';
import { useForm } from '../formProvider/FormProvider';


const NewLaborActivity = (props) => {
   
    const {laborActivity, setLaborActivity} = useForm();


    // ДОБАВЛЕНИЕ НАГРАДЫ
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        working_start: '',
        working_end: '',
        departament_work: '',
        jposition: '',
        orfanization_name: '',
        organization_addres: '',
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
              working_start: inputData.working_start,
              working_end: inputData.working_end,
              departament_work: inputData.departament_work,
              jposition_work: inputData.jposition_work,
              orfanization_name: inputData.orfanization_name,
              organization_addres: inputData.organization_addres,
            };
            // console.log(newData)

            // setLaborActivity((prevArray) => {
            //     // Create a new array by copying the previous array and adding a new element
            //     const updatedArray = [...prevArray, newData];
            //     return updatedArray;
            //   });

              setLaborActivity((prevArray) => [...prevArray, newData]);

            setInputData(
                {
                working_start: '',
                working_end: '',
                departament_work: '',
                jposition_work: '',
                orfanization_name: '',
                organization_addres: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
      working_start: '',
      working_end: '',
      departament_work: '',
      jposition_work: '',
      orfanization_name: '',
      organization_addres: '',
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
                                        name='working_start'
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
                                        name='working_end'
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
                                        name='departament_work'
                                        value={inputData.departament_work}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={cl.formInput}
                                        name='jposition_work'
                                        placeholder="Подразделение"
                                        value={inputData.jposition_work}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={cl.formInput}
                                        placeholder="Учреждение"
                                        name='orfanization_name'
                                        value={inputData.orfanization_name}
                                        onChange={handleInputChange}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className={cl.formInput}
                                        name='organization_addres'
                                        placeholder="Местонахождение организации"
                                        value={inputData.organization_addres}
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
                            {laborActivity.slice(1).map((d, i) => (
                                <tr key={i}> 
                                    <td>
                                      {editingId === d.id ? (
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                placeholder="Начало периода"
                                                value={editedData.working_start || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setEditedData((prevData) => ({
                                                    ...prevData,
                                                    working_start: newDate,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        d.working_start
                                    )}
                                    </td>
                                    <td>
                                      {editingId === d.id ? (
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                placeholder="Конец периода"
                                                value={editedData.working_end || ''}
                                                onChange={(e) => {
                                                    const newDate = e.target.value;
                                                    setEditedData((prevData) => ({
                                                    ...prevData,
                                                    working_end: newDate,
                                                    }));
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        d.working_end
                                    )}
                                    </td>
                                    <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.fio} onChange={(e) => setEditedData({ ...editedData, departament_work: e.target.value })} /> : d.departament_work}</td>
                                    <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.fio} onChange={(e) => setEditedData({ ...editedData, jposition_work: e.target.value })} /> : d.jposition_work}</td>
                                    <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.fio} onChange={(e) => setEditedData({ ...editedData, orfanization_name: e.target.value })} /> : d.orfanization_name}</td>
                                    <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.fio} onChange={(e) => setEditedData({ ...editedData, organization_addres: e.target.value })} /> : d.organization_addres}</td>
                                   
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