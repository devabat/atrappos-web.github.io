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
