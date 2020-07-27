import React, {useEffect, useState} from 'react';
import {
    objectiveTypesKeyValue,
    objectiveTypesSortLabels,
    subjectiveTypesKeyValue,
    subjectiveTypesSortLabels
} from "../../lib/constants";


export const KPIs = (props) => {
    const {userPaths} = props;
    const [paths, setPaths] = useState([]);


    useEffect(()=> {
        setPaths(userPaths);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userPaths]);

    const getTotalDistance = () => {
        let distance = paths.reduce((a, b) => +a + +b.distance, 0);
        return distance ? (distance / 1000).toFixed(2) + ' km':  ' 0 km';
    }

    const groupEvaluationCount = (type) => {
        let list = type === 'objective' ? objectiveTypesKeyValue : subjectiveTypesKeyValue;
        return paths.reduce((p, c) => {
            let evalProp = c.properties[type];
            if (!p.hasOwnProperty(list[evalProp].label)) {
                p[list[evalProp].label] = 0;
            }
            p[list[evalProp].label]++;
            return p;
        }, {});
    }

    return (
        <div className="kpis">
            <div className="kpis__content">
                <div className = "kpis__col">
                    <div className="kpis__hdr">
                        <b>Total paths</b>: <span>{paths.length}</span>
                    </div>
                </div>
                <div className = "kpis__col">
                    <div className="kpis__hdr">
                        <b>Total distance</b>: <span>{getTotalDistance()}</span>
                    </div>
                </div>
            </div>
            <div className="kpis__content">
                <h4 className='path-list__subheader'>Path evaluation totals</h4>
            </div>
            <div className="kpis__content">
                <div className = "kpis__col">
                    <h5>WALKABILITY</h5>
                    {
                        objectiveTypesSortLabels.map((o)=>{
                            return <div className="kpis__row"
                                        key={o + "-key"}>
                                <b>{o}</b>:
                                <span>
                                            {groupEvaluationCount('objective')[o] ?
                                                groupEvaluationCount('objective')[o] : 0
                                            }
                                        </span>
                            </div>
                        })
                    }
                </div>

                <div className="kpis__col">
                    <h5>LANDSCAPE</h5>
                    {
                        subjectiveTypesSortLabels.map((s)=>{
                            return <div className="kpis__row"
                                        key={s + "-key"}>
                                <b>{s}</b>:
                                <span>
                                    {groupEvaluationCount('subjective')[s] ?
                                        groupEvaluationCount('subjective')[s]: 0
                                    }
                                </span>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

