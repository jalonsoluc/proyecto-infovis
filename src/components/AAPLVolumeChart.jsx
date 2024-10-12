import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';
import jsonData from '../data/AAPL.json'; // Importar JSON localmente

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AAPLVolumeChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLocalData = () => {
            try {
                if (!jsonData.historical || jsonData.historical.length === 0) {
                    throw new Error('Datos históricos vacíos o no disponibles');
                }
        
                const historicalData = jsonData.historical;
                const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
                const dates = sortedData.map((item) => item.date);
                const volumes = sortedData.map((item) => item.volume);
        
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
        
                setChartData(chartData);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setLoading(false);
            }
        };

        loadLocalData(); // Cargar los datos desde el JSON local
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
                                            callback: (value) =>
                                                value.toLocaleString(), // Formatear números grandes
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