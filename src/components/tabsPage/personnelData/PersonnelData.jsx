import React from 'react';
import cl from './PersonnelData.module.css';
import { useParams } from 'react-router-dom';
import Table from './table/Table';
import SpecChecks from './specСhecks/SpecChecks';
import Attestations from './attestations/Attestations';
import Awards from './awards/Awards';
import ClassCategories from './classCategories/ClassCategories';
import MilitaryRank from './militaryRank/MilitaryRank';
import InvestigationRetrievals from './investigationRetrievals/InvestigationRetrievals';
import Autobiography from './autobiography/Autobiography';


function PersonnelData(props) {
    const { id, iin } = useParams();
    
    
    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
            <SpecChecks id={id} />
            <ClassCategories id={id} />
            <Autobiography id={id} iin={iin} />
            <Attestations id={id} />
            <MilitaryRank id={id} />
            <Awards id={id} />
            <Table id={id} />
            <InvestigationRetrievals id={id}/>
            </div>
        </div>
    );
}

export default PersonnelData;

