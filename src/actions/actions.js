export function setIsEmptyCollection(isEmpty) {
    return {
        type: "EMPTY_COLLECTION",
        emptyCollection: isEmpty
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

export function setAllPaths(paths) {
    return {
        type: "ALL_PATHS",
        allPaths: paths
    }
}

export function setMapLayer(layer) {
    return {
        type: "SET_MAP_LAYER",
        mapLayer: layer
    }
}
