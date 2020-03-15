import React from 'react';
export default (props) => {
    const { toggleAction } = props;

    // this is the JSX that will become the Filter UI in the DOM, notice it looks pretty similar to HTML
    // notice in the select element onChange is set to the updateFilter method
    // thus when a user selects a new subway line to view, the component passes the new filter value
    // to the parent component, Map, which reloads the GeoJSON data with the current filter value
    return (
        <div className="can-toggle switch-path-action">
            <input id="e" type="checkbox" onChange={toggleAction}/>
                <label htmlFor="e" className="switch-path-action--lbl">
                    <span className="show-edit-lbl">{"Show/edit"}</span>
                    <div className="can-toggle__switch" data-checked="Yes" data-unchecked="No"></div>
                    <div className="can-toggle__label-text"></div>
                    <span className="create-lbl">{"Create"}</span>
                </label>
        </div>
    )
};
