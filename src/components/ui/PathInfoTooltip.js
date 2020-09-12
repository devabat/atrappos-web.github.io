import React from 'react';
import {objectiveTypesKeyValue, subjectiveTypesKeyValue} from "../../lib/constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow, faMobileAlt, faDesktop} from "@fortawesome/free-solid-svg-icons";


export const PathInfoTooltip = (props) => {
    const {subj, obj, distance, area, name, description, drawType, type} = props;

    const objSel = obj ? objectiveTypesKeyValue[obj] : null;
    const subjSel = subj ? subjectiveTypesKeyValue[subj] : null;

    const getDrawTypeLabel = (drawType) => {
        switch(drawType) {
            case 'phone':
                return ['Via Mobile', faMobileAlt];
            case 'location':
                return ['Via GPS', faLocationArrow];
            default:
                return ['Via Desktop', faDesktop]
        }
    }

    return (
        <div className={'path-list__tltp--content ' + type }>
           {type === 'path-list' && objSel && subjSel ?
               <React.Fragment>
                    <span className='path-list__tltp--info'>
                        <span className='path-list__tltp--info__label'>{"Walkability: "}</span>
                        <span className={"objective path-list__sel--label path-list__obj--label objective-" + objSel.className }>
                            {objSel.label}
                        </span>
                    </span>
                    <span className='path-list__tltp--info'>
                    <span className='path-list__tltp--info__label'>{"Landscape: "}</span>
                        <span className={"subjective path-list__sel--label path-list__subj--label  subjective-" + subjSel.className}>
                            {subjSel.label}
                        </span>
                    </span>
               </React.Fragment>
           :null}
           {type === 'path-map' ?
               <span className='path-list__tltp--info'>
                    <span className='path-list__tltp--info__label'>{"Name: "}</span>
                    <span className="path-list__sel--label">
                            {name ? name: '-'}
                    </span>
                </span>
           :null}
            <span className='path-list__tltp--info'>
                <span className='path-list__tltp--info__label'>{"Distance: "}</span>
                <span className="path-list__sel--label">
                        {distance ? (distance / 1000).toFixed(2) + ' km': '0 km'}
                </span>
            </span>
           <span className='path-list__tltp--info'>
                <span className='path-list__tltp--info__label'>{"Area: "}</span>
                <span className="path-list__sel--label">
                    {area ? area : '-'}
                </span>
            </span>
           {description ?
                <span className='path-list__tltp--info'>
                    <span className='path-list__tltp--info__label'>{"Tag: "}</span>
                    <span className="path-list__sel--label">
                        {description ? description : '-'}
                    </span>
                </span>
           :null}
            {drawType ?
                <span className='path-list__tltp--info'>
                    <span className='path-list__tltp--info__label'>{"Created: "}</span>
                    <span className="path-list__sel--label">
                        <i><FontAwesomeIcon icon={getDrawTypeLabel(drawType)[1]}/></i>
                        <span>{getDrawTypeLabel(drawType)[0]}</span>
                    </span>
            </span>
                :null}
       </div>
    );
};
