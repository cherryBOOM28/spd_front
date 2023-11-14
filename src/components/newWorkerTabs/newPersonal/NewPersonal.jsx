import React from 'react';
import axios from 'axios';
import cl from './NewPersonal.module.css';
import { useForm } from '../formProvider/FormProvider';
// import Cookies from 'js-cookie';


function NewPersonal({ iin, data }) {
  //   const token = Cookies.get('token')
  // console.log('Received ID:', id);

  const { personalData, setPersonalData } = useForm();

  const handleSubmit = async(event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/general_info/', {
        personal_data: personalData,
    })
        .then((response) => {
        // console.log('Ответ от сервера:', response.data);
        })
        .catch((error) => {
        // console.error('Ошибка при отправке данных:', error);
        });
    };

  // ИЗМЕНЕНИЯ В INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPersonalData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

  return (
    <div className={cl.info__block}>
        <form onSubmit={handleSubmit}>
            <div className={cl.workerBlock}>
             
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Подразделение</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                name="departament"
                                value={personalData.departament}
                                onChange={handleInputChange}
                            />
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Должность</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                name="jposition"
                                value={personalData.jposition}
                                onChange={handleInputChange}
                            />
                    </div>
                </div>
                <div className={cl.column}>
                    <div className={cl.rows}>
                        <label className={cl.label}>Семейное положение</label>
                            <select
                            className={cl.workerInfoSelect}
                            name="family_status"
                            value={personalData.family_status}
                            onChange={handleInputChange}
                            >
                                <option value="">Выберите семейное положение</option>
                                <option value="Не женат/не замужем">Неженат/незамужем</option>
                                <option value="Женат/замужем">Женат/замужем</option>
                                <option value="Вдова/вдовец">Вдова/вдовец</option>
                                <option value="Разведена/разведен">Разведен/разведена</option>
                            </select>
                    </div>
                    <div className={cl.rows}>
                        <label className={cl.label}>Город подразделения</label>
                            <input
                                type="text"
                                className={cl.workerInfo}
                                name="city"
                                value={personalData.city}
                                onChange={handleInputChange}
                            />
                    </div>
                </div>
            </div>
            {/* <Button onClick={handleSubmit} type="submit" className={cl.actionBtn}>Сохранить</Button> */}
        </form>
    </div>

  )
}

export default NewPersonal;