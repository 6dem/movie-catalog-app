import { useNavigate } from "react-router-dom"
import { Badge } from "../Badge/Badge"
import { Button } from "../Button"
import cls from "./MovieCard.module.css"

export const MovieCard = (props) => {
    const navigate = useNavigate()

    const levelVariant = props.card.rating >= 8 ? "success" : props.card.rating >= 6 ? "warning" : "alert"
    const completedVariant = "primary"

    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <Badge variant={levelVariant}>{props.card.rating}</Badge>
                <Badge variant={completedVariant}>{props.card.year}</Badge>
            </div>

            <h5 className={cls.cardTitle}>{props.card.title}</h5>

            <div className={cls.cardImage}>
                <img src="https://placehold.co/270x150" alt={props.card.title} />
            </div>

            <Button onClick={() => navigate(`/movie/${props.card.id}`)}>Обзор</Button>
        </div>
    )
}
