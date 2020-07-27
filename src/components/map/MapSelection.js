import React from 'react';
import store from "../../store";
import { mapLayersTitles, mapLayers } from "../../lib/constants";
import {setMapLayer} from "../../actions/pathsActions";
import {useSelector} from "react-redux";
import {sendGaEvent} from "../../lib/utils";


const MapSelection =()=> {

    const mapLayersReducer = useSelector(state => state.mapLayers);

    const toggleSelectedMap = (id) => {
        store.dispatch(setMapLayer(id));
        sendGaEvent({category: "map-layer-selected-" + id, action: 'map-action'});
    };

    return (
     <div className='map-selection__inner'>
         <h2>Select Map Style</h2>
        <div>
            {mapLayersTitles.map((id)=> {
               return <div id={id} key={id}
                           className="map-preview"
                           onClick={()=> {toggleSelectedMap(id)}}>
                       <div  className={'bg-map-preview bg-' + id}>
                            <h6>{mapLayers[id].title}</h6>
                       </div>
                       <div className={"map-layer" + (mapLayersReducer.mapLayer === id ?
                           " map-layer--selected": "")}>
                       </div>
                </div>
            })

            }
        </div>
     </div>

    );
};

export default MapSelection;
