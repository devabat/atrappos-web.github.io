import React, {useState, useRef} from 'react';
import{Overlay, Popover} from 'react-bootstrap';
import {faAngleLeft, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InfoTooltip(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    const {id, clsName, content, placement} = props;

    const handleClick = event => {
        setShow(!show);
        setTarget(event.target);
    };

    return (
        <div className='tltp--wrapper' ref={ref}>
            <b/>
            <i className={clsName + '__btn--tltp'} onClick={handleClick}>
                <FontAwesomeIcon icon={faInfoCircle} />
            </i>
            <Overlay
                show={show}
                target={target}
                placement={placement}
                container={ref.current}
                containerPadding={20}
            >
                <Popover id={id}>
                    <Popover.Content>
                        {content}
                    </Popover.Content>
                </Popover>
            </Overlay>
        </div>
    );
}

export default InfoTooltip;

