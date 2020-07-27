import React from 'react';
import DropDownSelection from "../ui/DropDownSelection";
import {subjectiveTypes, objectiveTypes, mapElementsTooltipContent} from "../../lib/constants";
import InfoTooltip from "../ui/InfoTooltip";


export default (props) => {
    const {sendData, pathObjective, pathSubjective} = props;
    return (
        <React.Fragment>
            <label className="path-actions--label path-actions--label__evaluation">How satisfying do you consider the walking activity in this path?<br/>
                <span>Focus on the <b>&nbsp;walking&nbsp;</b> experience
                        <InfoTooltip id='walkability-evaluation-btn-tltp'
                                 placement="right"
                                 clsName="menu"
                                 gaEvent="select-walkability-evaluation-info"
                                 content={mapElementsTooltipContent["walkability"]}/>
                </span>
            </label>
            <span className="path-actions--caption">(Defines path's width)</span>
            <DropDownSelection list={objectiveTypes}
                               key={'objective-selection-key'}
                               type={'objective'}
                               sendData={sendData}
                               pathObjective={pathObjective}
                               pathSubjective={pathSubjective}
            />
            <label className="path-actions--label path-actions--label__evaluation">How aesthetically pleasing do you find the landscapes in this path?<br/>
                <span>Focus on the <b>&nbsp;visual&nbsp;</b> experience
                        <InfoTooltip id='landscape-evaluation-btn-tltp'
                             placement="right"
                             clsName="menu"
                             gaEvent="select-landscape-evaluation-info"
                             content={mapElementsTooltipContent["landscape"]}/>
                 </span>
            </label>

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
