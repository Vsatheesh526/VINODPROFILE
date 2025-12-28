import { GraduationCap, Award } from 'lucide-react';
import { education, certifications } from '../data/portfolioData';
import { useEffect, useState } from 'react';

export default function Education() {
  return (
    <section id="education" className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Education & <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Certifications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <GraduationCap className="text-blue-600" size={32} />
              Academic Qualifications
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <AnimatedEduCard key={index} edu={edu} index={index} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Award className="text-green-600" size={32} />
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-t-4 border-green-600"
                >
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h4>
                  <p className="text-gray-700">{cert.issuer}</p>
                  {cert.year && <p className="text-green-600 font-semibold mt-2">{cert.year}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function AnimatedEduCard({ edu, index }: { edu: typeof education[number]; index: number }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const t = setTimeout(() => setVisible(true), index * 150 + 100);
      return () => clearTimeout(t);
    }, [index]);

    return (
      <div
        className={`bg-white rounded-xl p-6 md:p-8 shadow-lg transition-all duration-700 border-l-4 border-blue-600 ${
          visible ? 'animate-fade-in-up opacity-100' : 'opacity-0 translate-y-6'
        } hover:shadow-xl hover:scale-[1.02]`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">{edu.degree}</h4>
            {edu.specialization && (
              <p className="text-blue-600 font-semibold mb-2">{edu.specialization}</p>
            )}
            <p className="text-gray-700">{edu.institution}</p>
          </div>
          <div className="md:text-right">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
              {edu.period}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
