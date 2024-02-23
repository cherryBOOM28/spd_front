import React, { useState, useEffect } from 'react';
import cl from './NewPersonnelData.module.css';
import { useForm } from '../formProvider/FormProvider';
import axios from 'axios';
import Cookies from 'js-cookie';

import NewSickLeaves from './sick_leaves/NewSickLeaves';
import NewAwards from './awards/NewAwards';
import NewInvestigationRetrievals from './investigation_retrievals/NewInvestigationRetrievals';

import { Button,TextField, Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material';


const NewPersonnelData = (props) => {
    
    const {specCheckInfo, setSpecCheckInfo} = useForm();
    const {attestationInfo, setAttestationInfo} = useForm();
    const {rankInfo, setRankInfo} = useForm();
    const {classCategoriesInfo, setClassCategoriesInfo} = useForm();
    const {autobiographyInfo, setAutobiographyInfo} = useForm();

    const [departments, setDepartments] = useState([]);

    const fetchData = async (id) => {
        try {
          const accessToken = Cookies.get('jwtAccessToken');
          const response = await axios.get(`http://localhost:8000/api/v1/military-rank`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
            }
          });
          setDepartments(response.data);
          // console.log("response", response.data);
      
        } catch (error) {
          console.error('Error fetching data:', error); 
        }
      };

      useEffect(() => {
        fetchData();
        // Запрос данных о департаментах при загрузке компонента
      }, []);

    const handleInputChange = (e) => {
     
        const { name, value } = e.target;
           setSpecCheckInfo((prevData) => {
            let obj = prevData[0];
            obj = {...obj, [name]: value}
            return [obj]
        });

        // setSpecCheckInfo((prevData) => ({
        //     ...prevData,
        //     [name]: value
        // }));

        // setSpecCheckInfo((prevData) => {
        //     const newData = { ...prevData, [name]: value };
        //     console.log(newData); // Log the updated data
        //     return newData;
        // });

    };

    const handleInputChangeAttestation = (e) => {
   
        const { name, value } = e.target;
        // setAttestationInfo((prevData) => {
        //     const newData = { ...prevData, [name]: value };
        //     console.log(newData); // Log the updated data
        //     return newData;
        // });

        // setAttestationInfo((prevData) => ({
        //     ...prevData,
        //     [name]: value
        // }));

        setAttestationInfo((prevData) => {
            let obj = prevData[0];
            obj = {...obj, [name]: value}
            return [obj]
        });
    };

    const handleInputChangeRank = (e) => {
        const { name, value } = e.target;
        setRankInfo((prevData) => {
            const newData = { ...prevData, [name]: value };
            console.log(newData); // Log the updated data
            return newData;
        });
    };

    const handleInputChangeClassCategories = (e) => {
        // console.log(value)
        const { name, value } = e.target;
        setClassCategoriesInfo((prevData) => {
            let obj = prevData[0];
            obj = {...obj, [name]: value}
            return [obj]
        });

        // setClassCategoriesInfo((prevData) => ({
        //     ...prevData,
        //     [name]: value
        // }));

        // const { name, value } = e.target;
        // setClassCategoriesInfo((prevData) => {
        //     const newData = { ...prevData, [name]: value };
        //     console.log(newData); // Log the updated data
        //     return newData;
        // });
    };


    const handleInputChangeAutobiography = (e) => {
        const { name, value } = e.target;
        setAutobiographyInfo((prevData) => {
            let obj = prevData[0];
            obj = {...obj, [name]: value}
            return [obj]
        });

        // setAutobiographyInfo((prevData) => ({
        //     ...prevData,
        //     [name]: value
        // }));
        // setAutobiographyInfo((prevData) => {
        //     const newData = { ...prevData, [name]: value };
        //     console.log(newData); // Log the updated data
        //     return newData;
        // });
    };
   

    return (
        <div className={cl.personalWrapper}>
        <div className={cl.container}>
            <form>
                <div className={cl.totalInfoWrapper}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={cl.workerCapitalName}>Спец проверка</p>
                        </div>
                    </div>
                    <div className={cl.workerBlock}>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label} style={{ marginRight: '20px' }}>Номер документа</label>
                                <TextField
                                    size='small'
                                    className={cl.workerInfo}
                                    type="text"
                                    name="docNumber"
                                    value={specCheckInfo.docNumber}
                                    // onChange={(e) => handleInputChange('docNumber', e.target.value)}
                                    onChange={handleInputChange}
                                />
                            </div>        
                        </div>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label} style={{ marginRight: '22px' }}>Дата документа</label>
                                <TextField
                                    size='small'
                                    type="date"
                                    className={cl.workerInfo}
                                    name='docDate'
                                    value={specCheckInfo.docDate}

                                    // onChange={(e) => handleInputChange('docDate', e.target.value)}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={cl.workerCapitalName}>Аттестация</p>
                        </div>
                    </div>
                    <div className={cl.workerBlock}>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label} style={{ marginRight: '20px' }}>Дата последннй аттестации</label>
                                    <div className={cl.datePickerContainer}>
                                        <TextField
                                        size='small'
                                            type="date"
                                            className={cl.workerInfo}
                                            name='lastAttDate'
                                            value={attestationInfo.lastAttDate}
                                            onChange={handleInputChangeAttestation}
                                            // onChange={(e) => handleInputChangeAttestation('lastAttDate', e.target.value)}
                                        />
                                    </div>
                            </div>
                        </div>
                        <div className={cl.column}>
                                <div className={cl.rows}>
                                    <label className={cl.label} style={{ marginRight: '20px' }}>Результат аттестации</label>
                                    <TextField
                                        size='small'
                                        className={cl.workerInfo}
                                        type="text"
                                        name="attResult"
                                        value={attestationInfo.attResult}
                                        onChange={handleInputChangeAttestation}
                                        // onChange={(e) => handleInputChangeAttestation('attResult', e.target.value)}

                                    />
                                </div>
                            </div>
                    </div>
                </div>

                <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={cl.workerCapitalName}>Звания</p>
                        </div>
                    </div>
                    <div className={cl.workerBlock}>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label} style={{ marginRight: '20px' }}>Звание</label>
                                <Box>
                                    {/* <label className={cl.label}>Должность</label> */}
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Звание</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Звание"
                                        className={cl.workerInfoSelect}
                                        value={rankInfo.militaryRank}
                                        name='militaryRank'
                                        onChange={handleInputChangeRank}
                                        >
                                        <MenuItem value="">Выберите звание</MenuItem>
                                        {departments.map((rank) => (
                                            <MenuItem key={rank.id} value={rank.rankTitle}>
                                            {rank.rankTitle}
                                            </MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label} style={{ marginRight: '20px' }}>Дата получения</label>
                                <div className={cl.datePickerContainer}>
                                    <TextField
                                        size='small'
                                        type="date"
                                        className={cl.workerInfo}
                                        name='receivedDate'
                                        value={rankInfo.receivedDate}
                                        onChange={handleInputChangeRank}
                                    />
                                    
                                </div>
                            </div>
                        </div>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label}  style={{ marginRight: '20px' }}>Вид присвоения</label>
                                <Box>
                                    {/* <label className={cl.label}>Должность</label> */}
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Вид присвоения</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Вид присвоения"
                                        className={cl.workerInfoSelect}
                                        value={rankInfo.receivedType}
                                        name='receivedType'
                                        onChange={handleInputChangeRank}
                                        >
                                        <MenuItem value="" disabled>Выберите вид присвоения</MenuItem>
                                        <MenuItem value="Досрочное">Досрочное</MenuItem>
                                        <MenuItem value="Внеочередное">Внеочередное</MenuItem>
                                        <MenuItem value="Очередное">Очередное</MenuItem>
                                        <MenuItem value="На одну ступень выше специального звания">На одну ступень выше специального звания, предусмотренного по занимаемой штатной должности</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                
                    </div>
                </div>

                <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={cl.workerCapitalName}>Классные категории</p>
                        </div>
                    </div>
                    <div className={cl.workerBlock}>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label} style={{ marginRight: '20px' }}>Классные категория</label>
                                <Box>
                                    {/* <label className={cl.label}>Должность</label> */}
                                    <FormControl size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-label">Классные категория</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Классные категория"
                                        className={cl.workerInfoSelect}
                                        value={classCategoriesInfo.categoryType}
                                        name='categoryType'
                                        onChange={handleInputChangeClassCategories}
                                        >
                                        <MenuItem value="" >Выберите категорию</MenuItem>
                                        <MenuItem value="спец 2 категории">Специалист 2 категории</MenuItem>
                                        <MenuItem value="спец 1 категории">Специалист 1 категории</MenuItem>
                                        <MenuItem value="наставник">Наставник</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        
                        </div>
                        
                
                    </div>
                </div>

                <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
                    <div className={cl.totalInfoContent}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <p className={cl.workerCapitalName}>Автобиография </p>
                        </div>
                    </div>
                    <div className={cl.workerBlock}>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                            <label className={cl.label}>Автобиография</label>
                            <TextField

                                className={cl.workerInfoText}
                                multiline
                                name="autobiographyText"
                                value={autobiographyInfo.autobiographyText}
                                onChange={handleInputChangeAutobiography}
                                // onChange={(e) => handleInputChangeAutobiography('autobiographyText', e.target.value)}

                            />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <NewAwards />
            <NewSickLeaves />
            <NewInvestigationRetrievals />
        </div>
    </div>
    );
}

export default NewPersonnelData;