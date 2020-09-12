import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import chartService from "../../services/chartService";
import {connect} from "react-redux";
import {LoaderChart} from "../ui/LoaderChart";

am4core.useTheme(am4themes_animated);

class DrawDurationChart extends Component {
    componentDidMount() {
        let chart = am4core.create("draw-duration-chart-div", am4charts.XYChart3D);

        chart.paddingRight = 20;

        chartService.getDrawDurationChart().then((res) => {
           chart.data = res;
        });

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "drawType";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Average Duration in Minutes";
        valueAxis.title.fontWeight = 700;
        valueAxis.renderer.minWidth = 10;
        valueAxis.maxPrecision = 0;

        let series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueY = "drawDuration";
        series.dataFields.categoryX = "drawType";

        series.tooltipText = "Average Duration: {valueY.value}min";
        series.tooltip.autoTextColor = false;
        series.tooltip.label.fill = am4core.color("#ffffff");
        series.fill = am4core.color("#20adc5");
        series.clustered = false;
        chart.cursor = new am4charts.XYCursor();

        // Add label
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}min";
        labelBullet.label.fill = am4core.color("#ffffff");
        labelBullet.locationY = 0.5;



        // let scrollbarX = new am4charts.XYChartScrollbar();
        // scrollbarX.series.push(series);
        // chart.scrollbarX = scrollbarX;

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
                {this.props.charts.drawDurationChart && this.props.charts.drawDurationChart.fetching ?
                    <LoaderChart />
                :null}
                <div id="draw-duration-chart-div" style={{ width: "100%", height: "500px" }}></div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => ({
    charts: state.charts
});

export default connect(mapStateToProps)(DrawDurationChart);