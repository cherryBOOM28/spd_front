import React from 'react';
import axios from 'axios';
import cl from './ReportOrders.module.css';
import { Paper, Button } from '@mui/material';
import Cookies from 'js-cookie';
import { IoMdDownload } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

function ReportOrders({ decreeInfo }) {
    // const { id } = useParams();
    // const iin = props.iin;

    const handleDownload = (decreeId) => {
        const accessToken = Cookies.get('jwtAccessToken');
    
        axios.get(`http://127.0.0.1:8000/api/v1/download-decree/?decreeId=${decreeId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            responseType: 'blob' // Указываем тип ответа в формате blob
        })
            .then(response => {
                // Проверяем, что ответ сервера не пустой
                if (response.data && response.data.size > 0) {
                    // Выводим содержимое ответа в консоль
                    console.log(response.data);
    
                    // Создаем ссылку для скачивания
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `decree_${decreeId}.docx`);
                    document.body.appendChild(link);
                    link.click();
                    link.parentNode.removeChild(link);
                } else {
                    console.error('Error downloading decree: Empty response');
                }
            })
            .catch(error => {
                console.error('Error downloading decree:', error);
            });
    };
    

    return (
        <div className={cl.totalInfoWrapper}>
        <div className={cl.totalInfoContent}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className={cl.workerCapitalName} style={{ marginBottom: '20px' }}>Приказы</p>
            </div>
            <div>
            {decreeInfo && decreeInfo.decrees && decreeInfo.decrees.length > 0 ? (
                decreeInfo.decrees.map((decree) => (
                    <div key={decree.id} className={cl.card_wrapper}>
                        <Paper elevation={3} className={cl.card}>
                            <div className={cl.circle} />
                            <div className={cl.vertical_line} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px', marginLeft: '30px' }}>
                                <div className={cl.headline_2}>{decree.decreeType}</div>
                            </div>
                            <div className={cl.card_content}>
                                <div className={cl.card_content_inner}>
                                    <div>
                                        <label className={cl.label}>Номер приказа:</label> 
                                        {decree.decreeNumber}
                                    </div>
                                    <div><label className={cl.label}>Дата создания приказа:</label>{decree.decreeDate}</div>
                                    <div>
                                        <label className={cl.label}>Согласовано:</label>
                                        {decree.isConfirmed ? (
                                            <span style={{ color: '#1565C0', verticalAlign: 'middle' }}>
                                                <FaCheck style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Да
                                            </span>
                                        ) : (
                                            <span><FaXmark   style={{ verticalAlign: 'middle', fontSize: '16px', marginRight: '5px' }}/>Нет</span>
                                        )}
                                    </div>

                                </div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={cl.card_button}
                                    style={{ textTransform: 'none' }}
                                    onClick={() => handleDownload(decree.id)}
                                >
                                    <IoMdDownload />
                                    Скачать
                                </Button>
                            </div>
                        </Paper>
                    </div>
                ))
            ) : (
                <div className={cl.headline_2} style={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>Нет доступных приказов</div>
            )}

            </div>
        </div>
        <div>
           
          
        </div>
    </div>
    );
}

export default ReportOrders;