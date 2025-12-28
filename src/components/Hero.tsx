import { useState } from 'react';
import { Download, Mail, Github, Linkedin, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import FlowerBurst from './FlowerBurst';

export default function Hero() {
  const [burstTrigger, setBurstTrigger] = useState(false);
  const [burstPosition, setBurstPosition] = useState({ x: 0, y: 0 });

  const handleDownloadResume = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Get button position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Set burst position and trigger
    setBurstPosition({ x, y });
    setBurstTrigger(false); // Reset first
    setTimeout(() => setBurstTrigger(true), 10); // Trigger after reset

    // Download the resume
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Vinod_Resume.pdf';
    link.click();
  };

  const handleHireMeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Get button position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Set burst position and trigger
    setBurstPosition({ x, y });
    setBurstTrigger(false); // Reset first
    setTimeout(() => setBurstTrigger(true), 10); // Trigger after reset
    
    // Still navigate to contact section
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBurstComplete = () => {
    setBurstTrigger(false);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ marginTop: '50px' }}>
      <FlowerBurst 
        trigger={burstTrigger} 
        x={burstPosition.x} 
        y={burstPosition.y}
        onComplete={handleBurstComplete}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6 animate-fade-in-up">
            <div className="inline-block"style={{marginTop:'10px'}}>
             
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">{personalInfo.name.split(' ')[1]}</span>
            </h1>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-700">
              {personalInfo.title}
            </h2>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {personalInfo.tagline}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#contact"
                onClick={handleHireMeClick}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Hire Me
              </a>
              <button
                onClick={handleDownloadResume}
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </button>
            </div>

            <div className="flex gap-4 pt-6">
              <a href={`mailto:${personalInfo.email}`} className="p-3 bg-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300">
                <Mail className="text-blue-600" size={20} />
              </a>
              <a href={`https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300">
                <Github className="text-gray-800" size={20} />
              </a>
              <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300">
                <Linkedin className="text-blue-700" size={20} />
              </a>
              <a href={`https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-white rounded-full shadow-md hover:shadow-xl hover:scale-110 transition-all duration-300">
                <Globe className="text-green-600" size={20} />
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full p-1 bg-gradient-to-br from-blue-600 via-green-500 to-orange-500 shadow-2xl">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQHjedffHr0JYQ/profile-displayphoto-scale_400_400/B56ZoqsvocHQAg-/0/1761652965608?e=1767225600&v=beta&t=VL32cIRcDEPXAP65NImgtIs_7eDuawl8lsR_Wr_ZqIc"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="block text-gray-600 hover:text-blue-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
      

    
    </section>
  );
}
