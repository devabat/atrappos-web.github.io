import React from "react";
import ReactDOM from "react-dom";
import { MapControl, withLeaflet } from "react-leaflet";
import { Control, DomUtil, DomEvent } from "leaflet";
import {
    faStreetView
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoTooltip from "../ui/InfoTooltip";
import {sendGaEvent} from "../../lib/utils";

const DumbControl = Control.extend({
    options: {
        className: "",
        onOff: "",
        handleOff: function noop() {}
    },


    onAdd() {
        var _controlDiv = DomUtil.create("div", this.options.className);
        DomEvent.disableClickPropagation(_controlDiv);
        return _controlDiv;
    },

    onRemove(map) {
        if (this.options.onOff) {
            map.off(this.options.onOff, this.options.handleOff, this);
        }
        return this;
    }
});


export default withLeaflet(
    class LeafletControl extends MapControl {
        state = {
            streetViewEnabled: false,
            disableStreetView: false,
            streetView: null,
            backgroundColor: "white",
            tltpOpen: false
        };


        createLeafletElement(props) {
            return new DumbControl(Object.assign({}, props));
        }

        componentDidMount() {
            super.componentDidMount();
            // let { streetView } = this.props;
            this.forceUpdate();
        }

        componentWillReceiveProps(nextProps) {
            const { disableStreetView } = nextProps;
            if (this.state.disableStreetView !== disableStreetView) {
                this.setState({
                    disableStreetView: disableStreetView
                })
            }

            if (!this.state.streetViewEnabled || this.state.disableStreetView) return;
            const { streetView } = nextProps;
            if ((this.state.streetView !== streetView) && !this.state.disableStreetView) {
                const { latlng } = streetView;
                const { lat, lng } = latlng;
                const url = `http://maps.google.com/?cbll=${lat},${lng}&cbp=12,20.09,,0,5&layer=c`;
                this.setState({
                    streetView: streetView
                });
                if (this.props.sameWindow) {
                    window.open(url, "sameWindow");
                } else {
                    sendGaEvent({category: "open-streetview", action: 'map-action'});
                    window.open(url);
                }
            }
        }

        buttonClicked = e => {
            const { streetViewEnabled } = this.state;
            this.setState({
                streetViewEnabled: !streetViewEnabled,
            });
        };

        isTooltipOpen = (open) => {
            this.setState({
                tltpOpen: open
            })
        }

        render() {

            if (!this.leafletElement || !this.leafletElement.getContainer()) {
                return null;
            }
            return ReactDOM.createPortal(
                (this.props.children && (
                    <div onClick={this.buttonClicked}>{this.props.children}</div>
                )) || ( //If child is available render child
                    <div className={'street-view__btn--wrapper' + (this.state.tltpOpen ? ' tooltip-open': '')}>
                        <div className='street-view__info'>
                            <InfoTooltip id='street-view-btn-tltp'
                                         clsName="street-view"
                                         placement="top"
                                         gaEvent="streetview-info"
                                         isStreetView={true}
                                         isTooltipOpen={this.isTooltipOpen}
                                         content="When Street View is 'ON', wherever you click on the map a new tab will open with a street view available in this specific area.
                                         Street View will be disabled during any path creation/modification process.">
                            </InfoTooltip>
                        </div>
                        <button className={"street-view__btn " + (this.state.streetViewEnabled && !this.state.disableStreetView ? 'street-view__btn--on' : 'street-view__btn--off') } //Else render default button
                             onClick={this.buttonClicked}
                                disabled={this.state.disableStreetView}>
                            <i><FontAwesomeIcon icon={faStreetView} /></i>
                            <span>Street View: {this.state.streetViewEnabled && !this.state.disableStreetView  ? ' ON': ' OFF'}</span>
                        </button>
                    </div>
                ),
                this.leafletElement.getContainer()
            );
        }
    }
);
