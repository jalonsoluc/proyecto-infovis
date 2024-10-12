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
import annotationPlugin from 'chartjs-plugin-annotation';
import jsonData from '../data/AAPL.json'; // Importar datos desde JSON local

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

const AAPLProductVsStock = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productLaunches = [
      { name: 'iPhone', date: '2007-06-29' },
      { name: 'iPad', date: '2010-04-03' },
      { name: 'Apple Watch', date: '2015-04-24' },
      { name: 'AirPods', date: '2016-12-13' },
      { name: 'MacBook M1', date: '2020-11-10' },
    ];

    const loadLocalData = () => {
      try {
        const historicalData = jsonData.historical;
        const sortedData = historicalData.sort((a, b) => new Date(a.date) - new Date(b.date));
        const dates = sortedData.map((item) => item.date);
        const closingPrices = sortedData.map((item) => item.close);

        const annotations = productLaunches
          .map((launch) => {
            const index = dates.indexOf(launch.date);
            if (index !== -1) {
              return {
                type: 'line',
                scaleID: 'x',
                value: launch.date,
                borderColor: 'blue',
                borderWidth: 2,
                label: {
                  content: launch.name,
                  enabled: true,
                  position: 'top',
                  backgroundColor: 'rgba(0, 0, 255, 0.5)',
                },
              };
            }
            return null;
          })
          .filter((annotation) => annotation !== null);

        const chartData = {
          labels: dates,
          datasets: [
            {
              label: 'Valor acción vs Lanzamientos de Productos',
              data: closingPrices,
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              fill: false,
              pointRadius: 0, // No mostrar puntos
              tension: 0.2, // Suaviza la línea
            },
          ],
        };

        setChartData({
          ...chartData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              annotation: {
                annotations: annotations,
              },
              legend: { position: 'top' },
            },
          },
        });
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
          <div className="h-64 w-full">
            <Line data={chartData} options={chartData.options} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AAPLProductVsStock;