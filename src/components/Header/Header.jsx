import { useNavigate } from "react-router-dom"
import cls from "./Header.module.css"
import Logo from "/logo.svg"

export const Header = () => {
    const navigate = useNavigate()

    return (
        <header className={cls.header}>
            <div className={cls.wrapper} onClick={() => navigate("")}>
                <img className={cls.logo} src={Logo} alt="react logo" />
                <h1>Каталог фильмов</h1>
            </div>
        </header>
    )
}
