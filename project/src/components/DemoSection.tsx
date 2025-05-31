import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from './common/SectionTitle';

const DemoSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section ref={ref} className="relative py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-radial from-neuro-purple-500/10 to-transparent opacity-20 blur-3xl -z-10"></div>
      
      <SectionTitle 
        title="Product Demo" 
        subtitle="See NeuroLabs in Action"
      />

      <div className="mt-16 max-w-5xl mx-auto">
        {/* 3D Glass Screen Frame */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto rounded-[2rem] overflow-hidden perspective transform mb-20"
        >
          {/* Screen Frame */}
          <div className="relative bg-gradient-to-br from-gray-900/40 via-neuro-deep-500/5 to-gray-900/40 backdrop-blur-md rounded-[2rem] border border-neuro-deep-600/20 p-3 shadow-[0_0_30px_rgba(107,63,175,0.2)] hover:shadow-[0_0_40px_rgba(107,63,175,0.3)] transition-all duration-300">
            {/* Video */}
            <div className="relative rounded-[1.5rem] overflow-hidden">
              {/* Animated color border */}
              <div className="absolute inset-0 bg-gradient-to-r from-neuro-deep-600/30 via-neuro-deep-700/30 to-neuro-deep-600/30 animate-pulse opacity-30 rounded-[1.5rem]"></div>
              
              {/* Video content */}
              <video 
                ref={videoRef}
                autoPlay 
                muted 
                loop 
                playsInline
                className="relative z-10 w-full rounded-[1.5rem] border border-neuro-deep-600/10"
                style={{ maxHeight: '500px', objectFit: 'cover' }}
              >
                <source 
                  src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-11759-large.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
              
              {/* Overlay effects */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* Scanlines */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgogIDxkZWZzPgogICAgPHBhdHRlcm4gaWQ9InNjYW5saW5lcyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMiIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDApIj4KICAgICAgPGxpbmUgeDE9IjAiIHkxPSIxIiB4Mj0iMCIgeTI9IjEiIHN0cm9rZT0icmdiYSgxNzksNDQsMjQ3LDAuMDgpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzY2FubGluZXMpIi8+Cjwvc3ZnPg==')]"></div>
                
                {/* Glowing edges */}
                <div className="absolute inset-0 bg-gradient-to-t from-neuro-deep-600/5 via-transparent to-neuro-deep-600/5"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-neuro-deep-600/5 via-transparent to-neuro-deep-600/5"></div>
                
                {/* Vignette effect */}
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20 mix-blend-overlay"></div>
                
                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-neuro-black/70 via-neuro-black/90 to-neuro-black/70 backdrop-blur-sm">
                  {/* Hexagon frame for Coming Soon text */}
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neuro-purple-400/40 via-plasma-blue/40 to-neuro-purple-400/40 rounded-xl blur-xl opacity-70 animate-pulse"></div>
                    <div className="relative overflow-hidden bg-gradient-to-br from-neuro-deep-800/90 to-neuro-deep-900/90 backdrop-blur-md px-8 py-6 rounded-xl border border-neuro-purple-500/30 shadow-[0_0_25px_rgba(155,93,229,0.3)]">
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-electric-purple/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-electric-purple/50 to-transparent"></div>
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-plasma-blue/50 to-transparent"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-plasma-blue/50 to-transparent"></div>
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                      >
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          Coming Soon
                        </h3>
                        <p className="text-white text-lg">
                          Live Terminal Access in Development
                        </p>
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* Pulse indicator */}
                  <div className="mt-12 flex items-center space-x-3">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-3 h-3 rounded-full bg-neon-green shadow-[0_0_8px_rgba(57,255,20,0.7)]"
                    ></motion.div>
                    <span className="text-gray-300 tracking-wide text-sm font-medium">Alpha Development in Progress</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Control bar */}
            <div className="mt-3 flex items-center justify-between px-4 py-2 bg-gradient-to-r from-gray-900/40 via-neuro-deep-500/5 to-gray-900/40 backdrop-blur-sm rounded-[1rem] border border-neuro-deep-600/10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
              </div>
              <div className="text-xs text-gray-300">NeuroLabs™ Portal</div>
              <div className="text-xs text-neuro-purple-400">AI Core: Active</div>
            </div>
            
            {/* Glow effects */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neuro-deep-600/30 to-transparent rounded-b-[2rem]"></div>
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-neuro-deep-600/20 to-transparent rounded-tr-[2rem] rounded-br-[2rem]"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-neuro-deep-600/0 via-neuro-deep-600/20 to-neuro-deep-600/0 rounded-[2rem] blur-2xl -z-10 opacity-20 animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;