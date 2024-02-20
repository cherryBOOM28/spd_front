import React, { useState, useEffect } from 'react';
import cl from './NewPersonnelData.module.css';
import { useForm } from '../formProvider/FormProvider';
import axios from 'axios';
import Cookies from 'js-cookie';

import NewSickLeaves from './sick_leaves/NewSickLeaves';
import NewAwards from './awards/NewAwards';
import NewInvestigationRetrievals from './investigation_retrievals/NewInvestigationRetrievals';



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
        // setSpecCheckInfo((prevData) => {
        //     let obj = prevData[0];
        //     obj = {...obj, [name]: value}
        //     return [obj]
        // });
        const { name, value } = e.target;
        setSpecCheckInfo((prevData) => {
            const newData = { ...prevData, [name]: value };
            console.log(newData); // Log the updated data
            return newData;
        });
    };

    const handleInputChangeAttestation = (e) => {
        // setAttestationInfo((prevData) => {
        //     let obj = prevData[0];
        //     obj = {...obj, [name]: value}
        //     return [obj]
        // });
        const { name, value } = e.target;
        setAttestationInfo((prevData) => {
            const newData = { ...prevData, [name]: value };
            console.log(newData); // Log the updated data
            return newData;
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
        // const { name, value } = e.target;
        // setClassCategoriesInfo((prevData) => {
        //     let obj = prevData[0];
        //     obj = {...obj, [name]: value}
        //     return [obj]
        // });
        const { name, value } = e.target;
        setClassCategoriesInfo((prevData) => {
            const newData = { ...prevData, [name]: value };
            console.log(newData); // Log the updated data
            return newData;
        });
    };


    const handleInputChangeAutobiography = (e) => {
        // setAutobiographyInfo((prevData) => {
        //     let obj = prevData[0];
        //     obj = {...obj, [name]: value}
        //     return [obj]
        // });
        const { name, value } = e.target;
        setAutobiographyInfo((prevData) => {
            const newData = { ...prevData, [name]: value };
            console.log(newData); // Log the updated data
            return newData;
        });
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
                                <label className={cl.label}>Номер документа</label>
                                <input
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
                                <label className={cl.label}>Дата документа</label>
                                    <input
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
                                <label className={cl.label}>Дата последннй аттестации</label>
                                    <div className={cl.datePickerContainer}>
                                        <input
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
                                    <label className={cl.label}>Результат аттестации</label>
                                    <input
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
                                <label className={cl.label}>Звание</label>
                                    <select
                                    className={cl.workerInfoSelect}
                                    value={rankInfo.militaryRank}
                                    name='militaryRank'
                                    onChange={handleInputChangeRank}
                                >
                                    <option value="" disabled>Выберите звание</option>
                                    {/* {departments.map((rank) => (
                                      <option key={rank.id} value={rank.rankTitle}>
                                        {rank.rankTitle}
                                      </option>
                                    ))} */}
                                    {departments.map((rank) => (
                                        <option key={rank.id}>
                                           {rank.rankTitle}
                                        </option>
                                    ))}
                         
                                </select>
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Дата получения</label>
                                <div className={cl.datePickerContainer}>
                                    <input
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
                                <label className={cl.label}>Вид присвоения</label>
                                    <select
                                    className={cl.workerInfoSelect}
                                    value={rankInfo.receivedType}
                                    name='receivedType'
                                    onChange={handleInputChangeRank}
                                    >
                                    <option value="">Выберите вид присвоения</option>
                                    <option value="Досрочное присвоение">Досрочное присвоение</option>
                                    <option value="Внеочередное">Внеочередное</option>
                                    <option value="На одну ступень выше специального звания">На одну ступень выше специального звания</option>
                                </select>
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
                                <label className={cl.label}>Классные категория</label>
                                    <select
                                    className={cl.workerInfoSelect}
                                    value={classCategoriesInfo.categoryType}
                                    name='categoryType'
                                    onChange={handleInputChangeClassCategories}
                                    // onChange={(e) => handleInputChangeClassCategories('categoryType', e.target.value)}
                                >
                                    <option value="">Выберите категорию</option>
                                    <option value="спец 2 категории">Специалист 2 категории</option>
                                    <option value="спец 1 категории">Специалист 1 категории</option>
                                    <option value="наставник">Наставник</option>
                                </select>
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
                            <input
                                className={cl.workerInfoText}
                                type="text"
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