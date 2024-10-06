import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js que vamos a usar
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AAPLHistoricalPricesChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Función para verificar si los datos están almacenados localmente
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem('AAPLStockData');
            if (storedData) {
                // Si los datos están en localStorage, los usamos directamente
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
                    ],
                };

                // Guardar los datos en localStorage
                localStorage.setItem('AAPLStockData', JSON.stringify(chartData));
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setLoading(false);
            }
        };

        // Verifica si los datos ya están en localStorage antes de hacer la llamada
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
                    <div className="h-64 w-full">
                        <Line
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { position: 'top' },
                                },
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AAPLHistoricalPricesChart;
