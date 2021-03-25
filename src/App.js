import './App.css'
import { AppRouter } from "./AppRouter"
import { BrowserRouter } from "react-router-dom"
import { Navbar } from "./components/Includes/Navbar"

export const App = () => {
  return (
    <BrowserRouter>
        <Navbar />
        <AppRouter />
    </BrowserRouter>
  );
}
