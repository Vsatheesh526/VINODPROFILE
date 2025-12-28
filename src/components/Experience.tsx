import { Briefcase, CheckCircle } from 'lucide-react';
import { experience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Work <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">My professional journey and internships</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-blue-600"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <Briefcase className="text-white" size={28} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{exp.title}</h3>
                    <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-lg text-blue-600 font-semibold mb-4">{exp.company}</p>
                  <ul className="space-y-3">
                    {exp.description.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start gap-3">
                        <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
