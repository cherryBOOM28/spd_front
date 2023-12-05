import React, { useState } from 'react';
import cl from './NewPersonnelData.module.css';
import Button from '../../../components/UI/button/Button';
import { useForm } from '../formProvider/FormProvider';

import NewSickLeaves from './sick_leaves/NewSickLeaves';
import NewAwards from './awards/NewAwards';
import NewInvestigationRetrievals from './investigation_retrievals/NewInvestigationRetrievals';



const NewPersonnelData = (props) => {
    
    const {specCheckInfo, setSpecCheckInfo} = useForm();
    const {attestationInfo, setAttestationInfo} = useForm();
    const {rankInfo, setRankInfo} = useForm();
    const {classCategoriesInfo, setClassCategoriesInfo} = useForm();
    const {autobiographyInfo, setAutobiographyInfo} = useForm();

    // eslint-disable-next-line 
    const [inputData, setInputData] = useState({ 
        docNumber: '',
        docDate: '',
        
        attResult: '',
        lastAttDate: '',
        
        militaryRank: '',
        receivedDate: '',
        receivedType: '',

        categoryType: '',

        autobiographyText: '',
    });

    const [inputDataClassCategories, setInputDataClassCategories] = useState({
        docNumber: '',
        docDate: '',
    });

    const handleInputChange = (name, value) => {
        setSpecCheckInfo((prevData) => {
            let obj = prevData[0];
            obj = {...obj, [name]: value}
            return [obj]
        });
    };

    const handleInputChangeAttestation = (name, value) => {
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

    const handleInputChangeClassCategories = (name, value) => {
        setClassCategoriesInfo((prevData) => {
            let obj = prevData[0];
            obj = {...obj, [name]: value}
            return [obj]
        });
    };


    const handleInputChangeAutobiography = (name, value) => {
        setAutobiographyInfo((prevData) => {
            let obj = prevData[0];
            obj = {...obj, [name]: value}
            return [obj]
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
                                    onChange={(e) => handleInputChange('docNumber', e.target.value)}
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
                                    onChange={(e) => handleInputChange('docDate', e.target.value)}
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
                                            // value={attestationInfo.lastAttDate}
                                            onChange={handleInputChangeAttestation}
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
                                        // value={attestationInfo.attResult}
                                        onChange={handleInputChangeAttestation}
                                    />
                                </div>
                            </div>
                        {/* <div className={cl.column}>
                        <div className={cl.rows}>
                            <label className={cl.label}>Дата следующей аттестации</label>
                            <div className={cl.datePickerContainer}>
                                <input
                                    type="date"
                                    className={cl.workerInfo}
                                    name='next_attestation_date'
                                    value={attestations[0].next_attestation_date || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            </div>
                        </div> */}
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
                                    // value={rankInfo.militaryRank}
                                    name='militaryRank'
                                    onChange={handleInputChangeRank}
                                >
                                    <option value="">Выберите звание</option>
                                    <option value="Рядовой">Рядовой</option>
                                    <option value="Ефрейтор">Ефрейтор</option>
                                    <option value="Младший сержант">Младший сержант	</option>
                                    <option value="Сержант">Сержант</option>
                                    <option value="Старший сержант">Старший сержант	</option>
                                    <option value="Сержант третьего класса">Сержант третьего класса</option>
                                    <option value="Сержант второго класса">Сержант второго класса</option>
                                    <option value="Сержант первого класса">Сержант первого класса</option>
                                    <option value="Штаб-сержант">Штаб-сержант</option>
                                    <option value="Мастер-сержант">Мастер-сержант</option>
                                    <option value="Лейтенант">Лейтенант</option>
                                    <option value="Старший лейтенант">Старший лейтенант	</option>
                                    <option value="Капитан">Капитан</option>
                                    <option value="Майор">Майор</option>
                                    <option value="Подполковник">Подполковник</option>
                                    <option value="Полковник">Полковник</option>
                                    <option value="Генерал-майор">Генерал-майор</option>
                                    <option value="Генерал-лейтенант">Генерал-лейтенант	</option>
                                    <option value="Генерал-полковник">Генерал-полковник</option>
                                    <option value="Генерал армии">Генерал армии</option>  
                                </select>
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Дата получения</label>
                                <div className={cl.datePickerContainer}>
                                    <input
                                        type="date"
                                        className={cl.workerInfo}
                                        name='receivedDate'
                                        // value={rankInfo.receivedDate}
                                        onChange={handleInputChangeRank}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cl.column}>
                            <div className={cl.rows}>
                                <label className={cl.label}>Вид квитанции</label>
                                    <input
                                        className={cl.workerInfo}
                                        type="text"
                                        name="receivedType"
                                        // value={rankInfo.receivedType}
                                        onChange={handleInputChangeRank}
                                    />
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
                                    // value={classCategoriesInfo.categoryType}
                                    name='categoryType'
                                    onChange={handleInputChangeClassCategories}
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
                                // value={autobiographyInfo.autobiographyText}
                                onChange={handleInputChangeAutobiography}
                            />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <Button onClick={handleAddEducation}  className={cl.actionBtn}>Сохранить</Button> */}
            </form>
            <NewAwards />
            <NewSickLeaves />
            <NewInvestigationRetrievals />
        </div>
    </div>
    );
}

export default NewPersonnelData;