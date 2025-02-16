"use client";
import { IoMdClose } from "react-icons/io";
import { MdFullscreen } from "react-icons/md";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa6";
import {
  // Plus,
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
// import IndiaMap from "@/components/admin/IndiaMap";

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
    <Card className="mb-8 ">
      {/* <CardHeader>
        <CardTitle>Education Summary</CardTitle>
      </CardHeader> */}
      <CardContent className="flex justify-between   ">
        {[
          {
            label: "Schools",
            value: latestData.schools,
            // color: "text-blue-600",
            icon: (
              <svg
                width="42"
                height="43"
                viewBox="0 0 42 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="21" cy="21.5" r="21" fill="#4E5257" />
                <path
                  d="M30.3333 29.2608H29.6667V19.1161C29.6667 18.8299 29.6125 18.5481 29.509 18.2957C29.4055 18.0434 29.2559 17.8282 29.0733 17.6694L21.74 11.2921C21.521 11.1016 21.2636 11 21.0004 11C20.7372 11 20.4799 11.1016 20.2608 11.2921L12.9275 17.6694C12.7448 17.8281 12.595 18.0432 12.4913 18.2956C12.3877 18.5479 12.3334 18.8298 12.3333 19.1161V29.2608H11.6667C11.4899 29.2608 11.3203 29.3525 11.1953 29.5155C11.0702 29.6786 11 29.8998 11 30.1304C11 30.361 11.0702 30.5822 11.1953 30.7453C11.3203 30.9084 11.4899 31 11.6667 31H30.3333C30.5101 31 30.6797 30.9084 30.8047 30.7453C30.9298 30.5822 31 30.361 31 30.1304C31 29.8998 30.9298 29.6786 30.8047 29.5155C30.6797 29.3525 30.5101 29.2608 30.3333 29.2608ZM21.6667 22.3042H26.3333V24.9129H21.6667V22.3042ZM20.3333 24.9129H15.6667V22.3042H20.3333V24.9129ZM15.6667 26.6521H20.3333V29.2608H15.6667V26.6521ZM21.6667 26.6521H26.3333V29.2608H21.6667V26.6521Z"
                  fill="#C8EE44"
                />
              </svg>
            ),
          },
          {
            label: "Teachers",
            value: latestData.teachers,
            // color: "text-green-600",
            icon: (
              <svg
                width="42"
                height="43"
                viewBox="0 0 42 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="21" cy="21.5" r="21" fill="#EBE8E8" />
                <g clip-path="url(#clip0_2192_10979)">
                  <path
                    d="M29.75 17.2518V26.6268C29.75 26.7926 29.6842 26.9516 29.5669 27.0688C29.4497 27.186 29.2908 27.2518 29.125 27.2518H23.5C23.0035 27.2518 22.5273 27.4487 22.1758 27.7993C21.8243 28.15 21.6262 28.6257 21.625 29.1221C21.6275 29.2498 21.5904 29.375 21.5187 29.4806C21.4471 29.5863 21.3445 29.6671 21.225 29.712C21.1302 29.7486 21.0278 29.7615 20.9268 29.7496C20.8259 29.7377 20.7293 29.7013 20.6456 29.6437C20.5619 29.586 20.4934 29.5088 20.4463 29.4188C20.3991 29.3287 20.3747 29.2285 20.375 29.1268C20.375 28.6295 20.1775 28.1526 19.8258 27.801C19.4742 27.4494 18.9973 27.2518 18.5 27.2518H12.875C12.7092 27.2518 12.5503 27.186 12.4331 27.0688C12.3158 26.9516 12.25 26.7926 12.25 26.6268V17.2518C12.25 17.0861 12.3158 16.9271 12.4331 16.8099C12.5503 16.6927 12.7092 16.6268 12.875 16.6268H17.875C18.538 16.6268 19.1739 16.8902 19.6428 17.3591C20.1116 17.8279 20.375 18.4638 20.375 19.1268V24.1057C20.3728 24.267 20.4318 24.4232 20.5401 24.5427C20.6483 24.6623 20.7979 24.7365 20.9586 24.7503C21.0441 24.7559 21.1298 24.744 21.2105 24.7151C21.2912 24.6863 21.3651 24.6411 21.4276 24.5825C21.49 24.5239 21.5398 24.4531 21.5738 24.3744C21.6078 24.2957 21.6252 24.2109 21.625 24.1253V19.1268C21.625 18.4638 21.8884 17.8279 22.3572 17.3591C22.8261 16.8902 23.462 16.6268 24.125 16.6268H29.125C29.2908 16.6268 29.4497 16.6927 29.5669 16.8099C29.6842 16.9271 29.75 17.0861 29.75 17.2518ZM17.9383 15.3768H17.9531C18.4922 15.3875 19.0225 15.5145 19.5079 15.7492C19.9933 15.9838 20.4224 16.3205 20.7656 16.7362C20.795 16.7705 20.8314 16.7981 20.8724 16.8169C20.9134 16.8358 20.958 16.8456 21.0031 16.8456C21.0483 16.8456 21.0929 16.8358 21.1339 16.8169C21.1749 16.7981 21.2113 16.7705 21.2406 16.7362C21.5832 16.3213 22.0112 15.985 22.4955 15.7505C22.9798 15.5159 23.5089 15.3884 24.0469 15.3768H24.0617C24.1153 15.3767 24.1679 15.3627 24.2146 15.3364C24.2612 15.31 24.3003 15.2721 24.328 15.2263C24.3558 15.1805 24.3713 15.1283 24.3731 15.0748C24.3749 15.0212 24.3629 14.9681 24.3383 14.9206C24.0237 14.3059 23.5456 13.79 22.9566 13.4298C22.3675 13.0695 21.6905 12.8789 21 12.8789C20.3095 12.8789 19.6325 13.0695 19.0434 13.4298C18.4544 13.79 17.9763 14.3059 17.6617 14.9206C17.6371 14.9681 17.6251 15.0212 17.6269 15.0748C17.6287 15.1283 17.6442 15.1805 17.672 15.2263C17.6997 15.2721 17.7388 15.31 17.7854 15.3364C17.8321 15.3627 17.8847 15.3767 17.9383 15.3768Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2192_10979">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(11 11)"
                    />
                  </clipPath>
                </defs>
              </svg>
            ),
          },
          {
            label: "Students",
            value: latestData.students,
            // color: "text-yellow-600",
            icon: (
              <svg
                width="42"
                height="43"
                viewBox="0 0 42 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="21" cy="21.5" r="21" fill="#EBE8E8" />
                <g clip-path="url(#clip0_2192_10988)">
                  <path
                    d="M29 28.123C29.0699 28.2159 29.1125 28.3264 29.123 28.4421C29.1336 28.5578 29.1116 28.6742 29.0597 28.7781C29.0078 28.8821 28.9279 28.9695 28.829 29.0306C28.7301 29.0916 28.6162 29.1239 28.5 29.1238H13.5C13.3839 29.1238 13.2702 29.0915 13.1714 29.0305C13.0727 28.9694 12.9929 28.8821 12.941 28.7783C12.8891 28.6745 12.8671 28.5583 12.8775 28.4427C12.8879 28.3271 12.9304 28.2167 13 28.1238C13.5534 27.3818 14.2914 26.7976 15.1406 26.4293C14.6751 26.0044 14.349 25.4488 14.205 24.8352C14.0609 24.2217 14.1058 23.579 14.3336 22.9914C14.5614 22.4038 14.9616 21.8988 15.4816 21.5427C16.0016 21.1866 16.6171 20.9961 17.2473 20.9961C17.8775 20.9961 18.493 21.1866 19.0129 21.5427C19.5329 21.8988 19.9331 22.4038 20.1609 22.9914C20.3887 23.579 20.4336 24.2217 20.2896 24.8352C20.1456 25.4488 19.8194 26.0044 19.3539 26.4293C19.9666 26.6941 20.5233 27.073 20.9945 27.5457C21.4657 27.073 22.0225 26.6941 22.6352 26.4293C22.1697 26.0044 21.8435 25.4488 21.6995 24.8352C21.5555 24.2217 21.6003 23.579 21.8281 22.9914C22.056 22.4038 22.4561 21.8988 22.9761 21.5427C23.4961 21.1866 24.1116 20.9961 24.7418 20.9961C25.372 20.9961 25.9875 21.1866 26.5075 21.5427C27.0274 21.8988 27.4276 22.4038 27.6554 22.9914C27.8833 23.579 27.9281 24.2217 27.7841 24.8352C27.6401 25.4488 27.3139 26.0044 26.8484 26.4293C27.7016 26.7957 28.4435 27.3797 29 28.123ZM13.125 20.8738C13.1907 20.923 13.2654 20.9589 13.3449 20.9792C13.4244 20.9996 13.5071 21.0041 13.5884 20.9925C13.6696 20.9809 13.7478 20.9534 13.8184 20.9116C13.8891 20.8698 13.9508 20.8145 14 20.7488C14.3784 20.2443 14.8691 19.8347 15.4332 19.5527C15.9973 19.2706 16.6193 19.1238 17.25 19.1238C17.8807 19.1238 18.5027 19.2706 19.0668 19.5527C19.6309 19.8347 20.1216 20.2443 20.5 20.7488C20.5582 20.8264 20.6337 20.8894 20.7205 20.9328C20.8073 20.9762 20.903 20.9988 21 20.9988C21.097 20.9988 21.1927 20.9762 21.2795 20.9328C21.3663 20.8894 21.4418 20.8264 21.5 20.7488C21.8784 20.2443 22.3691 19.8347 22.9332 19.5527C23.4973 19.2706 24.1193 19.1238 24.75 19.1238C25.3807 19.1238 26.0027 19.2706 26.5668 19.5527C27.1309 19.8347 27.6216 20.2443 28 20.7488C28.0493 20.8145 28.111 20.8698 28.1817 20.9116C28.2524 20.9534 28.3306 20.9808 28.4119 20.9924C28.4932 21.004 28.5759 20.9994 28.6555 20.979C28.735 20.9586 28.8097 20.9227 28.8754 20.8734C28.9411 20.8241 28.9964 20.7624 29.0382 20.6917C29.08 20.621 29.1074 20.5428 29.119 20.4615C29.1306 20.3802 29.126 20.2975 29.1056 20.2179C29.0852 20.1384 29.0493 20.0637 29 19.998C28.4466 19.2562 27.7085 18.6723 26.8594 18.3043C27.3249 17.8794 27.651 17.3238 27.795 16.7102C27.9391 16.0967 27.8942 15.454 27.6664 14.8664C27.4386 14.2788 27.0384 13.7738 26.5184 13.4177C25.9984 13.0616 25.3829 12.8711 24.7527 12.8711C24.1225 12.8711 23.507 13.0616 22.9871 13.4177C22.4671 13.7738 22.0669 14.2788 21.8391 14.8664C21.6113 15.454 21.5664 16.0967 21.7104 16.7102C21.8544 17.3238 22.1806 17.8794 22.6461 18.3043C22.0334 18.5691 21.4767 18.948 21.0055 19.4207C20.5343 18.948 19.9775 18.5691 19.3648 18.3043C19.8303 17.8794 20.1565 17.3238 20.3005 16.7102C20.4445 16.0967 20.3997 15.454 20.1719 14.8664C19.944 14.2788 19.5439 13.7738 19.0239 13.4177C18.5039 13.0616 17.8884 12.8711 17.2582 12.8711C16.628 12.8711 16.0125 13.0616 15.4925 13.4177C14.9726 13.7738 14.5724 14.2788 14.3446 14.8664C14.1167 15.454 14.0719 16.0967 14.2159 16.7102C14.3599 17.3238 14.6861 17.8794 15.1516 18.3043C14.2984 18.671 13.5564 19.2553 13 19.9988C12.9508 20.0645 12.9149 20.1392 12.8946 20.2187C12.8742 20.2982 12.8697 20.3809 12.8813 20.4622C12.8929 20.5434 12.9204 20.6216 12.9622 20.6922C13.004 20.7629 13.0593 20.8246 13.125 20.8738Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2192_10988">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(11 11)"
                    />
                  </clipPath>
                </defs>
              </svg>
            ),
          },
        ].map((item, index) => (
          <div
            key={index}
            className="text-center bg-[#F8F8F8]  p-5 h-[105px] gap-[15px] w-[222px] rounded-xl hover:bg-black hover:text-gray-50 transition-colors duration-300 flex "
          >
            {/* Icon added here */}
            <div className=" flex justify-center items-center mb-3">
              {item.icon}
            </div>
            <div>
              <p className="text-[14px] text-[#929EAE]">Total {item.label}</p>
              <p className={`text-[24px] font-bold ${item.color} text-left`}>
                {item.value || 0}
              </p>
            </div>
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="min-h-screen flex ">
      <div className="w-full ">
        {/* <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Education Dashboard
          </h1>
        </header> */}
        <SummaryCard data={initialData} />
        <div className="mb-4 flex justify-between items-center">
          <Popover>
            <PopoverTrigger asChild>
              {/* <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-lg"> */}
              <Button className="bg-[#F8F8F8] text-black font-bold py-2 px-4 rounded transition duration-150 ease-in-out transform hover:scale-105   ml-3">
                Administrative
                <FaCaretDown className="ml-2 h-4 w-4" />
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
        <div className="pb-20">
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: charts }}
            breakpoints={{ lg: 1200, md: 1200, sm: 1200, xs: 480, xxs: 0 }}
            cols={{ lg: 2, md: 2, sm: 6, xs: 4, xxs: 2 }}
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
      <div className="w-2/4 p-4  border-gray-200">
        <div className="relative">
          <div onClick={toggleModal} className="cursor-pointer">
            Delhi
            <div
              onClick={toggleModal}
              className="absolute top-[1px] right-2 p-2 bg-white rounded-fullcursor-pointer"
            >
              <MdFullscreen className="w-6 h-6 text-gray-400" bg-white />
            </div>
            <img
              src="https://imgs.search.brave.com/X9Z8HRadogcVH3b-Hx2C01sqGHzR-iJWzw9a_beNBgY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9m/L2ZlL0RlbGhpX21h/cC5QTkc"
              alt="Delhi Map"
              className="object-cover w-full h-auto"
            />
          </div>
          {/* Zoom Icon on Image */}
        </div>

        {/* Modal for Zoomed-in View */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  ">
            <div className="relative w-[65%] h-[85%] max-w-4xl max-h-full rounded-xl">
              {/* Close Icon */}
              <button
                onClick={toggleModal}
                className="absolute top-4 right-4 bg-white text-gray-400 p-2 rounded-full"
              >
                <IoMdClose className="w-6 h-6" />
              </button>

              <img
                src="https://imgs.search.brave.com/X9Z8HRadogcVH3b-Hx2C01sqGHzR-iJWzw9a_beNBgY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9m/L2ZlL0RlbGhpX21h/cC5QTkc"
                alt="Delhi Map Zoomed"
                className="w-full h-auto max-w-full max-h-full object-fill rounded-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
