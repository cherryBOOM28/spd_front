import React, { useState } from 'react';
import cl from './NewPersonnelData.module.css';
import Button from '../../../components/UI/button/Button';
import { useForm } from '../formProvider/FormProvider';

import NewSickLeaves from './sick_leaves/NewSickLeaves';
import NewAwards from './awards/NewAwards';
import NewInvestigationRetrievals from './investigation_retrievals/NewInvestigationRetrievals';



const NewPersonnelData = (props) => {
    
    const {spec_checks, setSpec_checks} = useForm();
    const {attestations, setAttestations} = useForm();
    const {military_rank, setMilitary_rank} = useForm();
    const {class_category, setClass_category} = useForm();
    const {autobiography, setAutobiography} = useForm();

    // eslint-disable-next-line 
    const [inputData, setInputData] = useState({ 
        docNumber: '',
        docDate: '',
        
        attResult: '',
        lastAttDate: '',
        
        military_rank: '',
        received_date: '',
        type_of_receipt: '',
        position: '',

        category_type: '',

        autobiography: '',
    });

    const handleAddEducation = async (e) => {
        e.preventDefault();
        try {
            // console.log(inputData)
     

            const newspec_check = [{
                doc_number: inputData.doc_number,
                doc_date: inputData.doc_date,
            }];

            const newattestation_result = [{
                attestation_result: inputData.attestation_result,
                last_attestation_date: inputData.last_attestation_date,
                next_attestation_date: inputData.next_attestation_date,
                
            }];

            const newmilitary_rank = [{
                military_rank: inputData.military_rank,
                received_date: inputData.received_date,
                type_of_receipt: inputData.type_of_receipt,
                position: inputData.position,
                
            }];

            const newcategory_type = [{
                category_type: inputData.category_type,
            }];


            const newautobiography = {
                autobiography: inputData.autobiography,
            };

            setSpec_checks(newspec_check);
            setAttestations(newattestation_result);
            setMilitary_rank(newmilitary_rank);
            setClass_category(newcategory_type);
            setAutobiography(newautobiography);
      
        } catch (error) {
            console.error('Error:', error);
        }
    };

      const handleInputChange = (event) => {
        const { name, value } = event.target;
    
        setSpec_checks((prevData) => {
            // Клонируем массив spec_checks и берем его нулевой элемент
            const updatedData = [...prevData];
            const firstItem = updatedData[0];
        
            firstItem[name] = value;
        
            return updatedData;
        });

        setAttestations((prevData) => {
            const updatedData = [...prevData];
            const firstItem = updatedData[0];
        
            firstItem[name] = value;
        
            return updatedData;
        });

        setMilitary_rank((prevData) => ({
            ...prevData,
            [name]: value,
            // const updatedData = [...prevData];
            // const firstItem = updatedData[0];
        
            // firstItem[name] = value;
        
            // return updatedData;
        }));

        setClass_category((prevData) => {
            const updatedData = [...prevData];
            const firstItem = updatedData[0];
        
            firstItem[name] = value;
        
            return updatedData;
        });

        setAutobiography((prevData) => ({
            [name]: value,
        }));
    };

    return (
        <div className={cl.personalWrapper}>
        <div className={cl.container}>
            <form onSubmit={handleAddEducation}>

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
                                    name="doc_number"
                                    value={spec_checks[0].doc_number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={cl.rows}>
                            <label className={cl.label}>Дата документа</label>
                                <input
                                type="date"
                                className={cl.workerInfo}
                                name='doc_date'
                                value={spec_checks[0].doc_date}
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
                                            name='last_attestation_date'
                                            value={attestations[0].last_attestation_date}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Результат аттестации</label>
                                <input
                                    className={cl.workerInfo}
                                    type="text"
                                    name="attestation_result"
                                    value={attestations[0].attestation_result}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className={cl.column}>
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
                                    value={military_rank.military_rank}
                                    name='military_rank'
                                    onChange={handleInputChange}
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
                                        name='received_date'
                                        value={military_rank.received_date}
                                        onChange={handleInputChange}
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
                                        name="type_of_receipt"
                                        value={military_rank.type_of_receipt}
                                        onChange={handleInputChange}
                                    />
                            </div>
                            <div className={cl.rows}>
                                <label className={cl.label}>Должность</label>
                                    <input
                                        className={cl.workerInfo}
                                        type="text"
                                        name="position"
                                        value={military_rank.position}
                                        onChange={handleInputChange}
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
                                    value={class_category.category_type}
                                    name='category_type'
                                    onChange={handleInputChange}
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
                                name="autobiography"
                                value={autobiography.autobiography}
                                onChange={handleInputChange}
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