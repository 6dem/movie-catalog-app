import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Badge } from "../../components/Badge/Badge"
import { Button } from "../../components/Button"
import { Loader } from "../../components/Loader"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"
import cls from "./MoviePage.module.css"

export const MoviePage = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [card, setCard] = useState(null)

    const [fetchCard, isCardLoading] = useFetch(async () => {
        const response = await fetch(`${API_URL}/movies/${id}`)
        const data = await response.json()

        setCard(data)
    })

    const levelVariant = card && (card.rating >= 8 ? "success" : card.rating >= 6 ? "warning" : "alert")
    const completedVariant = "primary"

    useEffect(() => {
        fetchCard()
    }, [id])

    return (
        <>
            {isCardLoading && <Loader />}

            {card !== null && (
                <div className={cls.container}>
                    <div className={cls.cardLabels}>
                        <Badge variant={levelVariant}>{card.rating}</Badge>
                        <Badge variant={completedVariant}>{card.year}</Badge>

                        {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
                    </div>

                    <h5 className={cls.cardTitle}>{card.title}</h5>
                    <div className={cls.cardImage}>
                        <img src="https://placehold.co/540x300" alt={card.title} />
                    </div>

                    <p className={cls.cardDescription}>{card.description}</p>
                    <p className={cls.contry}>Страна: {card.country}</p>
                    <Button onClick={() => navigate("/")}>Назад</Button>
                </div>
            )}
        </>
    )
}
