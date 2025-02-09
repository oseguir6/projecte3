import { motion } from "framer-motion";

export default function About() {
  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js",
    "Next.js", "Tailwind CSS", "MongoDB", "PostgreSQL"
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1573496799515-eebbb63814f2"
              alt="Profile"
              className="rounded-lg w-full max-w-md mx-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-white mb-6">About Me</h1>
            <p className="text-white/70 mb-6">
              I'm a passionate full-stack developer with over 5 years of experience
              in building modern web applications. I specialize in creating
              user-friendly interfaces and scalable backend solutions.
            </p>
            <p className="text-white/70 mb-8">
              When I'm not coding, you can find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge through
              technical writing.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 bg-[#1A1A2E] text-white rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
