import React, { useState } from 'react';
import cl from './NewInvestigationRetrievals.module.css';
import Button from '../../../../components/UI/button/Button';

import { useForm } from '../../formProvider/FormProvider';


function NewInvestigationRetrievals(props) {
    const {investigation_retrievals, setInvestigation_retrievals} = useForm();;

    const [showForm, setShowForm] = useState(true);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const [inputData, setInputData] = useState({
        order_type_investigation: '',
        order_doc_numb: '',
        order_date_investigation: '',
    });

    const handleAddNewData = async (e) => {
        e.preventDefault();
        try {

            if (!inputData.order_type_investigation || !inputData.order_doc_numb) {
                alert('Пожалуйста, заполните все поля!');
                return;
            }

            const newData = {
                order_type_investigation: inputData.order_type_investigation,
                order_doc_numb: inputData.order_doc_numb,
                order_date_investigation: inputData.order_date_investigation,
            };

            setInvestigation_retrievals((prevArray) => {
                // Create a new array by copying the previous array and adding a new element
                const updatedArray = [...prevArray, newData];
                return updatedArray;
              });

      
            setInputData({
                order_type_investigation: '',
                order_doc_numb: '',
                order_date_investigation: '',
            })
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // EDIT
    const [editedData, setEditedData] = useState({
        order_type_investigation: '',
        order_doc_numb: '',
        order_date_investigation: '',
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
                                    value={inputData.order_type_investigation}
                                    name='awards_type'
                                    onChange={(e) => setInputData({ ...inputData, order_type_investigation: e.target.value })}
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
                                    name='order_doc_numb'
                                    value={inputData.order_doc_numb}
                                    onChange={(e) => setInputData({ ...inputData, order_doc_numb: e.target.value })}
                                />
                            </td>
                            <td>
                                <div className={cl.datePickerContainer}>

                                <input
                                    type="date"
                                    className={cl.formInput}
                                    placeholder="Дата приказа"
                                    name='order_date_investigation'
                                    value={inputData.order_date_investigation || ''}
                                    onChange={(e) => {
                                        const newDate = e.target.value;
                                        setInputData((prevWorker) => ({
                                        ...prevWorker,
                                        order_date_investigation: newDate,
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
                             {investigation_retrievals.slice(1).map((d, i) => (
                                 <tr key={i}>
                                     <td>  
                                         {editingId === d.id ? (
                                             <select
                                                 className={cl.selectRelative_type}
                                                 value={editedData.order_type_investigation}
                                                 name='awards_type'
                                                 onChange={(e) => setEditedData({ ...editedData, order_type_investigation: e.target.value })}
                                             >
                                                 <option value="">Выберите вид взыскания</option>
                                                <option value="замечания">Замечания</option>
                                                <option value="Выговор">Выговор</option>
                                                <option value="Строгий выговор">Строгий выговор</option>
                                                <option value="Неполное служебное соответствие">Неполное служебное соответствие</option>
                                                <option value="Увольнение">Увольнение</option>
                                             </select>
                                         ) : (
                                             d.order_type_investigation
                                         )}
                                     </td>
                                     <td>{editingId === d.id ? <input type="text" className={cl.editInput} value={editedData.order_doc_numb} onChange={(e) => setEditedData({ ...editedData, order_doc_numb: e.target.value })} /> : d.order_doc_numb}</td>
                                     <td>
                                     {editingId === d.id ? (
                                         <div className={cl.datePickerContainer}>
                                             <input
                                                 type="date"
                                                 className={cl.formInput}
                                                 name='order_date'
                                                 value={editedData.order_date_investigation || ''}
                                                 onChange={(e) => {
                                                    const newData = e.target.value;
                                                    setEditedData((prevData) => ({
                                                        ...prevData,
                                                        order_date_investigation: newData,
                                                    }));
                                                }}
                                             />
                                         </div>
                                     ) : (
                                         d.order_date_investigation
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