const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGJjYWQ5NDExM2I4NWQ0MGUzMjgwZDRiYzJiZjJjMiIsIm5iZiI6MTc0ODM5NDAxNS4zODIwMDAyLCJzdWIiOiI2ODM2NjAxZmEzMmM2OWU2MWMwNTVlYTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZnD1ETNpj68Ym3ZX49CNPqPz_uG_0n8rN82o-LIN1d8',
   },
}

const url = 'https://api.themoviedb.org/3/discover/tv?language=ko-KR&page=3&with_original_language=ko'

const getPlayingtvs = async (url) => {
   try {
      const response = await fetch(url, options)

      const data = await response.json()
      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = ''

      for (let i = 0; i < results.length; i += 2) {
         let rowHtml = '<div class="row">'

         //4번 반복 => col을 4개 만들어준다
         for (let j = 0; j < 2; j++) {
            const index = i + j
            if (index >= results.length) break //results 배열을 벗어나면 중단

            const tv = results[index]

            rowHtml += `
                <div class="col-sm-3 p-3">
                    <div class="borderbox">
                        <a href="./detail.html?tv_id=${tv.id}">
                           <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top poster" alt="${tv.name}" />
                        </a>
                        <div>
                        <p class="card-text name">${tv.name}</p>
                        <p class="card-text average">${Number(tv.vote_average) === 0 ? '미반영' : ' 평점' + tv.vote_average.toFixed(1)}</p>
                        <p class="card-text overview ellipsis">${tv.overview}</p>
                        </div>
                    </div>
                </div>
                `
         }

         rowHtml += '</div>'
         rowsHtml += rowHtml
      }

      container.innerHTML = rowsHtml
   } catch (error) {
      console.log('에러 발생:', error)
   }
}

getPlayingtvs(url)
