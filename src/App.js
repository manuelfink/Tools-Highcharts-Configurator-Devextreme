import React from "react";

import DataGrid, {
  Column,
  Editing,
  Paging,
  Selection,
  Lookup
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";
import ColorBox from "devextreme-react/color-box";
import DropDownBox from "devextreme-react/drop-down-box";

import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { employees, states } from "./data.js";

import { render } from "react-dom";
import Highcharts from "highcharts/highstock";
//import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const dataSource = new DataSource({
  store: new ArrayStore({
    data: employees,
    key: "ID"
  })
});

const columns = [
  "name",
  {
    dataField: "color",
    //dataType:"color"
    dataType: "color",
    editCellComponent: ColorBox
  },
  //"type",
  {
    dataField: "type",
    //editorType: DropDownBox,
    lookup: {
      dataSource: [
        { type: "spline" },
        { type: "line" },
        { type: "scatter" },
        { type: "bar" }
      ],
      valueExpr: "type",
      displayExpr: "type"
    }
  },
  "lineWidth",
  "min",
  "max"
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemKeys: [],
      chartOptions: {
        chart: {
          type: "spline"
        },
        title: {
          text: "My chart"
        },
        series: [
          {
            type: "spline",
            name: "Series 1",
            color: "#ff0000",
            lineWidth: "5",
            data: [1, 2, 1, 4, 3, 6]
          }
        ]
      }
    };

    this.seriesConfig = this.state.chartOptions.series;

    this.allowChartUpdate = true;

    //this.selectionChanged = this.selectionChanged.bind(this);
    this.updateChartSeries = this.updateChartSeries.bind(this);
  }

  render() {
    const { chartOptions } = this.state;
    return (
      <div>
        <div id="data-grid-demo">
          <DataGrid
            id="gridContainer"
            dataSource={this.seriesConfig}
            //keyExpr="ID"
            showBorders={true}
            //selectedRowKeys={this.state.selectedItemKeys}
            //onSelectionChanged={this.selectionChanged}
            defaultColumns={columns}
          >
            <Paging enabled={false} />
            <Editing
              mode="cell"
              allowUpdating={true}
              onChangesChange={this.updateChartSeries}
            />
          </DataGrid>
        </div>
        <div>
          <Button
            id="updateChart"
            text="Update Chart"
            height={34}
            onClick={this.updateChartSeries}
          />
        </div>
        <div>
          <HighchartsReact
            id="myGraph"
            ref={"chartComponent"}
            //allowChartUpdate={this.allowChartUpdate}
            highcharts={Highcharts}
            constructorType={"stockChart"}
            options={chartOptions}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    const chart = this.refs.chartComponent.chart;
  }
  updateChartSeries() {
    this.setState({
      chartOptions: {
        series: this.seriesConfig
      }
    });
    //this.setState({chartOptions: this.state.chartOptions});
    console.log(
      "Highcharts Options",
      this.state.chartOptions,
      this.seriesConfig
    );
  }

  /*selectionChanged(data) {
    console.log(data);
    return true;
    this.setState({
      selectedItemKeys: data.selectedRowKeys
    });
  }*/
}

export default App;
