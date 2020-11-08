import React, { useState } from 'react';

import ApexCharts from 'apexcharts'

import { Container } from './styles';
import { FiCircle, FiCheckCircle } from "react-icons/fi";


const DonutHealthy: React.FC = () => {
    const [options, setOptions] = useState({
        series: [70],
        options: {
            chart: {
                height: 350,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '70%',
                    }
                },
            },
            labels: ['Cricket'],
        },
    });

    // useEffect(() => {

    // }, []);

    return (

        <Container>
            <p>Walking</p>
            {/* <ApexCharts></ApexCharts> */}
            <div id="chart">
                <ReactApexChart options={options.options} series={options.series} type="radialBar" height={350} />
            </div>

        </Container>
    )
}
export default DonutHealthy;