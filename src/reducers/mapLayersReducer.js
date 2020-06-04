
const initialState = {
    mapLayer: "osmMapnik",
    selectedTab: "faq"
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'SET_MAP_LAYER':
            return {
                ...state,
                mapLayer: action.mapLayer
            };
        case 'SET_SELECTED_TAB':
            return {
                ...state,
                selectedTab: action.selectedTab
            };
        default:
            return state;
    }
}
