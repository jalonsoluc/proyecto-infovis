import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Función para calcular la Media Móvil Simple (SMA)
const calculateSMA = (data, windowSize) => {
    let sma = [];
    for (let i = 0; i < data.length; i++) {
        if (i < windowSize) {
            sma.push(null); // No hay suficientes datos para calcular SMA aún
        } else {
            let sum = 0;
            for (let j = 0; j < windowSize; j++) {
                sum += data[i - j];
            }
            sma.push(sum / windowSize);
        }
    }
    return sma;
};

const AAPLStockChartWithSMA = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLStockSMAData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setChartData(parsedData);
                setLoading(false);
                return true;
            }
            return false;
        };

        const fetchStockData = async () => {
            try {
                const response = await axios.get(
                    `https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=WhbI5G7ZJNT9alrAnPc9GG78BUfkCdy2`
                );
                const historicalData = response.data.historical;
                const dates = historicalData.map((item) => item.date).reverse();
                const closingPrices = historicalData.map((item) => item.close).reverse();

                // Calcular la Media Móvil Simple (SMA) de 20 días
                const sma = calculateSMA(closingPrices, 20);

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'Precio de cierre (AAPL)',
                            data: closingPrices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: 'Media Móvil Simple (SMA 20 días)',
                            data: sma,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: false,
                            borderDash: [5, 5],  // Línea discontinua para la SMA
                        },
                    ],
                };

                // Guardar los datos en localStorage
                localStorage.setItem('AAPLStockSMAData', JSON.stringify(chartData));
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setLoading(false);
            }
        };

        if (!checkLocalStorage()) {
            fetchStockData();
        }
    }, []);

    return (
        <div className="flex w-full justify-center">
            <div className="bg-white bg-opacity-10 rounded-lg p-6 w-full max-w-4xl">
                {loading ? (
                    <p className="text-gray-300">Cargando gráfico...</p>
                ) : (
                    <div className="h-64">
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: { display: true, text: 'Precio Histórico con SMA (AAPL)' },
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            callback: (value) => '$' + value,
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

export default AAPLStockChartWithSMA;
