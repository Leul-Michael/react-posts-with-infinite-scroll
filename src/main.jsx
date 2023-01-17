import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { AuthorContextProvider } from "./context/AuthorContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthorContextProvider>
      <App />
    </AuthorContextProvider>
  </React.StrictMode>
)
