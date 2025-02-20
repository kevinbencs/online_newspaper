'use client'

import React, { useEffect, useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

interface datasetsObject {
  label: string
  data: number[],
  backgroundColor: string[],
  hoverOffset: number
}

interface dataObject {
  labels: string[],
  datasets: datasetsObject[]
}

const options = {
  responsive: true,
};

const data: dataObject = {
  labels: [
    'Facebook',
    'X',
  ],
  datasets: [{
    label: 'Share',
    data: [],
    backgroundColor: [
      'rgb(54, 162, 235)',
      'rgb(0,0,0)',
    ],
    hoverOffset: 10
  }]
};

const Share = (props: { share: { sh: string, article_count: number }[] | null}) => {
  const [data, setData] = useState<dataObject>({
    labels: [
      'Facebook',
      'X',
    ],
    datasets: [{
      label: 'Share',
      data: [],
      backgroundColor: [
        'rgb(54, 162, 235)',
        'rgb(0,0,0)',
      ],
      hoverOffset: 10
    }]
  })

  
  useEffect(() => {
    if(props.share){
      const arr = []
    for (let i of props.share) {
      arr.push(i.article_count)
    }
    setData({
      labels: [
        'Facebook',
        'X',
      ],
      datasets: [{
        label: 'Share',
        data: arr,
        backgroundColor: [
          'rgb(54, 162, 235)',
          'rgb(0,0,0)',
        ],
        hoverOffset: 10
      }]
    })
  }
  }, [])

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-center text-lg">Share (yearly)</h2>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default Share