import React from 'react'
import { Radar } from 'react-chartjs-2'
import './RadarChart.scss'

const RadarChart = ({name, chartData}) => {
    const data = {
        labels: [
            "Easy to start", 
            "Cost-effective", 
            "Schedule-flexible", 
            "Safe", 
            "Good for health"
        ],
        datasets: [{
            label: name,
            data: chartData,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                max: 10,
                min: 0,
                ticks: {
                    stepSize: 2,
                    fontSize: 20
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 12,
                        weight: "bold"
                    }
                }
            },
        }
    }
    return (
        <div className="RadarChart">
            <Radar
                data={data}
                options={options}
            />
        </div>
    )
}

export default RadarChart
