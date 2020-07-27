import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {setHideBubble} from "../../actions/pathsActions";
import {Button} from "react-bootstrap";



export const SpeechBubble = () => {
    const reduxDispatch = useDispatch();
    const [hideBubbleNow, setHideBubbleNow] = useState(false);
    const [hideForever, setHideForever] = useState(false);
    const pathsReducer = useSelector(state => state.paths);

    const handleHideForeverSpeechBubble = (e) => {
        let checked = e.target.checked;
        setHideForever(checked);
    }

    const hideSearchBubble = () => {
        setHideBubbleNow(true);
        reduxDispatch(setHideBubble(hideForever));
    }

    return (
        <React.Fragment>
        { !hideBubbleNow && !pathsReducer.hideBubble ?
            <div className="speech-bubble__wrapper">
                <div className="speech-bubble">
                    <div className='speech-bubble__text'>
                        <span>
                           Here you can search any area by its name or LatLng and focus it in the map.
                            After your search, a marker with the area info will appear.
                            You can hide this marker by closing the search box.
                        </span>
                        <div className='speech-bubble__bottom'>
                            <div className='speech-bubble__cbox'>
                                <label className="cbox-container speech-bubble__checkbox">
                                    <span className="cbox-lbl-txt">
                                        Hide this forever.
                                    </span>
                                    <input type="checkbox"
                                           onChange={handleHideForeverSpeechBubble}
                                    />
                                    <span className="cbox-checkmark"/>
                                </label>
                            </div>
                            <Button className="speech-bubble__btn"
                                    variant="info"
                                    onClick={hideSearchBubble}>
                                <i>
                                    <FontAwesomeIcon icon={faCheck} />
                                </i>
                                <span>
                                    Got it!
                                </span>
                            </Button>
                         </div>
                    </div>
                </div>
            </div>:null}
        </React.Fragment>
    );
};

