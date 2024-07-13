//영화 상세페이지
// (영화)상세 페이지  viewMovieDetails()

//리뷰 등록
// 리뷰 등록 버튼 postReview()


// const fs = require('fs');
// const axios = require('axios');

console.log('!!');

// 영화 api 불러오기

const key = "BNUTWI8LOC2C99593QD4";
const movieUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title="범죄도시"&ServiceKey=${key}`;


const movieTitle = document.querySelector('.movie_title');
const moviePoster = document.querySelector('#movie_poster');
const moviePlot = document.querySelector('.movie_description > .info_sub_content');
const actors = document.querySelector('.cast_list');
const releaseDate = document.querySelector('.movie_release_date');
const director = document.querySelector('.director_name');
const movieGenre = document.querySelector('.genre_list');



async function movieInfo(){
  // const apiUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&genre=액션&sort=prodYear,1&ServiceKey=${key}`;

  try{
    const movie = await axios.get(movieUrl);
    

    // 데이터 공통 경로 변수에 담기
    const movieShort = movie.data.Data[0].Result[0];

    console.log("영화 데이터 전체", movie);
    console.log('날짜 데이터 가져온것 >>', movieShort.repRlsDate);
    console.log("링크>>", movieShort.vods.vod[0].vodUrl);
    // console.log(movieShort.plots.plot[0].plotText);
    // console.log(movieShort.actors.actor[0].actorNm);
    // console.log(movie.data.Data[0].Result[0].posters);
    // console.log(movie.data.Data[0].Result[0].vods.vod[1].vodUrl);


    // 영화 포스터 가져오기
    // moviePoster.innerHTML = `<img src="${movieShort.posters}" alt="${movieShort.title}">`;    
    
    // 영화 예고편 가져오기
    // if(movieShort.vods.vod[1].vodUrl === ""){
    // }


    // 영화 제목 가져오기
    // movieTitle.textContent = movie.data.KMAQuery;


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
    const genre = movieShort.genre;
    const genreArr = genre.split(",");
    console.log("영화 장르 >>", genreArr);

    genreArr.forEach((gen) => {
      const genreLi = document.createElement('li');
      genreLi.textContent = gen;
      movieGenre.appendChild(genreLi);
    } )


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



// 리뷰 슬라이더
const swiper = new Swiper('.swiper', {

    slidesPerView: 2,
    // Optional parameters
    direction: 'horizontal',
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });

// const openBtn = document.querySelector('.button_open');
// const closeBtn = document.querySelector('.button_close');
const modal = document.querySelector('.movie_review_modal_bg');


const postReview = () => {
    modal.classList.remove('hidden');
    modal.classList.add('visible');
}

const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('visible');
}