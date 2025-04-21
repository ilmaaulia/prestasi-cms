import React, { useEffect, useState } from 'react'
import { getData } from '../../utils/fetch'
import Cards from '../Cards'

const LatestNews = () => {
  const [news, setNews] = useState([])

  useEffect(() => {
    const fetchnews = async () => {
      try {
        const response = await getData('/newses?sort=date:desc&limit=3')
        setNews(response.data.data)
      } catch (error) {
        console.error('Error fetching news:', error)
      }
    }

    fetchnews()
  }, [])

  return <Cards data={news} title="Berita Terbaru" />
}

export default LatestNews
