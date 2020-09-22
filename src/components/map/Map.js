import React, {Component} from 'react';
import store from "../../store";
import * as L from 'leaflet';
import 'leaflet-geometryutil';
import {
    Map,
    TileLayer,
    FeatureGroup,
    ZoomControl,
    GeoJSON,
    Marker, Popup
} from "react-leaflet";
import Geocoder from 'leaflet-control-geocoder';
import PanoStreetView from './PanoStreetView.js';
import ReactLeafletSearch from "react-leaflet-search";
// eslint-disable-next-line
// import { GestureHandling } from "leaflet-gesture-handling";
// import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import { EditControl } from "react-leaflet-draw";
import PropTypes from "prop-types";
import cloneDeep from 'lodash/cloneDeep';
import {
    defaultObjectiveValue, defaultSubjectiveValue,
    mapLayers, subjectiveTypesKeyValue, drawLocalOpts
} from "../../lib/constants";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import moment from "moment";
import pathService from '../../services/pathService';
import {connect} from "react-redux";
import {loginUser} from "../../services/authService";
import PathsActions from "./PathsActions";
import {EditPathModal} from "./EditPathModal";
import {NotificationToast} from "../ui/NotificationToast";
import {
    setDisableSave,
    setDisableDraw,
    setIsEmptyPath,
    setIsEmptyName,
    setUnchangedName,
    setUnchangedDescription,
    setUnchangedObjective,
    setUnchangedSubjective,
    setPathEvaluated,
    setPathEdited, setDisableDropdowns, setEvalChangeNotSubmitted
} from "../../actions/pathsActions";
import {DeletePathModal} from "./DeletePathModal";
import {sendGaEvent} from "../../lib/utils";
import {PathInfoTooltip} from "../ui/PathInfoTooltip";
import {SpeechBubble} from "../ui/SpeechBubble";

delete L.Icon.Default.prototype._getIconUrl;

L.GeometryUtil = L.extend(L.GeometryUtil);

const southWest = L.latLng( 34.582754, 19.072326),
    northEast = L.latLng(41.948798, 29.382288),
    bounds = L.latLngBounds(southWest, northEast);

L.drawLocal = drawLocalOpts;

