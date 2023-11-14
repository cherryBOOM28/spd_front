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
        education_place_academic: '',
        academic_degree: '',
        diploma_number_academic: '',
        diploma_date: ''
    });

    const handleAddDegree = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            if (!inputData.education_place_academic || !inputData.academic_degree || !inputData.diploma_number_academic || !inputData.diploma_date) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newAcademicDegree = {
                education_place_academic: inputData.education_place_academic,
                academic_degree: inputData.academic_degree,
                diploma_number_academic: inputData.diploma_number_academic,
                diploma_date: inputData.diploma_date
            };

            // setAcademicDegree(prevRecords => [...prevRecords, newAcademicDegree]);

            setAcademicDegree((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newAcademicDegree];
                return updatedArray;
              });


            // console.log(
            //     { 'academic_degree': [newAcademicDegree] }
            // )

            // const response = await axios.post('http://localhost:3001/academic_degree', newAcademicDegree);

            // if (response.status === 201) {
            //     setAcademicDegree(prevRecords => [...prevRecords, newAcademicDegree]);
            //     setInputData({
            //         education_place: '',
            //         academic_degree: '',
            //         diploma_number: '',
            //         diploma_date: ''
            //     });
            //     handleShowForm(false)
            // } else {
            //     console.error('Error adding education');
            // }
            setInputData({
                education_place_academic: '',
                academic_degree: '',
                diploma_number_academic: '',
                diploma_date: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // EDIT
    const [editedData, setEditedData] = useState({
        id: '',
        education_place_academic: '',
        academic_degree: '',
        diploma_number_academic: '',
        diploma_date: ''
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
                                                        value={inputData.education_place_academic}
                                                        onChange={(e) => setInputData({ ...inputData, education_place_academic: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <select
                                                        className={cl.formInput}
                                                        value={inputData.academic_degree}
                                                        onChange={(e) => setInputData({ ...inputData, academic_degree: e.target.value })}
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
                                                        value={inputData.diploma_number_academic}
                                                        onChange={(e) => setInputData({ ...inputData, diploma_number_academic: e.target.value })}
                                                    />
                                                </td>
                                                <td>
                                                    <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Дата диплома"
                                                        value={inputData.diploma_date || ''}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setInputData((prevWorker) => ({
                                                            ...prevWorker,
                                                            diploma_date: newDate,
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
                                                 <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.education_place_academic} onChange={(e) => setEditedData({ ...editedData, education_place_academic: e.target.value })} /> : d.education_place_academic}</td>
                                                 <td>  
                                                     {editingId === d.id ? (
                                                         <select
                                                             className={cl.selectRelative_type}
                                                             value={editedData.academic_degree}
                                                             onChange={(e) => setEditedData({ ...editedData, academic_degree: e.target.value })}
                                                         >
                                                              <option value="">Ученая степень</option>
                                                             <option value="Бакалавр">Бакалавр</option>
                                                             <option value="Магистр">Магистр</option>
                                                             <option value="Кандидат">Кандидат наук</option>
                                                             <option value="Доктор">Доктор наук</option>
                                                         </select>
                                                     ) : (
                                                         d.academic_degree
                                                     )}
                                                 </td>
                                                 <td>{editingId === d.id ? <input type='number' className={cl.editInput}  value={editedData.diploma_number_academic} onChange={(e) => setEditedData({ ...editedData, diploma_number_academic: e.target.value })} /> : d.diploma_number_academic}</td>
                                                 <td>
                                                     {editingId === d.id ? (
                                                         <div className={cl.datePickerContainer}>
                                                             <input
                                                                 type="date"
                                                                 className={cl.formInput}
                                                                 placeholder="Дата диплома"
                                                                 value={editedData.diploma_date || ''}
                                                                 onChange={(e) => {
                                                                     const newDate = e.target.value;
                                                                     setEditedData((prevData) => ({
                                                                     ...prevData,
                                                                     diploma_date: newDate,
                                                                     }));
                                                                 }}
                                                             />
     
                                                         </div>
                                                     ) : (
                                                         d.diploma_date
                                                     )}
                                                 </td>
                                                 {/* <td className={cl.relativesActionBtns} style={{}}>
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
                                                 </td> */}
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