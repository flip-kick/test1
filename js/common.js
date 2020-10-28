$(document).ready(function(){


  $('.burger').on('click', function() {
      $('.b-menu').slideToggle(function(){
          if( $(this).css('display') === "none"){
              $(this).removeAttr();
          }
      });
      $('.b-menu_link').on('click', function() {
        $('.b-menu').slideUp(600);
      });
    });

  $('.list_link, .b-menu_link, .footer_menu_link').on('click', function(event){
      event.preventDefault();

      let href = $(this).attr('href');

      let offset = $(href).offset().top;

      $('body,html').animate({
        scrollTop: offset,
      }, 700);
  });

  $('.slider').slick({
	infinite: true,
	slidesToShow: 3,
	slidesToScroll: 3,
	prevArrow: '<button type="button" class="slick-prev"><img src="img/arrow.png" alt=""></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="img/arrow-next.png" alt=""></button>',
  	responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: false,
        nextArrow: false,
        dots: true,
      }
    },
    {
      breakpoint: 321,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: false,
        nextArrow: false,
        dots: true,
      }
    },
    ]
  });

  $(window).scroll(function() {
      if ($(this).scrollTop() > 1000) {
        $('.animate-br').addClass('brackets-w');
      } else {
        $('.animate-br').removeClass('brackets-w');
      }
    });

  $(window).scroll(function() {
      if ($(this).scrollTop() > 1000) {
        $('.animate-dv').addClass('division-w');
      } else {
        $('.animate-dv').removeClass('division-w');
      }
    });

  $(window).scroll(function() {
      if ($(this).scrollTop() > 1000) {
        $('.animate-sh').addClass('sharp-w');
      } else {
        $('.animate-sh').removeClass('sharp-w');
      }
    });

  $(window).scroll(function() {
      if ($(this).scrollTop() > 1000) {
        $('.animate-sl').addClass('slash-w');
      } else {
        $('.animate-sl').removeClass('slash-w');
      }
    });

  $(window).scroll(function() {
      if ($(this).scrollTop() > 1000) {
        $('.animate-bb').addClass('brackets-big-w');
      } else {
        $('.animate-bb').removeClass('brackets-big-w');
      }
    });

  $('.btn, .btn_phone').click(function(){
      $('.popup_container').fadeIn(700);
      $('.tel').mask('+7 (999) 999-99-99');
    });

  $('.popup_container').click(function(event){
    if(event.target == this) {
      $(this).fadeOut(500);
    }
  });

  $('.title_btn').click(function(){
      $('.popup_container_price').fadeIn(700);
      $('.tel').mask('+7 (999) 999-99-99');
    });

  $('.popup_container_price').click(function(event){
    if(event.target == this) {
        $(this).fadeOut(500);
    }
  });

//Валидация и отправка формы

  $(document).ready(function() {
      $('[data-submit]').on('click', function(e) {
          e.preventDefault();
          $(this).parent('.popup_bell').submit();
      })
      $.validator.addMethod(
          "regex",
          function(value, element, regexp) {
              var re = new RegExp(regexp);
              return this.optional(element) || re.test(value);
          },
          "Please check your input."
      );

// Функция валидации и вывода сообщений
      function valEl(el) {

          el.validate({
              rules: {
                  tel: {
                      required: true,
                      regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                  },
                  name: {
                      required: true
                  },
                  email: {
                      required: true,
                      email: true
                  }
              },
              messages: {
                  tel: {
                      required: 'Поле обязательно для заполнения',
                      regex: 'Телефон может содержать символы + - ()'
                  },
                  name: {
                      required: 'Поле обязательно для заполнения',
                  },
                  email: {
                      required: 'Поле обязательно для заполнения',
                      email: 'Неверный формат E-mail'
                  }
              },


// Начинаем проверку id="" формы
              submitHandler: function(form) {
                  $('#loader').fadeIn();
                  var $form = $(form);
                  var $formId = $(form).attr('id');
                  switch ($formId) {
                      // Если у формы id="goToNewPage" - делаем:
                      case 'goToNewPage':
                          $.ajax({
                                  type: 'POST',
                                  url: $form.attr('action'),
                                  data: $form.serialize(),
                              })
                              .always(function(response) {
                                  //ссылка на страницу "спасибо" - редирект
                                  location.href = 'thx.html';
                                  setTimeout(function(){
                                      var url = "http://flip-kick.ru/";
                                      $(location.href).attr(url);
                                  }, 3000);
                              });
                          break;
                      // Если у формы id="popupResult" - делаем:
                      case 'popupResult':
                          $.ajax({
                                  type: 'POST',
                                  url: $form.attr('action'),
                                  data: $form.serialize(),
                              })
                              .always(function(response) {
                                  setTimeout(function(){
                                      $('.popup_container').hide();
                                  });
                                  setTimeout(function() {
                                      $('#loader').fadeOut();
                                  }, 800);
                                  setTimeout(function() {
                                      $('#overlay').fadeIn();
                                  setTimeout(function(){
                                      $('#overlay').fadeOut();
                                  }, 3000);
                                      $form.trigger('reset');
                                      //строки для остлеживания целей в Я.Метрике и Google Analytics
                                  }, 1100);
                                  $('#overlay').on('click', function(e) {
                                      $(this).fadeOut();
                                  });
                              });
                          break;
                  }
                  return false;
              }
          })
      }

// Запускаем механизм валидации форм, если у них есть класс .js-form
      $('.popup_bell').each(function() {
          valEl($(this));
      });
      
  });


  $(window).scroll(function() {
 
    if($(this).scrollTop() != 0) {
     
    $('#toTop').fadeIn();
     
    } else {
     
    $('#toTop').fadeOut();
    }
    });
     
    $('#toTop').click(function() {
     
    $('body,html').animate({scrollTop:0},800);
     
  });
});