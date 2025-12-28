import { Download, FileText } from 'lucide-react';
import { useState } from 'react';
import FlowerBurst from './FlowerBurst';

export default function Resume() {
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

  const handleBurstComplete = () => {
    setBurstTrigger(false);
  };

  return (
    <section id="resume" className="py-20 bg-gradient-to-r from-blue-600 to-green-600 relative">
      <FlowerBurst 
        trigger={burstTrigger} 
        x={burstPosition.x} 
        y={burstPosition.y}
        onComplete={handleBurstComplete}
      />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-green-600 rounded-full animate-bounce-slow">
                <FileText className="text-white" size={48} />
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Download My Resume
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Get a comprehensive overview of my skills, experience, and qualifications.
              Available in PDF format for easy viewing and printing.
            </p>

            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Download size={24} />
              Download Resume (PDF)
            </button>

            <div className="mt-8 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">3+</div>
                <div className="text-sm text-gray-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">12+</div>
                <div className="text-sm text-gray-600">Skills</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">3+</div>
                <div className="text-sm text-gray-600">Certifications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
