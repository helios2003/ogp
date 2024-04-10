import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate, useLocation } from "react-router-dom"

export default function Page() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const navigate = useNavigate()
    const location = useLocation()

   // get query params
    const getParams = (query: string) => {
        return new URLSearchParams(query);
    }

    useEffect(() => {
        const params = getParams(location.search)
        const titleParam = params.get('title')
        const descriptionParam = params.get('description')

        setTitle(titleParam || "")
        setDescription(descriptionParam || "")
    }, [location])

    const handleChange = () => {
        const newUrl = new URLSearchParams({
            title,
            description,
        })
        navigate(`?${newUrl}`)
    }

    useEffect(() => {
        handleChange()
    }, [title, description])

    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={title} data-rh="true" />
                <meta property="og:description" content={description} data-rh="true" />
            </Helmet>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
            />
        </>
    )
}
