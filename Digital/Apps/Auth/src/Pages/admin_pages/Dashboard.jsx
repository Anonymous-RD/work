"use client";

import { useState } from "react";
import {
  Plus,
  BarChartIcon,
  LineChartIcon,
  PieChartIcon,
  AreaChartIcon,
  BarChartIcon as RadialBarChartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialData = [
  { month: "Jan", schools: 50, teachers: 500, students: 5000 },
  { month: "Feb", schools: 52, teachers: 520, students: 5200 },
  { month: "Mar", schools: 55, teachers: 550, students: 5500 },
  { month: "Apr", schools: 58, teachers: 580, students: 5800 },
  { month: "May", schools: 60, teachers: 600, students: 6000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const ChartCard = ({ id, chartType, onChartTypeChange, onDelete }) => {
  const [xAxis, setXAxis] = useState("month");
  const [yAxis, setYAxis] = useState(["schools", "teachers", "students"]);

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={initialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xAxis}
                label={{
                  value: xAxis.charAt(0).toUpperCase() + xAxis.slice(1),
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              {yAxis.map((axis, index) => (
                <Line
                  key={axis}
                  type="monotone"
                  dataKey={axis}
                  stroke={COLORS[index]}
                  animationDuration={1500}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={initialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xAxis}
                label={{
                  value: xAxis.charAt(0).toUpperCase() + xAxis.slice(1),
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              {yAxis.map((axis, index) => (
                <Bar
                  key={axis}
                  dataKey={axis}
                  fill={COLORS[index]}
                  animationDuration={1500}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={yAxis.map((axis) => ({
                  name: axis,
                  value: initialData[initialData.length - 1][axis],
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                animationDuration={1500}
              >
                {yAxis.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={initialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey={xAxis}
                label={{
                  value: xAxis.charAt(0).toUpperCase() + xAxis.slice(1),
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                label={{ value: "Count", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Legend />
              {yAxis.map((axis, index) => (
                <Area
                  key={axis}
                  type="monotone"
                  dataKey={axis}
                  stackId="1"
                  stroke={COLORS[index]}
                  fill={COLORS[index]}
                  animationDuration={1500}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      case "radialBar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="10%"
              outerRadius="80%"
              barSize={10}
              data={yAxis.map((axis, index) => ({
                name: axis,
                value: initialData[initialData.length - 1][axis],
              }))}
            >
              <RadialBar
                label={{ position: "insideStart", fill: "#fff" }}
                background
                dataKey="value"
                animationDuration={1500}
              />
              <Legend
                iconSize={10}
                layout="vertical"
                verticalAlign="middle"
                align="right"
              />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Chart {id}</CardTitle>
        <div className="flex items-center space-x-2">
          <Select onValueChange={onChartTypeChange} defaultValue={chartType}>
            <SelectTrigger className="w-[120px] bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="radialBar">Radial Bar Chart</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        {renderChart()}
        {/* <div className="mt-4 flex justify-between">
          <Select onValueChange={setXAxis} defaultValue={xAxis}>
            <SelectTrigger className="w-[120px] bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <SelectValue placeholder="Select X-axis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="schools">Schools</SelectItem>
              <SelectItem value="teachers">Teachers</SelectItem>
              <SelectItem value="students">Students</SelectItem>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => setYAxis(value.split(","))}
            defaultValue={yAxis.join(",")}
          >
            <SelectTrigger className="w-[200px] bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <SelectValue placeholder="Select Y-axis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="schools,teachers,students">All</SelectItem>
              <SelectItem value="schools">Schools</SelectItem>
              <SelectItem value="teachers">Teachers</SelectItem>
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="schools,teachers">
                Schools & Teachers
              </SelectItem>
              <SelectItem value="schools,students">
                Schools & Students
              </SelectItem>
              <SelectItem value="teachers,students">
                Teachers & Students
              </SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </CardContent>
    </Card>
  );
};

const SummaryCard = ({ data }) => {
  const latestData = data[data.length - 1];
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Education Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-around shadow-md">
        {[
          {
            label: "Schools",
            value: latestData.schools,
            color: "text-blue-600",
          },
          {
            label: "Teachers",
            value: latestData.teachers,
            color: "text-green-600",
          },
          {
            label: "Students",
            value: latestData.students,
            color: "text-yellow-600",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="text-center shadow-md p-5 rounded-xl hover:bg-black hover:text-gray-50 transition-colors duration-300"
          >
            <p className="text-lg text-[#929EAE]">Total {item.label}</p>
            <p className={`text-xl font-bold ${item.color}`}>
              {item.value || 0}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const [charts, setCharts] = useState([
    { i: "chart1", x: 0, y: 0, w: 6, h: 2, type: "line" },
    { i: "chart2", x: 6, y: 0, w: 6, h: 2, type: "bar" },
    { i: "chart3", x: 0, y: 2, w: 6, h: 2, type: "pie" },
  ]);

  const handleChartTypeChange = (chartId, newType) => {
    setCharts(
      charts.map((chart) =>
        chart.i === chartId ? { ...chart, type: newType } : chart
      )
    );
  };

  const handleDeleteChart = (chartId) => {
    setCharts(charts.filter((chart) => chart.i !== chartId));
  };

  const handleAddChart = (type) => {
    const newChartId = `chart${charts.length + 1}`;
    const newChart = {
      i: newChartId,
      x: (charts.length * 6) % 12,
      y: Infinity,
      w: 6,
      h: 2,
      type: type,
    };
    setCharts([...charts, newChart]);
  };

  const onLayoutChange = (layout) => {
    const updatedCharts = charts.map((chart) => {
      const updatedPosition = layout.find((l) => l.i === chart.i);
      return updatedPosition ? { ...chart, ...updatedPosition } : chart;
    });
    setCharts(updatedCharts);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Education Dashboard
          </h1>
        </header>
        <SummaryCard data={initialData} />
        <div className="mb-4 flex justify-between items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-lg">
                <Plus className="mr-2 h-4 w-4" /> Add New Chart
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="grid gap-2">
                <Button
                  onClick={() => handleAddChart("line")}
                  className="w-full justify-start hover:bg-gray-100 transition-colors duration-150"
                >
                  <LineChartIcon className="mr-2 h-4 w-4" /> Line Chart
                </Button>
                <Button
                  onClick={() => handleAddChart("bar")}
                  className="w-full justify-start hover:bg-gray-100 transition-colors duration-150"
                >
                  <BarChartIcon className="mr-2 h-4 w-4" /> Bar Chart
                </Button>
                <Button
                  onClick={() => handleAddChart("pie")}
                  className="w-full justify-start hover:bg-gray-100 transition-colors duration-150"
                >
                  <PieChartIcon className="mr-2 h-4 w-4" /> Pie Chart
                </Button>
                <Button
                  onClick={() => handleAddChart("area")}
                  className="w-full justify-start hover:bg-gray-100 transition-colors duration-150"
                >
                  <AreaChartIcon className="mr-2 h-4 w-4" /> Area Chart
                </Button>
                <Button
                  onClick={() => handleAddChart("radialBar")}
                  className="w-full justify-start hover:bg-gray-100 transition-colors duration-150"
                >
                  <RadialBarChartIcon className="mr-2 h-4 w-4" /> Radial Bar
                  Chart
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: charts }}
          breakpoints={{ lg: 1200, md: 1200, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={150}
          onLayoutChange={onLayoutChange}
        >
          {charts.map((chart) => (
            <div key={chart.i} data-grid={chart}>
              <ChartCard
                id={chart.i}
                chartType={chart.type}
                onChartTypeChange={(newType) =>
                  handleChartTypeChange(chart.i, newType)
                }
                onDelete={() => handleDeleteChart(chart.i)}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
}
