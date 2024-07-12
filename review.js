//영화 상세페이지
// (영화)상세 페이지  viewMovieDetails()

//리뷰 등록
// 리뷰 등록 버튼 postReview()


// const fs = require('fs');
// const axios = require('axios');

console.log('!!');

// 영화 api 불러오기

const key = "BNUTWI8LOC2C99593QD4";
const movieUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&title="파묘"&ServiceKey=${key}`;

const movieTitle = document.querySelector('.movie_title');
const moviePoster = document.querySelector('#movie_poster');
const moviePlot = document.querySelector('.movie_description > .info_sub_content');

const actors = document.querySelector('.cast_list');
const actorLi = document.createElement('li');


async function movieInfo(){
  // const apiUrl = `http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y&genre=액션&sort=prodYear,1&ServiceKey=${key}`;

  try{
    const movie = await axios.get(movieUrl);
    const movieShort = movie.data.Data[0].Result[0];
    console.log(movie);
    // console.log(movieShort.plots.plot[0].plotText);
    // console.log(movieShort.actors.actor[0].actorNm);
    // console.log(movie.data.Data[0].Result[0].posters);
    // console.log(movie.data.Data[0].Result[0].vods.vod[1].vodUrl);
    movieTitle.textContent = movieShort.title;
    moviePoster.textContent = `<img src="${movieShort.posters}" alt="${movieShort.title}">`;
    moviePlot.textContent = `<p>${movieShort.plots.plot[0].plotText}</p>`
    for(i = 0; i < 5; i++){
      const actorText = document.createTextNode(movieShort.actors.actor[i].actorNm);
      actors.appendChild(actorLi);
      actorLi.appendChild(actorText);
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