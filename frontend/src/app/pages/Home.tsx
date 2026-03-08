import { useRef } from "react"
import { Link } from "react-router"
import { motion, useScroll, useTransform } from "motion/react"
import { ArrowRight, CheckCircle2, ShieldCheck, Database, BrainCircuit, ListChecks, PlayCircle } from "lucide-react"
import { Button } from "../components/ui"
import { SCHEMES } from "../data"
import { useI18n } from "../i18n"

const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1574675973218-09449f48cf77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXRpemVucyUyMGFjY2Vzc2luZyUyMGRpZ2l0YWwlMjBzZXJ2aWNlc3xlbnwxfHx8fDE3NzI5MTk4NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1767880408267-e9f64de1fe7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmYXJtZXIlMjB3b3JraW5nJTIwaW4lMjBhZ3JpY3VsdHVyYWwlMjBmaWVsZHN8ZW58MXx8fHwxNzcyOTE5ODY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1764885517847-79d62138cc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwc3VwcG9ydCUyMGVudmlyb25tZW50JTIwaG9zcGl0YWx8ZW58MXx8fHwxNzcyOTE5ODY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1756885375569-f04400d99cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzdHVkZW50cyUyMHJlY2VpdmluZyUyMGVkdWNhdGlvbmFsJTIwYmVuZWZpdHN8ZW58MXx8fHwxNzcyOTE5ODcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1759592702596-626aca3a99cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGVtcGxveW1lbnQlMjBza2lsbCUyMGRldmVsb3BtZW50JTIwdHJhaW5pbmd8ZW58MXx8fHwxNzcyOTE5ODc2fDA&ixlib=rb-4.1.0&q=80&w=1080"
]

