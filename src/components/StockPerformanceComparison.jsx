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
    Legend 
} from 'chart.js';

// Importamos los archivos JSON de los datos históricos
import AAPLData from '../data/AAPL.json';
import SPYData from '../data/SPY.json';
import GOOGLData from '../data/GOOGL.json';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Asociamos los tickers a sus archivos JSON correspondientes
const tickers = {
    AAPL: AAPLData.historical,
    SPY: SPYData.historical,
    GOOGL: GOOGLData.historical,
};

// Función para normalizar el rendimiento relativo (empezando desde 100%)
const compareStockPerformance = (data) => {
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
        const fetchData = () => {
            const fetchedData = {};
            const labels = new Set();

            // Iteramos sobre cada ticker para extraer y normalizar los datos
            for (let [ticker, data] of Object.entries(tickers)) {
                const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
                const normalizedData = compareStockPerformance(sortedData);
                fetchedData[ticker] = normalizedData;

                // Agregamos todas las fechas al conjunto de etiquetas
                normalizedData.forEach((item) => labels.add(item.date));
            }

            // Convertimos el conjunto de etiquetas a un array ordenado
            const sortedLabels = Array.from(labels).sort((a, b) => new Date(a) - new Date(b));

            // Creamos los datasets para cada ticker
            const datasets = Object.keys(tickers).map((ticker) => ({
                label: ticker,
                data: sortedLabels.map(
                    (date) => fetchedData[ticker].find((item) => item.date === date)?.performance || null
                ),
                borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                borderWidth: 2,
                fill: false,
            }));

            // Actualizamos el estado con los datos para el gráfico
            setChartData({
                labels: sortedLabels,
                datasets: datasets,
            });
            setLoading(false);
        };

        fetchData(); // Cargamos los datos desde los archivos locales
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
                                            callback: (value) => value + '%', // Añade el símbolo de porcentaje
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