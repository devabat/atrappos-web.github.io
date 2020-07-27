import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {isMobile} from 'react-device-detect';
import logo from "../../assets/img/logo/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMobileAlt, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

const DeviceMessageComponent = (props) => {
const {history} = props;

    useEffect(()=> {
        if (!isMobile) {
            history.push('/home');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    return (
        <div className="device-message">
            <img src={logo} alt="atrappos logo"/>
            <p className='device-message--icons'>
                <i>
                    <FontAwesomeIcon icon={faMobileAlt} />
                </i>
                <i>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                </i>
            </p>
           <article className='device-message--text'>
               The bad news is that you have reached Atr<b>app</b>os Web using a mobile device. <br/>
               The good news is that there exists a mobile application for your current device!  <br/>
               You can use it with the same credentials.
               <a href= {process.env.MOBILE_APP_URL} target='_self'>
                    Atr<b>app</b>os Mobile
               </a>
           </article>
        </div>
    );
};

export const  DeviceMessage =  withRouter(DeviceMessageComponent);