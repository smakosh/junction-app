import dynamic from "next/dynamic";
import { Container } from "./styles";
// import { FiCircle, FiCheckCircle } from "react-icons/fi";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

// interface CategoryHabit {
//     title?: string;
//     goal?: number;
//     measure?: string;
// }
// const LineChart: React.FC<CategoryHabit> = ({ title, goal, measure }) => {
const LineChart: React.FC = () => {
    const options1 = {
        series: [{
            name: "Energy",
            data: [10, 41, 35, 51, 49, 62, 10]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            // title: {
            //     text: 'This is how you have been feeling',
            //     align: 'left'
            // },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['1.11', '2.11', '3.11', '4.11', '5.11', '6.11', '7.11'],
            }
        },
    };
    const options2 = {
        series: [{
            name: "Confidency",
            data: [10, 41, 35, 51, 49, 62, 80]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            // title: {
            //     text: 'This is how you have been feeling',
            //     align: 'left'
            // },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['1.11', '2.11', '3.11', '4.11', '5.11', '6.11', '7.11'],
            }
        },
    };
    const options3 = {
        series: [{
            name: "Happiness",
            data: [10, 41, 22, 51, 49, 62, 47]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            // title: {
            //     text: 'This is how you have been feeling',
            //     align: 'left'
            // },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['1.11', '2.11', '3.11', '4.11', '5.11', '6.11', '7.11'],
            }
        },
    };

    return (
        <Container>
            <p>This is how you have been feeling</p>
            <div id="chart">
                <p>Energy</p>
                <ReactApexChart
                    options={options1.options}
                    series={options1.series}
                    type="line"
                    height={150}
                />
            </div>
            <div id="chart">
                <p>Confidency</p>
                <ReactApexChart
                    options={options2.options}
                    series={options2.series}
                    type="line"
                    height={150}
                />
            </div>
            <div id="chart">
                <p>Happiness</p>
                <ReactApexChart
                    options={options3.options}
                    series={options3.series}
                    type="line"
                    height={150}
                />
            </div>
        </Container>
    );
};
export default LineChart;
