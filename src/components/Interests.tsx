import { Sparkles } from 'lucide-react';
import { interests } from '../data/portfolioData';

export default function Interests() {
  return (
    <section id="interests" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Areas of <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Interest</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Domains I'm passionate about exploring and mastering</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {interest}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
