import { memo } from "react"
import { MovieCard } from "../MovieCard"
import cls from "./MovieCardList.module.css"

export const MovieCardList = memo(({ cards }) => {
    return (
        <div className={cls.cardList}>
            {cards.map((card, index) => {
                return <MovieCard card={card} key={index} />
            })}
        </div>
    )
})
