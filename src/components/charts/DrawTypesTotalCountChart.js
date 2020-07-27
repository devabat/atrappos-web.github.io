import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_material from "@amcharts/amcharts4/themes/material";
import chartService from "../../services/chartService";
import {connect} from "react-redux";
import {LoaderChart} from "../ui/LoaderChart";

// Themes begin
am4core.useTheme(am4themes_animated);

class DrawTypesTotalCountChart extends Component {
    componentDidMount() {
        let chart = am4core.create("draw-types-total-count-chart-div", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0;
        chart.colors.step = 8;
        chart.paddingRight = 20;

        chartService.getDrawTypesTotalCountChart().then((res) => {
           chart.data = res;
        });

        // Legend
        chart.legend = new am4charts.Legend()
        chart.legend.position = 'top';
        chart.legend.paddingBottom = 15;
        chart.legend.labels.template.maxWidth = 200;
        chart.legend.valueLabels.template.fontWeight = "bold";
        chart.legend.valueLabels.template.maxWidth = 400;
        chart.legend.valueLabels.template.textAlign = "end";
        chart.legend.valueLabels.template.marginLeft = -10;

        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "paths";
        series.dataFields.category = "drawType";
        series.legendSettings.valueText = "{value}";
        series.colors.step = 2;

        this.chart = chart;
        am4core.unuseTheme(am4themes_material);
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.charts.drawTypesTotalCountChart && this.props.charts.drawTypesTotalCountChart.fetching ?
                    <LoaderChart />
                    :null}
                <div id="draw-types-total-count-chart-div" style={{ width: "100%", height: "500px" }}></div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => ({
    charts: state.charts
});

export default connect(mapStateToProps)(DrawTypesTotalCountChart);