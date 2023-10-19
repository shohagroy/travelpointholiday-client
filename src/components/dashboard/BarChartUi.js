import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

const MAX_NAME_LENGTH = 300; // Maximum length for name

const formatName = (name) => {
  if (name?.length <= MAX_NAME_LENGTH) {
    return name;
  }
  return `${name.substring(0, MAX_NAME_LENGTH)}...`;
};

const BarChartUi = ({ data }) => {
  console.log(data);

  const bookingData = data?.map((item) => {
    const name = formatName(item?.tittle); // Format the name
    const booking = item?.bookingSeat;

    return {
      name,
      booking: booking,
    };
  });

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart layout="vertical" data={bookingData}>
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar dataKey={"booking"} fill="#8884d8">
          <LabelList dataKey="name" angle={0} fill="white" fontWeight="bold" />
          <LabelList
            dataKey="booking"
            angle={0}
            fill="white"
            fontWeight="bold"
          />
          {data?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartUi;
