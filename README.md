# ⚙ GSAP와 Lenis를 활용한 웹 인터랙션 및 애니메이션 구현 프로젝트

<image width= "100%" src="mdimg/main.png"></image>
GSAP를 활용하여 페이지 로드 시의 동적인 인트로 애니메이션과 다양한 UI 요소의 세밀한 움직임을 구현한 프로젝트입니다.<br>
또한 Lenis를 통합하여 전반적인 스크롤 경험을 부드럽게 최적화하고 사용자 인터랙션의 질을 향상시킵니다.

<br>
<br>

## 📌 주요기능
- 애니메이션 컨트롤(GSAP를 통해 복잡한 시퀀스 및 요소들을 정밀하게 제어)
- 최적화된 스크롤 (Lenis 라이브러리로 부드러운 스크롤링 구현) 
- 반응형 동적 UI
- 탭 메뉴 (HTML/CSS 기반)
- 맨 위로 가기 버튼

<br>

## 🛠 사용 기술
| 기술 | 설명 |
| --- | --- |
| ![HTML](https://img.shields.io/badge/-HTML-F05032?style=flat-square&logo=html5&logoColor=ffffff) | HTML5 마크업 구조 |
| ![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-square&logo=css3&logoColor=white) | CSS3 반응형 스타일 처리 |
| ![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-square&logo=javascript&logoColor=white) | JavaScript DOM 제어, jQuery 및 Owl Carousel 연동 |
| ![gsap](https://img.shields.io/badge/GSAP-88CE02?style=for-the-square&logo=greensock&logoColor=white) | GSAP 고급 스크롤 애니메이션
[![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=for-the-square&logo=swiper&logoColor=white)](https://swiperjs.com/) |  슬라이더 라이브러리
| ![lenis](https://img.shields.io/badge/Lenis-FF6F00?/style=for-the-square&color=white) | 전반적인 스크롤 동작을 개선

<br>
<br>

## 🧩 기능 상세 설명

### ✅ 반응형 메뉴 구현
- 햄버거 버튼 클릭 시 전체 화면을 덮는 내비게이션 메뉴 토글, 메뉴 활성화 시 스크롤을 방지하여 사용자 경험을 개선
- 969px 이하 뷰포트에서 메인 내비게이션 항목 클릭 시, GSAP 애니메이션을 통해 서브 메뉴의 height 및 opacity 속성을 동적으로 조절, 아코디언 형태의 확장/축소 인터랙션을 제공

```js
function initMenu(){
	const gnb=document.getElementById("gnb");
	const header=document.getElementById("header");

	const btnMenu=document.getElementById("btn-menu");

	btnMenu.addEventListener("click", function(){
		this.classList.toggle("open");
		gnb.classList.toggle("open");

		if(gnb.classList.contains("open")){
			document.body.style.overflow="hidden";
		}
		else{
			document.body.style.overflow="auto";
		}
	});

	let prevScrollpos=window.pageYOffset;
	window.onscroll=function(){
		let currentScrollPos=window.pageYOffset;
		if(prevScrollpos > 0){
			if(prevScrollpos > currentScrollPos){
				header.classList.remove("fixed");
			}
			else{
				header.classList.add("fixed");
			}
		}
		
		prevScrollpos=currentScrollPos;
	}

	const gnbLi=document.querySelectorAll("#gnb > ul > li");

	gnbLi.forEach(function(el){
		const gnbLink=el.querySelector("a");
		const depthUl=el.querySelector(".depth");

		if(depthUl){

			if(!window.matchMedia("(max-width: 969px)").matches){
				let depthTl=gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: "power2.out" } });
				depthTl.fromTo(depthUl, { opacity: 0, y: -20, display: "none" }, { opacity: 1, y: 0, display: "block" });

				el.addEventListener("mouseenter", function(){
					depthTl.play();
				});

				el.addEventListener("mouseleave", function(){
					depthTl.reverse();
				});
			}

			else {
				gnbLink.addEventListener("click", function(e){
					e.preventDefault(); 
					
					const currentDepthUl = this.nextElementSibling;
					if (currentDepthUl) {
						if (currentDepthUl.classList.contains("open")) {
							gsap.to(currentDepthUl, { height: 0, opacity: 0, duration: 0.3, onComplete: () => {
								currentDepthUl.classList.remove("open");
								currentDepthUl.style.display = "none";
								currentDepthUl.style.height = "auto"; 
							}});
						} else {
							currentDepthUl.style.display = "block"; 
							const height = currentDepthUl.scrollHeight; 
							gsap.fromTo(currentDepthUl, { height: 0, opacity: 0 }, { height: height, opacity: 1, duration: 0.3, onComplete: () => {
								currentDepthUl.classList.add("open");
								currentDepthUl.style.height = "auto"; 
							}});
						}
					}
				});
			}
		}
	});
}
```
<div class="image" display="flex" gap="15px" >
<image width= "50%" src="mdimg/tab.png"></image>
<image width= "50%" src="mdimg/mobile1.png"></image>
<image width= "50%" src="mdimg/mobile2.png"></image>
<image width= "50%" src="mdimg/mobile3.png"></image>
</div>

<br>

### ✅ 메인 Swiper
-  Swiper 라이브러리를 사용하여 동적 메인 비주얼 슬라이더를 구현
-  1초 속도의 페이드 효과로 전환되며, 무한 루프를 통해 끊김 없는 시각적 흐름을 제공
```js
let naviControl=document.querySelectorAll(".swiper-navi .swiper-pagination-switch");

const mainSwiper=new Swiper(".main-swiper", {
  speed: 1000,
  loop: true,
  effect: "fade",
  /*
  autoplay: {
    delay: 3000
  },
  */
  pagination: {
    el: ".swiper-navi .swiper-pagination",
    type: "progressbar"
  },
  on: {
    init: function(){
      naviControl.forEach(function(item, i){
        if(i == this.realIndex){
          item.classList.add("active");
        }
        else{
          item.classList.remove("active");
        }
      }.bind(this));
    },
    slideChangeTransitionStart: function(){
      naviControl.forEach(function(item, i){
        if(i == this.realIndex){
          item.classList.add("active");
        }
        else{
          item.classList.remove("active");
        }
      }.bind(this));
    }
  }
});
```

<image width= "100%" src="mdimg/slider.png"></image>

<br>

### ✅ Top 버튼
- 클릭 시 GSAP를 활용하여 페이지 최상단으로 부드럽게 스크롤
- 스크롤 위치에 따라 버튼이 자동으로 나타나고 사라지도록 구현
```js
function initTopMove(){
	const btnTopMove=document.getElementById("btn-topmove");
	const button=btnTopMove.querySelector("button");

	let topFlag=false;

	window.addEventListener("scroll", function(){
		if(window.scrollY > 0){
			if(topFlag == true) return;

			topFlag=true;

			gsap.to(btnTopMove, { opacity: 0, duration: 0.3, onComplete: function(){
				btnTopMove.style.display="none";
			}});
		}
		else{
			if(topFlag == false) return;

			topFlag=false;

			gsap.fromTo(btnTopMove, { display: "block", opacity: 0 }, { opacity: 1, duration: 0.3 });
		}
	});

	button.addEventListener("click", function(){
		gsap.to(window, {scrollTo: 0, duration: 0.3});
	});
}
```
<image width= "100%" src="mdimg/top.png"></image>









