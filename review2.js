//영화 상세페이지
// (영화)상세 페이지  viewMovieDetails()

//리뷰 등록
// 리뷰 등록 버튼 postReview()



// 영화 api 불러오기 관련
const key = "BNUTWI8LOC2C99593QD4";
const movieUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title="파묘"&ServiceKey=${key}`;

// 영화 제목
const movieTitle = document.querySelector('.movie_title > .contents_title');

// 영화 포스터
const moviePoster = document.querySelector('.poster_box');

// 영화 줄거리
const moviePlot = document.querySelector('.story_box > .content_text');

// 출연 배우들
const actors = document.querySelector('.cast_list');

// 개봉일
const releaseDate = document.querySelector('.release_date');

// 영화 감독
const director = document.querySelector('.director');

// 영화 장르
const movieGenre = document.querySelector('.genre');

// 영화 예고편
const trailerMovie = document.querySelector('.trailer_box');



async function movieInfo(){

    try{
        const movie = await axios.get(movieUrl);
        

        // 데이터 공통 경로 변수에 담기
        const movieShort = movie.data.Data[0].Result[0];

        // console.log("영화 데이터 전체", movie);
        // console.log('날짜 데이터 가져온것 >>', movieShort.repRlsDate);
        // console.log("영화 예고편 >>", movieShort.vods.vod[0].vodUrl);
        // console.log(movieShort.plots.plot[0].plotText);
        // console.log(movieShort.actors.actor[0].actorNm);
        // console.log("영화 포스터 >>", movie.data.Data[0].Result[0].posters);
        // console.log(movie.data.Data[0].Result[0].vods.vod[1].vodUrl);
  
  
        // 영화 포스터 가져오기
        const urlString = movie.data.Data[0].Result[0].posters;

        // URL을 '|'로 분리하여 배열로 만듭니다.
        const posterUrls = urlString.split('|');

        // 첫 번째 URL을 가져옵니다.
        const firstUrl = posterUrls[0];

        moviePoster.innerHTML = `<img src="${firstUrl}" alt="${movieShort.title}">`;
      
        // 영화 예고편 가져오기
        const trailerUrl = new URL(movieShort.vods.vod[0].vodUrl);

        // 쿼리 파라미터에서 'pFileNm' 값을 가져옴
        const pFileNmValue = trailerUrl.searchParams.get('pFileNm');
            
        // pathname에서 'trailerPlayPop'를 'play'로 변경
        trailerUrl.pathname = trailerUrl.pathname.replace('/trailerPlayPop', '/play');
            
        // 최종 URL 생성
        const newUrl = `${trailerUrl.origin}${trailerUrl.pathname}/${pFileNmValue}`;

        trailerMovie.innerHTML = `<video src="${newUrl}" autoplay muted loop></video>`


  
        //영화 제목 가져오기
        movieTitle.textContent = movie.data.KMAQuery;
  
  
        // 영화 줄거리 가져오기
        moviePlot.textContent = `${movieShort.plots.plot[0].plotText}`
  
  
        // 영화 개봉일 가져오기
        const date1 = movieShort.repRlsDate;
  
        function formatDate(dateStr) {
          const year = dateStr.substring(0, 4);
          const month = dateStr.substring(4, 6);
          const day = dateStr.substring(6, 8);

          return releaseDate.textContent = `${year}-${month}-${day}`;
        }
        formatDate(date1);
  
  
        // 영화감독 가져오기
        director.textContent = movieShort.directors.director[0].directorNm;
  
  
        // 영화 장르 가져오기
        //   const genre = movieShort.genre;
        //   const genreArr = genre.split(",");
        //   console.log("영화 장르 >>", genreArr);
        
        //   genreArr.forEach((gen) => {
        //     const genreLi = document.createElement('li');
        //     genreLi.textContent = gen;
        //     movieGenre.appendChild(genreLi);
        //   } )
        movieGenre.textContent = movieShort.genre;
  
  
        // 출연 배우 목록 가져오기
        for(i = 0; i < 5; i++){
          const actorLi = document.createElement('li');
          actorLi.textContent = `${movieShort.actors.actor[i].actorNm}`;
          actors.appendChild(actorLi);
        }
        
    }catch(error){
      console.log(error);
    }
  }
  
  movieInfo();
  




// 별점 주기 관련
const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

printRatingResult(ratingResult);

function executeRating(stars, result) {
   const starClassActive = "rating__star fas fa-star";
   const starClassUnactive = "rating__star far fa-star";
   const starsLength = stars.length;
   let i;
   stars.map((star) => {
      star.onclick = () => {
         i = stars.indexOf(star);

         if (star.className.indexOf(starClassUnactive) !== -1) {
            printRatingResult(result, i + 1);
            for (i; i >= 0; --i) stars[i].className = starClassActive;
         } else {
            printRatingResult(result, i);
            for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
         }
      };
   });
}

function printRatingResult(result, num = 0) {
   result.textContent = `${num} / 5`;
}

executeRating(ratingStars, ratingResult);