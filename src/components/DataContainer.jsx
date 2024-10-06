import React from 'react'
import AAPLHistoricalPricesChart from './AAPLHistoricalPricesChart'
import AAPLVolumeChart from './AAPLVolumeChart'
import AAPLStockChartWithSMA from './AAPLStockChartWithSMA'
import AAPLStockChartWithRSI from './AAPLStockChartWithRSI'
import AAPLStockChartWithMACD from './AAPLStockChartWithMACD'
import StockPerformanceComparison from './StockPerformanceComparison'

function DataContainers() {
  return (
    <div className='flex flex-col p-12'>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">Gráficos</span> de Acciones de AAPL (Apple Inc.)
      </h1>
      <div className="flex flex-wrap justify-center w-full">
        {/* First row */}
        <div className="flex w-full mb-4">
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Precios Históricos</h2>
              <AAPLHistoricalPricesChart />
            </div>
          </div>
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Volumen de Transacciones</h2>
              <AAPLVolumeChart />
            </div>
          </div>
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Media Móvil</h2>
              <AAPLStockChartWithSMA />
            </div>
          </div>
        </div>
        {/* Second row */}
        <div className="flex w-full">
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">RSI (Relative Strength Index)</h2>
              <AAPLStockChartWithRSI />
            </div>
          </div>
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">MACD (Moving Average Convergence Divergence)</h2>
              <AAPLStockChartWithMACD />
            </div>
          </div>
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Rendimiento Comparado</h2>
              <StockPerformanceComparison />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataContainers