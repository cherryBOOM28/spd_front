import React, { useState } from 'react';
import cl from './NewFamilyComposition.module.css'
// import Button from '../../UI/button/Button';
import { useForm } from '../formProvider/FormProvider';
import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import IconButton from '@mui/material/IconButton';


const NewFamilyComposition = (props) => {
    const { familyComposition, setFamilyComposition } = useForm();

  // ИЗМЕНЕНИЯ В INPUT
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setInputData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ДОБАВЛЕНИЕ ДАННЫХ
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        relativeType: "",
        relName: "",
        relSurname: "",
        relPatronymic: "",
        relIin: "",
        relBirthDate: "",
        relJobPlace: "",
    });

    // console.log("inputData", inputData);

    const handleAddFamilyMember = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
            // if (!inputData.relative_type || !inputData.fio || !inputData.rel_iin || !inputData.birth_date_family || !inputData.job_place) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newFamily = {
                relativeType: inputData.relativeType,
                relName: inputData.relName,
                relSurname: inputData.relSurname,
                relPatronymic: inputData.relPatronymic,
                relIin: inputData.relIin,
                relBirthDate: inputData.relBirthDate,
                relJobPlace: inputData.relJobPlace
            };
       
            // setRelatives((prevArray) => {
            //     // Create a new array by copying the previous array and adding a new element
            //     const updatedArray = [...prevArray, newFamily];
            //     return updatedArray;
            // });
            
            setFamilyComposition((prevRelatives) => [...prevRelatives, newFamily]);

            setInputData({
                relativeType: "",
                relName: "",
                relSurname: "",
                relPatronymic: "",
                relIin: "",
                relBirthDate: "",
                relJobPlace: "",
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        id: '',
        relativeType: "",
        relName: "",
        relSurname: "",
        relPatronymic: "",
        relIin: "",
        relBirthDate: "",
        relJobPlace: "",
    });

    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.personalWrapper}>
        <div className={cl.container}>
            <div className={cl.totalInfoWrapper}>
                <div className={cl.totalInfoContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <p className={cl.workerCapitalName}>Состав семьи</p>
                    </div>
                </div>
            </div>
            <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                <div>
                    <div>
                    <form onSubmit={handleAddFamilyMember} style={{ marginTop: '10px' }}>  
                        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Степень родства</TableCell>
                                            <TableCell>Имя</TableCell>
                                            <TableCell>Фамилия</TableCell>
                                            <TableCell>Отчество</TableCell>
                                            <TableCell>ИИН</TableCell>
                                            <TableCell>Дата рождения</TableCell>
                                            <TableCell>Место работы</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {familyComposition && familyComposition.slice(1).map((d, i) => (
                                            <TableRow key={i}>
                                                <TableCell>  
                                                    {editingId === d.id ? (
                                                        <select
                                                            className={cl.selectRelative_type}
                                                            name='relative_type'
                                                            value={editedData.relativeType}
                                                            onChange={(e) => setEditedData({ ...editedData, relativeType: e.target.value })}
                                                        >
                                                            <option value="">Выберите тип родственника</option>
                                                            <option value="супруг/супруга">супруг/супруга</option>
                                                            <option value="сын/дочь">сын/дочь</option>
                                                            <option value="мать/отец">мать/отец</option>
                                                            <option value="брат/сестра">брат/сестра</option>
                                                        </select>
                                                    ) : (
                                                        d.relativeType
                                                    )}
                                                </TableCell>
                                                <TableCell>{editingId === d.id ? <input type="text" className={cl.editInput} name='relName' value={editedData.relName} onChange={(e) => setEditedData({ ...editedData, relName: e.target.value })} /> : d.relName}</TableCell>
                                                <TableCell>{editingId === d.id ? <input type="text" className={cl.editInput} name='relSurname' value={editedData.relSurname} onChange={(e) => setEditedData({ ...editedData, relSurname: e.target.value })} /> : d.relSurname}</TableCell>
                                                <TableCell>{editingId === d.id ? <input type="text" className={cl.editInput} name='relPatronymic' value={editedData.relPatronymic} onChange={(e) => setEditedData({ ...editedData, relPatronymic: e.target.value })} /> : d.relPatronymic}</TableCell>

                                                <TableCell>{editingId === d.id ? <input type='number' className={cl.editInput} name='relIin'  value={editedData.relIin} onChange={(e) => setEditedData({ ...editedData, relIin: e.target.value })} /> : d.relIin}</TableCell>
                                                <TableCell>
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
                                                </TableCell>
                                                <TableCell>{editingId === d.id ? <input type='text' className={cl.editInput} name='relJobPlace' value={editedData.relJobPlace} onChange={(e) => setEditedData({ ...editedData, relJobPlace: e.target.value })} /> : d.relJobPlace}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <table className={cl.customTable}>
                            <tbody >
                                <tr>
                                    <td>
                                        <select
                                            className={cl.formInput}
                                            value={inputData.relativeType}
                                            onChange={(e) => setInputData({ ...inputData, relativeType: e.target.value })}
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
                                            name='relName'
                                            value={inputData.relName}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            placeholder="ФИО"
                                            name='relSurname'
                                            value={inputData.relSurname}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            placeholder="ФИО"
                                            name='relPatronymic'
                                            value={inputData.relPatronymic}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="number"
                                                className={cl.formInput}
                                                name='relIin'
                                                placeholder="ИИН родственника"
                                                value={inputData.relIin}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={cl.datePickerContainer}>
                                            <input
                                                type="date"
                                                className={cl.formInput}
                                                name='relBirthDate'
                                                placeholder="Дата рождения"
                                                value={inputData.relBirthDate || ''}
                                                onChange={(e) => {
                                                const newDate = e.target.value;
                                                setInputData((prevWorker) => ({
                                                ...prevWorker,
                                                relBirthDate: newDate,
                                                }));
                                                }}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            className={cl.formInput}
                                            name='relJobPlace'
                                            placeholder="Место работы"
                                            value={inputData.relJobPlace}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td><Button className={cl.submitBtn}  onClick={handleShowForm}>Добавить</Button></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </form>
                        {showForm && (
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {familyComposition && familyComposition.slice(1).map((d, i) => (
                                        <tr key={i}>
                                            <td>  
                                                {editingId === d.id ? (
                                                    <select
                                                        className={cl.selectRelative_type}
                                                        name='relative_type'
                                                        value={editedData.relativeType}
                                                        onChange={(e) => setEditedData({ ...editedData, relativeType: e.target.value })}
                                                    >
                                                        <option value="">Выберите тип родственника</option>
                                                        <option value="супруг/супруга">супруг/супруга</option>
                                                        <option value="сын/дочь">сын/дочь</option>
                                                        <option value="мать/отец">мать/отец</option>
                                                        <option value="брат/сестра">брат/сестра</option>
                                                    </select>
                                                ) : (
                                                    d.relativeType
                                                )}
                                            </td>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='relName' value={editedData.relName} onChange={(e) => setEditedData({ ...editedData, relName: e.target.value })} /> : d.relName}</td>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='relSurname' value={editedData.relSurname} onChange={(e) => setEditedData({ ...editedData, relSurname: e.target.value })} /> : d.relSurname}</td>
                                            <td>{editingId === d.id ? <input type="text" className={cl.editInput} name='relPatronymic' value={editedData.relPatronymic} onChange={(e) => setEditedData({ ...editedData, relPatronymic: e.target.value })} /> : d.relPatronymic}</td>

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

export default NewFamilyComposition;