import React, {useState} from 'react';
import cl from './NewCourses.module.css';
import { useForm } from '../formProvider/FormProvider';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const NewCourses = (props) => {
    // const { id } = useParams();

    const {course, setCourse} = useForm();

    // ДОБАВЛЕНИЕ 
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        courseName: '',
        courseType: '',
        courseOrg: '',
        startDate: '',
        endDate: '',
        documentType: ''
    });

    const handleAddCourse = async (e) => {
        e.preventDefault();
        try {

            // console.log(inputData)
            // if (!inputData.course_type || !inputData.course_organization || !inputData.course_start_date || !inputData.course_end_date || !inputData.document_type || !inputData.course_name) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newCourse = {
                // iin: id,
                courseName: inputData.courseName,
                courseType: inputData.courseType,
                courseOrg: inputData.courseOrg,
                startDate: inputData.startDate,
                endDate: inputData.endDate,
                documentType: inputData.documentType
            };

            // setCourses(prevRecords => [...prevRecords, newCourse]);

            setCourse((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newCourse];
                return updatedArray;
            });

     
            setInputData({
                courseName: '',
                courseType: '',
                courseOrg: '',
                startDate: '',
                endDate: '',
                documentType: ''
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const [editedData, setEditedData] = useState({
        id: '',
        courseName: '',
        courseType: '',
        courseOrg: '',
        startDate: '',
        endDate: '',
        documentType: ''
    });

    const [editingId, setEditingId] = useState(null);

    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                            <p className={cl.workerCapitalName}>Курсы подготовки и повышения квалификаций</p>
                        </div>
                    </div>
                </div>
                <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                    <div>
                        <div>
                        {/* <Button onClick={handleShowForm}>Добавить курс</Button> */}
                        <form onSubmit={handleAddCourse} style={{ marginTop: '10px' }}>
                            <Paper>
                                <TableContainer>
                                    <Table className={cl.customTable}>
                                        <TableBody >
                                            <TableRow>
                                                <TableCell>
                                                    <Box>
                                                            {/* <label className={cl.label}>Должность</label> */}
                                                            <FormControl size="small" fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Вид переподготовки</InputLabel>
                                                                <Select
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                label="Вид переподготовки"
                                                                name='academicDegree'
                                                                className={cl.workerInfoSelect}
                                                                value={inputData.courseType}
                                                                onChange={(e) => setInputData({ ...inputData, courseType: e.target.value })}
                                                                >
                                                                    <MenuItem value="" disabled>Выберите переподготовки</MenuItem>
                                                                    <MenuItem value="Повышение">Повышение</MenuItem>
                                                                    <MenuItem value="Подготовка">Подготовка</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Учебное заведение "
                                                        value={inputData.courseOrg}
                                                        onChange={(e) => setInputData({ ...inputData, courseOrg: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Дата начала"
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
                                                </TableCell>
                                                <TableCell>
                                                    <div className={cl.datePickerContainer}>
                                                    <input
                                                        type="date"
                                                        className={cl.formInput}
                                                        placeholder="Дата окончания"
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
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Вид документа"
                                                        value={inputData.documentType}
                                                        onChange={(e) => setInputData({ ...inputData, documentType: e.target.value })}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <input
                                                        type="text"
                                                        className={cl.formInput}
                                                        placeholder="Название курса"
                                                        value={inputData.courseName}
                                                        onChange={(e) => setInputData({ ...inputData, courseName: e.target.value })}
                                                    />
                                                </TableCell>
                                                
                                                <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                            </TableRow>
                                            {course && course.slice(1).map((data, index) => (
                                                <TableRow>
                                                    <TableCell>{data.courseName}</TableCell>
                                                    <TableCell>{data.courseType}</TableCell>
                                                    <TableCell>{data.courseOrg}</TableCell>
                                                    <TableCell>{data.startDate}</TableCell>
                                                    <TableCell>{data.endDate}</TableCell>
                                                    <TableCell>{data.documentType}</TableCell>

                                                    <TableCell></TableCell>
                                                </TableRow>
                                            ))}
                                            
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                            
                        </form>
                      
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewCourses;