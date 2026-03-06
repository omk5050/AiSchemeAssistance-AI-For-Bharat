import { useState } from "react"
import { FaSeedling, FaHeartbeat, FaUserGraduate, FaUserTie, FaHandsHelping } from "react-icons/fa"
function Checker() {

  const [age, setAge] = useState("")
  const [income, setIncome] = useState("")
  const [occupation, setOccupation] = useState("")
  const [category, setCategory] = useState("")

  const [results, setResults] = useState([])
  const [explanation, setExplanation] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")
    setResults([])
    setExplanation("")

    // VALIDATION

    if (age < 0 || age > 120) {
      setError("Please enter a valid age between 0 and 120")
      return
    }

    if (income < 0) {
      setError("Income cannot be negative")
      return
    }

    setLoading(true)

    try {

      const response = await fetch("http://localhost:3000/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: Number(age),
          income: Number(income),
          occupation,
          category,
          state: "maharashtra"
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Server error")
      }

      setResults(data.results || [])
      setExplanation(data.explanation || "")

    } catch (err) {

      setError(err.message)

    }

    setLoading(false)

  }



  return (

    <div className="bg-gray-50 min-h-screen py-20 px-6">

      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}

        <h1 className="text-4xl font-bold text-center">
          Check Scheme Eligibility
        </h1>

        <p className="text-gray-600 text-center mt-4">
          Enter your details to evaluate eligibility across
          government welfare schemes.
        </p>



        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-10 mt-12 max-w-4xl mx-auto"
        >

          {/* FORM HEADER */}

          <div className="border-b pb-6 mb-8">

            <h2 className="text-2xl font-semibold text-gray-800">
              Eligibility Information
            </h2>

            <p className="text-gray-500 mt-2">
              Provide the following details to evaluate eligibility
              across government welfare schemes.
            </p>

          </div>



          {/* FORM GRID */}

          <div className="grid md:grid-cols-2 gap-6">


            {/* AGE */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>

              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
                max="120"
                placeholder="Enter your age"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-govblue outline-none"
                required
              />

              <p className="text-xs text-gray-500 mt-1">
                Age must be between 0 and 120
              </p>

            </div>



            {/* INCOME */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Income
              </label>

              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                min="0"
                max="100000000"
                placeholder="Enter annual income"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-govblue outline-none"
                required
              />

              <p className="text-xs text-gray-500 mt-1">
                Income cannot be negative
              </p>

            </div>



            {/* OCCUPATION */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupation
              </label>

              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-govblue outline-none"
                required
              >

                <option value="">Select occupation</option>
                <option value="student">Student</option>
                <option value="farmer">Farmer</option>
                <option value="unemployed">Unemployed</option>
                <option value="salaried">Salaried</option>
                <option value="retired">Retired</option>

              </select>

            </div>



            {/* CATEGORY */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (Optional)
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-govblue outline-none"
              >

                <option value="">None</option>
                <option value="general">General</option>
                <option value="obc">OBC</option>
                <option value="sc">SC</option>
                <option value="st">ST</option>

              </select>

            </div>

          </div>



          {/* ERROR */}

          {error && (
            <div className="text-red-600 mt-6 text-center">
              {error}
            </div>
          )}



          {/* SUBMIT */}

          <div className="mt-10 text-center">

            <button
              type="submit"
              disabled={loading}
              className="bg-govblue text-white px-10 py-3 rounded-lg text-lg hover:bg-blue-900 transition"
            >

              {loading ? "Evaluating Eligibility..." : "Check Eligibility"}

            </button>

          </div>

        </form>



        {/* RESULTS */}

{results.length > 0 && (

  <div className="mt-16">

    <h2 className="text-2xl font-semibold mb-8">
      Evaluation Results
    </h2>

    <div className="grid md:grid-cols-2 gap-6">

      {results.map((scheme, index) => (

        <div
          key={index}
  className={`bg-white border-l-4 ${
    scheme.eligible ? "border-green-600" : "border-red-600"
  } rounded-xl p-6 shadow hover:shadow-lg transition`}
        >

          {/* SCHEME HEADER */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

  {scheme.scheme === "PM-KISAN" && (
    <FaSeedling className="text-green-600 text-xl" />
  )}

  {scheme.scheme === "Mahatma Jyotirao Phule Jan Arogya Yojana" && (
    <FaHeartbeat className="text-red-600 text-xl" />
  )}

  {scheme.scheme === "Economically Backward Class Scholarship" && (
    <FaUserGraduate className="text-blue-600 text-xl" />
  )}

  {scheme.scheme === "Mukhyamantri Yuva Karya Prashikshan Yojana" && (
    <FaUserTie className="text-purple-600 text-xl" />
  )}

  {scheme.scheme === "Shravan Bal Seva Rajya Nivrutti Vetan Yojana" && (
    <FaHandsHelping className="text-yellow-600 text-xl" />
  )}

  <h3 className="text-lg font-semibold text-gray-800">
    {scheme.scheme}
  </h3>

</div>

            <span
              className={`px-3 py-1 text-sm rounded-full text-white ${
                scheme.eligible ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {scheme.eligible ? "Eligible" : "Not Eligible"}
            </span>

          </div>


          {/* DESCRIPTION */}

          <p className="text-gray-600 mt-4 text-sm">

            {scheme.scheme === "PM-KISAN" &&
              "Income support scheme for farmers providing financial assistance."}

            {scheme.scheme === "Mahatma Jyotirao Phule Jan Arogya Yojana" &&
              "Health insurance scheme covering medical expenses for families."}

            {scheme.scheme === "Shravan Bal Seva Rajya Nivrutti Vetan Yojana" &&
              "Old age pension support for senior citizens."}

            {scheme.scheme === "Economically Backward Class Scholarship" &&
              "Scholarship support for students from economically weaker families."}

            {scheme.scheme === "Mukhyamantri Yuva Karya Prashikshan Yojana" &&
              "Skill development and training scheme for youth employment."}

          </p>

        </div>

      ))}

    </div>

  </div>

)}



        {/* EXPLANATION */}

        {explanation && (

          <div className="bg-gray-100 p-6 rounded-lg mt-12">

            <h3 className="font-semibold mb-3">
              Explanation
            </h3>

            <p className="text-gray-700">
              {explanation}
            </p>

          </div>

        )}

      </div>

    </div>

  )
}

export default Checker