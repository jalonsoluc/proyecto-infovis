import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AAPLVolumeChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLVolumeData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setChartData(parsedData);
                setLoading(false);
                return true;
            }
            return false;
        };

        const fetchVolumeData = async () => {
            try {
                const response = await axios.get(
                    `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=WhbI5G7ZJNT9alrAnPc9GG78BUfkCdy2`
                );
                const historicalData = response.data.historical;
                const dates = historicalData.map((item) => item.date).reverse();
                const volumes = historicalData.map((item) => item.volume).reverse();

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Volumen de Transacciones (AAPL)',
                            data: volumes,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1,
                        },
                    ],
                };

                localStorage.setItem('AAPLVolumeData', JSON.stringify(chartData));
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching volume data:', error);
                setLoading(false);
            }
        };

        if (!checkLocalStorage()) {
            fetchVolumeData();
        }
    }, []);

    return (
        <div className="flex w-full justify-center">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-4xl">
                {loading ? (
                    <p className="text-gray-300">Cargando gráfico...</p>
                ) : (
                    <div className="h-64">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            beginAtZero: true,
                                            callback: (value) => value.toLocaleString(), // Para formatear números grandes
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AAPLVolumeChart;