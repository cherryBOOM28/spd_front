import React from 'react';
import cl from './PersonnelData.module.css';
import { useParams } from 'react-router-dom';
import TableSickLeaves from './table/Table';
import SpecChecks from './specСhecks/SpecChecks';
import Attestations from './attestations/Attestations';
import Awards from './awards/Awards';
import ClassCategories from './classCategories/ClassCategories';
import MilitaryRank from './militaryRank/MilitaryRank';
import InvestigationRetrievals from './investigationRetrievals/InvestigationRetrievals';
import Autobiography from './autobiography/Autobiography';


function PersonnelData
    ({ 
        autobiographyInfo, setAutobiographyInfo,
        specCheckInfo, setSpecCheckInfo,
        attestationInfo, setAttestationInfo, 
        classCategoriesInfo, setClassCategoriesInfo,
        rewardsInfo, setRewardsInfo, 
        sickLeavesInfo, setSickLeavesInfo,
        investigationsInfo, setInvestigationsInfo,
        rankInfo, setRankInfo,
        militaryRank, setMilitaryRank,
        rankArchive 
    }) {
    const { id, iin } = useParams();
    
    return (
        <div className={cl.personalWrapper}>
            <div className={cl.container}>
            <SpecChecks 
                id={id} 
                specCheckInfo={specCheckInfo}
                setSpecCheckInfo={setSpecCheckInfo}
            />
            <ClassCategories 
                id={id} 
                classCategoriesInfo={classCategoriesInfo}
                setClassCategoriesInfo={setClassCategoriesInfo}
            />
            <Autobiography 
                id={id} 
                iin={iin} 
                autobiographyInfo={autobiographyInfo}
                setAutobiographyInfo={setAutobiographyInfo}
            />
            <Attestations  
                id={id} 
                attestationInfo={attestationInfo}
                setAttestationInfo={setAttestationInfo}
            />
            <MilitaryRank 
                id={id} 
                rankInfo={rankInfo}
                setRankInfo={setRankInfo}
                militaryRank={militaryRank}
                setMilitaryRank={setMilitaryRank}
                rankArchive={rankArchive}
            />
            <Awards 
                id={id} 
                rewardsInfo={rewardsInfo}
                setRewardsInfo={setRewardsInfo}
            />
            <TableSickLeaves 
                id={id} 
                sickLeavesInfo={sickLeavesInfo}
                setSickLeavesInfo={setSickLeavesInfo}
            />
            <InvestigationRetrievals   
                id={id}
                investigationsInfo={investigationsInfo}
                setInvestigationsInfo={setInvestigationsInfo}
            />
            </div>
        </div>
    );
}

export default PersonnelData;

