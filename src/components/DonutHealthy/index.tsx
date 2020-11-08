import dynamic from "next/dynamic";
import { Container } from "./styles";
import { FiCircle, FiCheckCircle } from "react-icons/fi";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const DonutHealthy = () => {
	const options = {
		series: [70],
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
			labels: ["Cricket"],
		},
	};

	return (
		<Container>
			<p>Walking</p>
			<div id="chart">
				<ReactApexChart
					options={options.options}
					series={options.series}
					type="radialBar"
					height={350}
				/>
			</div>
		</Container>
	);
};
export default DonutHealthy;
