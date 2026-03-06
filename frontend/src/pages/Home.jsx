import heroImage from "../assets/images/bg.png"

function Home() {
  return (
    <div>

      {/* HERO SECTION */}

      <section
        className="relative min-h-screen flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        {/* Overlay */}

        <div className="absolute inset-0 bg-black/60"></div>

        {/* Hero Content */}

        <div className="relative z-10 max-w-3xl px-6 text-white">

          <h1 className="text-5xl font-bold leading-tight">
            AI Scheme Eligibility Assistant
          </h1>

          <p className="mt-6 text-lg">
            Discover government welfare schemes you may qualify for
            using transparent rule-based evaluation.
          </p>

          <button className="mt-8 bg-govblue px-8 py-4 rounded-lg text-lg hover:bg-blue-900 transition">
            Check Your Eligibility
          </button>

        </div>
      </section>


      {/* SERVICES SECTION */}

      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-3 gap-8">

        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">

          <h3 className="text-xl font-semibold text-gray-800">
            Check Eligibility
          </h3>

          <p className="mt-4 text-gray-600">
            Enter your details and evaluate eligibility
            across multiple government welfare schemes.
          </p>

        </div>


        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">

          <h3 className="text-xl font-semibold text-gray-800">
            Explore Schemes
          </h3>

          <p className="mt-4 text-gray-600">
            Learn about benefits, eligibility rules
            and requirements for welfare programs.
          </p>

        </div>


        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">

          <h3 className="text-xl font-semibold text-gray-800">
            Understand Results
          </h3>

          <p className="mt-4 text-gray-600">
            AI explains eligibility results in simple
            language for better understanding.
          </p>

        </div>

      </section>


      {/* HOW IT WORKS SECTION */}

      <section className="bg-gray-100 py-20">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-3xl font-bold text-gray-800">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10 mt-12">

            <div>

              <h4 className="font-semibold text-lg">
                1. Enter Your Details
              </h4>

              <p className="text-gray-600 mt-3">
                Provide information such as age, income,
                occupation and category.
              </p>

            </div>


            <div>

              <h4 className="font-semibold text-lg">
                2. Eligibility Evaluation
              </h4>

              <p className="text-gray-600 mt-3">
                A deterministic rule engine evaluates
                eligibility across government schemes.
              </p>

            </div>


            <div>

              <h4 className="font-semibold text-lg">
                3. AI Explanation
              </h4>

              <p className="text-gray-600 mt-3">
                AI explains the eligibility results in
                clear and understandable language.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
}

export default Home