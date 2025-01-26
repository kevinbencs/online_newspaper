'use client'

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, } from "chart.js"
import { useEffect } from "react";
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

const makeLabel = () => {
  const lab = []
  for(let i = 0; i < dayNumberOfMonth.length; i++){
    if(i === 0){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`jan ${j}`)
      }
    }
    else if(i === 1){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`feb ${j}`)
      }
    }
    else if(i === 2){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`marc ${j}`)
      }
    }
    else if(i === 3){
      for(let j = 1; j <dayNumberOfMonth[i]; j++){
        lab.push(`apr ${j}`)
      }
    }
    else if(i === 4){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`may ${j}`)
      }
    }
    else if(i === 5){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`jun ${j}`)
      }
    }
    else if(i === 6){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`jul ${j}`)
      }
    }
    else if(i === 7){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`aug ${j}`)
      }
    }
    else if(i === 8){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`sep ${j}`)
      }
    }
    else if(i === 9){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`okt ${j}`)
      }
    }
    else if(i === 10){
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`nov ${j}`)
      }
    }
    else {
      for(let j = 1; j < dayNumberOfMonth[i]; j++){
        lab.push(`dec ${j}`)
      }
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

interface dataObject{
  labels: string[],
  datasets: datasetsObject[]
}

const data: dataObject = {
  labels: labels,
  datasets: [{
    label: 'Daily readership',
    data: [],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
}

const DailyReadership = (props: {reader: {article_count:number, formatted_date: string}[]}) => {

  useEffect(() => {
    let days: number;
    const today = new Date().toLocaleDateString();
    const Month = Number(today.slice(6,8))-1;
    const day2 =  Number(today.slice(10,12))

    if(Month > 0){
      days = day2 + dayNumberOfMonth[Month-1]
    }
    else{
      days = day2
    }

    for(let i = 0; i < days-1; i++){
      data.datasets[0].data.push(0)
    }
    for(let i = 0; i < props.reader.length; i++){
      const dateMonth = Number(props.reader[i].formatted_date.slice(5,7)) - 1;
      const dateDay = Number(props.reader[i].formatted_date.slice(8,10));

      if(dateMonth > 0) {
        const day = dayNumberOfMonth[dateMonth-1] + dateDay;
        data.datasets[0].data[day] = props.reader[i].article_count;
      }
      else{
        data.datasets[0].data[dateDay] = props.reader[i].article_count;
      }
    }
  },[])


  return (
    <div className="mb-20"><Line data={data} /></div>
  )
}

export default DailyReadership