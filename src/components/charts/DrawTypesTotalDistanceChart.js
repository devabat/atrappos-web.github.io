import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_frozen from "@amcharts/amcharts4/themes/frozen";
import chartService from "../../services/chartService";
import {connect} from "react-redux";
import {LoaderChart} from "../ui/LoaderChart";

// Themes begin
am4core.useTheme(am4themes_animated);

class DrawTypesTotalDistanceChart extends Component {

    componentDidMount() {
        let chart = am4core.create("draw-types-total-distance-chart-div", am4charts.PieChart3D);
        chart.hiddenState.properties.opacity = 0;

        chart.paddingRight = 20;

        chartService.getDrawTypesTotalDistanceChart().then((res) => {
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
        chart.legend.valueLabels.template.marginLeft = 15;

        chart.innerRadius = 100;

        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = "distance";
        series.dataFields.category = "drawType";
        series.legendSettings.valueText = "{value} km";
        series.slices.template.tooltipText = "{category}: {value.percent.formatNumber('##.##')}% ({value} km)";
        series.tooltip.fill = am4core.color("#ffffff");
        series.tooltip.autoTextColor = false;
        series.colors.step = 4;

        this.chart = chart;
        am4core.unuseTheme(am4themes_frozen);
    }

    componentWillMount() {
        am4core.useTheme(am4themes_frozen);
    }


    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.charts.drawTypesTotalDistanceChart && this.props.charts.drawTypesTotalDistanceChart.fetching ?
                    <LoaderChart />
                    :null}
                <div id="draw-types-total-distance-chart-div" style={{ width: "100%", height: "500px" }}></div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => ({
    charts: state.charts
});

export default connect(mapStateToProps)(DrawTypesTotalDistanceChart);