window.addEventListener("load", function(){
	// intro
	const introTl=gsap.timeline({ paused: true });

	introTl.timeScale(6).play();

	if(window.matchMedia("(max-width: 969px)").matches){ // mobile
		introTl.to(".intro .title-t ", { y: 0, x: 0, duration: 4 })
		.to(".intro .title-p ", { y: 0, x: 0, duration: 4 }, 0)
		.to(".intro .hidden-t .basic ", { duration: 2 })
		.to(".intro .hidden-t .color ", { alpha: 1, duration: 4, delay: -1 })
		.to(".intro .hidden-t ", { alpha: 0,  duration: 4, delay: 4 })
		.to(".intro .hidden-t ", { width: "30px", duration: 5 })
		.to(".intro .txt-t ", { alpha: 1, duration: 4, delay: -6 })
		.to(".intro .txt-p ", { alpha: 1, duration: 4, delay: -6 })
		.to(".intro .title-t ", { duration: 4, marginRight: 0, delay: -5 })
		.to(".intro .title-p", { duration: 4, delay: -5 })
		.to(":lang(ko) .intro .title-m", { alpha: 1 , width: "270px", duration: 4, delay: 5 })
		.to(".intro", { top: "-100vh", duration: 5, delay: 8 });

		const tl1=gsap.timeline({
			scrollTrigger: {
				trigger: ".pin1",
				scrub: 1,
				pin: ".pin1",
				start: "top top",
			}
		});

		tl1.to(".sec2 .title-m", { color: "#fff", duration: 4 })
		.to(".sec2 .color", { alpha: 0, duration: 4, delay: -3 })
		.to(".sec2 .white", { alpha: 1, duration: 4, delay: -4 })
		.to(".sec2 .image", { alpha: 1, duration: 4, delay: -4 })
		.to(".sec2 .title1", { alpha: 0, duration: 2, delay: 1 })
		.to(".sec2 .title2", { alpha: 1, duration: 2, delay: 1 })
		.to(".sec2 .title2 p span", { y: 0, duration: 3, delay: 1 });

		const tl2=gsap.timeline({
			scrollTrigger: {
				trigger: ".pin2",
				scrub: 2,
				pin: ".pin2", 
				start:"top top"
			}
		});

		tl2.to(".sec3 .image", { width: "100%", height: "100%", borderRadius: 0, top: "50%", duration: 1, delay: 1 })
		tl2.to(".sec3 .circle img", { opacity: 0.5, duration: 2, delay: 1 }, 0)
		tl2.to(".sec3 .main-title", { top: "-100vh", duration: 0.5, delay: 1 }, 0)
		tl2.to(".sec3 .global-tit div:nth-child(1) span", { y: 0, duration: 1, delay: -1 })
		tl2.to(".sec3 .global-tit div:nth-child(2) span", { y: 0, duration: 1, delay: -0.8 });
	}
	else{ // desktop
		introTl.to(".intro .title-t", { y: 0, x: 0, duration: 4 })
		.to(".intro .title-p", { y: 0, x: 0, duration: 4 }, 0)
		.to(".intro .hidden-t .basic ", { duration: 2 })
		.to(".intro .hidden-t .color ", { alpha: 1, duration: 4, delay: -1 })
		.to(".intro .hidden-t ", { alpha: 0, duration: 4, delay: 4 })
		.to(".intro .hidden-t ", { width: "60px", duration: 5 })
		.to(".intro .txt-t", { alpha: 1, duration: 4, delay: -6 })
		.to(".intro .txt-p", { alpha: 1, duration: 4, delay: -6 })
		.to(".intro .title-t", { duration: 4, marginRight: 0, delay: -5 })
		.to(".intro .title-p", { duration: 4, delay: -5 })
		.to(".intro .title-m", { alpha: 1, width: "460px", duration: 4, delay: 5 })
		.to(".intro", { top: "-100vh", duration: 5, delay: 8 });

		const tl1=gsap.timeline({
			scrollTrigger: {
				trigger: ".pin1",
				scrub: 1,
				pin: ".pin1",
				start:"top top",
				end: "+=300%"
			}
		});

		tl1.to(".sec2 .title-m", { color: "#fff", duration: 4 })
		.to(".sec2 .color", { alpha: 0, duration: 4, delay: -3 })
		.to(".sec2 .white", { alpha: 1, duration: 4, delay: -4 })
		.to(".sec2 .image", { alpha:1, duration: 4, delay: -4 })
		.to(".sec2 .title1", { alpha: 0, duration: 2, delay: 1 })
		.to(".sec2 .title2", { alpha: 1 , duration: 2, delay: 1 })
		.to(".sec2 .title2 p span", { y: 0, duration: 3, delay: 1 });

		const tl2=gsap.timeline({
			scrollTrigger: {
				trigger: ".pin2",
				scrub: 2,
				pin: ".pin2", 
				start:"top top", 
				end: "+=200%"
			}
		});

		tl2.to(".sec3 .image", { width: "100%", height: "100%", borderRadius: 0, top: "50%", duration: 1, delay: 1 })
		.to(".sec3 .circle img", { opacity: 0.5,  duration: 2, delay: 1 }, 0)
		.to(".sec3 .main-title", { top: "-100vh", duration: 0.5, delay: 1 }, 0)
		.to(".sec3 .global-tit div:nth-child(1) span", { y: 0, duration: 1, delay: -1 })
		.to(".sec3 .global-tit div:nth-child(2) span", { y: 0, duration: 1, delay: -0.8 });
	}

	let skipBtn=document.querySelector(".skip-btn a");
	let intro=document.querySelector(".intro");

	skipBtn.addEventListener("click", function(e){
		e.preventDefault();

		gsap.to(".intro", {opacity: 0, duration: 1, onComplete: function(){
			intro.style.display="none";
			mainSwiper.autoplay.start();
		}});
	});

	// mainSwiper
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
				});
			},
			slideChangeTransitionStart: function(){
				naviControl.forEach(function(item, i){
					if(i == this.realIndex){
						item.classList.add("active");
					}
					else{
						item.classList.remove("active");
					}
				});
			}
		}
	});

	naviControl.forEach(function(item, i){
		item.addEventListener("click", function(){
			mainSwiper.slideToLoop(i);
		});
	});

	initHeader();
	initTopMove();
	initFamilySite();
});

