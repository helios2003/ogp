import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate, useLocation } from "react-router-dom"

 export default function Page() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  // Get query params
  const getParams = (query: string) => {
    try {
      return new URLSearchParams(query)
    } catch (error) {
      console.error("Error parsing query string:", error)
      return new URLSearchParams() 
    }
  }

  useEffect(() => {
    const params = getParams (location.search)
    const titleParam = params.get("title")
    const descriptionParam = params.get("description")
    setTitle(titleParam || "")
    setDescription(descriptionParam || "")
  }, [location])

  const handleChange = () => {
    const params = getParams(location.search)
    params.set("title", title)
    params.set("description", description)
    const newUrl = params.toString()
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
