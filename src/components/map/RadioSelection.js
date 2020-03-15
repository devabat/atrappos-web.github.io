import React from 'react';
export default (props) => {
    const { list, type, sendData, element } = props;
    return (
        <div className="radio-group" onChange={sendData}>
            {element === "polyline" ?
                <React.Fragment>
                    {list.map((lvl, idx) => {
                        return <label className="radio-container radio-container--polyline" key={lvl.cls}>
                            <span className="label--text">{lvl.lbl}</span>
                            <span style={type === "difficulty" ?
                                {"borderLeft": lvl.val + "px solid #6D7778"}:
                                {"backgroundColor": lvl.val}
                            } className={"preview " + type + " " + lvl.cls} />
                            <input type="radio"
                                   name={type + "-lvl"}
                                   value={lvl.val}
                                   defaultChecked={idx === 0} />
                            <span className={"checkmark " + lvl.cls}/>
                        </label>
                    })
                    }
                </React.Fragment>:null}
            {element === "marker" ?
                <React.Fragment>
                    {list.map((markerType, idx) => {
                        return <div className="marker-selection" title={markerType.title}
                                    key={markerType.val}>
                            <img src={require(`../../assets/img/radio/${markerType.val}-radio.png`)}
                                 alt={markerType.lbl + " marker icon"}/>
                            <label className="radio-container radio-container--marker">
                                <span className="label--text">{markerType.lbl}</span>
                                <input type="radio"
                                       name={type + "-type"}
                                       value={markerType.val}
                                       defaultChecked={idx === 0}/>
                                <span className={"checkmark " + markerType.val} />
                            </label>
                        </div>

                        })
                    }
                </React.Fragment>:null}
        </div>
    )
};
