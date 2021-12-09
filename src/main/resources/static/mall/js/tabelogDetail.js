/* ---------------------------------- Main Photo ---------------------------------- */
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
	showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
	showSlides(slideIndex = n);
}

function showSlides(n) {
	
	var i;
	var slides = document.getElementsByClassName("photo-slide");
	var dots = document.getElementsByClassName("demo");
	
	if (n > slides.length) {
		slideIndex = 1
	}
	
	if (n < 1) {
		slideIndex = slides.length
	}
	
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}

/* ---------------------------------- Kodawari Modal ---------------------------------- */
const openBtn1 = document.getElementById('top-kodawari-item_1');
const openBtn2 = document.getElementById('top-kodawari-item_2');
const openBtn3 = document.getElementById('top-kodawari-item_3');
const openBtn4 = document.getElementById('top-kodawari-item_4');
const modal1 = document.getElementById('kodawariModalContainer_1');
const modal2 = document.getElementById('kodawariModalContainer_2');
const modal3 = document.getElementById('kodawariModalContainer_3');
const modal4 = document.getElementById('kodawariModalContainer_4');
const closeBtn1 = document.getElementById('closeKodawariModal_1');
const closeBtn2 = document.getElementById('closeKodawariModal_2');
const closeBtn3 = document.getElementById('closeKodawariModal_3');
const closeBtn4 = document.getElementById('closeKodawariModal_4');

openBtn1.addEventListener('click', openModal1);
function openModal1() {
	modal1.style.display = 'block';
}

openBtn2.addEventListener('click', openModal2);
function openModal2() {
	modal2.style.display = 'block';
}

openBtn3.addEventListener('click', openModal3);
function openModal3() {
	modal3.style.display = 'block';
}

openBtn4.addEventListener('click', openModal4);
function openModal4() {
	modal4.style.display = 'block';
}

closeBtn1.addEventListener('click', closeModal1);
function closeModal1() {
	modal1.style.display = 'none';
}

closeBtn2.addEventListener('click', closeModal2);
function closeModal2() {
	modal2.style.display = 'none';
}

closeBtn3.addEventListener('click', closeModal3);
function closeModal3() {
	modal3.style.display = 'none';
}

closeBtn4.addEventListener('click', closeModal4);
function closeModal4() {
	modal4.style.display = 'none';
}

addEventListener('click', outsideClose);
function outsideClose(e) {
	if (e.target == modal1) {
		modal1.style.display = 'none';
	};
	if (e.target == modal2) {
		modal2.style.display = 'none';
	};
	if (e.target == modal3) {
		modal3.style.display = 'none';
	};
	if (e.target == modal4) {
		modal4.style.display = 'none';
	};
};

// Next/previous controls
var modalIndex = 1;
function nextModal(n) {
	showModal(modalIndex += n);
}

function showModal(n) {
	
	var i;
	var modals = document.getElementsByClassName("kodawari-modal-container");
	
	if (n > modals.length) {
		modalIndex = 1
	}
	
	if (n < 1) {
		modalIndex = modals.length
	}
	
	for (i = 0; i < modals.length; i++) {
		modals[i].style.display = "none";
	}
	
	modals[modalIndex - 1].style.display = "block";
}

/* ---------------------------------- Booking Internet ---------------------------------- */
/* Calendar * start */
var app = {
  settings: {
    container: $('.calendar'),
    calendar: $('.front'),
    days: $('.weeks span'),
    form: $('.back'),
    input: $('.back input'),
    buttons: $('.back button')
  },

  init: function() {
    instance = this;
    settings = this.settings;
    this.bindUIActions();
  },

  swap: function(currentSide, desiredSide) {
    settings.container.toggleClass('flip');

    currentSide.fadeOut(900);
    currentSide.hide();
    desiredSide.show();

  },

  bindUIActions: function() {
    settings.days.on('click', function(){
      instance.swap(settings.calendar, settings.form);
      settings.input.focus();
    });

    settings.buttons.on('click', function(){
      instance.swap(settings.form, settings.calendar);
    });
  }
}

app.init();
/* Calendar * end */

/* ---------------------------------- Menu Photo Paging ---------------------------------- */
$(function() {

	var currentPage = 1;

	$("#menuPhotoNextBtn").click(function() {
		menuPhotoPage(1);
	});

	$("#menuPhotoPrevBtn").click(function() {
		menuPhotoPage(-1);
	});

	function menuPhotoPage(_this) {

		var url = '/menuPhoto';
		var page = parseInt($("#menu-photo-page-hidden").val());
		var totalPage = parseInt($("#menu-photo-totalPage-hidden").val());
		
		var data = {
			"restaurantId": 10001,
			"limit": 2,
			"page": page,
		}

		$.ajax({
			type: 'POST',
			url: url,
			contentType: 'application/json',
			data: JSON.stringify(data),
			success: function(resp) {
				if (resp.resultCode == 200) {
					var el;
					if (resp.data.list.length > 0) {
						$(".menu-photo").find(".menu-photo-list").remove();
					}
					for (let i = 0; i < resp.data.list.length; i++) {
						el = $(".menu-photo-list-hidden").clone().removeClass("menu-photo-list-hidden");
						el.find(".menu-photo-list-img").html(resp.data.list[i].photoUrl);
						el.find(".menu-photo-list-info-date").html(resp.data.list[i].photoPostDate);
						el.find(".menu-photo-list-info-like").html(resp.data.list[i].photoId);
						el.find(".menu-photo-list-reviewer-name").html(resp.data.list[i].postUserName);
						$(".menu-photo-page-move").before(el);
					}
				} else {
					swal(resp.message, {
						icon: "error",
					})
				}
			},
			error: function() {
				swal(resp.message, {
					icon: "error",
				})
			}
		});
	}
});	
	

//var pageIndex = 1;
//showPages(pageIndex);
//
//// Next/previous controls
//function plusPages(n) {
//	showPages(pageIndex += n);
//}
//
//// Thumbnail image controls
//function currentPage(n) {
//	showPages(pageIndex = n);
//}
//
//function showPages(n) {
//	
//	var i;
//	var pages = document.getElementsByClassName("menu-photo-list");
//	console.log(pages);
//	
//	if (n > pages.length) {
//		pageIndex = 1
//	}
//	
//	if (n < 1) {
//		pageIndex = pages.length
//	}
//	
//	for (i = 0; i < pages.length; i++) {
//		pages[i].style.display = "none";
//	}
//	
//	pages[pageIndex - 1].style.display = "block";
//}
