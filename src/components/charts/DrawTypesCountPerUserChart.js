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

class DrawTypesCountPerUserChart extends Component {
    componentDidMount() {
        let chart = am4core.create("draw-types-count-per-user-chart-div", am4charts.XYChart);
        chart.colors.step = 2;
        chart.paddingRight = 20;

        chartService.getDrawTypesCountPerUserChart().then((res) => {
           chart.data = res;
        });

        // Legend
        chart.legend = new am4charts.Legend()
        chart.legend.position = 'top'
        chart.legend.paddingBottom = 15;
        chart.legend.labels.template.maxWidth = 200;

        // Create axes
        var xAxis = chart.xAxes.push(new am4charts.CategoryAxis())
        xAxis.dataFields.category = 'user'
        xAxis.renderer.cellStartLocation = 0.1
        xAxis.renderer.cellEndLocation = 0.9
        xAxis.renderer.grid.template.location = 0;


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Path types count per User";
        valueAxis.title.fontWeight = 700;
        valueAxis.renderer.minWidth = 10;
        valueAxis.min = 0;
        valueAxis.maxPrecision = 0;

        // Create series
        function createSeries(field, name) {

        // Set up series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.name = name;
        series.dataFields.valueY = field;
        series.dataFields.categoryX = "user";

        series.events.on("hidden", arrangeColumns);
        series.events.on("shown", arrangeColumns);

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
        series.tooltip.autoTextColor = false;
        series.tooltip.label.fill = am4core.color("#ffffff");

        // Add label
        var labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.label.truncate = false;
        labelBullet.label.hideOversized = false;
        labelBullet.label.fill = am4core.color('#25272C');
        labelBullet.label.fontSize= 12;
        labelBullet.label.paddingBottom = 20;

        return series;
    }

        // Scrollbars
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();

        createSeries("desktop", "Desktop");
        createSeries("phone", "Phone");
        createSeries("location", "Location");

        function arrangeColumns() {

            var series = chart.series.getIndex(0);

            var w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
            if (series.dataItems.length > 1) {
                var x0 = xAxis.getX(series.dataItems.getIndex(0), "categoryX");
                var x1 = xAxis.getX(series.dataItems.getIndex(1), "categoryX");
                var delta = ((x1 - x0) / chart.series.length) * w;
                if (am4core.isNumber(delta)) {
                    var middle = chart.series.length / 2;

                    var newIndex = 0;
                    chart.series.each(function(series) {
                        if (!series.isHidden && !series.isHiding) {
                            series.dummyData = newIndex;
                            newIndex++;
                        }
                        else {
                            series.dummyData = chart.series.indexOf(series);
                        }
                    })
                    var visibleCount = newIndex;
                    var newMiddle = visibleCount / 2;

                    chart.series.each(function(series) {
                        var trueIndex = chart.series.indexOf(series);
                        var newIndex = series.dummyData;

                        var dx = (newIndex - trueIndex + middle - newMiddle) * delta

                        series.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                        series.bulletsContainer.animate({ property: "dx", to: dx }, series.interpolationDuration, series.interpolationEasing);
                    })
                }
            }
        }

        this.chart = chart;
    }

    componentWillMount() {
        am4core.useTheme(am4themes_material);
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.props.charts.drawTypesCountPerUserChart && this.props.charts.drawTypesCountPerUserChart.fetching ?
                    <LoaderChart />
                    :null}
                <div id="draw-types-count-per-user-chart-div" style={{ width: "100%", height: "500px" }}></div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => ({
    charts: state.charts
});

export default connect(mapStateToProps)(DrawTypesCountPerUserChart);