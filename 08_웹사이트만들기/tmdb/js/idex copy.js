const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

const getPlayingMovies = async (url) => {
   try {
      const res = await fetch(url, options)
      const data = await res.json()

      const results = data.results
      //   console.log(results)

      const container = document.querySelector('main .container')
      let rowsHtml = '' // 모든 row를 담을 변수

      // card 5행 4열
      // results.length = 20
      for (let i = 0; i < results.length; i += 4) {
         //  배열은 results.length =20
         let rowHtml = '<div class="row">' // 하나의 row를 담을 변수
         //  rowHtml(새롭게 다시 시작) = '<div class="row"> 0 , 1, 2, 3'</div>' 그다음rowsHtml(누적합산한다) = '<div class="row"> 0 , 1, 2, 3'</div>' 추가 rowsHtml(누적합산한다) = '<div class="row"> 4, 5, 6, 7'</div>' 또추가 반복

         for (let j = 0; j < 4; j++) {
            const index = i + j
            // if (index >= results.length) break //results 배열을 벗어나면 중단

            //처음에 i가 0 j는0,1,2,3 그러면 index는 0 1 2 3
            //두번쨰 i 4 j는 0,1,2,3 더하면 index는 4,5,6,7 밑에 코드 실행하고 다시 반복

            // if (index >= results.length) break //results 배열을 벗어나면 중단 없어도 가능

            const movie = results[index]
            // console.log(movie)

            rowHtml += `
                <div class="col-sm-3 p-3">
                     <div class="card">
                        <a href="./detail.html?movue_id=${movied.id}">
                           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top poster" alt="${movie.title}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${movie.title}</p>
                           <p class="card-text average">${movie.vote_average.toFixed(1)}점</p>
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
      console.log('에러발생:', error)
   }
}

getPlayingMovies(url)