class CustomMap extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.zoomRef = React.createRef();
        this.state = {
            currentCenter: null,
            userPaths: [],
            allPaths: [],
            selectedUserPaths: [],
            selectedUserPathsIds: [],
            selectedUserPathsCopy: [],
            selectedCommunityPaths: [],
            communityPaths: [],
            currentPath: null,
            selectedPath: null,
            selectedPathName: null,
            selectedPathDescription: null,
            pathName: null,
            objective: defaultObjectiveValue,
            subjective: defaultSubjectiveValue,
            showEditPathModal: false,
            showDeletePathModal: false,
            deletePathName: null,
            deletePathId: null,
            editingPath: false,
            addingPath: false,
            canGoBack: true,
            disableBack: false,
            pathEdited: false,
            disableStreetViewAndBack: false,
            disableEditBtn: false,
            disableEraseBtn: false,
            zoom: 16,
            streetView: null,
            tileLayer: this.props.mapLayers.mapLayer,
            toast: {
                show: false,
                type: null,
                msg: null
            },
            currentPoly: null,
            subjectiveCopy: null,
            objectiveCopy: null,
            pathDescription: null,
            selectedPathObjective: null,
            selectedPathSubjective: null,
            edited: [],
            evaluations: [],
            firstDraw: null,
            editStart: null,
            editStop: null,
            objectiveChanged: false,
            subjectiveChanged: false,
            drawn: null,
            locationName: null,
            distance: null,
            drawType: 'desktop',
            userPathsRefetched: false
        };

        this.getLocationName= this.getLocationName.bind(this);
        this.getPathDistance = this.getPathDistance.bind(this);
        this.saveFeature = this.saveFeature.bind(this);
        this._onFeatureGroupReady = this._onFeatureGroupReady.bind(this);
        this._onCreated = this._onCreated.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onMounted = this._onMounted.bind(this);
        this._onEditStart = this._onEditStart.bind(this);
        this._onEditStop = this._onEditStop.bind(this);
        this._onEdited = this._onEdited.bind(this);
        this.pointToLayer = this.pointToLayer.bind(this);
        this.arrangePaths = this.arrangePaths.bind(this);
        this.setAttribute = this.setAttribute.bind(this);
        this.setEditablePathState = this.setEditablePathState.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.showMsgToast = this.showMsgToast.bind(this);
        this.discardAll = this.discardAll.bind(this);
        this.toggleSelectedPaths = this.toggleSelectedPaths.bind(this);
        this.toggleSelectedCommunityPaths = this.toggleSelectedCommunityPaths.bind(this);
        this.makePathEditable= this.makePathEditable.bind(this);
        this.deletePath = this.deletePath.bind(this);
        this.getDefaultPathName = this.getDefaultPathName.bind(this);
        this.disableElements = this.disableElements.bind(this);
        this.onZoomChange = this.onZoomChange.bind(this);
        this.modifyStyles = this.modifyStyles.bind(this);
        this.changeCenter = this.changeCenter.bind(this);
    }


    UNSAFE_componentWillMount() {
        this.arrangePaths();
        let latlng = new L.LatLng(37.9754983,  23.7356671);
        this.setState({
            currentCenter: latlng
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let filtered;
        let ids = this.state.selectedUserPathsIds;
        if (ids.length > 0 && prevState.userPathsRefetched !== this.state.userPathsRefetched &&
            this.state.userPathsRefetched && this.state.userPaths.length > 0){
           filtered = this.state.userPaths.filter(function(path) {
                return ids.indexOf(path._id) !== -1;
            });
            this.setState({
                ...this.state,
                selectedPathName: null,
                selectedPathDescription: null,
                pathName: this.getDefaultPathName(this.state.userPaths.length),
                selectedUserPaths: filtered,
                pathEdited: false,
                edited: [],
                evaluations: [],
                editStart: null,
                editStop: null
            }, ()=> {
                store.dispatch(setIsEmptyPath(true));
            });
        }
        if (prevState.editingPath && !this.state.editingPath && prevState.canGoBack && !this.state.pathEdited) {
            this._editableFG.leafletElement.clearLayers();
            this.setState({
                ...this.state,
                pathName: this.getDefaultPathName(this.state.userPaths.length),
                selectedPathName: null,
                pathDescription: null,
                selectedPathDescription: null,
                selectedUserPaths: prevState.selectedUserPathsCopy,
                currentPoly: null,
                currentPath: null,
                objective: defaultObjectiveValue,
                subjective: defaultSubjectiveValue,
                selectedPathObjective: null,
                selectedPathSubjective: null
            }, ()=> {
                store.dispatch(setIsEmptyPath(false));
                store.dispatch(setDisableDraw(false));
                store.dispatch(setUnchangedObjective(false));
                store.dispatch(setUnchangedSubjective(false));
                store.dispatch(setUnchangedName(false));
                store.dispatch(setUnchangedDescription(false));
                store.dispatch(setPathEdited(false));
                store.dispatch(setDisableDropdowns(false));
            });
        }


        if (prevProps.mapLayers.mapLayer !== this.props.mapLayers.mapLayer) {
            this.setState({
                ...this.state,
                tileLayer: this.props.mapLayers.mapLayer
            })
        }

        if (prevState.editingPath !== this.state.editingPath || prevState.addingPath !== this.state.addingPath) {
            store.dispatch(setDisableDropdowns(false));
            store.dispatch(setEvalChangeNotSubmitted(false));
        }

        if (prevProps.drawnObj !== this.props.drawnObj) {
            if (this.props.drawnObj && this.props.drawnObj.duration && this.props.drawnObj.date) {
                this.setState({
                    drawn: this.props.drawnObj
                })
            }
        }
    }

    componentDidMount() {
        let that = this;
        let map = this.mapRef.current.leafletElement;
        map.on('draw:toolbarclosed', function(){
            store.dispatch(setDisableDropdowns(false));
            setTimeout(() => {
                that.disableElements(true, true, true);
            }, 500)
        });

        map.on('popupopen', function(e){
            if (e.popup &&
                e.popup._source &&
                e.popup._source.options &&
                e.popup._source.options.icon &&
                e.popup._source.options.icon.options) {
                if (!e.popup._source.options.icon.options.iconRetinaUrl) {
                    sendGaEvent({category: "open-marker-info-popup", action: 'map-action'});
                } else {
                    sendGaEvent({category: "open-search-info-popup", action: 'map-action'});
                }
            } else if (e.popup &&
                e.popup._source &&
                e.popup._source.options &&
                e.popup._source.options.data &&
                e.popup._source.options.data.type === 'Feature'
            ) {
                sendGaEvent({category: "open-poly-info-popup", action: 'map-action'});
            }
        });
    }

    setEditablePathState(type, isOn) {
        let editingPath = (type === "Edit" && isOn);
        let addingPath = (type === "Add" && isOn);
        this.setState({
            editingPath: editingPath,
            addingPath: addingPath
        }, ()=> {
            if (this.state.addingPath) {
                this.setState({
                    subjective: defaultSubjectiveValue,
                    objective: defaultObjectiveValue
                })
            }
        });
    }


    arrangePaths() {
        let userId = this.props.auth.user.id;
        pathService.getAll().then((res) => {
            if (res) {
                let userPaths = res.filter(path => {
                    return path.userId===userId;
                });
                let communityPaths = res.filter(path => {
                    return path.userId!==userId;
                });

                this.setState({
                    ...this.state,
                    pathName: this.getDefaultPathName(userPaths.length),
                    userPaths: userPaths,
                    communityPaths: communityPaths,
                    allPaths: res,
                    userPathsRefetched: true
                });
            }
        })
    }

    toggleSelectedPaths(arr) {
        let filtered = this.state.userPaths.filter(function(path) {
            return arr.indexOf(path._id) !== -1;
        });
        let that = this;
        this.setState({
            ...this.state,
            selectedUserPaths: filtered,
            selectedUserPathsIds: arr
        }, ()=> {
            let map = that.mapRef.current;
            let latLons = this.state.selectedUserPaths.map((path) => {
                return path.geometry.coordinates.map((coords) => {
                    return [coords[1], coords[0]]
                })
            }).flat(1);
            if (map && latLons.length > 0) {
                let mapLeaf= map.leafletElement;
                mapLeaf.fitBounds(latLons);
            }
        })
    }

    toggleSelectedCommunityPaths(arr) {
        let filtered = this.state.allPaths.filter(function(path) {
            return arr.indexOf(path._id) !== -1;
        });
        let that = this;
        this.setState({
            ...this.state,
            selectedCommunityPaths: filtered
        }, ()=> {
            let map = that.mapRef.current;
            let latLons = this.state.selectedCommunityPaths.map((path) => {
                return path.geometry.coordinates.map((coords) => {
                    return [coords[1], coords[0]]
                })
            }).flat(1);
            if (map && latLons.length > 0) {
                let mapLeaf= map.leafletElement;
                mapLeaf.fitBounds(latLons);
            }
        })
    }


    makePathEditable(id) {
        let pathData = this.state.userPaths.find(p => p._id === id);
        let leafletGeoJSON = new L.GeoJSON(pathData);
        let leafletFG = this._editableFG.leafletElement;
        this.setState(prevState => {
            let selectedPaths =  prevState.selectedUserPaths;
            let dataCopy = Object.assign({}, prevState.selectedUserPaths);
            selectedPaths = selectedPaths.filter(path => path._id !== id);
            let selectedPathsCopy = Object.keys(dataCopy).map(function(k){return dataCopy[k]});
            return {
                ...this.state,
                pathEdited: false,
                selectedPathName: pathData.name,
                selectedPathDescription: pathData.description,
                pathName: pathData.name,
                pathDescription: pathData.description,
                currentPath: pathData,
                selectedUserPaths: selectedPaths,
                selectedUserPathsCopy: selectedPathsCopy,
                objective: pathData.properties.objective,
                subjective: pathData.properties.subjective,
                selectedPathObjective: pathData.properties.objective,
                selectedPathSubjective: pathData.properties.subjective,
                objectiveCopy: pathData.properties.objective,
                subjectiveCopy: pathData.properties.subjective,
                edited: JSON.parse(JSON.stringify(pathData.edited)),
                drawn: pathData.drawn,
                drawType: pathData.drawType,
                evaluations: JSON.parse(JSON.stringify(pathData.evaluations))
            }
        }, ()=> {
            store.dispatch(setUnchangedObjective(true));
            store.dispatch(setUnchangedSubjective(true));
            store.dispatch(setUnchangedName(true));
            store.dispatch(setUnchangedDescription(true));
            store.dispatch(setPathEdited(false));
        });

        leafletGeoJSON.eachLayer( (layer) =>
            {
                if (layer.feature.geometry && layer.feature.geometry.type === 'LineString') {
                    let geojsonPolyOptions = {
                        weight: layer.feature.properties.objective,
                        color: layer.feature.properties.subjective
                    };
                    layer.setStyle(geojsonPolyOptions);
                    /* That shows our selected GeoJSON data!!!! */
                    leafletFG.addLayer(layer);
                    let centerMap = layer.getCenter();
                    this.setState({
                        currentPoly: layer,
                        currentCenter: centerMap
                    })
                }

            });

    }

    async getLocationName(latLng, zoom) {
        const geocoder = Geocoder.nominatim();
        let promise = new Promise(function(resolve, reject) {
            geocoder.reverse(
                latLng,
                zoom,
                results => {
                    let r = results[0];
                    if (r) {
                        resolve(r)
                    }
                }
            );
        });
        await promise.then(area => {
            let result = area && area.properties && area.properties.address ?
                ((area.properties.address.road ?
                    area.properties.address.road : (area.properties.address.postcode ?
                            area.properties.address.postcode : 'Unknown road'
                    )) + ", " + (area.properties.address.suburb ?
                        area.properties.address.suburb :
                        (area.properties.address.city ? area.properties.address.city: 'Unknown suburb')
                )): 'Unknown area';
            this.setState({
                locationName:  result
            })
        })
    }

    getPathDistance(latLngs) {
        let tempLatLng = null;
        let totalDistance = 0.00000;
        latLngs.forEach((latlng, idx)=> {
            if (tempLatLng == null){
                tempLatLng = latlng;
                return;
            }
            totalDistance += tempLatLng.distanceTo(latlng);
            tempLatLng = latlng;
        });

        this.setState({
            distance: totalDistance
        });
    }


    saveFeature() {
        this.setState(prevState => {
            let currPath = prevState.currentPath;
            if (currPath) {
                currPath.type = "Feature";
                currPath.edited = prevState.edited;
                currPath.evaluations = prevState.evaluations
                if (prevState.pathName) {
                    currPath.name = prevState.pathName ? prevState.pathName : this.getDefaultPathName(prevState.userPaths.length);
                }
                if (prevState.pathDescription) {
                    currPath.description = prevState.pathDescription;
                }
                if (prevState.drawType) {
                    currPath.drawType = prevState.drawType;
                }

                if (prevState.drawn) {
                    currPath.drawn = prevState.drawn;
                }
                if (prevState.locationName) {
                    currPath.area = prevState.locationName;
                }
                if (prevState.distance) {
                    currPath.distance = prevState.distance;
                }
            }

            return {
                currentPath: currPath
            }
        }, ()=> {
            let nameCopy = cloneDeep(this.state.currentPath.name);
            if (this.state.addingPath) {
                pathService.saveOne(this.state.currentPath).then((res) => {
                    this.setState({
                        canGoBack: true,
                        currentPath: null,
                        currentPoly: null,
                        pathName: null,
                        pathDescription: null,
                        objective: defaultObjectiveValue,
                        subjective: defaultSubjectiveValue,
                        userPathsRefetched: false,
                        drawType: 'desktop',
                        evaluations: []
                    }, () => {
                        this.arrangePaths();
                        this._editableFG.leafletElement.clearLayers();
                        store.dispatch(setIsEmptyPath(true));
                        this.showMsgToast(true, 'success', "'" + nameCopy + "' was saved successfully!");
                    });
                }, (error) => {
                    this.showMsgToast(true, 'error', 'Something went wrong, please try again later.');
                });
            } else {
                pathService.editOne(this.state.currentPath, this.state.currentPath._id).then((res) => {
                    this.setState({
                        ...this.state,
                        pathEdited: true,
                        canGoBack: true,
                        currentPath: null,
                        currentPoly: null,
                        pathName: null,
                        pathDescription: null,
                        selectedPathName: null,
                        selectedPathDescription: null,
                        objective: defaultObjectiveValue,
                        subjective: defaultSubjectiveValue,
                        edited: [],
                        evaluations: [],
                        editStart: null,
                        editStop: null,
                        objectiveChanged: false,
                        subjectiveChanged: false,
                        userPathsRefetched: false,
                        drawType: 'desktop'
                    }, () => {
                        this.arrangePaths();
                        this._editableFG.leafletElement.clearLayers();
                        store.dispatch(setIsEmptyPath(true));
                        store.dispatch(setIsEmptyPath(true));
                        store.dispatch(setUnchangedObjective(false));
                        store.dispatch(setUnchangedSubjective(false));
                        store.dispatch(setUnchangedName(false));
                        store.dispatch(setUnchangedDescription(false));
                        store.dispatch(setPathEdited(false));
                        this.showMsgToast(true, 'success', "'" + nameCopy + "' was modified successfully!");
                    });
                }, (error) => {
                    this.showMsgToast(true, 'error', 'Something went wrong, please try again later.');
                });
            }


        });
    }

    deletePath() {
        this.setState({
            userPathsRefetched: false
        }, ()=> {
            pathService.deleteOne(this.state.deletePathId).then(() => {
                this.arrangePaths();
                this.showMsgToast(true, 'success', 'The path was deleted successfully!');
                this.showDeleteModal(false, null, null);
                sendGaEvent({category: "delete-path", action: 'db-action'});
            }, (error)=> {
                this.showMsgToast(true, 'error', 'Something went wrong, please try again later.');
                this.showDeleteModal(false, null, null);
            });
        })

    }

    getDefaultPathName(num) {
        return 'Path ' + (num + 1);
    }


    onZoomChange(zoom) {
        store.dispatch(setDisableDraw(zoom < 16));
        this.setState({
            zoom: zoom
        })
    }

    changeCenter(coords) {
        if (coords && coords.length > 0) {
            let centerMap = new L.LatLng(coords[1], coords[0]);
            this.setState({
                currentCenter: centerMap
            });
        }
    }

    disableElements(enableStreetViewAndBack, enableEditBtn, enableEraseBtn) {
        this.setState({
            ...this.state,
            disableStreetViewAndBack: !enableStreetViewAndBack,
            disableEditBtn: !enableEditBtn,
            disableEraseBtn: !enableEraseBtn
        })
    }


    _editableFG = null;

    _onFeatureGroupReady (reactFGref) {
        if (reactFGref) {
            this._editableFG = reactFGref;
        }
    };

    _onCreated (e) {
        let type = e.layerType;
        let layer = e.layer;
        let latLng;

        if (type === 'polyline') {
            latLng = layer._latlngs[0];
            this.getLocationName(latLng, Math.round(parseInt(this.state.zoom)));
            this.getPathDistance(layer._latlngs);
            this.setState({
                currentPoly: layer
            })

            this.props.setDrawEnd(moment(new Date()));
        }

        let geoJSON = layer.toGeoJSON();

        if (geoJSON.geometry.type === 'LineString') {
            geoJSON.properties.objective = this.state.objective;
            geoJSON.properties.subjective = this.state.subjective;
            geoJSON._leaflet_id = layer._leaflet_id;
        }
        this.setState({
            ...this.state,
            canGoBack: false,
            currentPoly: layer,
            currentPath: geoJSON,
            firstDraw: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        }, ()=> {
            store.dispatch(setIsEmptyPath(false));
            store.dispatch(setDisableSave(false));
        });


        this._onChange();
    };


    _onChange() {
        // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API
        const { onChange } = this.props;

        if (!this._editableFG || !onChange) {
            return;
        }
        const geojsonData = this._editableFG.leafletElement.toGeoJSON();
        onChange(geojsonData);
    }

    _onMounted = (drawControl) => {

    };


    _onEditStart = (e) => {
        this.setState({
            editStart: moment(new Date())
        }, ()=> {
            this.disableElements(false, true, false);
            store.dispatch(setDisableSave(true));
            store.dispatch(setDisableDropdowns(true));
        })
    };

    _onEditStop = (e) => {
        let layersObj = e.target._layers;
        let currentPoly;
        let pathRes;
        for (let key in layersObj) {
            if (layersObj.hasOwnProperty(key)) {
                let layer = layersObj[key];
                if (this.state.editingPath || this.state.addingPath) {
                    let layerFromStateId = layer.feature && (layer.feature._id === this.state.currentPath._id) ? layer: null;
                    let layerFromStateLeafId = (layer._leaflet_id === this.state.currentPath._leaflet_id) ? layer : null;

                    if (layerFromStateId) {
                        let geoJSON = layer.toGeoJSON();
                        geoJSON.properties = layerFromStateId.feature.properties;
                        geoJSON._leaflet_id = layer._leaflet_id;
                        pathRes = geoJSON;
                        if (geoJSON.geometry.type === 'LineString') {
                            currentPoly = layer;
                            let latLng = layer._latlngs[0];
                            this.getLocationName(latLng, Math.round(parseInt(this.state.zoom)));
                            this.getPathDistance(layer._latlngs);
                        }
                    }
                    if (layerFromStateLeafId) {
                        let geoJSON = layer.toGeoJSON();
                        geoJSON.properties.objective = layerFromStateLeafId.options.weight;
                        geoJSON.properties.subjective = layerFromStateLeafId.options.color;
                        geoJSON._leaflet_id = layer._leaflet_id;
                        pathRes = geoJSON;
                        if (geoJSON.geometry.type === 'LineString') {
                            currentPoly = layer;
                            let latLng = layer._latlngs[0];
                            this.getLocationName(latLng, Math.round(parseInt(this.state.zoom)));
                            this.getPathDistance(layer._latlngs);
                        }
                    }
                }
            }
        }
        this.setState(prevState => ({
            ...this.state,
            canGoBack: false,
            currentPoly: currentPoly,
            disableStreetViewAndBack: false,
            disableEraseBtn: false,
            currentPath: pathRes,
            editStop: moment(new Date())
        }), ()=> {
            if (this.state.editStop && this.state.editStart) {
                let duration = moment.duration(this.state.editStop.diff(this.state.editStart));
                if (duration > 0) {
                    let minutes = duration.asSeconds();
                    let edited = [...this.state.edited];
                    let end =  moment(this.state.editStop).format('YYYY-MM-DD HH:mm:ss');
                    let editState = this.state.addingPath ? 'beforeSave' : 'afterSave';
                    edited.push({date: end, state: editState, duration: minutes, device: 'desktop'});
                    this.setState({
                        edited: edited
                    }, ()=> {
                        store.dispatch(setIsEmptyPath(false));
                        store.dispatch(setDisableSave(false));
                        store.dispatch(setDisableDropdowns(false));
                    })
                }
            }
        });
    };

    _onEdited (e) {
        store.dispatch(setPathEdited(true));
    }

    _onDeleteStart = (e) => {
        console.log('_onDeleteStart', e);
        this.disableElements(false, false, true);
        store.dispatch(setDisableSave(true));
    };

    _onDeleteStop = (e) => {
        const map = this.mapRef.current.leafletElement;
        if (!map.hasLayer(this.state.currentPoly)) {
            // store.dispatch(setIsEmptyPath(true));
            store.dispatch(setDisableSave(true));
            this.setState({
                currentPoly: null,
                canGoBack: false
            }, ()=> {
                sendGaEvent({category: 'erase-path', action: 'map-action'});
            });
        }
    };

    _onDeleted = (e) => {
        let numDeleted = 0;
        e.layers.eachLayer( (layer) => {
            numDeleted += 1;
        });
        console.log(`onDeleted: removed ${numDeleted} layers`, e);
        this._onChange();
    };

    discardAll() {
        if ((this.state.subjectiveCopy || this.state.objectiveCopy) && this.state.currentPath._id) {
            let pathData = this.state.userPaths.find(p => p._id === this.state.currentPath._id);
           if  (pathData.geometry.type === "LineString") {
               pathData.properties.subjective = this.state.subjectiveCopy;
               pathData.properties.objective = this.state.objectiveCopy;
           }
        }
        this.setState(prevState => {
            return {
                ...this.state,
                currentPath: null,
                currentPoly: null,
                pathName: this.getDefaultPathName(this.state.userPaths.length),
                pathDescription: null,
                selectedPathName: null,
                selectedPathDescription: null,
                editingPath: false,
                addingPath: false,
                showEditPathModal: false,
                canGoBack: true,
                selectedUserPaths: prevState.selectedUserPathsCopy,
                objective: defaultObjectiveValue,
                subjective: defaultSubjectiveValue,
                subjectiveCopy: null,
                objectiveCopy: null,
                edited: [],
                evaluations: [],
                editStart: null,
                editStop: null
            }
        }, ()=> {
            this._editableFG.leafletElement.clearLayers();
            store.dispatch(setIsEmptyPath(true));
            store.dispatch(setDisableDropdowns(false));
        });
    }

    pointToLayer(feature, latlng) {
        // return (feature.properties.hardship && feature.geometry.type === "Point") ? L.marker(latlng, {icon: markerIcons[feature.properties.hardship]}): null;
    }


    setAttribute(property, value) {
        if (property === "pathName") {
            let isEmpty = (!value || value.trim() === "");
            store.dispatch(setIsEmptyName(isEmpty));
            if (value !== this.state.selectedPathName && this.state.editingPath) {
                this.setState({
                    ...this.state,
                    [property]: value,
                    canGoBack: value === this.state.selectedPathName
                }, ()=> {
                });
            } else {
                this.setState({
                    ...this.state,
                    [property]: value
                }, ()=> {
                });
            }
            store.dispatch(setUnchangedName(value === this.state.selectedPathName));
        } else if (property === "pathDescription"){
            value = (!value || value.trim()==="") ? null : value;
            if (value !== this.state.selectedPathDescription && this.state.editingPath) {
                this.setState({
                    ...this.state,
                    [property]: value,
                    canGoBack: value === this.state.selectedPathDescription
                }, ()=> {
                });
            } else {
                this.setState({
                    ...this.state,
                    [property]: value
                }, ()=> {
                });
            }
            store.dispatch(setUnchangedDescription(value === this.state.selectedPathDescription));
        } else if (property==="objective") {
            if (value !== this.state.selectedPathObjective && this.state.editingPath) {
                this.setState({
                    ...this.state,
                    [property]: value,
                    canGoBack: value === this.state.selectedPathObjective
                }, () => {
                    store.dispatch(setEvalChangeNotSubmitted(this.state.objective !== this.state.selectedPathObjective  ||
                        this.state.subjective !== this.state.selectedPathSubjective));
                });
            } else {
                this.setState(prevState => ({
                    ...this.state,
                    [property]: value,
                    objectiveChanged: value !== prevState.objective
                }), () => {
                    store.dispatch(setEvalChangeNotSubmitted(this.state.objectiveChanged || this.state.subjectiveChanged));
                });
            }
            store.dispatch(setUnchangedObjective( value === this.state.selectedPathObjective));

        } else if(property==="subjective") {
            if (value!==this.state.selectedPathSubjective && this.state.editingPath) {
                this.setState({
                    ...this.state,
                    [property]: value,
                    canGoBack: value === this.state.selectedPathSubjective
                }, () => {
                    store.dispatch(setEvalChangeNotSubmitted(this.state.objective !== this.state.selectedPathObjective  ||
                        this.state.subjective !== this.state.selectedPathSubjective));
                });
            } else {
                this.setState(prevState => ({
                    ...this.state,
                    [property]: value,
                    subjectiveChanged: value !== prevState.subjective
                }), () => {
                    store.dispatch(setEvalChangeNotSubmitted(this.state.objectiveChanged || this.state.subjectiveChanged));
                });
            }
            store.dispatch(setUnchangedSubjective( value === this.state.selectedPathSubjective));
        } else {
            this.setState({
                ...this.state,
                [property]: value
            }, ()=> {

            });
        }
    }

    showEditModal(show) {
        this.setState({
            showEditPathModal: show
        })
    }

    showDeleteModal(show, name, id) {
        this.setState({
            showDeletePathModal: show,
            deletePathName: name,
            deletePathId: id
        })
    }



    showMsgToast(show, type, msg) {
        this.setState({
            toast: {
                show: show,
                type: type,
                msg: msg
            }
        })
    }

    modifyStyles() {
        let currentPolyTmp = this.state.currentPoly;
        let currentPathTmp = this.state.currentPath;
        let subjectiveCriterion;
        let objectiveCriterion;
        let prevSubjective;
        let prevObjective;
        let evalState;
        if (currentPolyTmp && currentPathTmp) {
            if (currentPolyTmp.feature) {
                evalState = 'afterSave';
                prevSubjective = Object.assign({}, currentPolyTmp.feature.properties.subjective);
                prevObjective = Object.assign({}, currentPolyTmp.feature.properties.objective);
                subjectiveCriterion = currentPolyTmp.feature.properties.subjective;
                objectiveCriterion = currentPolyTmp.feature.properties.objective;
            } else {
                evalState = "afterDraw";
                subjectiveCriterion = currentPolyTmp.options.color;
                objectiveCriterion = currentPolyTmp.options.weight;
            }

            if (subjectiveCriterion !== this.state.subjective ||
                objectiveCriterion !== this.state.objective
            ) {
                if (currentPathTmp.geometry.type==="LineString") {
                    currentPathTmp.properties.subjective = this.state.subjective;
                    currentPathTmp.properties.objective = this.state.objective;
                }

                let geojsonPolyOptions = {
                    color: this.state.subjective,
                    weight: this.state.objective
                };
                let evaluations = [...this.state.evaluations];
                let evalObj = {date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), state: evalState}
                evaluations.push(evalObj);
                this.setState(prevState => ({
                    ...this.state,
                    canGoBack: false,
                    subjectiveCopy: prevSubjective ? Object.values(prevSubjective).toString().replace(/,/g, "") : null,
                    objectiveCopy: prevObjective ? Object.values(prevObjective).toString().replace(/,/g, "") : null,
                    currentPath: currentPathTmp,
                    evaluations: evaluations
                }), () => {
                    let leafletFg = this._editableFG.leafletElement;
                    leafletFg.removeLayer(this.state.currentPoly);
                    currentPolyTmp.setStyle(geojsonPolyOptions);
                    leafletFg.addLayer(currentPolyTmp);
                    store.dispatch(setDisableSave(false));
                    store.dispatch(setPathEvaluated(true));
                    store.dispatch(setEvalChangeNotSubmitted(false));
                });
            }
        } else {
            if (this.state.objectiveChanged || this.state.subjectiveChanged) {
                evalState = "beforeDraw";
                let evaluations = [...this.state.evaluations];
                let evalObj = {date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'), state: evalState}
                evaluations.push(evalObj);
                this.setState({
                    evaluations: evaluations,
                    objectiveChanged: false,
                    subjectiveChanged: false
                }, ()=> {
                    store.dispatch(setPathEvaluated(true));
                    store.dispatch(setEvalChangeNotSubmitted(false));
                });

            }
        }
    }


    render() {
        return (
            <div className="main">
                <PathsActions
                    userPaths={this.state.userPaths}
                    communityPaths={this.state.communityPaths}
                    toggleSelectedPaths={this.toggleSelectedPaths}
                    toggleSelectedCommunityPaths={this.toggleSelectedCommunityPaths}
                    makePathEditable={this.makePathEditable}
                    savePath = {this.saveFeature}
                    setAttribute={this.setAttribute}
                    setEditablePathState={this.setEditablePathState}
                    showEditModal={this.showEditModal}
                    showDeleteModal={this.showDeleteModal}
                    canGoBack={this.state.canGoBack}
                    disableBack={this.state.disableStreetViewAndBack}
                    disableEdit={this.state.disableEditBtn}
                    disableErase={this.state.disableEraseBtn}
                    selectedPathName={this.state.selectedPathName}
                    selectedPathDecription={this.state.selectedPathDescription}
                    pathName={this.state.pathName}
                    pathDescription={this.state.pathDescription}
                    disableStreetViewAndBack = {this.disableElements}
                    existingPoly={this.state.currentPoly !== null}
                    modifyStyles={this.modifyStyles}
                    pathObjective={this.state.objective}
                    pathSubjective={this.state.subjective}
                    changeCenter={this.changeCenter}
                    addOrEditProcedure = {this.state.editingPath || this.state.addingPath}
                />
                <Map
                    ref={this.mapRef}
                    onzoomend={() => {this.onZoomChange(this.mapRef.current.leafletElement.getZoom())}}
                    style={{height: "100vh", width: "100%"}}
                    zoom={this.state.zoom}
                    zoomControl={false}
                    maxBounds={bounds}
                    maxZoom={mapLayers[this.state.tileLayer].maxZoom ? mapLayers[this.state.tileLayer].maxZoom : 19}
                    minZoom={8}
                    // gestureHandling={true}
                    onClick={e =>{
                        if (e.type === "click") {
                            this.setState({ streetView: e })}
                        }
                    }
                    center={this.state.currentCenter}>
                    <TileLayer url={mapLayers[this.state.tileLayer].layer}
                               bounds={bounds}
                               maxZoom={mapLayers[this.state.tileLayer].maxZoom}
                               attribution={mapLayers[this.state.tileLayer].attribution}
                    />
                    <ZoomControl ref={this.zoomRef} position='topright' />
                    <PanoStreetView
                        disableStreetView = {this.state.disableStreetViewAndBack}
                        streetView={this.state.streetView}
                        position="bottomright"
                    />
                    <ReactLeafletSearch
                        position="topright"
                        provider="OpenStreetMap"
                        providerOptions={{ region: "gr" }}
                        inputPlaceholder="Search by LatLng, or area name"
                        zoom={this.state.zoom}
                    />
                    <FeatureGroup
                        ref={ (reactFGref) => {
                            this._onFeatureGroupReady(reactFGref)}}>
                        <EditControl
                            position='topleft'
                            draw={{
                                rectangle: false,
                                polygon: false,
                                circlemarker: false,
                                circle: false,
                                marker: false,
                                polyline: {
                                  shapeOptions:  {
                                    color: this.state.subjective,
                                    weight: this.state.objective,
                                    opacity: 1
                                 }}
                            }}

                            edit={{
                            }}
                            onChange={this._onChange}
                            onCreated={this._onCreated}
                            onMounted={this._onMounted}
                            onEditStart={this._onEditStart}
                            onEditStop={this._onEditStop}
                            onEdited={this._onEdited}
                            onDeleteStart={this._onDeleteStart}
                            onDeleteStop={this._onDeleteStop}
                            onDeleted={this._onDeleted}
                        />
                    </FeatureGroup>
                    {this.state.selectedUserPaths.length > 0 ?
                        this.state.selectedUserPaths.map((path)=> {
                               return <React.Fragment key={path._id + '-fragment-user'}>
                               {path.geometry.type === "LineString" ?
                                   <React.Fragment>
                                       <GeoJSON  key={path._id}
                                                 data={path}
                                                 style={{weight: path.properties.objective, color: path.properties.subjective}}>
                                           <Popup>
                                               <PathInfoTooltip distance={path.distance}
                                                                area={path.area}
                                                                name={path.name}
                                                                description={path.description}
                                                                drawType={path.drawType}
                                                                type='path-map'
                                               />
                                           </Popup>
                                       </GeoJSON>
                                       <Marker
                                           icon={subjectiveTypesKeyValue[path.properties.subjective].marker}
                                           position={[path.geometry.coordinates[0][1], path.geometry.coordinates[0][0]]}>
                                           <Popup>
                                               <PathInfoTooltip distance={path.distance}
                                                                area={path.area}
                                                                name={path.name}
                                                                description={path.description}
                                                                drawType={path.drawType}
                                                                type='path-map'
                                               />
                                           </Popup>
                                       </Marker>
                                       <Marker
                                           icon={subjectiveTypesKeyValue[path.properties.subjective].marker}
                                           position={[path.geometry.coordinates[path.geometry.coordinates.length - 1][1], path.geometry.coordinates[path.geometry.coordinates.length - 1][0]]}>
                                           <Popup>
                                               <PathInfoTooltip distance={path.distance}
                                                                area={path.area}
                                                                name={path.name}
                                                                description={path.description}
                                                                drawType={path.drawType}
                                                                type='path-map'
                                               />
                                           </Popup>
                                       </Marker>
                                   </React.Fragment>
                                   :null}
                               </React.Fragment>
                        })
                        :null}
                    {this.state.selectedCommunityPaths.length > 0 ?
                        this.state.selectedCommunityPaths.map((path)=> {
                            return <React.Fragment key={path._id + '-fragment-comm'}>
                                {path.geometry.type === "LineString" ?
                                    <React.Fragment>
                                        <GeoJSON  key={path._id}
                                                  data={path}
                                                  style={{weight: path.properties.objective,
                                                      color: path.properties.subjective,
                                                      opacity: path.userId !== this.props.auth.user.id ? '0.55' : '1'}}>
                                            <Popup>
                                                <PathInfoTooltip distance={path.distance}
                                                                 area={path.area}
                                                                 name={path.name}
                                                                 description={path.description}
                                                                 drawType={path.drawType}
                                                                 type='path-map'
                                                />
                                            </Popup>
                                        </GeoJSON>
                                        <Marker
                                            icon={subjectiveTypesKeyValue[path.properties.subjective].marker}
                                            position={[path.geometry.coordinates[0][1], path.geometry.coordinates[0][0]]}>
                                            <Popup>
                                                <PathInfoTooltip distance={path.distance}
                                                                 area={path.area}
                                                                 name={path.name}
                                                                 description={path.description}
                                                                 drawType={path.drawType}
                                                                 type='path-map'
                                                />
                                            </Popup>
                                        </Marker>
                                        <Marker
                                            icon={subjectiveTypesKeyValue[path.properties.subjective].marker}
                                            position={[path.geometry.coordinates[path.geometry.coordinates.length - 1][1], path.geometry.coordinates[path.geometry.coordinates.length - 1][0]]}>
                                            <Popup>
                                                <PathInfoTooltip distance={path.distance}
                                                                 area={path.area}
                                                                 name={path.name}
                                                                 description={path.description}
                                                                 drawType={path.drawType}
                                                                 type='path-map'
                                                />
                                            </Popup>
                                        </Marker>
                                    </React.Fragment>:null}
                            </React.Fragment>
                        })
                        :null}
                </Map>
                <SpeechBubble />
                <EditPathModal showEditModal={this.showEditModal}
                               showEditPathModal={this.state.showEditPathModal}
                               discardAll = {this.discardAll}
                />
                <DeletePathModal showDeleteModal={this.showDeleteModal}
                                 deleteName={this.state.deletePathName}
                                 showDeletePathModal={this.state.showDeletePathModal}
                                 deletePathAction={this.deletePath}
                />
                <NotificationToast toastObj={this.state.toast} showMsgToast={this.showMsgToast}/>
            </div>
        );
    }
}

CustomMap.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    paths: state.paths,
    mapLayers: state.mapLayers
});

export default connect(
    mapStateToProps,
    { loginUser }
)(CustomMap);
