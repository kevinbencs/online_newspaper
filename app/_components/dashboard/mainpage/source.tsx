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


const Source = (props: { source: { so: string, article_count: number }[] | null }) => {
   const [data, setData] = useState<dataObject>({
    labels: [
      'Newsletter',
      'X',
      'Facebook'
    ],
    datasets: [{
      label: 'Visited',
      data: [],
      backgroundColor: [
        'rgb(100, 100, 100)',
        'rgb(0,0,0)',
        'rgb(54, 162, 235)'
      ],
      hoverOffset: 10
    }]
  })


  useEffect(() => {
    if (props.source) {
      const arr = [];
      for (let i of props.source) {
        arr.push(i.article_count)
      }

      setData({
        labels: [
          'Newsletter',
          'X',
          'Facebook'
        ],
        datasets: [{
          label: 'Visited',
          data: arr,
          backgroundColor: [
            'rgb(100, 100, 100)',
            'rgb(0,0,0)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 10
        }]
      })
    }

  }, [])
  return (
    <div className="mt-10">
      <h2 className="mb-4 text-center text-lg">Source (yearly)</h2>
      <Doughnut data={data} options={options} />
    </div>
  )
}

export default Source