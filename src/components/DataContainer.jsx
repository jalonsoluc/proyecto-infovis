import React from 'react'

function DataContainers() {
  return (
    <div className='flex flex-col p-12'>
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700">Gráficos</span> de Acciones 
      </h1>
      <div className="flex flex-wrap justify-center w-full">
        {/* First row */}
        <div className="flex w-full mb-4">
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Data Container 1</h2>
              <p className="text-gray-300">Content for container 1</p>
            </div>
          </div>
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Data Container 2</h2>
              <p className="text-gray-300">Content for container 2</p>
            </div>
          </div>
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Data Container 3</h2>
              <p className="text-gray-300">Content for container 3</p>
            </div>
          </div>
        </div>
        {/* Second row */}
        <div className="flex w-full">
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Data Container 4</h2>
              <p className="text-gray-300">Content for container 4</p>
            </div>
          </div>
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Data Container 5</h2>
              <p className="text-gray-300">Content for container 5</p>
            </div>
          </div>
          <div className="w-1/3 p-4">
            <div className="bg-white bg-opacity-10 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-2">Data Container 6</h2>
              <p className="text-gray-300">Content for container 6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataContainers