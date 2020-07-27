export function setIsEmptyPath(isEmpty) {
    return {
        type: "EMPTY_PATH",
        emptyPath: isEmpty
    }
}

export function setIsEmptyName(isEmpty) {
    return {
        type: "EMPTY_NAME",
        emptyName: isEmpty
    }
}

export function setDisableSave(disableSave) {
    return {
        type: "DISABLE_SAVE",
        disableSave: disableSave
    }
}

export function setDisableDraw(disableDraw) {
    return {
        type: "DISABLE_DRAW",
        disableDraw: disableDraw
    }
}

export function setUnchangedObjective(unchangedObjective) {
    return {
        type: "UNCHANGED_OBJECTIVE",
        unchangedObjective: unchangedObjective
    }
}

export function setUnchangedSubjective(unchangedSubjective) {
    return {
        type: "UNCHANGED_SUBJECTIVE",
        unchangedSubjective: unchangedSubjective
    }
}

export function setUnchangedName(unchangedName) {
    return {
        type: "UNCHANGED_NAME",
        unchangedName: unchangedName
    }
}

export function setUnchangedDescription(unchangedDescription) {
    return {
        type: "UNCHANGED_DESCRIPTION",
        unchangedDescription: unchangedDescription
    }
}

export function setPathEvaluated(evaluated) {
    return {
        type: "PATH_EVALUATED",
        pathEvaluated: evaluated
    }
}

export function setPathEdited(edited) {
    return {
        type: "PATH_EDITED",
        pathEdited: edited
    }
}

export function setDisableDropdowns(disable) {
    return {
        type: "DISABLE_DROPDOWNS",
        disableDropdowns: disable
    }
}

export function setDisableEvalBtn(disable) {
    return {
        type: "DISABLE_EVAL_BTN",
        disableEvalBtn: disable
    }
}
export function setEvalChangeNotSubmitted(notSubmitted) {
    return {
        type: "EVAL_CHANGE_NOT_SUBMITTED",
        evalChangeNotSubmitted: notSubmitted
    }
}

export function setMapLayer(layer) {
    return {
        type: "SET_MAP_LAYER",
        mapLayer: layer
    }
}

export function setSelectedTab(tab) {
    return {
        type: "SET_SELECTED_TAB",
        selectedTab: tab
    }
}

export function setIncludeUserPathsReducer(include) {
    return {
        type: "INCLUDE_USER_PATHS",
        includeUserPaths: include
    }
}

export function setHideBubble(hide) {
    return {
        type: "HIDE_BUBBLE",
        hideBubble: hide
    }
}