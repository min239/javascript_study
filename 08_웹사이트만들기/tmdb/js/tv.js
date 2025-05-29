const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGJjYWQ5NDExM2I4NWQ0MGUzMjgwZDRiYzJiZjJjMiIsIm5iZiI6MTc0ODM5NDAxNS4zODIwMDAyLCJzdWIiOiI2ODM2NjAxZmEzMmM2OWU2MWMwNTVlYTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZnD1ETNpj68Ym3ZX49CNPqPz_uG_0n8rN82o-LIN1d8',
   },
}

const tvPopularUrl = 'https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1'

const getPlayingTv = async (tvPopularUrl) => {
   try {
      const res = await fetch(tvPopularUrl, options)
      const data = await res.json()
      const results = data.results

      const container = document.querySelector('main .container')
      let rowHtml = ''

      for (let i = 0; i < results.length; i += 1) {
         let rowHtml = '<div class="row">'

         for (let j = 0; j < 19; j++) {
            const index = i + j
            if (index >= results.length) break

            const tv = results[index]

            rowHtml += `
             <div class="col-sm-3 p-3">
                     <div class="card">
                        <a href="./detail.html?tv_id=${tv.id}">
                           <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top poster" alt="${tv.title}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${tv.title}</p>
                        </div>
                     </div>
                </div>
            `
         }
         rowHtml += '</div>'
         rowHtml += rowHtml
      }
      container.innerHTML = rowHtml
   } catch (error) {
      console.log('에러발생', error)
   }
}

getPlayingTv(tvPopularUrl)
