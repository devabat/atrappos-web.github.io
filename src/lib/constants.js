import * as L from 'leaflet';
import greenMarker from '../assets/img/markers/marker-icon-green.png'
import blueMarker from '../assets/img/markers/marker-icon-blue.png';
import violetMarker from '../assets/img/markers/marker-icon-violet.png';
import orangeMarker from '../assets/img/markers/marker-icon-orange.png';
import redMarker from '../assets/img/markers/marker-icon-red.png';
import shadow from '../assets/img/markers/marker-shadow.png';


export const greenMarkerIcon = new L.Icon({
    iconUrl: greenMarker,
    shadowUrl: shadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const blueMarkerIcon = new L.Icon({
    iconUrl: blueMarker,
    shadowUrl: shadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const violetMarkerIcon = new L.Icon({
    iconUrl: violetMarker,
    shadowUrl: shadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const orangeMarkerIcon = new L.Icon({
    iconUrl: orangeMarker,
    shadowUrl: shadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export const redMarkerIcon = new L.Icon({
    iconUrl: redMarker,
    shadowUrl: shadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


export const mapElementsTooltipContent = {
    polyline: "In order to create a new path, the map should be adequately zoomed. Moreover, you cannot create a new path if the map contains an unsaved one. Save or erase any existing path to create a new one.",
    styles: "This button changes the evaluation values as stated by the above dropdown selections and then styles the path accordingly. ",
    shape: "With this button you can edit the shape of your path. It can be used at an already created path.",
    erase: "Erase the path and clear the map.",
    description: "Type any kind of information that is worth mentioning. It will be added to the path as a description tag (available in the path's pop-up info).",
    walkability: "Your criteria can be: The ease of access, lack of obstacles, safety, comfort, relaxation, refreshment, quality of the path and how engaging is the physical activity.",
    landscape: "Your criteria can be: The beauty of the landscape, the feelings that the sights are provoking, how happy makes you the built-in environment and how eye-friendly is the view.",
    save: "A path can be saved when it has a submitted evaluation and no blank name."
};


export const objectiveTypes =
    [
    {label:'Select walking evaluation', value: '5', className: 'lvl-def'},
    {label:'Excellent', value: '10', className: 'lvl-5'},
    {label:'Very Good', value: '8', className: 'lvl-4'},
    {label:'Decent', value: '6', className: 'lvl-3'},
    {label:'Not so Good', value: '4', className:'lvl-2'},
    {label:'Poor', value: '2', className: 'lvl-1'}];

export const subjectiveTypes = [
    {label:'Select visual evaluation', value: '#42f5e0', className: 'lvl-def'},
    {label: 'Magnificent', value: '#12C416', className: 'lvl-5'},
    {label: 'Very Pleasing', value: '#3D7AF5', className: 'lvl-4'},
    {label: 'Fair', value: '#B054F8', className: 'lvl-3'},
    {label: 'Not so Pleasing', value: '#F27418', className: 'lvl-2'},
    {label: 'Unpleasant', value: '#F41A1A', className:'lvl-1'},
    ];

export const defaultSubjectiveValue = '#42f5e0';

export const defaultObjectiveValue = '5';

export const filterLbl = 'Filter selections';


export const objectiveTypesKeyValue = {
    '10': {label:'Excellent', className: 'lvl-5'},
    '8': {label:'Very Good', className: 'lvl-4'},
    '6': {label:'Decent', className: 'lvl-3'},
    '4': {label:'Not so Good', className:'lvl-2'},
    '2': {label:'Poor', className: 'lvl-1'}
}

export const objectiveTypesSortLabels = [
    'Excellent', 'Very Good', 'Decent', 'Not so Good', 'Poor'
]

export const subjectiveTypesSortLabels = [
    'Magnificent', 'Very Pleasing', 'Fair', 'Not so Pleasing', 'Unpleasant'
]

export const subjectiveTypesKeyValue = {
    '#12C416': {label: 'Magnificent', className: 'lvl-5', marker: greenMarkerIcon},
    '#3D7AF5': {label: 'Very Pleasing', className: 'lvl-4', marker: blueMarkerIcon},
    '#B054F8': {label: 'Fair', className: 'lvl-3', marker: violetMarkerIcon},
    '#F27418': {label: 'Not so Pleasing', className: 'lvl-2', marker: orangeMarkerIcon},
    '#F41A1A': {label: 'Unpleasant', className:'lvl-1', marker: redMarkerIcon}
};

export const mapLayersTitles= ['osmMapnik',  'esriWorldImagery', 'esriWorldStreetMap', 'osmHot', 'osmTopo', 'stadiaAlidadeSmooth',
    'stadiaAlidadeSmoothDark', 'stadiaOutdoors', 'stadiaOsmBright',
    'thunderForestSpinalMap', 'thunderforestLandscape', 'thunderforestMobileAlias',
    'thunderforestTransport', 'thunderforestTransportDark',
    'mtbMap', 'cartoDbPositron', 'cartoDbDarkMatter', 'cartoDbVoyager', 'hikeBike'
];

export const mapLayers =
    {osmMapnik: {
        title: 'OpenStreetMap Mapnik',
        layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    esriWorldImagery: {
        title: 'Esri World Imagery',
        layer: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    },
    esriWorldStreetMap: {
        title: 'Esri World Street Map',
        layer: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    },
    osmHot: {
        title: 'OpenStreetMap Hot',
        layer: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    },
    osmTopo: {
        title: 'Open Topo Map',
        layer: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>'
    },
    stadiaAlidadeSmooth: {
        title: 'Stadia Alidade Smooth',
        layer: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=' + process.env.STADIA_API_KEY,
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    },
    stadiaAlidadeSmoothDark: {
        title: 'Stadia Alidade Smooth Dark',
        layer: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=' + process.env.STADIA_API_KEY,
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    },
    stadiaOutdoors: {
        title: 'Stadia Outdoors',
        layer: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=' + process.env.STADIA_API_KEY,
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    },
    stadiaOsmBright: {
        title: 'Stadia OSM Bright',
        layer: 'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png?api_key=' + process.env.STADIA_API_KEY,
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    },
    thunderForestSpinalMap: {
        title: 'Thunderforest Spinal Map',
        layer: 'https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=' + process.env.THUNDERFOREST_API_KEY,
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: process.env.THUNDERFOREST_API_KEY,
        maxZoom: 22
    },
    thunderforestLandscape: {
        title: 'Thunderforest Landscape',
        layer: 'https://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png?apikey=' + process.env.THUNDERFOREST_API_KEY,
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: process.env.THUNDERFOREST_API_KEY,
        maxZoom: 22
    },
    thunderforestMobileAlias: {
        title: 'Thunderforest Mobile Alias',
        layer: 'https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=' + process.env.THUNDERFOREST_API_KEY,
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: process.env.THUNDERFOREST_API_KEY,
        maxZoom: 22
    },
    thunderforestTransport: {
        title: 'Thunderforest Transport',
        layer: 'https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=' + process.env.THUNDERFOREST_API_KEY,
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: process.env.THUNDERFOREST_API_KEY,
        maxZoom: 22
    },
    thunderforestTransportDark: {
        title: 'Thunderforest Transport Dark',
        layer: 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=' + process.env.THUNDERFOREST_API_KEY,
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        apikey: process.env.THUNDERFOREST_API_KEY,
        maxZoom: 22
    },
    mtbMap: {
        title: 'Mtb Map',
        layer: 'http://tile.mtbmap.cz/mtbmap_tiles/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp; USGS'
    },
    cartoDbPositron: {
        title: 'CartoDB Positron',
        layer: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    },
    cartoDbDarkMatter: {
        title: 'CartoDB Dark Matter',
        layer: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    },
    cartoDbVoyager: {
        title: 'CartDB Voyager',
        layer: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    },
    hikeBike: {
        title: 'Hike Bike',
        layer: 'https://tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png',
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
};

export const drawLocalOpts = {
    draw: {
        toolbar: {
            actions: {
                title: "Cancel drawing",
                text: "Cancel"
            },
            finish: {
                title: "Finish drawing",
                text: "Finish"
            },
            undo: {
                title: "Delete last point drawn",
                text: "Delete last point"
            },
            buttons: {
                polyline: "Draw a polyline",
                polygon: "Draw a polygon",
                rectangle: "Draw a rectangle",
                circle: "Draw a circle",
                marker: "Draw a marker",
                circlemarker: "Draw a circlemarker"
            }
        },
        handlers: {
            circle: {
                tooltip: {
                    start: "Click and drag to draw circle."
                },
                radius: "Radius"
            },
            circlemarker: {
                tooltip: {
                    start: "Click map to place circle marker."
                }
            },
            marker: {
                tooltip: {
                    start: "Click map to place marker."
                }
            },
            polygon: {
                tooltip: {
                    start: "Click to start drawing shape.",
                    cont: "Click to continue drawing shape.",
                    end: "Click first point to close this shape."
                }
            },
            polyline: {
                error: "<strong>Error:</strong> shape edges cannot cross!",
                tooltip: {
                    start: "Click to start drawing line.",
                    cont: "Click to continue drawing line.",
                    end: "Click last point to finish line."
                }
            },
            rectangle: {
                tooltip: {
                    start: "Click and drag to draw rectangle."
                }
            },
            simpleshape: {
                tooltip: {
                    end: "Release mouse to finish drawing."
                }
            }
        }
    },
    edit: {
        toolbar: {
            actions: {
                save: {
                    title: "Finish changes",
                    text: "Finish"
                },
                cancel: {
                    title: "Cancel editing, discards all changes",
                    text: "Cancel"
                },
                clearAll: {
                    title: "Clear all layers",
                    text: "Clear All"
                }
            },
            buttons: {
                edit: "Edit layers",
                editDisabled: "No layers to edit",
                remove: "Delete layers",
                removeDisabled: "No layers to delete"
            }
        },
        handlers: {
            edit: {
                tooltip: {
                    text: "Drag handles to edit features.",
                    subtext: "Click cancel to undo changes."
                }
            },
            remove: {
                tooltip: {
                    text: "Click on a feature to remove."
                }
            }
        }
    }
};