import { Folder, Github, ExternalLink } from 'lucide-react';
import { projects } from '../data/portfolioData';

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-lg">Some of my recent work and personal projects</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Folder className="text-white" size={28} />
                </div>
                <div className="flex gap-2">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                      <Github className="text-gray-700" size={20} />
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                      <ExternalLink className="text-gray-700" size={20} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {project.title}
              </h3>

              <p className="text-gray-700 mb-4 flex-grow leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-white text-blue-600 rounded-full text-sm font-medium shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500 font-medium">{project.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