function initHeader(){
	let header=document.querySelector("#header");
	let menuLi=header.querySelectorAll(".hd-menu .gnb > li");
	// let menuA=header.querySelectorAll(".hd-menu .gnb > li > a");
	let tab=document.querySelector(".hd-allmenu-open");
	let dimmed=document.querySelector(".hd-menu .hd-mak");

	let lastScrollTop=0;
	let device;

	window.addEventListener("load", onScroll);
	window.addEventListener("scroll", onScroll);

	function onScroll(){
		let tmp=window.scrollY;

		if(tmp > 0){
			header.classList.add("reverse");
		}
		else{
			header.classList.remove("reverse");
		}

		if(tmp > lastScrollTop && tmp > 0){
			header.classList.add("down");
			header.classList.remove("up");
		}
		else{
			header.classList.add("up");
			header.classList.remove("down");
		}

		lastScrollTop=tmp;
	}

	tab.addEventListener("click", function(e){
		e.preventDefault();

		if(header.classList.contains("menu-open") == false){
			header.classList.add("menu-open");

			menuLi.forEach(function(item){
				if(item.classList.contains("open") == true){
					item.classList.remove("open");
				}
			});
		}
		else{
			header.classList.remove("menu-open");
		}
	});

	dimmed.addEventListener("click", function(){
		header.classList.remove("menu-open");
	});

	menuLi.forEach(function(item, i){
		item.addEventListener("mouseenter", function(){
			if(device == "mobile") return;

			header.classList.add("on");

			for(let j=0; j<menuLi.length; j++){
				if(j == i){
					menuLi[j].classList.add("on");
				}
				else{
					menuLi[j].classList.remove("on");
				}
			}
		});
	});

	header.addEventListener("mouseleave", function(){
		if(device == "mobile") return;

		header.classList.remove("on");
	});

	menuLi.forEach(function(item, i){
		item.addEventListener("click", function(e){
			if(device == "desktop") return;

			e.preventDefault();

			if(e.currentTarget.classList.contains("open") == false){
				for(let j=0; j<menuLi.length; j++){
					if(j == i){
						menuLi[j].classList.add("open");
					}
					else{
						menuLi[j].classList.remove("open");
					}
				}
			}
			else{
				e.currentTarget.classList.remove("open");
			}
		});
	});

	function resizeFunction(){
		let winw=window.innerWidth;

		if(winw < 1281){ // mobile
			if(device == "mobile") return;
			device="mobile";
		}
		else{ // desktop
			if(device == "desktop") return;
			device="desktop";
		}
	}

	resizeFunction();

	window.addEventListener("resize", function(){
		if(header.classList.contains("menu-open")){
			header.classList.remove("menu-open");
		}

		resizeFunction();
	});
}

function initTopMove(){
	let btnTopMove=document.getElementById("btn-topmove");
	let button=btnTopMove.querySelector("button");

	btnTopMove.style.display="none";

	let topFlag=true;

	window.addEventListener("scroll", function(){
		if(window.scrollY < window.innerHeight/2){
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

/*
function initFamilySite(){ 
	$("#family-btn").click(function(e){
		e.stopPropagation();

		$(this).toggleClass("open");
		$(this).siblings().slideToggle(500);

		return false;
	});

	$(document).click(function(e){
		if(!$(e.target).closest("#family-btn").length){
			$("#family-btn").removeClass("open");
			$("#family-btn").siblings().slideUp(500);
		}
	});
}
*/

function initFamilySite(){
	const familyBtn=document.getElementById("family-btn");
	const familyPopup=familyBtn.nextElementSibling;

	familyBtn.addEventListener("click", function(e){
		e.preventDefault();

		if(familyBtn.classList.contains("open") == false){
			familyBtn.classList.add("open");
			familyPopup.style.display="block";
		}
		else{
			familyBtn.classList.remove("open");
			familyPopup.style.display="none";
		}
	});

	document.addEventListener("click", function(e){
		if(familyBtn.contains(e.target) == false){
			familyBtn.classList.remove("open");
			familyPopup.style.display="none";
		}
	});

	lenisAnimation();
}