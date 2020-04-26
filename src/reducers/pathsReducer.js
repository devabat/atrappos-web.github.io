
const initialState = {
    emptyCollection: true,
    emptyName: false,
    disableSave: true,
    disableDraw: false,
    allPaths: [],
    mapLayer: "osmMapnik"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'EMPTY_COLLECTION':
            return {
                ...state,
                emptyCollection: action.emptyCollection
            };
        case 'EMPTY_NAME':
            return {
                ...state,
                emptyName: action.emptyName
            };
        case 'ALL_PATHS':
            return {
                ...state,
                allPaths: action.allPaths
            };
        case 'SET_MAP_LAYER':
            return {
                ...state,
                mapLayer: action.mapLayer
            };
        case 'DISABLE_SAVE':
            return {
                ...state,
                disableSave: action.disableSave
            };
        case 'DISABLE_DRAW' :
            return {
                ...state,
                disableDraw: action.disableDraw
            };
        default:
            return state;
    }
}
