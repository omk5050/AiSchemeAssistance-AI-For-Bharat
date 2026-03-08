import { Link } from "react-router"
import { ArrowLeft, CheckCircle2, Users, FileText, IndianRupee } from "lucide-react"
import { Button, Badge } from "../components/ui"
import { SCHEMES } from "../data"
import { useI18n } from "../i18n"

export function SchemesPage() {
  const { t, language } = useI18n()

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-12 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" size="sm" asChild className="mb-6 -ml-4 text-blue-600 hover:bg-blue-50">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> {t.schemes.back}</Link>
          </Button>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">{t.schemes.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl leading-relaxed font-medium">
            {t.schemes.subtitle}
          </p>
        </div>
      </div>

      {/* Schemes List */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-12 space-y-12">
        {SCHEMES.map((scheme, index) => (
          <div key={scheme.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 relative group">
            {/* Header Area */}
            <div className="bg-gradient-to-r from-blue-50 to-white px-6 sm:px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-700 shadow-inner shrink-0">
                    <scheme.icon className="h-5 w-5" />
                  </span>
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 uppercase font-bold text-[10px] tracking-wider py-1 px-2.5 shadow-sm">
                    {scheme.id}
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-200">{scheme.name[language]}</h2>
              </div>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm font-semibold whitespace-nowrap hidden sm:inline-flex">
                 <Link to="/checker">{t.nav.checkEligibility}</Link>
              </Button>
            </div>

            {/* Content Blocks */}
            <div className="p-6 sm:p-8 grid md:grid-cols-12 gap-8 lg:gap-12">
              <div className="md:col-span-7 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" /> {t.schemes.desc}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{scheme.description[language]}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" /> {t.schemes.target}
                  </h3>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                    <p className="text-gray-800 font-medium">{scheme.whoItIsFor[language]}</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 bg-gradient-to-b from-emerald-50 to-white border border-emerald-100 rounded-xl p-6 h-fit shadow-sm">
                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <IndianRupee className="h-4 w-4" /> {t.schemes.benefits}
                </h3>
                <ul className="space-y-4">
                  {scheme.keyBenefits[language].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-emerald-950 font-medium">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 sm:hidden border-t border-gray-100">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-lg">
                 <Link to="/checker">{t.nav.checkEligibility}</Link>
              </Button>
            </div>
          </div>
        ))}
        
        {/* Missing Scheme CTA */}
        <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white shadow-lg mt-16">
          <h3 className="text-2xl font-extrabold mb-4 tracking-tight">{t.schemes.missingTitle}</h3>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto font-medium text-lg">
            {t.schemes.missingDesc}
          </p>
          <Button variant="outline" size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 border-none font-bold px-8 h-14 text-lg shadow-sm" asChild>
             <Link to="/checker">{t.schemes.missingBtn}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}