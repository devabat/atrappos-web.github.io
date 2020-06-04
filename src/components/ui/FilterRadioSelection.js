import React from 'react';

export default (props) => {
    const { list, type, applyFilters, filterObjective, filterSubjective} = props;

    return (
        <div className="radio-group">
            <React.Fragment>
                {list.map((lvl, idx) => {
                    return idx !== 0 ? <label className="radio-container radio-container--filter" key={lvl.className}>
                        <span className="label--text">{lvl.label}</span>
                        <span style={type === "objective" ?
                            {"borderLeft": lvl.value + "px solid #6D7778"}:
                            {"backgroundColor": lvl.value}
                        } className={"preview " + type + " " + lvl.className} />
                        <input type="radio"
                               name={type + "-lvl"}
                               value={lvl.value}
                               checked={(type === 'objective' ? (lvl.value === filterObjective) : (lvl.value === filterSubjective))}
                               onChange={(e)=> {applyFilters(type, e.target.value)}}
                        />
                        <span className={"checkmark " + lvl.className + " " + type}/>
                    </label>:null
                })
                }
            </React.Fragment>
        </div>
    )
};
