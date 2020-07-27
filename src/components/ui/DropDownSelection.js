import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import store from "../../store";
import 'react-dropdown/style.css';
import {setDisableEvalBtn} from "../../actions/pathsActions";
import {defaultObjectiveValue, defaultSubjectiveValue} from "../../lib/constants";
import {useSelector} from "react-redux";
export default (props) => {
    const { list, type, sendData, pathObjective, pathSubjective} = props;
    const [objSelectedValue, setObjSelectedValue] = useState(list[0]);
    const [subjSelectedValue, setSubjSelectedValue] = useState(list[0]);

    const pathsReducer = useSelector(state => state.paths);

    const onSelect = (e, type) => {
        e.target = {};
        e.target.name = type;
        sendData(e);
    }

    useEffect(()=> {
        if (pathSubjective && pathObjective && (pathSubjective === defaultSubjectiveValue || pathObjective === defaultObjectiveValue)) {
            store.dispatch(setDisableEvalBtn(true));
        } else {
            store.dispatch(setDisableEvalBtn(false));
        }
        if (pathSubjective) {
            let subjResult = list.filter(obj => {
                return obj.value === pathSubjective
            });
            setSubjSelectedValue(subjResult[0]);
        }
        if (pathObjective) {
            let objResult = list.filter(obj => {
                return obj.value === pathObjective
            });
            setObjSelectedValue(objResult[0]);
        }

    }, [pathSubjective, pathObjective, list]);

    return (
        <Dropdown options={list}
                  disabled={pathsReducer.disableDropdowns}
                  onChange={(e)=> {onSelect(e, type)}}
                  value={type === "objective" ? objSelectedValue : subjSelectedValue}
                  key={type + '-dropdown-key'}
                  className={type}
                  placeholderClassName= {type === "objective" ? objSelectedValue.className : subjSelectedValue.className}
                  placeholder="Select an option" />
    )
};
