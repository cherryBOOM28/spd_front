import React, {useState, useEffect} from 'react';
import cl from './NewLanguage.module.css'
import { useForm } from '../formProvider/FormProvider';

import list from '../../data/languages';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const NewLanguage = (props) => {

    const { languageSkill, setLanguageSkill } = useForm();
    const [apiLanguages, setApiLanguages] = useState([]);

     // eslint-disable-next-line
    useEffect(() => {   
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            // GET Education info
            // const languageResponse = await getPersonalInfo(id);
            // setLanguage(languageResponse.data);
            fetchApiLanguages()
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Лист языков
    const fetchLanguagesFromApi = async () => {
      try {
        setApiLanguages(list)
        return list;
 
      } catch (error) {
        console.error('Error fetching API languages:', error);
        return [];
      }
    };

    const fetchApiLanguages = async () => {
      await fetchLanguagesFromApi();
    };

    //   // ИЗМЕНЕНИЯ В INPUT
    // const handleInputChange = (event) => {
    // const { name, value } = event.target;

    // setInputData((prevData) => ({
    //     ...prevData,
    //     [name]: value,
    // }));
    // };

    // ДОБАВЛЕНИЕ РОДСТВЕННИКА
    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        langName: '',
        skillLvl: '',
    });

    const handleAddLanguage = async (e) => {
        e.preventDefault();
        try {

            // console.log(inputData)
            // if (!inputData.language_name || !inputData.owning_lvl_language) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            // Получаем название языка по его коду из объекта apiLanguages
            const languageName = apiLanguages[inputData.langName];

            const newLanguage = {
              langName: languageName,
              skillLvl: inputData.skillLvl,
            };

            // console.log(
            //     { 'language': [newLanguage] }
            // )

            // const response = await axios.post('http://localhost:3001/owning_languages', newLanguage);
            // console.log(response);

            // setLanguage(prevRecords => [...prevRecords, newLanguage]);

            setLanguageSkill((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newLanguage];
                return updatedArray;
              });

            // if (response.status === 201) {
            //     setLanguage(prevRecords => [...prevRecords, newLanguage]);
            //     setInputData({
            //       language_name: '',
            //       owning_lvl: ''
            //     });
            //     handleShowForm(false)
            // } else {
            //     console.error('Error adding education');
            // }
            setInputData({
                langName: '',
                skillLvl: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        langName: '',
        skillLvl: '',
    });

    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.personalWrapper}>
        <div className={cl.container}>
            <div className={cl.totalInfoWrapper}>
                <div className={cl.totalInfoContent}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
                        <p className={cl.workerCapitalName}>Владения языками</p>
                    </div>
                </div>
            </div>
            <div className={cl.totalInfoWrapper} style={{ marginTop: '20px' }}>
                <div>
                    <div>
                        {/* <Button onClick={handleShowForm}>Добавить язык</Button> */}
                       
                            <form onSubmit={handleAddLanguage} style={{ marginTop: '10px' }}>
                            <Paper elevation={2}>
                            <TableContainer>
                            <Table className={cl.customTable}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Язык</TableCell>
                                            <TableCell>	Уровень владения языком</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody >
                                        <TableRow>
                                            <TableCell>
                                                <Box>
                                                    {/* <label className={cl.label}>Должность</label> */}
                                                    <FormControl size="small" fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Вид язык</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Вид язык"
                                                        className={cl.workerInfoSelect}
                                                        name='relativeType'
                                                        value={inputData.langName}
                                                        onChange={(e) => setInputData({ ...inputData, langName: e.target.value })}
                                                        >
                                                        <MenuItem value="" disabled>Выберите язык</MenuItem>
                                                        {Object.keys(apiLanguages).map((languageCode, index) => (
                                                        <MenuItem key={index} value={languageCode}>
                                                            {apiLanguages[languageCode]}
                                                        </MenuItem>
                                                        ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                          
                                            </TableCell>
                                            <TableCell>
                                                <Box>
                                                    {/* <label className={cl.label}>Должность</label> */}
                                                    <FormControl size="small" fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Вид язык</InputLabel>
                                                        <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        label="Вид язык"
                                                        className={cl.workerInfoSelect}
                                                        name='relativeType'
                                                        value={inputData.skillLvl}
                                                        onChange={(e) => setInputData({ ...inputData, skillLvl: e.target.value })}
                                                        >
                                                        <MenuItem value="" disabled>Выберите уровень владения</MenuItem>
                                                        <MenuItem value="Со словарем">Со словарем</MenuItem>
                                                        <MenuItem value="Начальный">Начальный</MenuItem>
                                                        <MenuItem value="Ниже среднего">Ниже среднего</MenuItem>
                                                        <MenuItem value="Средний">Средний</MenuItem>
                                                        <MenuItem value="Выше среднего">Выше среднего</MenuItem>
                                                        <MenuItem value="Продвинутый">Продвинутый</MenuItem>
                                                        <MenuItem value="Профессиональный">Профессиональный уровень владения</MenuItem>
                                                        <MenuItem value="Родной">Родной</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                           
                                            </TableCell>
                                            <TableCell><Button className={cl.submitBtn}  style={{  color: '#1B3884' }}   type='submit'  onClick={handleShowForm}>Добавить</Button></TableCell>
                                        </TableRow>
                                        {languageSkill && languageSkill.slice(1).map((data, index) => (
                                            <TableRow>
                                            <TableCell>{data.langName}</TableCell>
                                            <TableCell>{data.skillLvl}</TableCell>
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

export default NewLanguage;