"use client";

import { useState } from "react";
import {
  Plus,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react";
// import { Button } from "@ui/components/button";
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
} from "recharts";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
// import Button from "./../../components/Button";

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
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={initialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="schools" stroke="#0088FE" />
              <Line type="monotone" dataKey="teachers" stroke="#00C49F" />
              <Line type="monotone" dataKey="students" stroke="#FFBB28" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={initialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="schools" fill="#0088FE" />
              <Bar dataKey="teachers" fill="#00C49F" />
              <Bar dataKey="students" fill="#FFBB28" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  {
                    name: "Schools",
                    value: initialData[initialData.length - 1].schools,
                  },
                  {
                    name: "Teachers",
                    value: initialData[initialData.length - 1].teachers,
                  },
                  {
                    name: "Students",
                    value: initialData[initialData.length - 1].students,
                  },
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                fill="#8884d8"
                dataKey="value"
              >
                {initialData.map((entry, index) => (
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
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">{renderChart()}</CardContent>
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
      <CardContent className="flex justify-around  shadow-md">
        {initialData.length > 0 &&
          // Grab the most recent month (last item in the array)
          [
            {
              label: "Schools",
              value: initialData[initialData.length - 1].schools,
              color: "text-blue-600",
            },
            {
              label: "Teachers",
              value: initialData[initialData.length - 1].teachers,
              color: "text-green-600",
            },
            {
              label: "Students",
              value: initialData[initialData.length - 1].students,
              color: "text-yellow-600",
            },
          ].map((item, index) => (
            <div key={index} className="text-center shadow-md p-5 rounded-xl">
              <h3 className={`text-xl font-bold ${item.color}`}>
                {item.value || 0}{" "}
                {/* Default to 0 if value is undefined or null */}
              </h3>
              <p className="font-extrabold text-2xl">{item.label}</p>
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
      y: Infinity, // puts it at the bottom
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
        <div className="mb-4 flex justify-between items-center ">
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Chart
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <Button
                  onClick={() => handleAddChart("line")}
                  className="w-full justify-start"
                >
                  <LineChartIcon className="mr-2 h-4 w-4" /> Line Chart
                </Button>
                <Button
                  onClick={() => handleAddChart("bar")}
                  className="w-full justify-start"
                >
                  <BarChartIcon className="mr-2 h-4 w-4" /> Bar Chart
                </Button>
                <Button
                  onClick={() => handleAddChart("pie")}
                  className="w-full justify-start"
                >
                  <PieChartIcon className="mr-2 h-4 w-4" /> Pie Chart
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: charts }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
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
