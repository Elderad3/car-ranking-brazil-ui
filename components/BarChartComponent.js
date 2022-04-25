import { Chart } from 'primereact/chart';

export default function BarChartComponent({labels, valores, titulo}) {

const options = {
  //indexAxis: 'y',
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  plugins: {
    title: {
        display: false
    },
 },
 scales: {
  x: {
      grid:{
       display:false
           }
     },
  y: 
     {
   grid:{
    display:true
        }
     }
         }
}
  const data = {
    labels: labels,
    datasets: [
      {
        label: titulo,
        data: valores,
        fill: false,
        backgroundColor: '#3c8dbc',
      }
    ]
  };
  return (
      <Chart 
      type="bar" 
      data={data}
      height={"400px"}
      options={options}
  />
  );
}