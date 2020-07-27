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

class EditCountChart extends Component {
    componentDidMount() {
        let chart = am4core.create("edit-count-chart-div", am4charts.XYChart);
        chart.colors.step = 6;
        chart.paddingRight = 20;

        chartService.getEditCountChart().then((res) => {
           chart.data = res;
        });

        // Legend
        chart.legend = new am4charts.Legend();
        chart.legend.position="top";
        chart.legend.paddingBottom = 15;
        chart.legend.labels.template.maxWidth = 200;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "drawType";
        categoryAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Number of Path Edits";
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
        series.dataFields.categoryX = "drawType";
        series.sequencedInterpolation = true;

        // Make it stacked
        series.stacked = true;

        // Configure columns
        series.columns.template.width = am4core.percent(60);
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
        series.tooltip.autoTextColor = false;
        series.tooltip.label.fill = am4core.color("#ffffff");

        // Add label
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueY}";
        labelBullet.label.fill = am4core.color("#ffffff");
        labelBullet.locationY = 0.5;
        labelBullet.label.hideOversized = true;


        return series;
    }
        createSeries("beforeSave", "Before Save");
        createSeries("afterSave", "After Save");

        this.chart = chart;
    }

    componentWillMount() {
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
                {this.props.charts.editCountChart && this.props.charts.editCountChart.fetching ?
                    <LoaderChart />
                    :null}
                <div id="edit-count-chart-div" style={{ width: "100%", height: "500px" }}></div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => ({
    charts: state.charts
});

export default connect(mapStateToProps)(EditCountChart);