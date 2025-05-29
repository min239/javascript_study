const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTY0OTIzMDY1Ny42NDEsInN1YiI6IjYyNGQ0MzQxYzM5MjY2MDA0ZjkyOThiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VBrTVt3_4sbUJY1WztwmFvsSQJCkIaUZFESj21wNDA',
   },
}

// 특정 쿼리 스트링 값 가져오기 (movie_id 값)
const urlParams = new URLSearchParams(location.search)
const movieId = urlParams.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

//영화상세정보를 가지고 오고 출현 배우 데이터도 가져오는데 순서대로 가져오지 않고 먼저 가져오는 데이터 부터 실행(비동기) 순서대로 가져 올려면(동기적으로) 코드를 수정해야함
//1.영화 상세정보 바인딩 async가 붙은 함수는 비동기로 동작
const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)
      const data = await response.json()

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
               <div class="row">
                  <div class="col-sm-3" style="text-align:center">
                     <img src="${imgSrc}" class="poster-detail" alt="${data.title}" style="max-width:100%"/>
                  </div>
                  <div class="col-sm-9 movie-detail >
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                        <li>개봉일 ${data.release_date}</li>
                        <li>${data.genres.map((genre) => genre.name)}</li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>평점 ${Number(data.vote_average) === 0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                     <p>${data.overview}</p>
                  </div>
               </div> 
      `

      mainContainer.innerHTML += rowHtml

      // getDetailMovie 함수가 완료 될때까지 기다렸다가 getCreditsMovie 함수 실행
      // getCreditsMovie는 비동기 함수이므로 await를 붙여준다 ->getCreditsMovie 함수 아래에 순차적으로 실행해야 하는 코드가 있는 경우 await를 반드시 붙여야 하고 그렇지 않을 경우는 붙여도 되고 안붙여도 된다.
      await getCreditsMovie(movieCreditsUrl)
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)

//2.출현 배우 데이터 바인딩

const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

//async가 붙은 함수는 비동기로 동작
const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)
      const data = await response.json()

      let castRowHtml = `<div class="row" style="margin-top:30px">`

      // 출연배우 6명만 출력
      // data.cast.length:배우가 6명 미만일 겨웅 에러나는 걸 처리
      for (let i = 0; i < data.cast.length; i++) {
         //data.cast.length 배열의 갯수만큼
         if (i === 6) break //7명쪠 되면 for문 종료(6명만 출력)
         //  console.log(data.cast[i])

         //null은 false
         //profile+path가 null이면 person.png를 보여줌
         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}` //!data.cast[i]자체가 undefined 프리폴 출현하는 배우가 4명 다섯번쨰 배열에서 오류나옴

         castRowHtml += `
             <div class='col-sm-2 p-3'>
                <div class="card">
                  <img src="${profileImg}"  class="card-img-top" alt="${data.cast[i].name}">
                     <div class="card-body">
                       <p class="card-text">${data.cast[i].name}</p>
                     </div>
                </div>
             </div>
         `
      }

      castRowHtml += `</div>`

      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}
