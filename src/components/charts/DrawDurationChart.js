import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import chartService from "../../services/chartService";

am4core.useTheme(am4themes_animated);

class DrawDurationChart extends Component {
    componentDidMount() {
        let chart = am4core.create("draw-duration-chart-div", am4charts.XYChart);

        chart.paddingRight = 20;

        chartService.getDrawDurationChart().then((res) => {
           chart.data = res;
        });

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "drawType";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Draw Duration in Seconds";
        valueAxis.title.fontWeight = 700;
        valueAxis.renderer.minWidth = 35;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "drawDuration";
        series.dataFields.categoryX = "drawType";

        series.tooltipText = "Duration: {valueY.value}";
        series.tooltip.autoTextColor = false;
        series.tooltip.label.fill = am4core.color("#ffffff");
        series.fill = am4core.color("#20adc5");
        series.clustered = false;
        chart.cursor = new am4charts.XYCursor();

        // // let scrollbarX = new am4charts.XYChartScrollbar();
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
            <div id="draw-duration-chart-div" style={{ width: "100%", height: "500px" }}></div>
        );
    }
}

export default DrawDurationChart;