export function Home() {
  const { t, language } = useI18n()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-900">
      
      {/* Scroll-based Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {BACKGROUND_IMAGES.map((img, index) => {
          // Map scroll progress to opacity for each image (except first which starts at 1)
          const start = Math.max(0, (index - 1) * 0.2)
          const fadeInEnd = index * 0.2
          const fadeOutStart = (index + 0.5) * 0.2
          const end = Math.min(1, (index + 1.5) * 0.2)
          
          const opacity = useTransform(
            scrollYProgress,
            [start, fadeInEnd, fadeOutStart, end],
            [index === 0 ? 1 : 0, 1, 1, index === BACKGROUND_IMAGES.length - 1 ? 1 : 0]
          )
          
          const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1])

          return (
            <motion.div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${img})`,
                opacity,
                scale
              }}
            >
              {/* Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-[2px]"></div>
            </motion.div>
          )
        })}
      </div>

      <div className="relative z-10 text-white flex flex-col gap-24 lg:gap-32 pb-32">
        
        {/* Immersive Introduction Layout */}
        <section className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div 
            className="container mx-auto max-w-5xl text-center flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Badge className="mb-6 bg-blue-500/20 text-blue-200 border-blue-500/30 uppercase font-bold tracking-widest text-xs px-4 py-1.5 backdrop-blur-sm">
                Empowering Citizens
              </Badge>
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-400"
            >
              {t.home.title}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-12 leading-relaxed font-light"
            >
              {t.home.subtitle}
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 items-center justify-center w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto font-bold px-10 h-16 text-lg bg-blue-600 hover:bg-blue-500 shadow-[0_0_40px_rgba(37,99,235,0.3)] border border-blue-500 transition-all hover:scale-105" asChild>
                <Link to="/checker">
                  {t.nav.checkEligibility} <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold px-10 h-16 text-lg border-gray-500 text-white hover:bg-gray-800 hover:text-white backdrop-blur-sm bg-gray-900/30 transition-all hover:scale-105" asChild>
                <Link to="/schemes">
                  {t.nav.explore}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Credibility Strip */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl p-8 sm:p-10 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 justify-between items-center text-center">
            <motion.div variants={itemVariants} className="flex-1 py-6 md:py-0 px-4 flex flex-col items-center gap-4">
              <div className="p-4 bg-blue-500/20 rounded-full"><ListChecks className="h-8 w-8 text-blue-300" /></div>
              <h3 className="font-bold text-white text-lg">{t.home.ruleEval}</h3>
              <p className="text-sm text-gray-400 max-w-xs">{t.home.ruleEvalDesc}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex-1 py-6 md:py-0 px-4 flex flex-col items-center gap-4">
              <div className="p-4 bg-indigo-500/20 rounded-full"><BrainCircuit className="h-8 w-8 text-indigo-300" /></div>
              <h3 className="font-bold text-white text-lg">{t.home.aiExpl}</h3>
              <p className="text-sm text-gray-400 max-w-xs">{t.home.aiExplDesc}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex-1 py-6 md:py-0 px-4 flex flex-col items-center gap-4">
              <div className="p-4 bg-emerald-500/20 rounded-full"><Database className="h-8 w-8 text-emerald-300" /></div>
              <h3 className="font-bold text-white text-lg">{t.home.govDb}</h3>
              <p className="text-sm text-gray-400 max-w-xs">{t.home.govDbDesc}</p>
            </motion.div>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-12"
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-blue-600/10 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 p-32 bg-indigo-600/10 blur-[100px] rounded-full"></div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-8">
                <motion.div variants={itemVariants}>
                  <Badge className="bg-indigo-500/20 text-indigo-200 border-indigo-500/30 uppercase tracking-widest text-xs px-3 py-1">About</Badge>
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold">{t.home.aboutTitle}</motion.h2>
                <motion.p variants={itemVariants} className="text-xl text-gray-300 leading-relaxed font-light">
                  {t.home.aboutDesc}
                </motion.p>
                <motion.ul variants={containerVariants} className="space-y-4">
                  <motion.li variants={itemVariants} className="flex items-center gap-3 text-gray-200 text-lg">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Transparent evaluations
                  </motion.li>
                  <motion.li variants={itemVariants} className="flex items-center gap-3 text-gray-200 text-lg">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Instantly actionable results
                  </motion.li>
                  <motion.li variants={itemVariants} className="flex items-center gap-3 text-gray-200 text-lg">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" /> Simplified legal criteria
                  </motion.li>
                </motion.ul>
              </div>
              <motion.div variants={itemVariants} className="bg-gray-900/80 border border-white/10 rounded-2xl p-6 shadow-2xl">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center">{t.home.workflowTitle}</h3>
                <div className="space-y-4 relative before:absolute before:inset-0 before:mx-auto before:h-full before:w-0.5 before:bg-white/10">
                  <div className="relative flex justify-center z-10">
                    <div className="bg-blue-600 px-6 py-3 rounded-lg border border-blue-500 font-semibold shadow-lg min-w-[200px] text-center">1. Citizen Input</div>
                  </div>
                  <div className="relative flex justify-center z-10">
                    <div className="bg-indigo-900 px-6 py-3 rounded-lg border border-indigo-500 font-semibold shadow-lg min-w-[200px] text-center">2. Rule Engine Match</div>
                  </div>
                  <div className="relative flex justify-center z-10">
                    <div className="bg-emerald-800 px-6 py-3 rounded-lg border border-emerald-500 font-semibold shadow-lg min-w-[200px] text-center">3. AI Explanation</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Live Demo Placeholder */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center"
        >
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold mb-4">{t.home.demoTitle}</h2>
            <p className="text-xl text-gray-400 font-light">{t.home.demoDesc}</p>
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="w-full aspect-video bg-gray-800/50 backdrop-blur-md rounded-2xl border-2 border-dashed border-gray-600 flex flex-col items-center justify-center gap-4 hover:bg-gray-800/80 transition-colors group cursor-pointer"
            onClick={() => window.location.href = '/checker'}
          >
            <PlayCircle className="h-16 w-16 text-gray-500 group-hover:text-white transition-transform group-hover:scale-110" />
            <p className="text-gray-400 font-semibold uppercase tracking-widest text-sm group-hover:text-gray-300">Click to start live interactive demo</p>
          </motion.div>
        </motion.section>

        {/* Scheme Preview */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl bg-gray-900/50 backdrop-blur-lg border border-white/5 rounded-3xl p-8 lg:p-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 text-center sm:text-left">
            <h2 className="text-3xl font-bold">{t.home.metrics.schemes}</h2>
            <Button variant="link" asChild className="text-blue-400 hover:text-blue-300 font-semibold">
              <Link to="/schemes">View all <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="space-y-4">
            {SCHEMES.slice(0, 3).map((scheme) => (
              <motion.div variants={itemVariants} key={scheme.id} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border border-white/10 bg-white/5 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300">
                <div className="mb-4 sm:mb-0 flex items-center gap-4">
                  <div className="p-3 bg-white/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                     <scheme.icon className="h-6 w-6 text-gray-300 group-hover:text-blue-300" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-300 mb-1 transition-colors">{scheme.name[language]}</h4>
                    <p className="text-gray-400 line-clamp-1 max-w-xl text-sm">{scheme.description[language]}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="shrink-0 bg-transparent border-gray-600 text-white hover:bg-white hover:text-gray-900" asChild>
                  <Link to="/schemes">Learn More</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  )
}
