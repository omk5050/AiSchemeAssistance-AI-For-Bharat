import { Link, Outlet, useLocation } from "react-router"
import { Globe, Menu, X, CheckCircle } from "lucide-react"
import { Button } from "./ui"
import { useI18n, Language } from "../i18n"
import { useState } from "react"
import { Logo } from "./Logo"

export function Layout() {
  const location = useLocation()
  const { language, setLanguage, t } = useI18n()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const navLinks = [
    { to: "/", label: t.nav.home },
    { to: "/checker", label: t.nav.checker },
    { to: "/schemes", label: t.nav.explore },
    { to: "/about", label: t.nav.about },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#1F2937] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md">
            <Logo />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium transition-colors hover:text-blue-600 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm py-1 group ${
                  location.pathname === link.to ? "text-blue-600 font-semibold" : "text-gray-600"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                  location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-gray-50 hover:bg-gray-100 rounded-full p-1 border border-gray-200 transition-colors">
              <Globe className="h-4 w-4 text-gray-500 ml-2" />
              {(["EN", "HI", "MR"] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`text-xs font-bold px-2 py-1 rounded-full transition-all ${
                    language === lang ? "bg-white text-blue-600 shadow-sm ring-1 ring-gray-200" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {lang === "EN" ? "EN" : lang === "HI" ? "हिंदी" : "मराठी"}
                </button>
              ))}
            </div>
            
            {/* Desktop CTA Button */}
            <div className="hidden sm:flex items-center gap-4">
              <Button asChild className="font-semibold shadow-md bg-blue-600 hover:bg-indigo-600 transition-colors text-white">
                <Link to="/checker">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t.nav.checkEligibility}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md absolute w-full shadow-xl">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors text-base ${
                    location.pathname === link.to
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/checker"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-4 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold text-center hover:shadow-lg transition-all shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                {t.nav.checkEligibility}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 relative">
        <Outlet />
      </main>

      <footer className="bg-gray-900 py-12 text-gray-400 relative z-10 border-t-4 border-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 text-white mb-4 grayscale contrast-200 brightness-200 opacity-80">
              <Logo compact={true} className="brightness-0 invert opacity-100" />
              <span className="text-xl font-bold tracking-tight text-white">YojnaSetu</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Connecting Citizens to Government Welfare Schemes. An AI-assisted platform to discover eligibility for government programs.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2 uppercase tracking-wider text-xs">Platform</h4>
            <Link to="/" className="text-sm hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/checker" className="text-sm hover:text-blue-400 transition-colors">Eligibility Checker</Link>
            <Link to="/schemes" className="text-sm hover:text-blue-400 transition-colors">Explore Schemes</Link>
            <Link to="/about" className="text-sm hover:text-blue-400 transition-colors">About Us</Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold mb-2 uppercase tracking-wider text-xs">Legal & Support</h4>
            <Link to="/about" className="text-sm hover:text-blue-400 transition-colors">Transparency</Link>
            <Link to="/about" className="text-sm hover:text-blue-400 transition-colors">AI Disclaimer</Link>
            <Link to="/about" className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</Link>
          </div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2026 YojnaSetu. Not an official government portal.</p>
          <p className="mt-2 md:mt-0">Built for public utility.</p>
        </div>
      </footer>
    </div>
  )
}