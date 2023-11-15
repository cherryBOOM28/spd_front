import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import cl from './Personal.module.css';
import Button from '../../../UI/button/Button';

import { getPersonalInfo } from '../../../../api/persona_info/getPersonalInfo';
// import { deletePersonalInfo } from '../../../../api/persona_info/deletePersonalInfo';
// import { updatePersonalInfo } from '../../../../api/persona_info/updatePersonalInfo';
import { deleteFamilyCompositions } from '../../../../api/persona_info/family_compositions/deleteFamilyCompositions';
import { updateFamilyCompositions } from '../../../../api/persona_info/family_compositions/updateFamilyCompositions';

function Personal({ positionInfo, location, receivedDate, positionTitle, departmentName, familyStatus, familyComposition }, props) {
    const { id } = useParams();
    // const id = props.id;

    const [personalData, setPersonalData] = useState({}); // Данные из бэка
    // const [familyComposition, setFamilyComposition] = useState({
    //     "family_compositions": []
    // }); // Данные из бэка

    // useEffect(() => {
    //     // console.log(id)
    //     fetchData()
    // }, []);

    //     const fetchData = async () => {
    //         try {
    //             // GET PERSONAL DATA\
    //             const personalResponse = await getPersonalInfo(id) 
    //             setPersonalData(personalResponse.data.personal_data);

    //             // GET FAMILY COMPOSITION
    //             const familyResponse = await getPersonalInfo(id);
    //             setFamilyComposition(familyResponse.data); 
                
    //         } catch (error) {
    //             console.error("Error fetching personal data:");
    //         }
    //     }

    // СОХРАНИТЬ ИЗМЕНЕНИЯ
    const handleSaveClick = async () => {
        try {
            let newJsonEdited = Object.keys(editedWorker).reduce((result, key) => {
                if (editedWorker[key] !== personalData[key]) {
                    result[key] = editedWorker[key];
                }
                return result;
            }, {});
            console.log(newJsonEdited, editedWorker)
            console.log(id)


            //   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await axios.patch(`http://localhost:8000/personal_info/update/`, {personal_data: editedWorker});


            if (response.status === 200) {
                setEditing(false);
                window.location.reload();
            } else {
                console.error('Error saving data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [editing, setEditing] = useState(false);
    const [editedWorker, setEditedWorker] = useState({
        family_status: '',
        departament: '',
        jposition: '',
        city: '',
    });


    // ИЗМЕНИТЬ ПОЛЯ
    const handleEditClick = () => {
        setEditing(true);
        // Initialize editedWorker with the worker's current data
        setEditedWorker({
            // iin: id,
            id: personalData.id,
            family_status: personalData.family_status,
            departament: personalData.departament,
            jposition: personalData.jposition,
            city: personalData.city,
        });
    };


    // ИЗМЕНЕНИЯ В INPUT
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedWorker((prevWorker) => ({ ...prevWorker, [name]: value }));
    };


    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        relative_type: "",
        fio: "",
        rel_iin: "",
        birth_date_family: "",
        job_place: "",
    });

    const handleAddMember = async (e, id) => {
        e.preventDefault();
        // try {

        //     if (!inputData.relative_type || !inputData.fio || !inputData.rel_iin || !inputData.birth_date_family || !inputData.job_place) {
        //         alert('Пожалуйста, заполните все поля!');
        //         return;
        //     }
        //     // console.log("id rel:", id)
        //     const newFamilyMember = {
        //         iin: props.id,
        //         relative_type: inputData.relative_type,
        //         fio: inputData.fio,
        //         rel_iin: inputData.rel_iin,
        //         birth_date_family: inputData.birth_date_family,
        //         job_place: inputData.job_place
        //     };
            
        //     // console.log(newFamilyMember)

        //     const body = { "family_compositions": [newFamilyMember] };
            
        //     const response = await axios.post(`http://localhost:8000/personal_info/create/`, body);
        //     // console.log(`response data: ${response.data}`)
            
        //     if (response.status === 201) {

        //         const updatedFamilyComposition = {
        //             ...familyComposition,
        //             family_compositions: [
        //                 ...familyComposition.family_compositions,
        //                 newFamilyMember
        //             ]
        //         }

        //         setFamilyComposition(updatedFamilyComposition);
        //         setInputData({
        //             iin: id,
        //             relative_type: '',
        //             fio: '',
        //             rel_iin: '',
        //             birth_date_family: '',
        //             job_place: '',
        //         });
        //         handleShowForm(false)
        //         // console.log(setInputData)
        //     } else {
        //         console.error('Error adding family member');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    };

    // УДАЛЕНИЕ РОДСТВЕННИКА
    const handleDelete = async (id) => {
  
        // try {
        //     const response = await deleteFamilyCompositions(id)
        //     // console.log("delete", id)
        //     if (response === 200) {
               
        //         // setFamilyComposition(prevFamily => prevFamily.filter(member => member.id !== id));

        //         setFamilyComposition((prevFamily) =>
        //         prevFamily.filter((member) => member.id !== id)
        //     );
            
        //     } else {
        //         console.log("Error deleting family member");
        //     }
        //     window.location.reload();
        // } catch(error) {
        //     console.log(error)
        // }
    }

    // EDIT
    const [editedData, setEditedData] = useState({
        relative_type: '',
        fio: '',
        rel_iin: '',
        birth_date_family: '',
        job_place: '',
    });

    const [editingId, setEditingId] = useState(null);


    const handleEdit = async (id, editedDataq) => {
        // if(editingId === id) {
        //     try {
        //         const updatedData = {
        //             id: id,
        //             iin: props.id,
        //             relative_type: editedDataq.relative_type,
        //             fio: editedDataq.fio,
        //             rel_iin: editedDataq.rel_iin,
        //             birth_date_family: editedDataq.birth_date_family,
        //             job_place: editedDataq.job_place,
        //         };
              

        //         await updateFamilyCompositions(id, updatedData);
        //         // console.log("rel id g:", id)
        //         // console.log(updatedData)
        //         setFamilyComposition(prevFamily => {
        //             return prevFamily.map(member => {
        //                 if(member.iin === id) {
        //                     return {...member, ...updatedData}
        //                 }
        //                 return member;
        //             })
        //         });

        //         setEditingId(null);
        //         setEditedData({
        //             id: id,
        //             relative_type: '',
        //             fio: '',
        //             rel_iin: '',
        //             birth_date_family: '',
        //             job_place: '',
        //         });
               
        //         console.log('Successfully updated family member')
        //     } catch(error) {
        //         console.error('Error updating family member:', error);
        //     }
        // } else {
        //     setEditingId(id);
        //     const memberToEdit = familyComposition.family_compositions.find(member => member.id === id);
        //     if(memberToEdit) {
        //         setEditedData(memberToEdit);
        //     };
        // }
    };

    const handleSaveEdit = async (id) => {
        // try {
        //     const updatedData = {
        //         id: id,
        //         iin: props.id,
        //         relative_type: editedData.relative_type,
        //         fio: editedData.fio,
        //         rel_iin: editedData.rel_iin,
        //         birth_date_family: editedData.birth_date_family,
        //         job_place: editedData.job_place,
        //     };
        //     console.log("rel id:", id);
    
        //     const response = await updateFamilyCompositions(id, updatedData);
    
        //     if (response === 200) {
        //         setFamilyComposition((prevFamily) =>
        //             prevFamily.map((member) => (member.id === id ? updatedData : member))
        //         );
        //         setEditingId(null); // Завершаем режим редактирования
        //         console.log('Successfully updated family member');
        //     } else {
        //         console.log('Error updating family member');
        //     }
        //     // console.log(updatedData)
        //     window.location.reload();
        // } catch (error) {
        //     console.error('Error updating family member:', error);
        // }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedData({});
    };

    const handleCancelClick = () => {
        // Отменяем редактирование
        setEditing(false);
    };
    
    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                            <p className={cl.workerCapitalName}>Семейное положение</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5px' }}>
                                {!editing ? (
                                <Button className={cl.actionBtn} onClick={handleEditClick}>
                                    &#9998; Редактировать
                                </Button>
                                ) : (

                                <div style={{ display: 'flex', gap: '10px' }}> 
                                    <Button onClick={handleSaveClick} className={cl.actionBtn}>
                                    Сохранить
                                    </Button>
                                    <Button className={cl.actionBtn} onClick={handleCancelClick}>Отмена</Button>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={cl.workerBlock}>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label}>Подразделение</label>
                                {editing ? (
                                    <input
                                        className={cl.workerInfo}
                                        type="text"
                                        name="DepartmentName"
                                        value={editedWorker.departmentName  || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <p className={cl.workerInfo}>{positionInfo.DepartmentName  || ''}</p>
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Должность</label>
                                {editing ? (
                                    <input
                                        className={cl.workerInfo}
                                        type="text"
                                        name="positionTitle"
                                        value={editedWorker.positionTitle || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (

                                    <p className={cl.workerInfo}>{positionTitle.positionTitle || ''}</p>
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Дата зачисления</label>
                                {editing ? (
                                    <div className={cl.datePickerContainer}>
                                    <input
                                        type="date"
                                        name='receivedDate'
                                        className={cl.workerInfo}
                                        value={editedWorker.receivedDate || ''}
                                        onChange={(e) =>
                                        setEditedWorker((prevWorker) => ({
                                            ...prevWorker,
                                            receivedDate: e.target.value,
                                        }))
                                        }
                                    />
                                    </div>
                                ) : (
                                    <p className={cl.workerInfo}>{receivedDate.receivedDate}</p>
                                )}
                            </div>
                            
                        </div>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label}>Семейное положение</label>
                                {editing ? (
                                    <select
                                    className={cl.workerInfoSelect}
                                     value={editedWorker.statusName}
                                     onChange={(e) => setEditedWorker({ ...editedWorker, statusName: e.target.value })}
                                     >
                                        <option value="">Выберите семейное положение</option>
                                        <option value="Не женат/не замужем">Не женат/не замужем</option>
                                        <option value="Женат/замужем">Женат/замужем</option>
                                        <option value="Вдова/вдовец">Вдова/вдовец</option>
                                        <option value="Разведена/разведен">Разведен/разведена</option>
                                     </select>  
                                    
                                ) : (

                                    <p className={cl.workerInfo}>{familyStatus.statusName || ''}</p>
                                )}
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Город подразделения</label>
                                {editing ? (
                                    <input
                                        className={cl.workerInfo}
                                        type="text"
                                        name="LocationName"
                                        value={editedWorker.LocationName  || ''}
                                        onChange={handleInputChange}
                                    />
                                ) : (

                                    <p className={cl.workerInfo}>{location.LocationName  || ''}</p>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Состав семьи</p>
                        </div>
                    </div>
                    <div>
                        <div>
                        <Button onClick={handleShowForm}>Добавить родственника</Button>
                            {showForm && (
                                <form onSubmit={handleAddMember} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.relative_type}
                                                        onChange={(e) => setInputData({ ...inputData, relative_type: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип родственника</option>
                                                        <option value="супруг/супруга">супруг/супруга</option>
                                                        <option value="сын/дочь">сын/дочь</option>
                                                        <option value="мать/отец">мать/отец</option>
                                                        <option value="брат/сестра">брат/сестра</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="ФИО"
                                                        name='fio'
                                                        value={inputData.fio}
                                                        onChange={(e) => setInputData({ ...inputData, fio: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={cl.formInput}
                                                        name='rel_iin'
                                                        placeholder="ИИН родственника"
                                                        value={inputData.rel_iin}
                                                        onChange={(e) => setInputData({ ...inputData, rel_iin: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>

                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        name='birth_date_family'
                                                        placeholder="Дата рождения"
                                                        value={inputData.birth_date_family || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            birth_date_family: newDate,
                                                            }));
                                                        }}
                                                        />
                                                    </div>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        name='job_place'
                                                        placeholder="Место работы"
                                                        value={inputData.job_place}
                                                        onChange={(e) => setInputData({ ...inputData, job_place: e.target.value })}
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
                                        <td>Степень родства</td>
                                        <td>Имя</td>
                                        <td>Фамилия</td>
                                        <td>Отчество</td>
                                        <td>ИИН</td>
                                        <td>Дата рождения</td>
                                        <td>Место работы</td>
                                        <td>Действие</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {familyComposition && familyComposition.relatives && familyComposition.relatives.map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        name='relative_type'
                                                        value={editedData.relativeName}
                                                        onChange={(e) => setEditedData({ ...editedData, relativeName: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип родственника</option>
                                                        <option value="супруг/супруга">супруг/супруга</option>
                                                        <option value="сын/дочь">сын/дочь</option>
                                                        <option value="мать/отец">мать/отец</option>
                                                        <option value="брат/сестра">брат/сестра</option>
                                                    </select>
                                                ) : (
                                                    d.relativeType.relativeName
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? 
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='relName' 
                                                    value={editedData.relName} 
                                                    onChange={(e) => setEditedData({ ...editedData, relName: e.target.value })} 
                                                /> : d.relName}
                                            </td>
                                            <td>{editingId === d.id ? 
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='relSurname' 
                                                    value={editedData.relSurname} 
                                                    onChange={(e) => setEditedData({ ...editedData, relSurname: e.target.value })} 
                                                /> : d.relSurname}
                                            </td>
                                            <td>{editingId === d.id ? 
                                                <input 
                                                    type="text" 
                                                    className={cl.editInput} 
                                                    name='relPatronymic' 
                                                    value={editedData.relPatronymic} 
                                                    onChange={(e) => setEditedData({ ...editedData, relPatronymic: e.target.value })} 
                                                /> : d.relPatronymic}
                                            </td>
                                            <td>{editingId === d.id ? <input type='number' className={cl.editInput} name='relIin'  value={editedData.relIin} onChange={(e) => setEditedData({ ...editedData, relIin: e.target.value })} /> : d.relIin}</td>
                                            <td>
                                            {editingId === d.id ? (
                                                <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        name='relBirthDate'
                                                        placeholder="Дата рождения"
                                                        value={editedData.relBirthDate || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setEditedData((prevData) => ({
                                                            ...prevData,
                                                            relBirthDate: newDate,
                                                            }));
                                                        }}
                                                    />
                                                </div>
                                            ) : (
                                                d.relBirthDate
                                            )}
                                            </td>
                                            <td>{editingId === d.id ? <input type='text' className={cl.editInput} name='relJobPlace' value={editedData.relJobPlace} onChange={(e) => setEditedData({ ...editedData, relJobPlace: e.target.value })} /> : d.relJobPlace}</td>
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
            </div>
        </div>
    );
}

export default Personal;
