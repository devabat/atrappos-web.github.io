import React, {Component} from 'react';
import store from "../../store";
import * as L from 'leaflet';
import {
    Map,
    TileLayer,
    FeatureGroup,
    ZoomControl,
    GeoJSON
} from "react-leaflet";
// eslint-disable-next-line
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import { EditControl } from "react-leaflet-draw";
import PropTypes from "prop-types";
import {mapLayers, markerIcons} from "../../lib/constants";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "../../assets/css/Main.css";

// SERVICES
import pathService from '../../services/pathService';
import {connect} from "react-redux";
import {loginUser, updateUser} from "../../services/authService";
import PathsActions from "./PathsActions";
import {EditPathModal} from "./EditPathModal";
import {NotificationToast} from "./NotificationToast";
import {setIsEmptyCollection, setIsEmptyName} from "../../actions/actions";
import {DeletePathModal} from "./DeletePathModal";

delete L.Icon.Default.prototype._getIconUrl;


class CustomMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currPos: null,
            userPaths: [],
            selectedUserPaths: [],
            selectedUserPathsIds: [],
            selectedUserPathsCopy: [],
            otherPaths: [],
            currentCollection: null,
            selectedPath: null,
            selectedPathName: null,
            pathName: null,
            difficulty: "2",
            category: "#958383",
            hardship: "stairs",
            showEditPathModal: false,
            showDeletePathModal: false,
            deletePathName: null,
            deletePathId: null,
            editingPath: false,
            addingPath: false,
            canGoBack: true,
            pathEdited: false,
            zoom: 16,
            tileLayer: this.props.mapLayers.mapLayer,
            toast: {
                show: false,
                type: null,
                msg: null
            }
        };

        this.getLocationName= this.getLocationName.bind(this);
        this.createCollection = this.createCollection.bind(this);
        this.saveFeatureCollection = this.saveFeatureCollection.bind(this);
        this._onFeatureGroupReady = this._onFeatureGroupReady.bind(this);
        this._onCreated = this._onCreated.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onMounted = this._onMounted.bind(this);
        this._onEditStart = this._onEditStart.bind(this);
        this._onEditStop = this._onEditStop.bind(this);
        this._onEdited = this._onEdited.bind(this);
        this._onDeleteStart = this._onDeleteStart.bind(this);
        this._onDeleteStop = this._onDeleteStop.bind(this);
        this._onDeleted = this._onDeleted.bind(this);
        this.pointToLayer = this.pointToLayer.bind(this);
        this.arrangePaths = this.arrangePaths.bind(this);
        this.setAttribute = this.setAttribute.bind(this);
        this.setEditablePathState = this.setEditablePathState.bind(this);
        this.onEditOrDelete = this.onEditOrDelete.bind(this);
        this.showEditModal = this.showEditModal.bind(this);
        this.showDeleteModal = this.showDeleteModal.bind(this);
        this.showMsgToast = this.showMsgToast.bind(this);
        this.discardAll = this.discardAll.bind(this);
        this.toggleSelectedPaths = this.toggleSelectedPaths.bind(this);
        this.makePathEditable= this.makePathEditable.bind(this);
        this.deletePath = this.deletePath.bind(this);
    }


    UNSAFE_componentWillMount() {
        this.arrangePaths();
        let that = this;
        navigator.geolocation.getCurrentPosition(function(location) {
            var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
            that.setState({
                currPos: latlng})
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let filtered;
        let ids = this.state.selectedUserPathsIds;
        if (ids.length > 0 && prevProps.paths.allPaths !== this.props.paths.allPaths) {
           filtered = this.props.paths.allPaths.filter(function(path) {
                return ids.indexOf(path._id) !== -1;
            });
            this.setState({
                ...this.state,
                selectedPathName: null,
                pathName: null,
                selectedUserPaths: filtered,
                pathEdited: false
            }, ()=> {
                store.dispatch(setIsEmptyName(true));
                store.dispatch(setIsEmptyCollection(true));
            });
        }

        if (prevState.editingPath && !this.state.editingPath && prevState.canGoBack && !this.state.pathEdited) {
            this._editableFG.leafletElement.clearLayers();
            this.setState({
                ...this.state,
                pathName: null,
                selectedPathName: null,
                selectedUserPaths: prevState.selectedUserPathsCopy
            }, ()=> {
                store.dispatch(setIsEmptyName(true));
                store.dispatch(setIsEmptyCollection(true));
            });
        }
        if (prevProps.mapLayers.mapLayer !== this.props.mapLayers.mapLayer) {
            this.setState({
                ...this.state,
                tileLayer: this.props.mapLayers.mapLayer
            })
        }
    }

    componentDidMount() {

    }

    setEditablePathState(type, isOn) {
        let editingPath = (type === "Edit" && isOn);
        let addingPath = (type === "Add" && isOn);
        this.setState({
            editingPath: editingPath,
            addingPath: addingPath
        });
        this.setState(prevState => {

        }, ()=> {


        })
    }


    arrangePaths() {
        let userId = this.props.auth.user.id;
        pathService.getAll().then((res) => {
            let userPaths = res.filter(path => {
                return path.userId === userId;
            });
            let otherPaths  = res.filter(path => {
                return path.userId !== userId;
            });

            this.setState({
                ...this.state,
                userPaths: userPaths,
                otherPaths: otherPaths,
            });
        })
    }

    toggleSelectedPaths(arr) {
        let filtered = this.state.userPaths.filter(function(path) {
            return arr.indexOf(path._id) !== -1;
        });
        this.setState({
            ...this.state,
            selectedUserPaths: filtered,
            selectedUserPathsIds: arr
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
                selectedPathName: pathData.name,
                pathName: pathData.name,
                currentCollection: pathData,
                selectedUserPaths: selectedPaths,
                selectedUserPathsCopy: selectedPathsCopy
            }
        }, ()=> {
        });

        leafletGeoJSON.eachLayer( (layer) =>
            {
                if (layer.feature.geometry && layer.feature.geometry.type === 'Point') {
                    if (layer.feature.properties && layer.feature.properties.hardship) {
                        layer.setIcon(markerIcons[layer.feature.properties.hardship]);
                    } else {
                        layer.setIcon(markerIcons['other']);
                    }
                }
                if (layer.feature.geometry && layer.feature.geometry.type === 'LineString') {
                    let geojsonPolyOptions = {
                        weight: layer.feature.properties.difficulty,
                        color: layer.feature.properties.category
                    };
                    layer.setStyle(geojsonPolyOptions);
                }

                /* That shows our selected GeoJSON data!!!! */
                leafletFG.addLayer(layer)

            });

    }

   createCollection(latLng, geoJson) {
        let collection = {
            features: [geoJson],
            type: 'FeatureCollection'
        };
        this.setState({
            ...this.state,
            canGoBack: false,
            currentCollection: collection
        }, ()=> {
            store.dispatch(setIsEmptyCollection(false));
        });
    }

    async getLocationName(latLng, zoom) {
        const geocoder = L.Control.Geocoder.nominatim();
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
        await promise.then(res => {
            this.setState({
                locationName:  res.name
            })
        })
    }

    saveFeatureCollection() {
        this.setState(prevState => {
            return {
                ...this.state,
                currentCollection: {
                    ...this.state.currentCollection,
                    features: prevState.currentCollection.features,
                    name: this.state.pathName ? this.state.pathName : this.state.locationName,
                    type:  prevState.currentCollection.type
                }
            }
        }, ()=> {
            if (this.state.addingPath) {
                pathService.saveOne(this.state.currentCollection).then((res) => {
                    this.setState({
                        canGoBack: true,
                        currentCollection: null
                    }, () => {
                        this.arrangePaths();
                        this._editableFG.leafletElement.clearLayers();
                        store.dispatch(setIsEmptyCollection(true));
                        this.showMsgToast(true, 'success', 'The path was been saved successfully!');
                    });
                }, (error) => {
                    this.showMsgToast(true, 'error', 'Something went wrong, please try again later.');
                });
            } else {
                pathService.editOne(this.state.currentCollection, this.state.currentCollection._id).then((res) => {
                    this.setState({
                        ...this.state,
                        pathEdited: true,
                        canGoBack: true,
                        currentCollection: null,
                    }, () => {
                        this.arrangePaths();
                        this._editableFG.leafletElement.clearLayers();
                        store.dispatch(setIsEmptyCollection(true));
                        this.showMsgToast(true, 'success', 'The path was edited successfully!');
                    });
                }, (error) => {
                    this.showMsgToast(true, 'error', 'Something went wrong, please try again later.');
                });
            }
        });
    }

    deletePath() {
        pathService.deleteOne(this.state.deletePathId).then((res) => {
            this.arrangePaths();
            this.showMsgToast(true, 'success', 'The path was deleted successfully!');
            this.showDeleteModal(false, null, null);
        }, (error)=> {
            this.showMsgToast(true, 'error', 'Something went wrong, please try again later.');
            this.showDeleteModal(false, null, null);
        });
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

        if (type === 'marker') {
            latLng = layer._latlng;
    }
        else {
            latLng = layer._latlngs[0];
        }

        let geoJSON = layer.toGeoJSON();

        if (geoJSON.geometry.type === 'LineString') {
            geoJSON.properties.difficulty = this.state.difficulty;
            geoJSON.properties.category = this.state.category;
        }

        if (geoJSON.geometry.type === 'Point') {
            geoJSON.properties.hardship = this.state.hardship;
        }
        geoJSON.leaflet_id = layer._leaflet_id;
        if (!this.state.currentCollection) {
            this.getLocationName(latLng, this.state.zoom);
            this.createCollection(latLng, geoJSON);
        } else {
            let features = [...this.state.currentCollection.features];
            features.push(geoJSON);
            this.setState(prevState => ({
                ...this.state,
                canGoBack: false,
                currentCollection:{
                    ...this.state.currentCollection,
                    features: features,
                    name: prevState.currentCollection.name,
                    type:  prevState.currentCollection.type
                }
            }), ()=> {
                let isEmpty = this.state.currentCollection.features.length <= 0;
                store.dispatch(setIsEmptyCollection(isEmpty))
            });
        }
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

    };

    _onEditStop = (e) => {
        this.onEditOrDelete(e, 'edit')

    };

    _onEdited (e) {

        // let numEdited = 0;
        //
        // let layer = e.layer;
        // e.layers.eachLayer( (layer) => {
        //     numEdited += 1;
        //     let geoJSON = layer.toGeoJSON();
        // });
        // this._onChange();
    }

    _onDeleteStart = (e) => {
        console.log('_onDeleteStart', e);
    };

    _onDeleteStop = (e) => {
        this.onEditOrDelete(e, 'delete')
    };

    _onDeleted = (e) => {
        let numDeleted = 0;
        e.layers.eachLayer( (layer) => {
            numDeleted += 1;
        });
        console.log(`onDeleted: removed ${numDeleted} layers`, e);
        this._onChange();
    };

    onEditOrDelete(e, type) {
        let layersObj = e.target._layers;
        let features = [];
        for (let key in layersObj) {
            if (layersObj.hasOwnProperty(key)) {
                let layer = layersObj[key];
                if (this.state.addingPath) {
                    let layerFromState = this.state.currentCollection.features.find(l => l.leaflet_id === layer._leaflet_id);
                    if (layerFromState) {
                        let geoJSON = layer.toGeoJSON();
                        geoJSON.properties = layerFromState.properties;
                        geoJSON.leaflet_id = layer._leaflet_id;
                        features.push(geoJSON);
                    }
                }
                if (this.state.editingPath && layer.feature) {
                    let layerFromState = this.state.currentCollection.features.find(l => l._id === layer.feature._id);
                    if (layerFromState) {
                        let geoJSON = layer.toGeoJSON();
                        geoJSON.properties = layerFromState.properties;
                        features.push(geoJSON);
                    }
                }
            }
        }
        let isEmpty = features.length <= 0;
        if (isEmpty) {
            this.setState({
                currentCollection: null
            }, ()=> {
                store.dispatch(setIsEmptyCollection(isEmpty));
            })
        } else {
            this.setState(prevState => ({
                ...this.state,
                canGoBack: false,
                currentCollection:{
                    ...this.state.currentCollection,
                    features: features,
                    name: this.state.pathName,
                    type:  prevState.currentCollection.type
                }
            }), ()=> {
                store.dispatch(setIsEmptyCollection(isEmpty));
            });
        }
    }


    discardAll() {
        this.setState(prevState => {
            return {
                ...this.state,
                currentCollection: null,
                selectedPathName: null,
                editingPath: false,
                addingPath: false,
                showEditPathModal: false,
                canGoBack: true,
                selectedUserPaths: prevState.selectedUserPathsCopy
            }
        }, ()=> {
            this._editableFG.leafletElement.clearLayers();
            store.dispatch(setIsEmptyCollection(true));

        });
    }

    pointToLayer(feature, latlng) {
        return (feature.properties.hardship && feature.geometry.type === "Point") ? L.marker(latlng, {icon: markerIcons[feature.properties.hardship]}): null;
    }


    setAttribute(property, value) {
        if (property === "pathName") {
            let isEmpty = (!value || value.trim() === "");
            store.dispatch(setIsEmptyName(isEmpty));
            if(value !== this.state.selectedPathName && this.state.editingPath) {
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

    render() {
        return (
            <div className="main">
                <PathsActions
                    userPaths={this.state.userPaths}
                    toggleSelectedPaths={this.toggleSelectedPaths}
                    makePathEditable={this.makePathEditable}
                    savePath = {this.saveFeatureCollection}
                    setAttribute={this.setAttribute}
                    setEditablePathState={this.setEditablePathState}
                    showEditModal={this.showEditModal}
                    showDeleteModal={this.showDeleteModal}
                    canGoBack={this.state.canGoBack}
                    selectedPathName={this.state.selectedPathName}
                />
                <Map
                    ref={(ref) => { this.map = ref;}}
                    style={{height: "100vh", width: "100%"}}
                    zoom={this.state.zoom}
                    zoomControl={false}
                    gestureHandling={true}
                    center={this.state.currPos}>
                    <TileLayer url={mapLayers[this.state.tileLayer].layer}
                               maxZoom={mapLayers[this.state.tileLayer].maxZoom}
                               attribution={mapLayers[this.state.tileLayer].attribution}
                    />
                    <ZoomControl position='topright'/>
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
                                marker: {
                                    icon: markerIcons[this.state.hardship]
                                },
                                polyline: {
                                  shapeOptions:  {
                                    color: this.state.category,
                                    weight: this.state.difficulty,
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
                        {/*{this.state.selectedPath && this.state.pathStyle ?*/}
                        {/*<GeoJSON data={this.state.selectedPath} style={this.state.pathStyle}/>:null}*/}
                    </FeatureGroup>
                    {this.state.userPaths.length > 0 && this.state.selectedUserPaths.length > 0 ?
                        this.state.selectedUserPaths.map((path)=> {
                           return path.features.map((feature)=> {
                               return <React.Fragment>
                               {feature.geometry.type === "LineString" ?
                                   <GeoJSON  key={feature._id}
                                             data={feature}
                                             style={{weight: feature.properties.difficulty, color: feature.properties.category }}
                                   />:null}
                               {feature.geometry.type === "Point" ?
                                   <GeoJSON key={feature._id}
                                            data={feature}
                                            pointToLayer={this.pointToLayer}
                                       />:null}
                               </React.Fragment>
                            });
                        })
                        :null}
                </Map>
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
    { loginUser, updateUser }
)(CustomMap);
