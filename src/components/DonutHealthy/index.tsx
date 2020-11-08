import dynamic from "next/dynamic";
import { Container } from "./styles";
// import { FiCircle, FiCheckCircle } from "react-icons/fi";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface CategoryHabit {
    title?: string;
    goal?: number;
    measure?: string;
}
const DonutHealthy: React.FC<CategoryHabit> = ({ title, goal, measure }) => {
    const options = {
        series: [goal],
        options: {
            chart: {
                height: 350,
                type: "radialBar",
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "70%",
                    },
                },
            },
            labels: ["Goal"],
        },
    };

    const missing = goal ? 100 - goal : '';

    return (
        <Container>
            <p>{title}</p>
            <div id="chart">
                <ReactApexChart
                    options={options.options}
                    series={options.series}
                    type="radialBar"
                    height={150}
                />
            </div>
            <p>{
                missing !== 0 ?
                    missing + " " + measure + " to go" :
                    "You did it!"
            }</p>
        </Container>
    );
};
export default DonutHealthy;
