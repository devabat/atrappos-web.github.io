
const initialState = {
    mapLayer: "osmMapnik"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'SET_MAP_LAYER':
            return {
                ...state,
                mapLayer: action.mapLayer
            };
        default:
            return state;
    }
}
