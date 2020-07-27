
const initialState = {
    emptyPath: true,
    emptyName: false,
    disableSave: true,
    disableDraw: false,
    unchangedObjective: false,
    unchangedSubjective: false,
    unchangedName: false,
    unchangedDescription: false,
    pathEvaluated: false,
    pathEdited: false,
    disableEvalBtn: false,
    evalChangeNotSubmitted: false,
    disableDropdowns: false,
    allPaths: {
        fetching: false,
        fetched: false,
        payload: null
    },
    includeUserPaths: true,
    hideBubble: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'EMPTY_PATH':
            return {
                ...state,
                emptyPath: action.emptyPath
            };
        case 'EMPTY_NAME':
            return {
                ...state,
                emptyName: action.emptyName
            };
        case 'GET_ALL_PATHS_PENDING':
            return {
                ...state,
                allPaths: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_ALL_PATHS_REJECTED':
            return {
                ...state,
                allPaths: {
                    fetching: false,
                    fetched: false,
                    payload: action.payload
                }
            };
        case 'GET_ALL_PATHS_FULFILLED':
            return {
                ...state,
                allPaths: {
                    fetching: false,
                    fetched: true
                }
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
        case 'UNCHANGED_OBJECTIVE' :
            return {
                ...state,
                unchangedObjective: action.unchangedObjective
            };
        case 'UNCHANGED_SUBJECTIVE' :
            return {
                ...state,
                unchangedSubjective: action.unchangedSubjective
            };
        case 'UNCHANGED_NAME' :
            return {
                ...state,
                unchangedName: action.unchangedName
            };
        case 'UNCHANGED_DESCRIPTION' :
            return {
                ...state,
                unchangedDescription: action.unchangedDescription
            };
        case 'PATH_EVALUATED':
            return {
                ...state,
                pathEvaluated: action.pathEvaluated
            };
        case 'PATH_EDITED':
            return {
                ...state,
                pathEdited: action.pathEdited
            };
        case 'DISABLE_EVAL_BTN':
            return {
                ...state,
                disableEvalBtn: action.disableEvalBtn
            };
        case 'EVAL_CHANGE_NOT_SUBMITTED':
            return {
                ...state,
                evalChangeNotSubmitted: action.evalChangeNotSubmitted
            };
        case 'DISABLE_DROPDOWNS':
            return {
                ...state,
                disableDropdowns: action.disableDropdowns
            };
        case 'INCLUDE_USER_PATHS':
            return {
                ...state,
                includeUserPaths: action.includeUserPaths
            };
        case 'HIDE_BUBBLE':
            return {
                ...state,
                hideBubble: action.hideBubble
            };
        default:
            return state;
    }
}
