import React, {useEffect} from 'react';
import {withRouter} from "react-router-dom";
import {useSelector} from "react-redux";
import {Logo} from "../layout/Logo";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar} from "@fortawesome/free-solid-svg-icons";
import DrawDurationChart from "./DrawDurationChart";
import EditCountChart from "./EditCountChart";
import EditDurationChart from "./EditDurationChart";
import EvaluationCountChart from "./EvaluationCountChart";
import EvaluationPerPathChart from "./EvaluationPerPathChart";
import DrawTypesCountPerUserChart from "./DrawTypesCountPerUserChart";
import DrawTypesTotalCountChart from "./DrawTypesTotalCountChart";
import DrawTypesDistancePerUserChart from "./DrawTypesDistancePerUserChart";
import DrawTypesTotalDistanceChart from "./DrawTypesTotalDistanceChart";


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
                <h2>Draw Path Average Duration</h2>
                <DrawDurationChart />
            </div>

            <div className="charts__item">
                <h2>Edit Path Count by Path State</h2>
                <EditCountChart />
            </div>

            <div className="charts__item">
                <h2>Edit Path Average Duration</h2>
                <EditDurationChart />
            </div>

            <div className="charts__item">
                <h2>Evaluation Count by Path State</h2>
                <EvaluationCountChart />
            </div>

            <div className="charts__item">
                <h2>Evaluations Total Values</h2>
                <EvaluationPerPathChart />
            </div>

            <div className="charts__item">
                <h2>Paths by Draw Types Count per User</h2>
                <DrawTypesCountPerUserChart />
            </div>

            <div className="charts__item">
                <h2>Paths by Draw Types Total Count</h2>
                <DrawTypesTotalCountChart/>
            </div>

            <div className="charts__item">
                <h2>Distance by Draw Type per User</h2>
                <DrawTypesDistancePerUserChart />
            </div>

            <div className="charts__item">
                <h2>Draw Types Total Distance</h2>
                <DrawTypesTotalDistanceChart />
            </div>

        </div>
    );
};

export const  Charts =  withRouter(ChartsComponent);