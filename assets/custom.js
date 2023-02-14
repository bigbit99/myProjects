//로딩
// const loaderWrap = document.querySelector('.loaderWrap');
// const html = document.querySelector('html');

// html.style.overflow = 'hidden';

// window.addEventListener('load', () => {
//   setTimeout(() => {
//     loaderWrap.style.opacity = '0';
//     html.style.overflow = 'auto';
      
//     setTimeout(() => {
//       loaderWrap.style.display = 'none';
//     }, 300);
//   }, 4000);
// })

// //로딩바
// function chargeLoading() {
//   let loadBar = document.querySelectorAll(".loadBar");

//   for (let i = 0; i < loadBar.length; i++) {
//     setTimeout(function() {
//       loadBar[i].style.display = 'block';
//     }, (i + 1) * 500)
//   }
//   for(let j = 0; j < loadBar.length; j++) {
//     loadBar[j].style.display = 'none';
//   }
// }
// chargeLoading()
// setInterval(chargeLoading, 5000)




// 시계
const clock = document.getElementById("clock");
function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    let msg = "";
    if(date.getHours()>12){
      msg += "pm";
    }else{
      msg += "am";
    }
    clock.innerText = `${msg} ${hours}:${minutes}`;
}
getClock();
setInterval(getClock, 1000);


//탭메뉴
const tabList = document.querySelectorAll('.modalTab .list li');
const contents = document.querySelectorAll('.modalTab .tabBox .tabCont');
let activeCont = '';

for(let i = 0; i < tabList.length; i++){
  tabList[i].querySelector('.tabBtn').addEventListener('click', function(e){
    e.preventDefault();
    for(let j = 0; j < tabList.length; j++){
      tabList[j].classList.remove('active');

      contents[j].style.display = 'none';
    }

    this.parentNode.classList.add('active');

    activeCont = this.getAttribute('href');
    document.querySelector(activeCont).style.display = 'block';
  });
}


// 모달창
let modals = document.getElementsByClassName("modal");
let btns = document.getElementsByClassName("openBtn");
let spanes = document.getElementsByClassName("closeBtn");
let slider = document.getElementsByClassName("single-item");
let funcs = [];
let index = 1;
function Modal(num) {
  return function() {
    btns[num].onclick =  function() {
        modals[num].style.display = "block";
        modals[num].style.zIndex = index;
        index++;
         $('.single-item').get(0).slick.setPosition()
        // console.log(num);
    };
    modals[num].onclick =  function() {
        modals[num].style.zIndex = index;
        index++;
    };
    spanes[num].onclick = function() {
        modals[num].style.display = "none";
    };
  };
} 

for(let i = 0; i < btns.length; i++) {
  funcs[i] = Modal(i);
}
for(let j = 0; j < btns.length; j++) {
  funcs[j]();
}


// // 버디버디 쪽지 알람(모달)
const open = () =>{
  document.querySelector(".buddyAlarm").classList.add('showBuddy');
}
setTimeout(function() {
  open();
}, 3000);

const buddyOpen = () => {
  document.querySelector(".modlaBuddy").classList.remove("hidden");
  document.querySelector(".buddyAlarm").classList.remove("showBuddy");
}

const buddyClose = (e) => {
  document.querySelector(".buddyBuddy").classList.add("hidden");
  e.preventDefault();
}

document.querySelector(".buddyAlarm").addEventListener("click", buddyOpen);
document.querySelector(".buddyClose").addEventListener("click", buddyClose);


//타이핑
const buddyText = "안녕하세요, 리액트 개발자를 꿈꾸는 \n김한빛입니다! \n저의 포트폴리오를 봐주셔서 감사해요\n*^___^*";
const buddyPtag = document.querySelector(".buddyPtag");
let i = 0; 

function typing() {
  let txt = buddyText.charAt(i);
  buddyPtag.innerHTML += txt==="\n" ?
"<br />" : txt;
  if(i < buddyText.length) {
    i++;
  }
}
setInterval(typing, 200);


// 버디버디 친구정보(모달)
// const aboutMeOpen = () => {
//   document.querySelector(".buddyAboutMe").classList.remove("hidden");
// }
// const aboutMeClose = (e) => {
//   document.querySelector(".buddyAboutMe").classList.add("hidden");
//   e.preventDefault();
// }
// document.querySelector(".aboutmeOpenBtn").addEventListener("click", aboutMeOpen);
// document.querySelector(".aboutmeCloseBtn").addEventListener("click", aboutMeClose);


//스티키 메모
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const stickyArea = document.querySelector(
    '#stickies-container'
  );

  const createStickyButton = document.querySelector(
    '#createsticky'
  );

  const stickyTitleInput = document.querySelector('#stickytitle');
  const stickyTextInput = document.querySelector('#stickytext');

  const deleteSticky = e => {
    e.target.parentNode.remove();
  };

  let isDragging = false;
  let dragTarget;

  let lastOffsetX = 0;
  let lastOffsetY = 0;

  function drag(e) {
    if (!isDragging) return;

    // console.log(lastOffsetX);

    dragTarget.style.left = e.clientX - lastOffsetX + 'px';
    dragTarget.style.top = e.clientY - lastOffsetY + 'px';
  }

  function createSticky() {
    const newSticky = document.createElement('div');
    const html = `<h3>${stickyTitleInput.value.replace(
      /<\/?[^>]+(>|$)/g,
      ''
    )}</h3><p>${stickyTextInput.value
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(
      /\r\n|\r|\n/g,
      '<br />'
    )}</p><span class="deletesticky">&times;</span>`;
    newSticky.classList.add('drag', 'sticky');
    newSticky.innerHTML = html;
    // newSticky.style.backgroundColor = randomColor();
    stickyArea.append(newSticky);
    positionSticky(newSticky);
    applyDeleteListener();
    clearStickyForm();
  }
  function clearStickyForm() {
    stickyTitleInput.value = '';
    stickyTextInput.value = '';
  }
  function positionSticky(sticky) {
    sticky.style.left =
      window.innerWidth / 2 -
      sticky.clientWidth / 2 +
      (-100 + Math.round(Math.random() * 50)) +
      'px';
    sticky.style.top =
      window.innerHeight / 2 -
      sticky.clientHeight / 2 +
      (-100 + Math.round(Math.random() * 50)) +
      'px';
  }

  function editSticky() {}

  function stripHtml(text) {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  }

  function randomColor() {
    const r = 200 + Math.floor(Math.random() * 56);
    const g = 200 + Math.floor(Math.random() * 56);
    const b = 200 + Math.floor(Math.random() * 56);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  function applyDeleteListener() {
    let deleteStickyButtons = document.querySelectorAll(
      '.deletesticky'
    );
    deleteStickyButtons.forEach(dsb => {
      dsb.removeEventListener('click', deleteSticky, false);
      dsb.addEventListener('click', deleteSticky);
    });
  }

  window.addEventListener('mousedown', e => {
    if (!e.target.classList.contains('drag')) {
      return;
    }
    dragTarget = e.target;
    dragTarget.parentNode.append(dragTarget);
    lastOffsetX = e.offsetX;
    lastOffsetY = e.offsetY;
    // console.log(lastOffsetX, lastOffsetY);
    isDragging = true;
  });
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', () => (isDragging = false));
  
  createStickyButton.addEventListener('click', createSticky);
  applyDeleteListener();
});