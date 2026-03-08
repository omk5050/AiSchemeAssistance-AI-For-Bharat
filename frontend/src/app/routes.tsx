import { createBrowserRouter } from "react-router"
import { Layout } from "./components/Layout"
import { Home } from "./pages/Home"
import { EligibilityChecker } from "./pages/EligibilityChecker"
import { SchemesPage } from "./pages/SchemesPage"
import { About } from "./pages/About"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "checker", Component: EligibilityChecker },
      { path: "schemes", Component: SchemesPage },
      { path: "about", Component: About },
      { path: "*", Component: () => <div className="p-8 text-center text-red-500">Page not found</div> },
    ],
  },
])