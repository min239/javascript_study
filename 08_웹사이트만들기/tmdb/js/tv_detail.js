const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGJjYWQ5NDExM2I4NWQ0MGUzMjgwZDRiYzJiZjJjMiIsIm5iZiI6MTc0ODM5NDAxNS4zODIwMDAyLCJzdWIiOiI2ODM2NjAxZmEzMmM2OWU2MWMwNTVlYTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZnD1ETNpj68Ym3ZX49CNPqPz_uG_0n8rN82o-LIN1d8',
   },
}


const tvDetailUrl = 'https://api.themoviedb.org/3/tv/14981?language=ko-KR'

const getDetailtv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)

      const data = await response.json()
      console.log('success data:', data)
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailMovie(tvDetailUrl)



      

   