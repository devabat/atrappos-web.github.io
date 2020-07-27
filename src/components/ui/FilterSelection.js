import React from 'react';

export default (props) => {
    const { list, type, applyFilters, filterObjective, filterSubjective, category} = props;

    return (
        <div className="filter-group">
            <React.Fragment>
                {list.map((lvl, idx) => {
                    return idx !== 0 ? <label className="filter-container"
                                              htmlFor={category + "-" + lvl.label}
                                              key={lvl.className}>
                        <span className="label--text">{lvl.label}</span>
                        <span style={type === "objective" ?
                            {"borderLeft": lvl.value + "px solid #6D7778"}:
                            {"backgroundColor": lvl.value}
                        } className={"preview " + type + " " + lvl.className} />
                        <input type="checkbox"
                               id={category + "-" + lvl.label}
                               name={lvl.value}
                               value={lvl.value}
                               checked={(type === 'objective' ? (filterObjective && filterObjective.includes(lvl.value) ) : (filterSubjective && filterSubjective.includes(lvl.value)))}
                               onChange={(e)=> {applyFilters(type, e.target)}}
                        />
                        <span className={"checkmark " + lvl.className + " " + type}/>
                    </label>:null
                })
                }
            </React.Fragment>
        </div>
    )
};
