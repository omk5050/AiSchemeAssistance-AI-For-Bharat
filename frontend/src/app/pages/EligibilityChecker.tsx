import { useState } from "react"
import { ShieldAlert, ShieldCheck, Info, ChevronRight, ExternalLink } from "lucide-react"
import { Button, Input, Select, Label, Badge, Progress } from "../components/ui"
import { SCHEMES, UserProfile, Occupation, Category } from "../data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui"
import { useI18n, Language } from "../i18n"
import { Chatbot } from "../components/Chatbot"

export function EligibilityChecker() {

const { t, language } = useI18n()

const [profile, setProfile] = useState<Partial<UserProfile>>({
occupation: "Unemployed",
category: "General"
})

const [error, setError] = useState<string>("")
const [loading, setLoading] = useState(false)
const [hasSubmitted, setHasSubmitted] = useState(false)

const [results, setResults] = useState<
{ schemeId: string; eligible: boolean; reason: Record<Language, string> }[]

> ([])

const [selectedScheme, setSelectedScheme] = useState<string | null>(null)
const [aiExplanation, setAiExplanation] = useState<string>("")

const handleSubmit = async (e: React.FormEvent) => {

e.preventDefault()
setError("")
setLoading(true)

if (profile.age === undefined || profile.income === undefined) {
  setError("Please enter age and income")
  setLoading(false)
  return
}

try {

  const response = await fetch(
    "https://w7le5stpkl.execute-api.ap-south-1.amazonaws.com/evaluate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        age: profile.age,
        income: profile.income,
        occupation: profile.occupation?.toLowerCase(),
        category: profile.category?.toLowerCase(),
        state: "maharashtra"
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Server error")
  }

  const schemeMap: any = {
    "PM-KISAN": "pm-kisan",
    "Mahatma Jyotirao Phule Jan Arogya Yojana": "mjpjay",
    "Economically Backward Class Scholarship": "ebc-scholarship",
    "Mukhyamantri Yuva Karya Prashikshan Yojana": "mykpy",
    "Shravan Bal Seva Rajya Nivrutti Vetan Yojana": "shravan-bal"
  }

  const formattedResults = (data.results || []).map((r: any) => ({
    schemeId: schemeMap[r.scheme],
    eligible: r.eligible,
    reason: {
      en: r.reasons?.join(", ") || "",
      hi: r.reasons?.join(", ") || "",
      mr: r.reasons?.join(", ") || ""
    }
  }))

  setResults(formattedResults)

  // AI explanation from backend
  setAiExplanation(data.explanation || "")

  setHasSubmitted(true)

} catch (err) {

  console.error(err)
  setError("Backend server is not running. Please try again later.")

}

setLoading(false)
}

const eligibleCount = results.filter(r => r.eligible).length
const totalCount = results.length
const progressPercentage = totalCount > 0 ? (eligibleCount / totalCount) * 100 : 0

const activeSchemeData = selectedScheme
? SCHEMES.find(s => s.id === selectedScheme)
: null

const activeResultData = selectedScheme
? results.find(r => r.schemeId === selectedScheme)
: null

return ( <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl flex flex-col gap-12 bg-gradient-to-br from-blue-50 via-white to-indigo-50">

  <div className="text-center space-y-4 max-w-2xl mx-auto">
    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
      {t.checker.title}
    </h1>
    <p className="text-lg text-gray-600">{t.checker.subtitle}</p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

    {/* FORM */}

    <div className="lg:col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">

      <form onSubmit={handleSubmit} className="space-y-6">

        <h2 className="text-xl font-bold border-b border-gray-100 pb-4 text-gray-900">
          {t.checker.applicantDetails}
        </h2>

        <div className="space-y-2">
          <Label htmlFor="age">{t.checker.age}</Label>
          <Input
            id="age"
            type="number"
            min="0"
            max="120"
            required
            value={profile.age || ""}
            onChange={(e) =>
              setProfile({ ...profile, age: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="income">{t.checker.income}</Label>
          <Input
            id="income"
            type="number"
            min="0"
            required
            value={profile.income || ""}
            onChange={(e) =>
              setProfile({ ...profile, income: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="occupation">{t.checker.occupation}</Label>
          <Select
            id="occupation"
            value={profile.occupation}
            onChange={(e) =>
              setProfile({ ...profile, occupation: e.target.value as Occupation })
            }
          >
            <option value="Student">{t.occupations.Student}</option>
            <option value="Farmer">{t.occupations.Farmer}</option>
            <option value="Unemployed">{t.occupations.Unemployed}</option>
            <option value="Salaried">{t.occupations.Salaried}</option>
            <option value="Retired">{t.occupations.Retired}</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">{t.checker.category}</Label>
          <Select
            id="category"
            value={profile.category}
            onChange={(e) =>
              setProfile({ ...profile, category: e.target.value as Category })
            }
          >
            <option value="General">{t.categories.General}</option>
            <option value="OBC">{t.categories.OBC}</option>
            <option value="SC">{t.categories.SC}</option>
            <option value="ST">{t.categories.ST}</option>
          </Select>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full font-bold h-12 mt-4 shadow text-lg bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Checking..." : t.checker.submit}
        </Button>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

      </form>

    </div>

    {/* RESULTS */}

    <div className="lg:col-span-7 space-y-8">

      {!hasSubmitted ? (

        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <Info className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            {t.checker.awaiting}
          </h3>
          <p className="text-gray-500 max-w-sm">{t.checker.awaitingDesc}</p>
        </div>

      ) : (

        <div className="space-y-8">

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-4">

            <div className="flex justify-between items-end">

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">
                  {t.checker.score}
                </h3>

                <div className="text-3xl font-extrabold text-gray-900">
                  {eligibleCount}
                  <span className="text-xl text-gray-400 font-medium">
                    {" "} / {totalCount} {t.checker.schemesEligible}
                  </span>
                </div>

              </div>

              {eligibleCount > 0 && (
                <ShieldCheck className="h-10 w-10 text-emerald-500" />
              )}

            </div>

            <Progress value={progressPercentage} className="h-3" />

          </div>

          {aiExplanation && (

            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-xl flex gap-4 items-start shadow-sm">

              <div className="bg-indigo-100 p-2 rounded-lg shrink-0">
                <ShieldAlert className="h-6 w-6 text-indigo-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-indigo-900 mb-2">
                  {t.checker.aiSummaryTitle}
                </h3>

                <p className="text-indigo-800 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                  {aiExplanation}
                </p>

              </div>

            </div>

          )}

          <Tabs defaultValue="all" className="w-full">

            <TabsList>
              <TabsTrigger value="all">{t.checker.tabAll}</TabsTrigger>
              <TabsTrigger value="eligible">{t.checker.tabEligible}</TabsTrigger>
              <TabsTrigger value="not-eligible">{t.checker.tabNotEligible}</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {results.map(result => (
                <ResultRow key={result.schemeId} result={result} onSelect={() => setSelectedScheme(result.schemeId)} lang={language} t={t}/>
              ))}
            </TabsContent>

            <TabsContent value="eligible" className="space-y-3">
              {results.filter(r => r.eligible).map(result => (
                <ResultRow key={result.schemeId} result={result} onSelect={() => setSelectedScheme(result.schemeId)} lang={language} t={t}/>
              ))}
            </TabsContent>

            <TabsContent value="not-eligible" className="space-y-3">
              {results.filter(r => !r.eligible).map(result => (
                <ResultRow key={result.schemeId} result={result} onSelect={() => setSelectedScheme(result.schemeId)} lang={language} t={t}/>
              ))}
            </TabsContent>

          </Tabs>

        </div>

      )}

    </div>

  </div>

  <Chatbot profile={hasSubmitted ? profile : {}} results={hasSubmitted ? results : []} />

</div>


)
}

function ResultRow({ result, onSelect, lang, t }: { result: any, onSelect: () => void, lang: Language, t: any }) {

const scheme = SCHEMES.find(s => s.id === result.schemeId)

if (!scheme) return null

return ( <button
   onClick={onSelect}
   className="w-full text-left bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all rounded-xl p-4 sm:p-5 flex items-center justify-between group"
 >

  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full pr-4">

    <Badge variant={result.eligible ? "success" : "destructive"} className="w-fit font-bold shrink-0">
      {result.eligible ? t.checker.statusEligible : t.checker.statusNotEligible}
    </Badge>

    <div className="flex-1 min-w-0">

      <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-700">
        {scheme.name[lang]}
      </h4>

      <p className="text-sm text-gray-500 truncate mt-1 hidden sm:block">
        {scheme.description[lang]}
      </p>

    </div>

  </div>

  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 shrink-0"/>

</button>
)
}
