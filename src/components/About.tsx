import { User, Target, Heart } from 'lucide-react';
import { about } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-600 rounded-lg">
                <User className="text-white" size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Profile</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{about}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Target className="text-green-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Career Goal</h4>
                </div>
                <p className="text-gray-700">
                  Seeking internships or entry-level opportunities to contribute to real-world projects and grow as a developer in a dynamic team environment.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Heart className="text-orange-600" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900">Strengths</h4>
                </div>
                <p className="text-gray-700">
                  Detail-oriented problem solver with strong foundation in MERN stack, passionate about continuous learning and delivering production-ready features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
