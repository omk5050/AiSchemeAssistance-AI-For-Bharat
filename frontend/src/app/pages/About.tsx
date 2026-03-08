import { useEffect, useRef, useState } from "react"
import { ExternalLink, Shield, Cpu, Lightbulb, AlertCircle } from "lucide-react"
import { useI18n } from "../i18n"
import { SCHEMES } from "../data"
import { motion, useInView } from "motion/react"

export function About() {
  const { t } = useI18n()
  
  // Animation refs
  const purposeRef = useRef(null)
  const systemRef = useRef(null)
  const transparencyRef = useRef(null)
  const linksRef = useRef(null)
  
  const purposeInView = useInView(purposeRef, { once: true, margin: "-100px" })
  const systemInView = useInView(systemRef, { once: true, margin: "-100px" })
  const transparencyInView = useInView(transparencyRef, { once: true, margin: "-100px" })
  const linksInView = useInView(linksRef, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t.about.title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            {t.about.subtitle}
          </p>
        </motion.div>
      </section>

      {/* Purpose Section */}
      <section ref={purposeRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={purposeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 border border-gray-100"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg shrink-0">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.about.purposeTitle}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t.about.purposeDesc}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* System Overview Section */}
      <section ref={systemRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={systemInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.about.systemTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.about.systemDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Rule Engine Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={systemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="bg-emerald-100 p-3 rounded-lg w-fit mb-4">
                <Shield className="h-8 w-8 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-900 mb-3">{t.about.ruleEngine}</h3>
              <p className="text-emerald-800 leading-relaxed">
                {t.about.ruleEngineDesc}
              </p>
            </motion.div>

            {/* AI Layer Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={systemInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="bg-purple-100 p-3 rounded-lg w-fit mb-4">
                <Cpu className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-2xl font-bold text-purple-900 mb-3">{t.about.aiLayer}</h3>
              <p className="text-purple-800 leading-relaxed">
                {t.about.aiLayerDesc}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Transparency Section */}
      <section ref={transparencyRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={transparencyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="bg-amber-50 rounded-2xl shadow-lg p-8 sm:p-12 border-2 border-amber-200"
        >
          <div className="flex items-start gap-4">
            <div className="bg-amber-100 p-3 rounded-lg shrink-0">
              <AlertCircle className="h-8 w-8 text-amber-700" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-4">{t.about.transparencyTitle}</h2>
              <p className="text-lg text-amber-800 leading-relaxed">
                {t.about.transparencyDesc}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Official Links Section */}
      <section ref={linksRef} className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={linksInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.about.officialLinksTitle}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t.about.officialLinksDesc}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SCHEMES.map((scheme, index) => (
              <motion.a
                key={scheme.id}
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={linksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <scheme.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  {scheme.name.EN}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {scheme.description.EN}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
