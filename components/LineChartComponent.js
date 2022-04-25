import { Chart } from 'primereact/chart';

export default function LineChartComponent({labels, valores, titulo}) {

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
        borderColor: '#3c8dbc'
      }
    ]
  };
  return (
      <Chart 
      type="line" 
      data={data}
      height={"300px"}
      options={options}
  />
  );
}