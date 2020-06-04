import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import {Logo} from "../layout/Logo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar} from "@fortawesome/free-solid-svg-icons";
import DrawDurationChart from "./DrawDurationChart";
import EditCountChart from "./EditCountChart";


const ChartsComponent = (props) => {
    const {history} = props;
    const authReducer = useSelector(state => state.auth);

    useEffect(()=> {
        if (authReducer.user.role !== 'admin') {
            history.push('/home');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authReducer.user]);

    return (
        <div className="charts">
            <div className="charts__top">
                <Logo logoCls="logo--charts" />
                <h1>
                    <i>
                        <FontAwesomeIcon icon={faChartBar} />
                    </i>
                    <span>Charts</span>
                </h1>
            </div>

            <div className="charts__item">
                <h2>Draw path duration</h2>
                <DrawDurationChart />
            </div>

            <div className="charts__item">
                <h2>Edit Count</h2>
                <EditCountChart />
            </div>

        </div>
    );
};

export const  Charts =  withRouter(ChartsComponent);