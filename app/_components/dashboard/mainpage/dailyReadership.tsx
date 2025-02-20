'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, } from "chart.js"
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


const dayNumberOfMonth = [
  31,
  new Date(new Date().getFullYear(), 1, 29).getDate() === 29 ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
]

const Months = [
  'jan',
  'feb',
  'marc',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'okt',
  'nov',
  'dec'
]

const makeLabel = () => {
  const lab = []
  for (let i = 0; i < dayNumberOfMonth.length; i++) {
    for (let j = 1; j <= dayNumberOfMonth[i]; j++) {
      lab.push(`${Months[i]} ${j}`)
    }
  }

  return lab
}

const labels = makeLabel()


interface datasetsObject {
  label: string
  data: number[],
  fill: boolean,
  borderColor: string,
  tension: number
}

interface dataObject {
  labels: string[],
  datasets: datasetsObject[]
}



const DailyReadership = (props: { reader: { article_count: number, formatted_date: string }[] | null }) => {

  const [dataSet, SetDataSet] = useState<dataObject>({
    labels: labels,
    datasets: [{
      label: 'Daily readership',
      data: [],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  })


  useEffect(() => {

    if (props.reader) {
      let days: number = 0;
      const today = new Date().toLocaleDateString();
      const Month = Number(today.slice(6, 8)) - 1;
      const day2 = Number(today.slice(10, 12))

      if (Month > 0) {
        for (let i = 0; i <= Month - 1; i++) {
          days = days + dayNumberOfMonth[i]
        }
        days = days + day2;
      }
      else {
        days = day2
      }

      const numberOfClick: number[] = []
      for (let i = 0; i < days; i++) {
        numberOfClick.push(0)
      }
      for (let i = 0; i < props.reader.length; i++) {
        const dateMonth = Number(props.reader[i].formatted_date.slice(5, 7)) - 1;
        const dateDay = Number(props.reader[i].formatted_date.slice(8, 10));

        if (dateMonth > 0) {
          let day = 0
          for (let i = 0; i <= dateMonth - 1; i++) {
            day = day + dayNumberOfMonth[i]
          }
          day = day + dateDay;
          numberOfClick[day - 1] = props.reader[i].article_count;
        }
        else {
          numberOfClick[dateDay - 1] = props.reader[i].article_count;
        }
      }

      const data: dataObject = {
        labels: labels,
        datasets: [{
          label: 'Daily readership',
          data: numberOfClick,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }

      SetDataSet(data)

    }
  }, [])


  return (
    <div className="mb-20"><Line data={dataSet} /></div>
  )
}

export default DailyReadership