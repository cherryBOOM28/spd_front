import React, { useState } from 'react';
import cl from './NewInvestigationRetrievals.module.css';
import Button from '../../../../components/UI/button/Button';

import { useForm } from '../../formProvider/FormProvider';


function NewInvestigationRetrievals(props) {
    const {investigationsInfo, setInvestigationsInfo} = useForm();;

    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        investigation_decree_type: '',
        investigation_decree_number: '',
        investigation_date: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {

            // if (!inputData.order_type_investigation || !inputData.order_doc_numb) {
            //     alert('Пожалуйста, заполните все поля!');
            //     return;
            // }

            const newData = {
                investigation_decree_type: inputData.investigation_decree_type,
                investigation_decree_number: inputData.investigation_decree_number,
                investigation_date: inputData.investigation_date,
            };

            setInvestigationsInfo((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

      
            setInputData({
                investigation_decree_type: '',
                investigation_decree_number: '',
                investigation_date: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        investigation_decree_type: '',
        investigation_decree_number: '',
        investigation_date: '',
    });

    // eslint-disable-next-line 
    const [editingId, setEditingId] = useState(null);


    return (
        <div className={cl.totalInfoWrapper} style={{ marginTop: '40px' }}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Служебные расследования, взыскания</p>
            </div>
        </div>
        <div>
            <div>
            {/* <Button onClick={handleShowForm}>Добавить награду</Button> */}
            <form onSubmit={handleAddNewData} style={{ marginTop: '10px' }}>
                <table className={cl.customTable}>
                    <tbody >
                        <tr>
                            <td>
                                <select
                                    className={cl.formInput}
                                    value={inputData.investigation_decree_type}
                                    name='investigation_decree_type'
                                    onChange={(e) => setInputData({ ...inputData, investigation_decree_type: e.target.value })}
                                >
                                    <option value="">Выберите вид взыскания</option>
                                    <option value="замечания">Замечания</option>
                                    <option value="Выговор">Выговор</option>
                                    <option value="Строгий выговор">Строгий выговор</option>
                                    <option value="Неполное служебное соответствие">Неполное служебное соответствие</option>
                                    <option value="Увольнение">Увольнение</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    className={cl.formInput}
                                    placeholder="Номер приказа"
                                    name='investigation_decree_number'
                                    value={inputData.investigation_decree_number}
                                    onChange={(e) => setInputData({ ...inputData, investigation_decree_number: e.target.value })}
                                />
                            </td>
                            <td>
                                <div className={cl.datePickerContainer}>
                                <input
                                    type="date"
                                    className={cl.formInput}
                                    placeholder="Дата приказа"
                                    name='investigation_date'
                                    value={inputData.investigation_date || ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value;
                                        setInputData((prevWorker) => ({
                                        ...prevWorker,
                                        investigation_date: newDate,
                                        }));
                                    }}
                                />
                                </div>
                            </td>
                            <td><Button type="submit" onClick={handleShowForm}>Добавить</Button></td>
                        </tr>
                        
                    </tbody>
                </table>
            </form>
                {showForm && (
                     <div>
                     <table className={cl.customTable} style={{ marginTop: '20px' }}>
                         <thead>
                             <tr>
                                <td>Тип приказа</td>
                                <td>Номер приказа служебного расследования</td>
                                <td>Дата приказа</td>
                             </tr>
                         </thead>
                         <tbody>
                             {investigationsInfo.slice(1).map((d, i) => (
                                 <tr key={i}>
                                     <td>  
                                         {editingId === d.id ? (
                                             <select
                                                 className={cl.selectRelative_type}
                                                 value={editedData.investigation_decree_type}
                                                 name='investigation_decree_type'
                                                 onChange={(e) => setEditedData({ ...editedData, investigation_decree_type: e.target.value })}
                                             >
                                                 <option value="">Выберите вид взыскания</option>
                                                <option value="замечания">Замечания</option>
                                                <option value="Выговор">Выговор</option>
                                                <option value="Строгий выговор">Строгий выговор</option>
                                                <option value="Неполное служебное соответствие">Неполное служебное соответствие</option>
                                                <option value="Увольнение">Увольнение</option>
                                             </select>
                                         ) : (
                                             d.investigation_decree_type
                                         )}
                                     </td>
                                     <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.investigation_decree_number} onChange={(e) => setEditedData({ ...editedData, investigation_decree_number: e.target.value })} /> : d.investigation_decree_number}</td>
                                     <td>
                                     {editingId === d.id ? (
                                         <div className={cl.datePickerContainer}>
                                             <input
                                                 type="date"
                                                 className={cl.formInput}
                                                 name='investigation_date'
                                                 value={editedData.investigation_date || ''}
                                                 onChange={(e) => {
                                                    const newData = e.target.value;
                                                    setEditedData((prevData) => ({
                                                        ...prevData,
                                                        investigation_date: newData,
                                                    }));
                                                }}
                                             />
                                         </div>
                                     ) : (
                                         d.investigation_date
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
    );
}

export default NewInvestigationRetrievals;