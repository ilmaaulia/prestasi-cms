import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/fetch'
import Cards from './cards'

const LatestNews = () => {
  const [news, setNews] = useState([])

  const fetchLatestNews = async () => {
    const response = await getData('/newses?sort=date:desc&limit=3')
    setNews(response.data.data)
  }

  useEffect(() => {
    fetchLatestNews()
  }, [])

  return <Cards data={news} title="Berita Terbaru" />
}

export default LatestNews
