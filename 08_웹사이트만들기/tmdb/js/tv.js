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
      const response = await fetch(url, options) // 서버에서 데이터 가져올때까지 기다린다
      //   console.log(response) // 기다렸다가 다 가지고 오면 실행

      const data = await response.json() //await를 지정하는 이유: fetch는 비동기적으로 실행되므로 서버에서 request 해오는 딜레이 시간 중에 실행 된다.
      const results = data.results
      const container = document.querySelector('main .container')
      let rowsHtml = '' //모든 row를 담을 문자열 변수

      //5번 반복 => row를 5개 만들어준다
      for (let i = 0; i < results.length; i += 2) {
         let rowHtml = '<div class="row">'

         //4번 반복 => col을 4개 만들어준다
         for (let j = 0; j < 2; j++) {
            const index = i + j
            if (index >= results.length) break //results 배열을 벗어나면 중단

            const tv = results[index]

            rowHtml += `
                <div class="col-sm-3 p-3">
                    <div class="card">
                        <a href="./detail.html?tv_id=${tv.id}">
                           <img src="https://image.tmdb.org/t/p/w500${tv.poster_path}" class="card-img-top poster" alt="${tv.name}" />
                        </a>
                        <div class="card-body">
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
