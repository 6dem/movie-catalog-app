import { useEffect, useMemo, useRef, useState } from "react"
import { Loader } from "../../components/Loader"
import { MovieCardList } from "../../components/MovieCardList"
import { Pagination } from "../../components/Pagination"
import { SearchInput } from "../../components/SearchInput"
import { Select } from "../../components/Select"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"
import cls from "./HomePage.module.css"

const DEFAULT_PER_PAGE = 12

const countOptions = [
    { value: "12", label: "12" },
    { value: "20", label: "20" },
    { value: "40", label: "40" },
    { value: "60", label: "60" },
]

export const HomePage = () => {
    const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`)
    const [activePageNumber, setActivePageNumber] = useState(1)
    const [movies, setMovies] = useState({})
    const [searchValue, setSearchValue] = useState("")
    const [countSelectValue, setCountSelectValue] = useState(`${DEFAULT_PER_PAGE}`)

    const controlsContainerRef = useRef()

    const [getMovies, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`)
        const movies = await response.json()

        setMovies(movies)
        return movies
    })

    const cards = useMemo(() => {
        if (!movies?.data) return []
        if (!searchValue.trim()) return movies.data
        return movies.data.filter((d) => d.title.toLowerCase().includes(searchValue.trim().toLowerCase()))
    }, [movies, searchValue])

    const pagination = useMemo(() => {
        const totalCardsCount = movies?.pages || 0
        return Array(totalCardsCount)
            .fill(0)
            .map((_, index) => index + 1)
    }, [movies])

    useEffect(() => {
        getMovies(`movies${searchParams}`)
    }, [searchParams])

    const onSearchChangeValueHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const onCountSelectChangeHandler = (event) => {
        setCountSelectValue(event.target.value)
        setActivePageNumber(1)
        setSearchParams(`?_page=1&_per_page=${event.target.value}`)
    }

    const paginationHandler = (event) => {
        if (event.target.tagName === "BUTTON") {
            setActivePageNumber(+event.target.textContent)
            setSearchParams(`?_page=${event.target.textContent}&_per_page=${countSelectValue}`)
            controlsContainerRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <>
            <div className={cls.controlsContainer} ref={controlsContainerRef}>
                <SearchInput value={searchValue} onChange={onSearchChangeValueHandler} />
                <Select value={countSelectValue} onChange={onCountSelectChangeHandler} options={countOptions} />
            </div>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <p className={cls.error}>{error}</p>
            ) : cards.length === 0 ? (
                <p className={cls.noCards}>Фильмов по вашему запросу не найдено</p>
            ) : (
                <>
                    <MovieCardList cards={cards} />
                    {pagination.length > 1 && (
                        <Pagination
                            onClick={paginationHandler}
                            pages={pagination}
                            activePageNumber={activePageNumber}
                        />
                    )}
                </>
            )}
        </>
    )
}
