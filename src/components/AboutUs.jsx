import React from 'react'
import profile_pic from '../../public/assets/profile_pic.png'
import profile_pic_jja from '../../public/assets/profile_pic_jja.jpeg'
import profile_pic_jpg from '../../public/assets/profile_pic_jpg.png'

function AboutUs() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">¿Quiénes Somos?</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="space-y-4">
              <img className="mx-auto h-40 w-40 rounded-full" src={profile_pic_jja} alt="Team member 1" />
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium text-white">Juan José Alonso</div>
                <p className="text-sm text-gray-400">
                  Juan José es alumno de cuarto año de Ingeniería (major en Ingeniería de Software, minor en Data Science & Analytics).
                </p>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="space-y-4">
              <img className="mx-auto h-40 w-40 rounded-full" src={profile_pic_jpg} alt="Team member 2" />
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium text-white">Juan Pablo Gelmi</div>
                <p className="text-sm text-gray-400">
                  Juan Pablo es estudiante de cuarto año de Ingeniería (major en Ingeniería de Software, minor en Data Science & Analytics).
                </p>
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="space-y-4">
              <img className="mx-auto h-40 w-40 rounded-full" src={profile_pic} alt="Team member 3" />
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium text-white">Eduardo Salinas</div>
                <p className="text-sm text-gray-400">
                  Mike is our software engineer, ensuring our platform is robust, scalable, and user-friendly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs