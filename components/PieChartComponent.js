import { Chart } from 'primereact/chart';

export default function PieChartComponent({labels, valores, titulo}) {

const options = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  plugins: {
    title: {
        display: false
    },
 },
}
  const data = {
    labels: labels,
    datasets: [
      {
        label: titulo,
        data: valores,
        fill: false,
        backgroundColor: [
          "#125D98",
          "#3C8DAD",
          "#39A2DB",
          "#022E57"
      ],
      hoverBackgroundColor: [
          "#3D84B8"
      ]
      }
    ]
  };
  return (
      <Chart 
      type="pie" 
      data={data}
      height={"300px"}
      options={options}
  />
  );
}