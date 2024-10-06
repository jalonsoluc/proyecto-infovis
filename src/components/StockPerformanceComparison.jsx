import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const tickers = ['AAPL', 'SPY', 'GOOGL']; // Puedes añadir más tickers si lo deseas

const fetchStockData = async (ticker) => {
    try {
        const response = await axios.get(
            `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=WhbI5G7ZJNT9alrAnPc9GG78BUfkCdy2`
        );
        const historicalData = response.data.historical.map((item) => ({
            date: item.date,
            close: item.close,
        })).reverse(); // Invertimos los datos para tenerlos en orden cronológico
        return historicalData;
    } catch (error) {
        console.error(`Error fetching data for ${ticker}:`, error);
        return [];
    }
};

const compareStockPerformance = (data) => {
    // Función para normalizar los datos para comparación relativa (todos comienzan en 100%)
    const firstPrice = data[0].close;
    return data.map((item) => ({
        date: item.date,
        performance: (item.close / firstPrice) * 100,
    }));
};

const StockPerformanceComparison = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = {};
            const labels = new Set();

            for (let ticker of tickers) {
                const data = await fetchStockData(ticker);
                const normalizedData = compareStockPerformance(data);
                fetchedData[ticker] = normalizedData;

                normalizedData.forEach((item) => labels.add(item.date)); // Recopila las fechas
            }

            const sortedLabels = Array.from(labels).sort(); // Ordena las fechas
            const datasets = tickers.map((ticker) => ({
                label: ticker,
                data: sortedLabels.map(
                    (date) => fetchedData[ticker].find((item) => item.date === date)?.performance || null
                ),
                borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                borderWidth: 2,
                fill: false,
            }));

            setChartData({
                labels: sortedLabels,
                datasets: datasets,
            });
            setLoading(false);
        };

        fetchData();
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
                                    title: { display: true, text: 'Rendimiento Relativo (%)' },
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            callback: (value) => value + '%',  // Añade el símbolo de porcentaje al eje Y
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

export default StockPerformanceComparison;