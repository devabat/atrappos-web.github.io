
const initialState = {
    drawDurationChart: {
        fetching: false,
        fetched: false
    },
    editCountChart: {
        fetching: false,
        fetched: false
    },
    editDurationChart: {
        fetching: false,
        fetched: false
    },
    evaluationCountChart: {
        fetching: false,
        fetched: false
    },
    evaluationPerPathChart: {
        fetching: false,
        fetched: false
    },
    drawTypesCountPerUserChart: {
        fetching: false,
        fetched: false
    },
    drawTypesTotalCountChart: {
        fetching: false,
        fetched: false
    },
    drawTypesDistancePerUserChart: {
        fetching: false,
        fetched: false
    },
    drawTypesTotalDistanceChart: {
        fetching: false,
        fetched: false
    }
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_DRAW_DURATION_CHART_PENDING':
            return {
                ...state,
                drawDurationChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_DRAW_DURATION_CHART_REJECTED':
            return {
                ...state,
                drawDurationChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_DRAW_DURATION_CHART_FULFILLED':
            return {
                ...state,
                drawDurationChart: {
                    fetching: false,
                    fetched: true
                }
            };
        case 'GET_EDIT_COUNT_CHART_PENDING':
            return {
                ...state,
                editCountChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_EDIT_COUNT_CHART_REJECTED':
            return {
                ...state,
                editCountChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_EDIT_COUNT_CHART_FULFILLED':
            return {
                ...state,
                editCountChart: {
                    fetching: false,
                    fetched: true
                }
            };
        case 'GET_EDIT_DURATION_CHART_PENDING':
            return {
                ...state,
                editDurationChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_EDIT_DURATION_CHART_REJECTED':
            return {
                ...state,
                editDurationChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_EDIT_DURATION_CHART_FULFILLED':
            return {
                ...state,
                editDurationChart: {
                    fetching: false,
                    fetched: true
                }
            };
        case 'GET_EVALUATION_COUNT_PENDING':
            return {
                ...state,
                evaluationCountChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_EVALUATION_COUNT_REJECTED':
            return {
                ...state,
                evaluationCountChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_EVALUATION_COUNT_FULFILLED':
            return {
                ...state,
                evaluationCountChart: {
                    fetching: false,
                    fetched: true
                }
            };
        case 'GET_EVALUATION_PER_PATH_CHART_PENDING':
            return {
                ...state,
                evaluationPerPathChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_EVALUATION_PER_PATH_CHART_REJECTED':
            return {
                ...state,
                evaluationPerPathChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_EVALUATION_PER_PATH_CHART_FULFILLED':
            return {
                ...state,
                evaluationPerPathChart: {
                    fetching: false,
                    fetched: true
                }
            };
        case 'GET_DRAW_TYPES_COUNT_PER_USER_CHART_PENDING':
            return {
                ...state,
                drawTypesCountPerUserChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_DRAW_TYPES_COUNT_PER_USER_CHART_REJECTED':
            return {
                ...state,
                drawTypesCountPerUserChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_DRAW_TYPES_COUNT_PER_USER_CHART_FULFILLED':
            return {
                ...state,
                drawTypesCountPerUserChart: {
                    fetching: false,
                    fetched: true
                }
            };
        case 'GET_DRAW_TYPES_TOTAL_COUNT_CHART_PENDING':
            return {
                ...state,
                drawTypesTotalCountChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_DRAW_TYPES_TOTAL_COUNT_CHART_REJECTED':
            return {
                ...state,
                drawTypesTotalCountChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_DRAW_TYPES_TOTAL_COUNT_CHART_FULFILLED':
            return {
                ...state,
                drawTypesTotalCountChart: {
                    fetching: false,
                    fetched: true
                }
            };
        case 'GET_DRAW_TYPES_DISTANCE_PER_USER_CHART_PENDING':
            return {
                ...state,
                drawTypesDistancePerUserChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_DRAW_TYPES_DISTANCE_PER_USER_CHART_REJECTED':
            return {
                ...state,
                drawTypesDistancePerUserChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_DRAW_TYPES_DISTANCE_PER_USER_CHART_FULFILLED':
            return {
                ...state,
                drawTypesDistancePerUserChart: {
                    fetching: false,
                    fetched: true
                }
            };
        case 'GET_DRAW_TYPES_TOTAL_DISTANCE_CHART_PENDING':
            return {
                ...state,
                drawTypesTotalDistanceChart: {
                    fetching: true,
                    fetched: false
                }
            };
        case 'GET_DRAW_TYPES_TOTAL_DISTANCE_CHART_REJECTED':
            return {
                ...state,
                drawTypesTotalDistanceChart: {
                    fetching: false,
                    fetched: false
                }
            };
        case 'GET_DRAW_TYPES_TOTAL_DISTANCE_CHART_FULFILLED':
            return {
                ...state,
                drawTypesTotalDistanceChart: {
                    fetching: false,
                    fetched: true
                }
            };
        default:
            return state;
    }
}
