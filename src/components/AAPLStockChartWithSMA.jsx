import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import jsonData from '../data/AAPL.json'; // Importar JSON localmente

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
        const loadLocalData = () => {
            try {
                const historicalData = jsonData.historical;
                const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
                const dates = sortedData.map((item) => item.date);
                const closingPrices = sortedData.map((item) => item.close);

                // Calcular la SMA de 20 días
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
                            borderDash: [5, 5], // Línea discontinua para la SMA
                        },
                    ],
                };

                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setLoading(false);
            }
        };

        loadLocalData(); // Cargar datos desde el JSON local
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
                                            callback: (value) => `$${value.toFixed(2)}`,
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