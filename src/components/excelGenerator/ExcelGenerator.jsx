import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';


const ExcelGenerator = ({ results, selected, optionsData, setResults, formData }) => {
    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        setExcelData(results);
        // console.log("dcfvf", results);
        // console.log("options", optionsData);
        // console.log("selected", selected);
    }, [results]);

    const removePrefix = (fieldName) => {
      const parts = fieldName.split(':');
      return parts.length > 1 ? parts[parts.length - 1] : fieldName;
    };

    const generateExcelFile = () => {
      if (selected.includes('firstName')) {
        selected = selected.filter((field) => field !== 'firstName');
      }
      if (selected.includes('surname')) {
        selected = selected.filter((field) => field !== 'surname');
      }
      if (selected.includes('patronymic')) {
        selected = selected.filter((field) => field !== 'patronymic');
      }

      let header = ["Имя", "Фамилия", "Отчество", ...selected.map((field) => {
        const fieldNameWithoutPrefix = removePrefix(field);
        const label = optionsData.find((option) => option.id === field).label;
        return label || fieldNameWithoutPrefix;
      })];

      //let header = ["Имя", "Фамилия", "Отчество", ...selected.map((field) => optionsData.find((option) => option.id === field).label)];
      const data = [header];


      selected = ['firstName', 'surname', 'patronymic', ...selected];
      // console.log("selected fields", selected);
        
      excelData.forEach((rowData) => {
        const formattedRow = [];
      
        selected.forEach((field) => {
          const fieldNameWithoutPrefix = removePrefix(field);
      
          if (rowData[field] !== undefined) {
            formattedRow.push(rowData[field]);
          } else if (fieldNameWithoutPrefix && rowData[fieldNameWithoutPrefix] !== undefined) {
            formattedRow.push(rowData[fieldNameWithoutPrefix]);
          } else {
            formattedRow.push('пусто');
          }

          
        });
        data.push(formattedRow);
        // console.log("Formatted Row", formattedRow);
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