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


function PersonnelData({ autobiographyInfo, specCheckInfo, attestationInfo, classCategoriesInfo, rewardsInfo, sickLeavesInfo, investigationsInfo, rankInfo, militaryRank, rankArchive }) {
    const { id, iin } = useParams();
    
                            
    
    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
            <SpecChecks 
                id={id} 
                specCheckInfo={specCheckInfo}
            />
            <ClassCategories 
                id={id} 
                classCategoriesInfo={classCategoriesInfo}
            />
            <Autobiography 
                id={id} 
                iin={iin} 
                autobiographyInfo={autobiographyInfo}
            />
            <Attestations  
                id={id} 
                attestationInfo={attestationInfo}
            />
            <MilitaryRank 
                id={id} 
                rankInfo={rankInfo}
                militaryRank={militaryRank}
                rankArchive={rankArchive}
            />
            <Awards 
                id={id} 
                rewardsInfo={rewardsInfo}
            />
            <Table 
                id={id} 
                sickLeavesInfo={sickLeavesInfo}
            />
            <InvestigationRetrievals   
                id={id}
                investigationsInfo={investigationsInfo}
            />
            </div>
        </div>
    );
}

export default PersonnelData;

