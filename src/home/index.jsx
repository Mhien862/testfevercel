import { useEffect, useState } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axiosInstance from "../services/axios.service";

const contributionsColor = [
  "",
  "#ef4444",
  "#84cc16",
  "#06b6d4",
  "#f97316",
  "#22c55e",
  "#0ea5e9",
];
const percentageColor = [
  "#f97316",
  "#22c55e",
  "#0ea5e9",
  "#eab308",
  "#10b981",
  "#6366f1",
];
const studentsColor = [
  "#eab308",
  "#10b981",
  "#6366f1",
  "#ef4444",
  "#84cc16",
  "#06b6d4",
];

const Home = () => {
  const [contributionsResponse, setContributionsResponse] = useState([]);
  const [percentageResponse, setPercentageResponse] = useState([]);
  const [studentsResponse, setStudentsResponse] = useState([]);

  const [contributions, setContributions] = useState({});
  const [percentage, setPercentage] = useState([]);
  const [students, setStudents] = useState([]);

  const fetchDashboard = async () => {
    try {
      const response = await axiosInstance.get("/dashboard");
      setContributionsResponse(response.data.contributionsPerFaculty);
      setPercentageResponse(response.data.percentagePerFaculty);
      setStudentsResponse(response.data.studentsCountPerFaculty);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  const renderContributionBars = () => {
    return Object.entries(Object.entries(contributions)).map(([i, [key]]) => {
      if (key !== "name")
        return <Bar key={i} dataKey={key} fill={contributionsColor[i]} />;
    });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  useEffect(() => {
    setContributions({
      name: "",
    });
    contributionsResponse.map((e) => {
      setContributions((pre) => ({
        ...pre,
        [e._id]: e.count,
      }));
    });
  }, [contributionsResponse]);

  useEffect(() => {
    const percentageCells = [];
    percentageResponse.map((e) => {
      percentageCells.push({
        name: e.faculty,
        value: parseFloat(e.percentage),
      });
    });
    setPercentage(percentageCells);
  }, [percentageResponse]);

  useEffect(() => {
    const cells = [];
    studentsResponse.map((e) => {
      cells.push({
        name: e._id,
        value: e.count,
      });
    });
    setStudents(cells);
  }, [studentsResponse]);

  return (
    <div style={{ padding: 12 }}>
      <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>Statistics</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h3 style={{ fontSize: "1.2rem", textAlign: "center" }}>
            Contributions Per Faculty
          </h3>
          <BarChart width={350} height={300} data={[contributions]}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {renderContributionBars()}
          </BarChart>
        </div>
        <div>
          <h3 style={{ fontSize: "1.2rem", textAlign: "center" }}>
            Percentage Per Faculty
          </h3>
          <PieChart width={350} height={300}>
            <Pie
              data={percentage}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {percentage.map((_, index) => (
                <Cell key={`cell-${index}`} fill={percentageColor[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div>
          <h3 style={{ fontSize: "1.2rem", textAlign: "center" }}>
            Students Count Per Faculty
          </h3>
          <PieChart width={350} height={300}>
            <Pie
              data={students}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {students.map((_, index) => (
                <Cell key={`cell-${index}`} fill={studentsColor[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Home;
