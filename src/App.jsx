import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./components/MainLayout"
import { HomePage } from "./pages/HomePage"
import { MoviePage } from "./pages/MoviePage"
import { NotFoundPage } from "./pages/NotFoundPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/movie/:id" element={<MoviePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
