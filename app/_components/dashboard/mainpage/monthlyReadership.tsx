'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, } from "chart.js"
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

const options = {
  responsive: true,
};

interface datasetsObject {
  label: string,
  data: number[],
  backgroundColor: string[],
  borderColor: string[],
  borderWidth: number
}

interface dataObject {
  labels: string[],
  datasets: datasetsObject[]
}

const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(1, 203, 207, 0.2)',
  'rgba(101, 203, 207, 0.2)',
  'rgba(201, 103, 107, 0.2)',
  'rgba(201, 203, 1, 0.2)',
  'rgba(251, 20, 20, 0.2)',
  'rgba(100, 100, 100, 0.2)'
]

const borderColor= [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(1, 203, 207)',
  'rgb(101, 203, 207)',
  'rgb(201, 103, 107)',
  'rgb(201, 203, 1)',
  'rgb(251, 20, 20)',
  'rgb(100, 100, 100)',
]


const MonthlyReadership = (props: { readership: { month: string, article_count: number }[] | null }) => {
  const [data, setData] = useState<dataObject>({
    labels: labels,
    datasets: [{
      label: 'Monthly readership',
      data: [],
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      borderWidth: 1
    }]
  })

  useEffect(() => {
    if (props.readership) {
      const arr = []
      for (let i = 0; i < 12; i++) {
        arr.push(0)
      }
      for (let i = 0; i < props.readership.length; i++) {
        arr[Number(props.readership[i].month) - 1] = props.readership[i].article_count
      }

      setData({
        labels: labels,
        datasets: [{
          label: 'Monthly readership',
          data: arr,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: 1
        }]
      })
    }
  }, [])


  return (
    <div className="mb-20"><Bar data={data} options={options} /></div>
  )
}

export default MonthlyReadership