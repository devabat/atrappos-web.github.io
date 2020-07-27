import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import chartService from "../../services/chartService";
import {connect} from "react-redux";
import {LoaderChart} from "../ui/LoaderChart";

// Themes begin
am4core.useTheme(am4themes_animated);

class EvaluationPerPathChart extends Component {
    componentDidMount() {
        let chart = am4core.create("evaluation-per-path-chart-div", am4charts.XYChart);
        chart.colors.step = 2;

        chart.paddingRight = 20;

        chartService.getEvaluationPerPathChart().then((res) => {
           chart.data = res;
        });

        // Legend
        chart.legend = new am4charts.Legend()
        chart.legend.position = 'top'
        chart.legend.paddingBottom = 15;
        chart.legend.labels.template.maxWidth = 200;

        // Create axes
        var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
        xAxis.renderer.minGridDistance = 40;
        xAxis.maxPrecision = 0;
        xAxis.title.text = "Landscape";

        // Create value axis
        var yAxis = chart.yAxes.push(new am4charts.ValueAxis());
        yAxis.maxPrecision = 0;
        yAxis.title.text = "Walkability";

        // Create series
        var series1 = chart.series.push(new am4charts.LineSeries());
        series1.dataFields.valueX = "x";
        series1.dataFields.valueXLabel = "xValueLabel";
        series1.dataFields.valueY = "ay";
        series1.dataFields.value = "aValue";
        series1.dataFields.valueLabel = "aValueLabel";
        series1.strokeWidth = 1;
        series1.stroke = "#F41A1A";
        series1.propertyFields.fill = "#F41A1A";

        var series2 = chart.series.push(new am4charts.LineSeries());
        series2.dataFields.valueX = "x";
        series2.dataFields.valueXLabel = "xValueLabel";
        series2.dataFields.valueY = "by";
        series2.dataFields.value = "bValue";
        series2.dataFields.valueLabel = "bValueLabel";
        series2.strokeWidth = 2;
        series2.stroke = "#F27418";

        var series3 = chart.series.push(new am4charts.LineSeries());
        series3.dataFields.valueX = "x";
        series3.dataFields.valueXLabel = "xValueLabel";
        series3.dataFields.valueY = "cy";
        series3.dataFields.value = "cValue";
        series3.dataFields.valueLabel = "cValueLabel";
        series3.strokeWidth = 3;
        series3.stroke = "#B054F8";
        series3.propertyFields.fill = "#B054F8";

        var series4 = chart.series.push(new am4charts.LineSeries());
        series4.dataFields.valueX = "x";
        series4.dataFields.valueXLabel = "xValueLabel";
        series4.dataFields.valueY = "dy";
        series4.dataFields.value = "dValue";
        series4.dataFields.valueLabel = "dValueLabel";
        series4.strokeWidth = 4;
        series4.stroke = "#3D7AF5";
        series4.propertyFields.fill = "#3D7AF5";

        var series5 = chart.series.push(new am4charts.LineSeries());
        series5.dataFields.valueX = "x";
        series5.dataFields.valueXLabel = "xValueLabel";
        series5.dataFields.valueY = "ey";
        series5.dataFields.value = "eValue";
        series5.dataFields.valueLabel = "eValueLabel";
        series5.strokeWidth = 5;
        series5.stroke = "#12C416";
        series5.propertyFields.fill = "#12C416";

        var bullet1 = series1.bullets.push(new am4charts.CircleBullet());
        var bullet2 = series2.bullets.push(new am4charts.CircleBullet());
        var bullet3 = series3.bullets.push(new am4charts.CircleBullet());
        var bullet4 = series4.bullets.push(new am4charts.CircleBullet());
        var bullet5 = series5.bullets.push(new am4charts.CircleBullet());

        bullet1.circle.fill = am4core.color("#F41A1A");
        bullet2.circle.fill = am4core.color("#F27418");
        bullet3.circle.fill = am4core.color("#B054F8");
        bullet4.circle.fill = am4core.color("#3D7AF5");
        bullet5.circle.fill = am4core.color("#12C416");

        series1.heatRules.push({
            target: bullet1.circle,
            property: "radius",
            min: 5,
            max: 35
        });

        series2.heatRules.push({
            target: bullet2.circle,
            property: "radius",
            min: 5,
            max: 35
        });

        series3.heatRules.push({
            target: bullet3.circle,
            property: "radius",
            min: 5,
            max: 35
        });

        series4.heatRules.push({
            target: bullet4.circle,
            property: "radius",
            min: 5,
            max: 35
        });

        series5.heatRules.push({
            target: bullet5.circle,
            property: "radius",
            min: 5,
            max: 35
        });

        bullet1.tooltipText = "Walkability: {valueLabel}, Landscape: {valueXLabel}, Paths: [bold]{value}[/]";
        bullet2.tooltipText = "Walkability: {valueLabel}, Landscape: {valueXLabel}, Paths: [bold]{value}[/]";
        bullet3.tooltipText = "Walkability: {valueLabel}, Landscape: {valueXLabel}, Paths: [bold]{value}[/]";
        bullet4.tooltipText = "Walkability: {valueLabel}, Landscape: {valueXLabel}, Paths: [bold]{value}[/]";
        bullet5.tooltipText = "Walkability: {valueLabel}, Landscape: {valueXLabel}, Paths: [bold]{value}[/]";

        // Scrollbars
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();

        // Cursor
        chart.cursor = new am4charts.XYCursor();

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.charts.evaluationPerPathChart && this.props.charts.evaluationPerPathChart.fetching ?
                    <LoaderChart />
                    :null}
                <div id="evaluation-per-path-chart-div" style={{ width: "100%", height: "800px" }}></div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    charts: state.charts
});

export default connect(mapStateToProps)(EvaluationPerPathChart);