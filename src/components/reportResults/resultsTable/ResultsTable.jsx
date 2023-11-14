import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';


const ResultTable = ({results, setResults, formData, selected, columns, count, next, previous }) => {
    const generalInfoRequest = ["surname", "firstname", "patronymic"];
    const columnNames = Object.keys(generalInfoRequest)
    // const tableHead = {"firstname" : "Имя", "surname": "Фамилия", "patronymic": "Отчество"};
    const fieldNames = generalInfoRequest.concat(Object.keys(formData));
    // const fieldNames = Object.keys(formData)
    const [table, setTable] = useState([])
    useEffect(()=> {
        setTable(results)
        setPrevious(previous)
        setNext(next)
        // console.log("results",table);
        // console.log("results table",results);

        // console.log(nextLocal);
        // console.log(previous);
        // console.log(selected);
        
    })
    // const [countLocal, setCount] = useState(count)
    const [prevLocal, setPrevious] = useState('')
    const [nextLocal, setNext] = useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const [url, setURL] = useState('')
    const handleChangePage = (event, newPage) => {
    };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    const getColumnName = (fieldName) => {
        console.log(columns.filter(o => o.id === fieldName)[0].label);
        return columns.filter(o => o.id === fieldName)[0].label;
    }



  return (
    <Paper style={{ marginTop: '20px', borderRadius: '5px' }} sx={{  width: '77.5vw', overflow: 'hidden' }}>
        <div>
            <TableContainer sx={{  maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">

                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 50 }}>Имя</TableCell>
                            <TableCell style={{ minWidth: 50 }}>Фамилия</TableCell>
                            <TableCell style={{ minWidth: 50 }}>Отчество</TableCell>
                            {selected.filter(item => item !== 'firstname' && item !== 'surname' && item !== 'patronymic').map((fieldName) => {
                                return (
                                    <TableCell style={{ minWidth: 100 }} key={fieldName}>
                                        {getColumnName(fieldName)}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {table.map((person) => (
                            <TableRow  key={person.general_info.id}>
                                <TableCell style={{ minWidth: 50 }}>
                                    {person.general_info['firstname']}
                                </TableCell>
                                <TableCell style={{ minWidth: 50 }}>
                                    {person.general_info['surname']}
                                </TableCell>
                                <TableCell style={{ minWidth: 50 }}>
                                    {person.general_info['patronymic']}
                                </TableCell>

                                {selected
                                    .filter(item => item !== 'firstname' && item !== 'surname' && item !== 'patronymic')
                                    .map((fieldName) => {
                                    return (
                                        <TableCell key={fieldName} style={{ minWidth: 50 }}>
                                            {person.general_info[fieldName]}

                                            {person.personal_data &&
                                                person.personal_data[0] &&
                                                person.personal_data[0][fieldName]
                                            }

                                            {person.family_compositions && person.family_compositions.map((relative, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in relative && relative[fieldName]}
                                                    </div>
                                                // </TableRow>
                                            ))}

                                            {person.educations && person.educations.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow>
                                            ))}

                                            {/* {person.educations && person.educations[0][fieldName]} */}

                                            {/* {person.owning_languages &&
                                                person.owning_languages[0] &&
                                                person.owning_languages[0][fieldName]} */}

                                            {person.owning_languages && person.owning_languages.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow>
                                            ))}

                                            {person.courses && person.courses.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow>
                                            ))}

                                            {person.academic_degree && person.academic_degree.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow>
                                            ))}

                                            {person.sport_results && person.sport_results.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow>
                                            ))}

                                            {person.working_histories && person.working_histories.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow
                                            ))}

                                            {person.awards && person.awards.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow
                                            ))} 

                                            {person.sick_leaves && person.sick_leaves.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow
                                            ))} 

                                            {person.investigation_retrievals && person.investigation_retrievals.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow
                                            ))} 

                                            {person.orders_list && person.investigation_retrievals.map((data, index) => (
                                                // <TableRow>
                                                    <div style={{ minWidth: 50 }} key={fieldName}>
                                                        {fieldName in data && data[fieldName]}
                                                    </div>
                                                // </TableRow
                                            ))}
                                            {person.military_rank &&
                                                person.military_rank[0] &&
                                                person.military_rank[0][fieldName]}

                                            {person.spec_checks &&
                                                person.spec_checks[0] &&
                                                person.spec_checks[0][fieldName]}

                                            {person.attestations &&
                                                person.attestations[0] &&
                                                person.attestations[0][fieldName]}

                                            {person.class_categories &&
                                                person.class_categories[0] &&
                                                person.class_categories[0][fieldName]}

                                            {person.autobiography &&
                                                person.autobiography[0] &&
                                                person.autobiography[0][fieldName]}

                                        </TableCell> 
                                    )     
                                })}   
                                {/* {person.family_compositions && person.family_compositions.map((relative, index) => (
                                    <TableRow key={index}>
                                        {selected.map((fieldName) => (
                                        <TableCell style={{ minWidth: 50 }} key={fieldName}>
                                            {fieldName in relative && relative[fieldName]}
                                        </TableCell>
                                        ))}
                                    </TableRow>
                                ))}  */}
                              
                            </TableRow>  
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                    rowsPerPage={2}
                    component="div"
                    count={count}
                    page={page}
                    onPageChange={handleChangePage}
                />
        </div>
       
    </Paper>
  );
};

export default ResultTable;

