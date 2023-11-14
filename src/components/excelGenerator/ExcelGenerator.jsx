import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';


const ExcelGenerator = ({ results, selected, optionsData, setResults, formData }) => {
    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        setExcelData(results);
        console.log("dcfvf", results);
        // console.log("options", optionsData);
        // console.log("selected", selected);
    }, [results]);

    const generateExcelFile = () => {
      if (selected.includes('firstname')) {
        selected = selected.filter((field) => field !== 'firstname');
      }
      if (selected.includes('surname')) {
        selected = selected.filter((field) => field !== 'surname');
      }
      if (selected.includes('patronymic')) {
        selected = selected.filter((field) => field !== 'patronymic');
      }

      let header = ["Имя", "Фамилия", "Отчество", ...selected.map((field) => optionsData.find((option) => option.id === field).label)];
      const data = [header];


      selected = ['firstname', 'surname', 'patronymic', ...selected];
      console.log(selected);

      
            
      excelData.forEach(({ general_info, personal_data, family_compositions, educations, owning_languages, courses, academic_degree, sport_results, working_histories, spec_checks, attestations, awards, investigation_retrievals, class_categories, autobiography, sick_leaves, military_rank, orders_list }) => {
        const rowData = [];
        console.log("rowData", rowData);
      
        // console.log("working_histories",working_histories, working_histories[0]['jposition_work']);  

        selected.forEach((field) => {
          // console.log(`Field: ${field}, Value: ${working_histories[0][field]}`);
          if (field === 'firstname' || field === 'surname' || field === 'patronymic' || field === 'gender' || field === 'birth_date'  || field === 'birth_country'  || field === 'birth_city'  || field === 'birth_region' || field === 'birth_oblast'  || field === 'nationality'  || field === 'id_numbers'  || field === 'id_from' || field === 'phone_number'  || field === 'resid_country'  || field === 'resid_city'  || field === 'resid_region'  || field === 'pin'  || field === 'id_date') {
            if (general_info && general_info[field] !== undefined) {
              rowData.push(general_info[field]);
            } else {
              rowData.push(''); // Если поле отсутствует, добавьте пустое значение
            }
          } else {
            if (personal_data && personal_data[0] && personal_data[0][field] !== undefined) {
              rowData.push(personal_data[0][field]);
            }
          }
          if (family_compositions && family_compositions.length > 0) {
            let cell = ""
            family_compositions.forEach((cellData) => {
              if (cellData[field] !== undefined) {
                cell = cell + cellData[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (educations && educations.length > 0) {
            let cell = ""
            educations.forEach((cellData) => {
              if (cellData[field] !== undefined) {
                cell = cell + cellData[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (owning_languages && owning_languages.length > 0) {
            let cell = ""
            owning_languages.forEach((cellData) => {
              if (cellData[field] !== undefined) {
                cell = cell + cellData[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (courses && courses.length > 0) {
            let cell = ""
            courses.forEach((cellData) => {
              if (cellData[field] !== undefined) {
                cell = cell + cellData[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (academic_degree && academic_degree.length > 0) {
            let cell = ""
            academic_degree.forEach((cellData) => {
              if (cellData[field] !== undefined) {
                cell = cell + cellData[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (sport_results && sport_results.length > 0) {
            let cell = ""
            sport_results.forEach((cellData) => {
              if (cellData[field] !== undefined) {
                cell = cell + cellData[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (working_histories && working_histories.length > 0) {
            let cell = ""
            working_histories.forEach((history) => {
              if (history[field] !== undefined) {
                cell = cell + history[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }

          if (spec_checks && spec_checks[0] && spec_checks[0][field] !== undefined) {
            rowData.push(spec_checks[0][field]);
          }

          if (attestations && attestations.length > 0) {
            let cell = ""
            attestations.forEach((history) => {
              if (history[field] !== undefined) {
                cell = cell + history[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (awards && awards.length > 0) {
            let cell = ""
            awards.forEach((history) => {
              if (history[field] !== undefined) {
                cell = cell + history[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (investigation_retrievals && investigation_retrievals.length > 0) {
            let cell = ""
            investigation_retrievals.forEach((history) => {
              if (history[field] !== undefined) {
                cell = cell + history[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          
          if (class_categories && class_categories[0] && class_categories[0][field] !== undefined) {
            rowData.push(class_categories[0][field]);
          }
          if (autobiography && autobiography[0] && autobiography[0][field] !== undefined) {
            rowData.push(autobiography[0][field]);
          }

          if (sick_leaves && sick_leaves.length > 0) {
            let cell = ""
            sick_leaves.forEach((history) => {
              if (history[field] !== undefined) {
                cell = cell + history[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (military_rank && military_rank.length > 0) {
            let cell = ""
            military_rank.forEach((history) => {
              if (history[field] !== undefined) {
                cell = cell + history[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
          if (orders_list && orders_list.length > 0) {
            let cell = ""
            orders_list.forEach((history) => {
              if (history[field] !== undefined) {
                cell = cell + history[field] + "\n"
              }  
            });
            // console.log(cell)
            if (cell !== "") {
              rowData.push(cell);
            }
          }
         
          // orders_list && orders_list[0][field] !== undefined && rowData.push(orders_list[0][field]);
          // class_categories && rowData.push(class_categories[field]);
        });


      
     
        data.push(rowData);
      });
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
      
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Лист данных");
      
        // Save the workbook as a file
        XLSX.writeFile(wb, "Отчет.xlsx");
      };


    return (
        <div>
            <div onClick={generateExcelFile}>Excel</div>
        </div>
    )
}


export default ExcelGenerator;