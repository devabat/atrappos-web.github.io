import React from 'react';
import DropDownSelection from "../ui/DropDownSelection";
import {subjectiveTypes, objectiveTypes} from "../../lib/constants";


export default (props) => {
    const {sendData, pathObjective, pathSubjective} = props;
    return (
        <React.Fragment>
            <label className="path-actions--label">How satisfying do you consider the walking activity in this path?<br/>
            Focus on the <b>walking</b> experience </label>
            <span className="path-actions--caption">(Defines path's width)</span>
            <DropDownSelection list={objectiveTypes}
                               key={'objective-selection-key'}
                               type={'objective'}
                               sendData={sendData}
                               pathObjective={pathObjective}
                               pathSubjective={pathSubjective}
            />
            <label className="path-actions--label">How aesthetically pleasing do you find the landscapes in this path?<br/>
            Focus on the <b>visual</b> experience</label>
            <span className="path-actions--caption">(Defines path's color)</span>
            <DropDownSelection list={subjectiveTypes}
                               key={'subjective-selection-key'}
                               type={'subjective'}
                               sendData={sendData}
                               pathSubjective={pathSubjective}
                               pathObjective={pathObjective}
            />
    </React.Fragment>
    )
};
