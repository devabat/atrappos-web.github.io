import React, { Component } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import chartService from "../../services/chartService";
import {connect} from "react-redux";
import {LoaderChart} from "../ui/LoaderChart";

am4core.useTheme(am4themes_animated);

class EditDurationChart extends Component {
    componentDidMount() {
        let chart = am4core.create("edit-duration-chart-div", am4charts.XYChart);

        chart.paddingRight = 20;

        chartService.getEditDurationChart().then((res) => {
           chart.data = res;
        });

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "drawType";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Average Edit Duration in Minutes";
        valueAxis.title.fontWeight = 700;
        valueAxis.renderer.minWidth = 10;
        valueAxis.min = 0;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "drawType";
        series.dataFields.valueX = "editDuration";
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        series.tooltipText = "Average Duration: {valueX.value}min";
        series.tooltip.autoTextColor = false;
        series.tooltip.label.fill = am4core.color("#ffffff");
        series.fill = am4core.color("#9D91EE");
        series.stroke = am4core.color("#9D91EE");
        series.clustered = false;
        chart.cursor = new am4charts.XYCursor();

        // Add label
        let labelBullet = series.bullets.push(new am4charts.LabelBullet());
        labelBullet.label.text = "{valueX}min";
        labelBullet.label.fill = am4core.color("#ffffff");
        labelBullet.locationX = 0.5;


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
                {this.props.charts.editDurationChart && this.props.charts.editDurationChart.fetching ?
                    <LoaderChart />
                    :null}
                <div id="edit-duration-chart-div" style={{ width: "100%", height: "500px" }}></div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    charts: state.charts
});

export default connect(mapStateToProps)(EditDurationChart);