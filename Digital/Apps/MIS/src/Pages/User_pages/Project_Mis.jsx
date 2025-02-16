"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart, Bar } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const lineData = [
  { month: "Apr 24", income: 4000, expenses: 3000 },
  { month: "May 24", income: 6000, expenses: 6500 },
  { month: "Jun 24", income: 5000, expenses: 7000 },
  { month: "Jul 24", income: 3500, expenses: 5500 },
  { month: "Aug 24", income: 2500, expenses: 4000 },
  { month: "Sep 24", income: 4000, expenses: 3500 },
  { month: "Oct 24", income: 4500, expenses: 4000 },
];

const pieData = [
  { name: "Jubin", value: 177, color: "#003366" },
  { name: "Saleh", value: 142, color: "#999999" },
  { name: "Ahmed", value: 264, color: "#666666" },
];

const barData = [
  { name: "Elusmod", y2022: 30, y2023: 40, y2024: 45 },
  { name: "Okate", y2022: 40, y2023: 45, y2024: 50 },
  { name: "Sed Quia", y2022: 45, y2023: 50, y2024: 60 },
  { name: "Nostrum", y2022: 35, y2023: 40, y2024: 45 },
  { name: "Voluptate Velit", y2022: 25, y2023: 30, y2024: 35 },
  { name: "Beatae", y2022: 40, y2023: 45, y2024: 50 },
];

export default function project_mis() {
  return (
    <div className="p-6 max-w-7xl mx-auto h-screen overflow-y-auto">
      <div className="flex justify-between items-end mb-6">
        <h1>Dashboard1</h1>
        {/* <Select defaultValue="dashboard1">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select dashboard" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dashboard1">Dashboard 1</SelectItem>
            <SelectItem value="dashboard2">Dashboard 2</SelectItem>
          </SelectContent>
        </Select> */}
      </div>

      {/* Grid with two rows */}
      <div className="grid gap-6 grid-rows-[auto_auto] md:grid-cols-3 mr-[20%]">
        {/* First Row: Line Chart */}
        <div className="bg-white p-6 rounded-lg shadow col-span-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Some Project Graph</h2>
            <Select defaultValue="2024">
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#10B981"
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#2563EB"
                  name="Expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* 1st bar graph */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow mb-28">
            <h2 className="text-lg font-medium mb-4">Lorem Ipsum</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="y2022" name="2022" fill="#E5E7EB" />
                  <Bar dataKey="y2023" name="2023" fill="#9CA3AF" />
                  <Bar dataKey="y2024" name="2024" fill="#4B5563" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Second Row: Pie Chart and Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">Nisi Ut Aliquip</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow mb-28">
          <h2 className="text-lg font-medium mb-4">Lorem Ipsum</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Legend />
                <Bar dataKey="y2022" name="2022" fill="#E5E7EB" />
                <Bar dataKey="y2023" name="2023" fill="#9CA3AF" />
                <Bar dataKey="y2024" name="2024" fill="#4B5563" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
