
const initialState = {
    emptyCollection: true,
    emptyName: true,
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
        default:
            return state;
    }
}
