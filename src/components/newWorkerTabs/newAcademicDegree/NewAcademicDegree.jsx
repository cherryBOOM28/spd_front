import React, { useState } from 'react';
import cl from './NewAcademicDegree.module.css';
import { useForm } from '../formProvider/FormProvider';
import Button from '../../UI/button/Button';

const NewAcademicDegree = (props) => {
    const {academicDegree, setAcademicDegree} = useForm();


    // useEffect(() => {
    //     fetchData()
    // }, [])

    // const fetchData = async () => {
    //     try {
    //         // GET Academic degree info
    //         const academivDegreeResponse = await getAcademicDegree();
    //         setAcademicDegree(academivDegreeResponse.data);

    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // }

    // ДОБАВЛЕНИЕ УЧЕНОЙ СТЕПЕНИ
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        academicPlace: '',
        academicDegree: '',
        academicDiplomaNumber: '',
        academicDiplomaDate: ''
    });

    const handleAddDegree = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.education_place_academic || !inputData.academic_degree || !inputData.diploma_number_academic || !inputData.diploma_date) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newAcademicDegree = {
                academicPlace: inputData.academicPlace,
                academicDegree: inputData.academicDegree,
                academicDiplomaNumber: inputData.academicDiplomaNumber,
                academicDiplomaDate: inputData.academicDiplomaDate
            };

            // setAcademicDegree(prevRecords => [...prevRecords, newAcademicDegree]);

            setAcademicDegree((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newAcademicDegree];
                return updatedArray;
            });


            setInputData({
                academicPlace: '',
                academicDegree: '',
                academicDiplomaNumber: '',
                academicDiplomaDate: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // EDIT
    const [editedData, setEditedData] = useState({
        id: '',
        academicPlace: '',
        academicDegree: '',
        academicDiplomaNumber: '',
        academicDiplomaDate: ''
    });

    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Ученые степени </p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        {/* <Button onClick={handleShowForm}>Добавить ученую степень </Button> */}
                            <form onSubmit={handleAddDegree} style={{ marginTop: '10px' }}>
                                    <table className={cl.customTable}>
                                        <tbody >
                                            <tr>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Учебное заведение "
                                                        value={inputData.academicPlace}
                                                        onChange={(e) => setInputData({ ...inputData, academicPlace: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.academicDegree}
                                                        onChange={(e) => setInputData({ ...inputData, academicDegree: e.target.value })}
                                                    >
                                                        <option value="">Ученая степень</option>
                                                        <option value="Бакалавр">Бакалавр</option>
                                                        <option value="Магистр">Магистр</option>
                                                        <option value="Кандидат">Кандидат наук</option>
                                                        <option value="Доктор">Доктор наук</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className={cl.formInput}
                                                        placeholder="Номер диплома"
                                                        value={inputData.academicDiplomaNumber}
                                                        onChange={(e) => setInputData({ ...inputData, academicDiplomaNumber: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Дата диплома"
                                                        value={inputData.academicDiplomaDate || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            academicDiplomaDate: newDate,
                                                            }));
                                                        }}
                                                    />
                                                    </div>
                                                </td>
                                                <td><Button type="submit" className={cl.submitBtn} onClick={handleShowForm} >Добавить</Button></td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </form>
                            {showForm && (
                                 <div>
                                 <table className={cl.customTable} style={{ marginTop: '20px' }}>
                                     <thead>
                                         <tr>
                                             <td>Учебное заведение </td>
                                             <td>Ученая степень</td>
                                             <td>Номер диплома</td>
                                             <td>Дата диплома</td>
                                 
                                         </tr>
                                     </thead>
                                     <tbody>
                                         {academicDegree.slice(1).map((d, i) => (
                                             <tr key={i}>
                                                 <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.academicPlace} onChange={(e) => setEditedData({ ...editedData, academicPlace: e.target.value })} /> : d.academicPlace}</td>
                                                 <td>  
                                                     {editingId === d.id ? (
                                                         <select
                                                             className={cl.selectRelative_type}
                                                             value={editedData.academicDegree}
                                                             onChange={(e) => setEditedData({ ...editedData, academicDegree: e.target.value })}
                                                         >
                                                              <option value="">Ученая степень</option>
                                                             <option value="Бакалавр">Бакалавр</option>
                                                             <option value="Магистр">Магистр</option>
                                                             <option value="Кандидат">Кандидат наук</option>
                                                             <option value="Доктор">Доктор наук</option>
                                                         </select>
                                                     ) : (
                                                         d.academicDegree
                                                     )}
                                                 </td>
                                                 <td>{editingId === d.id ? <input type='number' className={cl.editInput}  value={editedData.academicDiplomaNumber} onChange={(e) => setEditedData({ ...editedData, academicDiplomaNumber: e.target.value })} /> : d.academicDiplomaNumber}</td>
                                                 <td>
                                                     {editingId === d.id ? (
                                                         <div className={cl.datePickerContainer}>
                                                             <input
                                                                 type="date"
                                                                 className={cl.formInput}
                                                                 placeholder="Дата диплома"
                                                                 value={editedData.academicDiplomaDate || ''}
                                                                 onChange={(e) => {
                                                                     const newDate = e.target.value;
                                                                     setEditedData((prevData) => ({
                                                                     ...prevData,
                                                                     academicDiplomaDate: newDate,
                                                                     }));
                                                                 }}
                                                             />
     
                                                         </div>
                                                     ) : (
                                                         d.academicDiplomaDate
                                                     )}
                                                 </td>
                                             </tr>
                                         ))}
                                     </tbody>
                                 </table>
                             </div>
                            )}
                        </div>
                     
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewAcademicDegree;