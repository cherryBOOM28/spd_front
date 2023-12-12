import React, { useState } from 'react'
import Button from '../../UI/button/Button';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import cl from './Appointment.module.css'

function Appointment() {
    const [formData, setFormData] = useState({
        firstName: '',
        surname: '',
        patronymic: '',
        gender: '',
        position: '',
        department: '',
        monthCount: 0,
        base: '',
    });
    
    const positionsList = [
        'Руководитель департамента',
        'Заместитель руководителя департамента',    
        'Руководитель управления',
        'Заместитель руководителя управления',    
        'Оперуполномоченный по особо важным делам',
        'Старший оперуполномоченный',    
        'Оперуполномоченный'
    ];

    const departmentsList = [
        'ЦА',
        'Управление по городу Алматы',    
        'Управление по городу Шымкент',
        'Управление по Акмолинской области',    
        'Управление по Актюбинской области',
        'Управление по Алматинской  области',    
        'Управление по области Жетісу',
        'Управление по Атырауской области',    
        'Управление по Восточно-Казахстанской области',
        'Управление по области Абай',    
        'Управление по Жамбылской области',
        'Управление по Западно-Казахстанской области',    
        'Управление по Карагандинской области',
        'Управление по области Ұлытау',    
        'Управление по Костанайской области',
        'Управление по Кызылординской области',    
        'Управление по Мангистауской области',
        'Управление по Павлодарской области',    
        'Управление по Северо-Казахстанской области',
        'Управление по по Туркестанской области'
    ];

    const base = [
        'представление',
        'рапорт',
        'заявление',
        'протокол и докладная записка',
    ]

    const handleFormSubmit = async () => {
        try {
            if (!formData.firstName || !formData.surname || !formData.patronymic || !formData.gender || !formData.department || !formData.position | !formData.monthCount | !formData.base) {
                // Show a warning notification
                NotificationManager.warning('Пожалуйста, зполните все поля!', 'Поля пустые', 3000);
                return; // Stop form submission
            };

            const accessToken = Cookies.get('jwtAccessToken');
            const response = await axios.post('http://127.0.0.1:8000/api/v1/generate-appointment-decree/', formData, {
                headers: {
                'Authorization': `Bearer ${accessToken}`,
                },
                responseType: 'blob', // Set the response type to blob
            });

            // Create a blob from the response data
            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            // Create a download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'document.docx'); // Set the desired file name with the correct extension
            document.body.appendChild(link);

            // Trigger the download
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            console.log("formData", formData)
            } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={cl.appointmentForm} style={{ marginTop: '80px' }}>
            <div>
                <p className={cl.headline}>Приказ о назначении</p>  
            </div>
        
            <div className={cl.form}>
                <div className={cl.row}>
                    <div>
                        <label className={cl.label}>Имя</label>
                        <input
                            type="text"
                            placeholder="Имя"
                            className={cl.workerInfo}
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className={cl.label}>Фамилия</label>
                        <input
                            type="text"
                            placeholder="Фамилия"
                            className={cl.workerInfo}
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                        />
                    </div>
                </div>
                <div className={cl.row}>
                    <div>
                        <label className={cl.label}>Отчество</label>
                        <input
                            type="text"
                            placeholder="Отчество"
                            name='patronymic'
                            className={cl.workerInfo}
                            value={formData.patronymic}
                            onChange={(e) => setFormData({ ...formData, patronymic: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className={cl.label}>Пол</label>
                        <select
                            name='gender'
                            placeholder="Пол"
                            className={cl.workerInfoSelect}
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            >
                            <option value="">Выберите пол</option>
                            <option value="Женский">Женский</option>
                            <option value="Мужской">Мужской</option>
                        </select>
                    </div>
                </div>
                <div className={cl.row}>
                    <div>
                        <label className={cl.label}>Должность</label>
                        <select
                            value={formData.position}
                            className={cl.workerInfoSelect}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            >
                            <option value="" disabled>Выберите должность</option>
                            {positionsList.map((position) => (
                                <option key={position} value={position}>
                                {position}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className={cl.label}>Департамент</label>
                        <select
                            value={formData.department}
                            className={cl.workerInfoSelect}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            >
                            <option value="" disabled>Выберите департамент</option>
                            {departmentsList.map((department) => (
                                <option key={department} value={department}>
                                {department}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={cl.row}>
                    <div>
                        <label className={cl.label}>Срок испытательного периода</label>
                        <input
                            type="number"
                            placeholder="Срок испытательного периода"
                            className={cl.workerInfoSelect}
                            value={formData.monthCount}
                            onChange={(e) => setFormData({ ...formData, monthCount: e.target.value })}
                            style={{ width: '270px', height: '28px' }}
                        />
                    </div>
                    <div>
                        <label className={cl.label}>Oснование</label>
                        <select
                            value={formData.base}
                            className={cl.workerInfoSelect}
                            onChange={(e) => setFormData({ ...formData, base: e.target.value })}
                            >
                            <option value="" disabled>Выберите основание</option>
                            {base.map((base) => (
                                <option key={base} value={base}>
                                {base}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
            </div>
            <Button onClick={handleFormSubmit} className={cl.btn}>Получить приказ</Button>
            <NotificationContainer />
      </div>
    )
}

export default Appointment;
