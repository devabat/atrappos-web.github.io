import * as L from 'leaflet';
import defaultMarker from '../assets/img/markers/default_marker.png';
import stairs from '../assets/img/markers/stairs.png';
import uphill from '../assets/img/markers/uphill.png';
import broken from '../assets/img/markers/broken.png';
import road from '../assets/img/markers/road.png';
import soil from '../assets/img/markers/soil.png';
import works from '../assets/img/markers/works.png';
import other from '../assets/img/markers/other.png';
import shadow from '../assets/img/markers/shadow.png';

export const markersArr = ['stairs', 'uphill', 'broken', 'road', 'soil', 'works', 'other'];



export const defaultIcon = new L.Icon({
    iconUrl: defaultMarker,
    shadowUrl: shadow,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [18, -42],
    shadowAnchor: [4, 49],
    shadowSize: [70, 70]
});

export const stairsIcon = new L.Icon({
    iconUrl: stairs,
    shadowUrl: shadow,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [18, -42],
    shadowAnchor: [4, 49],
    shadowSize: [70, 70],
    tooltipAnchor: [18, -42]
});

export const uphillIcon = new L.Icon({
    iconUrl: uphill,
    shadowUrl: shadow,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [18, -42],
    shadowAnchor: [4, 49],
    shadowSize: [70, 70]
});

export const brokenIcon = new L.Icon({
    iconUrl: broken,
    shadowUrl: shadow,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [20, -44],
    shadowAnchor: [4, 49],
    shadowSize: [70, 70]
});

export const roadIcon = new L.Icon({
    iconUrl: road,
    shadowUrl: shadow,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [18, -42],
    shadowAnchor: [4, 49],
    shadowSize: [70, 70]
});

export const soilIcon = new L.Icon({
    iconUrl: soil,
    shadowUrl: shadow,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [18, -42],
    shadowAnchor: [4, 49],
    shadowSize: [70, 70]
});

export const worksIcon = new L.Icon({
    iconUrl: works,
    shadowUrl: shadow,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [18, -42],
    shadowAnchor: [4, 49],
    shadowSize: [70, 70]
});

export const otherIcon = new L.Icon({
    iconUrl: other,
    shadowUrl: shadow,
    iconSize: [60, 60],
    iconAnchor: [12, 41],
    popupAnchor: [18, -42],
    shadowAnchor: [4, 49],
    shadowSize: [70, 70]
});

export const markerIcons = {
    stairs: stairsIcon,
    uphill: uphillIcon,
    broken: brokenIcon,
    road: roadIcon,
    soil: soilIcon,
    works: worksIcon,
    other: otherIcon,
    default: defaultIcon
};

export const mapElementsTooltipContent = {
    polyline: "In order to create a new path, the zoom level of the map should be at least 16. Moreover, you cannot create a new path if the map contains an unsaved one. Save or erase any existing path to create a new one.",
    marker: "You can add a marker only when the map contains a path (a polyline should be already drawn)."

};
export const addMarkerTitles = {
    stairs: "Place a marker that indicates the existence of stairs",
    uphill: "Place a marker that indicates the existence of an uphill",
    broken: "Place a marker that indicates the presence of broken pavements",
    road: "Place a marker that indicates the absence of pavements",
    soil: "Place a marker that indicates a dirt road",
    works: "Place a marker that indicates public works",
    other: "Place a marker that indicates any kind of difficulty"
};

export const markerTitles = {
    stairs: "Stairs",
    uphill: "Uphill",
    broken: "Broken pavements",
    road: "Absence of pavements",
    soil: "Dirt road",
    works: "Public works",
    other: "Other difficulty"
};
export const hardShipTypes =
    [{lbl: 'Stairs', val: 'stairs', title: 'Place a marker that indicates the existence of stairs'},
    {lbl: 'Uphill', val: 'uphill', title: 'Place a marker that indicates the existence of an uphill'},
    {lbl: 'Broken pavements', val: 'broken', title: 'Place a marker that indicates the presence of broken pavements'},
    {lbl: 'Absence of pavements', val: 'road', title: 'Place a marker that indicates the absence of pavements'},
    {lbl: 'Dirt road', val: 'soil', title: 'Place a marker that indicates a dirt road'},
    {lbl: 'Public works', val: 'works', title: 'Place a marker that indicates public works'},
    {lbl: 'Other', val: 'other', title: 'Place a marker that indicates any kind of hardship'}];

export const difficultyTypes =
    [{lbl:'Very easy', val: '2', cls: 'very-easy'},
    {lbl:'Easy', val: '4', cls: 'easy'},
    {lbl:'Moderate', val: '6', cls: 'moderate'},
    {lbl:'Difficult', val: '8', cls:'difficult'},
    {lbl:'Very difficult', val: '10', cls: 'very-difficult'}];

export const categoryTypes =
    [{lbl: 'Urban', val: '#958383', cls: 'hurricane'},
    {lbl: 'Industrial', val: '#B55936', cls: 'brown-rust'},
    {lbl: 'Market/shops', val: '#6B5582', cls: 'rum'},
    {lbl: 'Restaurants/bars', val: '#AD5C92', cls: 'tapestry'},
    {lbl: 'Alleys', val: '#AE8247', cls: 'driftwood'},
    {lbl: 'Park/garden', val: '#588B50', cls: 'hippie-green'},
    {lbl: 'Historical place', val: '#3E7975', cls: 'faded-jade'},
    {lbl: 'Seaview', val: '#5E82A6', cls:'horizon'},
    {lbl: 'Other', val: '#A65E61', cls: 'coral-tree'}
    ];

export const mapLayersTitles= ['osmMapnik', 'osmHot', 'osmTopo', 'stadiaAlidadeSmooth',
    'stadiaAlidadeSmoothDark', 'stadiaOutdoors', 'thunderforestTransport', 'thunderforestTransportDark',
    'thunderForestSpinalMap', 'thunderforestLandscape', 'thunderforestMobileAlias', 'esriWorldStreetMap',
    'esriWorldImagery', 'mtbMap', 'cartoDbPositron', 'cartoDbDarkMatter', 'cartoDbVoyager', 'hikeBike'
];

export const mapLayers =
    {osmMapnik: {
        title: 'OpenStreetMap Mapnik',
        layer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
        layer: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    },
    stadiaAlidadeSmoothDark: {
        title: 'Stadia Alidade Smooth Dark',
        layer: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    },
    stadiaOutdoors: {
        title: 'Stadia Outdoors',
        layer: 'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
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
    esriWorldStreetMap: {
        title: 'Esri World Street Map',
        layer: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    },
    esriWorldImagery: {
        title: 'Esri World Imagery',
        layer: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
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
