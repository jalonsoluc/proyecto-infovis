import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Función para calcular la EMA (Media Móvil Exponencial)
const calculateEMA = (data, period) => {
    const k = 2 / (period + 1);
    let emaArray = [data[0]]; // La EMA inicial es el primer valor del dataset
    for (let i = 1; i < data.length; i++) {
        const ema = data[i] * k + emaArray[i - 1] * (1 - k);
        emaArray.push(ema);
    }
    return emaArray;
};

// Función para calcular el MACD, la línea de señal, y el histograma
const calculateMACD = (closingPrices) => {
    const ema12 = calculateEMA(closingPrices, 12);  // EMA de 12 días
    const ema26 = calculateEMA(closingPrices, 26);  // EMA de 26 días
    const macd = ema12.map((val, index) => val - ema26[index]);  // MACD = EMA12 - EMA26
    const signalLine = calculateEMA(macd, 9);  // Línea de señal (EMA de 9 días sobre el MACD)
    const histogram = macd.map((val, index) => val - signalLine[index]);  // Histograma = MACD - Línea de señal
    return { macd, signalLine, histogram };
};

const AAPLStockChartWithMACD = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLStockMACDData');
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

                // Calcular MACD, línea de señal, y el histograma
                const { macd, signalLine, histogram } = calculateMACD(closingPrices);

                const chartData = {
                    labels: dates,
                    datasets: [
                        {
                            label: 'MACD',
                            data: macd,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: 'Línea de señal',
                            data: signalLine,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 2,
                            fill: false,
                            borderDash: [5, 5],  // Línea discontinua para la señal
                        },
                        {
                            label: 'Histograma',
                            type: 'bar',
                            data: histogram,
                            backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        },
                    ],
                };

                // Guardar los datos en localStorage
                localStorage.setItem('AAPLStockMACDData', JSON.stringify(chartData));
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
                                    title: { display: true, text: 'MACD (AAPL)' },
                                },
                                scales: {
                                    y: {
                                        ticks: {
                                            callback: (value) => value.toFixed(2),  // Redondea los valores en el eje Y
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

export default AAPLStockChartWithMACD;