import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-white shadow">

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-xl font-bold text-govblue">
          Scheme Assistant
        </h1>

        <div className="space-x-6 text-gray-700 font-medium">
          <Link to="/">Home</Link>
          <Link to="/checker">Check Eligibility</Link>
          <Link to="/schemes">Schemes</Link>
          <Link to="/about">About</Link>
        </div>

      </div>

    </nav>
  )
}

export default Navbar