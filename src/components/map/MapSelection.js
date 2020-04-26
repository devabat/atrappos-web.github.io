import React, {useState} from 'react';
import store from "../../store";
import { mapLayersTitles, mapLayers } from "../../lib/constants";
import {setMapLayer} from "../../actions/actions";


const MapSelection =(props)=> {

    const toggleSelectedMap = (id) => {
        store.dispatch(setMapLayer(id));
    };

    return (
     <div className='map-selection__inner'>
         <h2>Select Map Style</h2>
        <div>
            {mapLayersTitles.map((id)=> {
               return <div id={id} key={id} onClick={()=> {toggleSelectedMap(id)}}>
                   <h6 style={{cursor: "pointer"}}>{mapLayers[id].title}</h6>
                    {/*<img alt={"Layer " + id + " preview"} src={mapLayers[id].title + ".png"} />*/}
                </div>
            })

            }
        </div>
     </div>

    );
};

export default MapSelection;
