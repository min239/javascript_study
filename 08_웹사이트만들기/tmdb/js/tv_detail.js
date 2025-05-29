const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGJjYWQ5NDExM2I4NWQ0MGUzMjgwZDRiYzJiZjJjMiIsIm5iZiI6MTc0ODM5NDAxNS4zODIwMDAyLCJzdWIiOiI2ODM2NjAxZmEzMmM2OWU2MWMwNTVlYTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZnD1ETNpj68Ym3ZX49CNPqPz_uG_0n8rN82o-LIN1d8',
   },
}
const urlParams = new URLSearchParams(window.location.search)

const tvId = urlParams.get('tv_id')

const tvDetailUrl = `https://api.themoviedb.org/3/tv/${tvId}language=ko-KR`
const mainContainer = document.querySelector('main .container')

const getDetailtv = async (tvDetailUrl) => {
   try {
      const response = await fetch(tvDetailUrl, options)

      const data = await response.json()
      // console.log('success data:', data)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
               <div class="row">
                  <div class="col-sm-3">
                     <img src="${imgSrc}" class="poster-detail" alt="${data.title}"/>
                  </div>
                  <div class="col-sm-9 tv-detail">
                     <h2>${data.title}</h2>
                     <ul class="tv-info">
                        <li>개봉일 ${data.release_date}</li>
                        <li>
                           ${data.genres.map((genre) => {
                              return genre.name
                           })}
                        </li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                     <p>${data.overview}</p>
                  </div>
               </div>`

      // console.log(rowHtml)
      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailtv(tvDetailUrl)
