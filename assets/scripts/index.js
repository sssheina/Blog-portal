// -------------- BUTTON UP ------------------

const btnUp = {
    el: document.querySelector(".btn-up"),
    scrolling: false,
    show() {
      if (
        this.el.classList.contains("btn-up_hide") &&
        !this.el.classList.contains("btn-up_hiding")
      ) {
        this.el.classList.remove("btn-up_hide");
        this.el.classList.add("btn-up_hiding");
        window.setTimeout(() => {
          this.el.classList.remove("btn-up_hiding");
        }, 300);
      }
    },
    hide() {
      if (
        !this.el.classList.contains("btn-up_hide") &&
        !this.el.classList.contains("btn-up_hiding")
      ) {
        this.el.classList.add("btn-up_hiding");
        window.setTimeout(() => {
          this.el.classList.add("btn-up_hide");
          this.el.classList.remove("btn-up_hiding");
        }, 300);
      }
    },
    addEventListener() {
     
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (this.scrolling && scrollY > 0) {
          return;
        }
        this.scrolling = false;
        
        if (scrollY > 400) {
          this.show(); 
        } else {
          this.hide(); 
        }
      });
    
      document.querySelector(".btn-up").onclick = () => {
        this.scrolling = true;
        this.hide();
       
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      };
    },
  };
  
  btnUp.addEventListener();
  
  
  const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  
  if (isMobile.any()) {
    document.body.classList.add("_touch");
  
    let menuArrows = document.querySelectorAll(".menu__arrow");
    if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
        const menuArrow = menuArrows[index];
        menuArrow.addEventListener("click", function (e) {
          menuArrow.parentElement.classList.toggle("_active");
        });
      }
    }
  } else {
    document.body.classList.add("_pc");
  }
  
// -------------- BURGER MENU --------------

  const iconMenu = document.querySelector(".menu__icon");
  const menuBody = document.querySelector(".menu__body");
  if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
      document.body.classList.toggle("_lock");
      iconMenu.classList.toggle("_active");
      menuBody.classList.toggle("_active");
    });
  }
  

//------------------LOGIN MODAL WINDOW---------


function toggleSignup(){
  document.getElementById("form__login-toggle").style.backgroundColor="#fff";
   document.getElementById("form__login-toggle").style.color="#222";
   document.getElementById("form__signup-toggle").style.backgroundColor="#65E4A3";
   document.getElementById("form__signup-toggle").style.color="#fff";
   document.getElementById("form__login-form").style.display="none";
   document.getElementById("form__signup-form").style.display="block";
}

function toggleLogin(){
   document.getElementById("form__login-toggle").style.backgroundColor="#65E4A3";
   document.getElementById("form__login-toggle").style.color="#fff";
   document.getElementById("form__signup-toggle").style.backgroundColor="#fff";
   document.getElementById("form__signup-toggle").style.color="#222";
   document.getElementById("form__signup-form").style.display="none";
   document.getElementById("form__login-form").style.display="block";
}

const modalBtns = document.querySelectorAll('._modal-open');
const modals = document.querySelectorAll('._modal');

const body = document.body;

function openModal(elem) {
	elem.classList.add('_active');
	body.classList.add('_locked')
}

function closeModal(e) {
	if (e.target.classList.contains('form__modal-close') || e.target.closest('.form__modal-close') || e.target.classList.contains('form__modal-bg')) {
		e.target.closest('._modal').classList.remove('_active');
		body.classList.remove('_locked')
	}
}

modalBtns.forEach(btn => {
	btn.addEventListener('click', (e) => {
		let data = e.target.dataset.modalOpen;

		modals.forEach(modal => {
			if (modal.dataset.modal == data || modal.dataset.modal == e.target.closest('._modal-open').dataset.modalOpen) {
				openModal(modal)
			}
		})
	})
})

modals.forEach(modal => {
	modal.addEventListener('click', e => closeModal(e))
})

window.addEventListener('keydown', e => {
	modals.forEach(modal => {
		if (e.key === "Escape" && modal.classList.contains('_active')) {
			modal.classList.remove('_active');
			body.classList.remove('_locked');
		}
	})
})

//------------------ MODAL WINDOW ---------

!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function() {

   /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');


   /* Перебираем массив кнопок */
   modalButtons.forEach(function(item){

      /* Назначаем каждой кнопке обработчик клика */
      item.addEventListener('click', function(e) {

         /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
         e.preventDefault();

         /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
         var modalId = this.getAttribute('data-modal'),
             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');


         /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
         modalElem.classList.add('active');
         overlay.classList.add('active');
      }); // end click

   }); // end foreach


   closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });

   }); // end foreach


    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        if (key == 27) {

            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);


    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });




}); // end ready