$(function () {

  // $('#whitePianino').slick({
  //   slidesToShow: 3
  // });
  $(window).on('resize', function (e) {
    // Переменная, по которой узнаем запущен слайдер или нет.
    // Храним её в data
    var init = $(".card-box").data('init-slider');
    // Если мобильный
    if (window.innerWidth < 1080) {
      // Если слайдер не запущен
      if (init != 1) {
        // Запускаем слайдер и записываем в data init-slider = 1
        if ($('#saveSlider')) {
          if (!$('#saveSlider').hasClass('slick-initialized')) {
            $('#saveSlider').slick({
              arrows: false,
              prevArrow: '<button type="button" class="slide-prev sale__slider-prev">Previous</button>',
              nextArrow: '<button type="button" class="slide-next sale__slider-next">Next</button>',
              dots: true,
              infinite: false,
              slidesToShow: 1.5,
              responsive: [{
                breakpoint: 740,
                settings: {
                  slidesToShow: 1.5,
                  slidesToScroll: 1,
                },
                breakpoint: 500,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              }, ]
            }).data({
              'init-slider': 1
            });
          }
        }

        if ($('.control-slider')) {
          if (!$('.control-slider').hasClass('slick-initialized')) {
            $('.control-slider').slick({
              arrows: false,
              prevArrow: '<button type="button" class="slide-prev sale__slider-prev">Previous</button>',
              nextArrow: '<button type="button" class="slide-next sale__slider-next">Next</button>',
              dots: true,
              infinite: false,
              slidesToShow: 1
            }).data({
              'init-slider': 1
            });
          }
        }

        if ($('.rent-list__inner--slider')) {
          if (!$('.rent-list__inner--slider').hasClass('slick-initialized')) {
            $('.rent-list__inner--slider').slick({
              arrows: false,
              dots: false,
              infinite: false,
              slidesToShow: 2,
              responsive: [{
                breakpoint: 690,
                settings: {
                  slidesToShow: 1.2,
                  slidesToScroll: 1,
                }
              }, ]
            }).data({
              'init-slider': 1
            });
          }
        }

      }
    }
  }).trigger('resize');

  var formInput = $('.callback-input');
  var modalFormInput = $('.callback-form__input');

  //Валидатор форм и маска для форм
  if ($('.callback-form')) {
    const callbackForm = $('.callback-form')
    callbackForm.submit(function (e) {
      e.preventDefault()
    })

    callbackForm.validate({
      errorElement: "",
      errorPlacement: (error, element) =>
        error.appendTo(element.parent().parent()),
      rules: {
        tel: {
          maskRu: true
        }
      },
      messages: {
        name: "",
        tel: ""
      },
      submitHandler: function (form) {
        const formInstance = $(form)

        $.ajax({
          type: "POST",
          url: "mail.php",
          data: formInstance.serialize()
        }).done(function () {
          formInput.val("")
          closecallbackPopup()
          openSuccessModal()
        });
        return false;
      }
    });
  }

  if ($('.callback-form__modal')) {
    const callbackForm = $('.callback-form__modal')
    callbackForm.submit(function (e) {
      e.preventDefault()
    })

    callbackForm.validate({
      errorElement: "",
      errorPlacement: (error, element) =>
        error.appendTo(element.parent().parent()),
      rules: {
        tel: {
          maskRu: true
        }
      },
      messages: {
        name: "",
        tel: ""
      },
      submitHandler: function (form) {
        const formInstance = $(form)

        console.log('submit')
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: formInstance.serialize()
        }).done(function () {
          console.log('DONE')
          modalFormInput.val("");
          closecallbackPopup()
          openSuccessModal()
        });
        return false;
      }
    });
  }

  if ('.call__form') {
    const callForm = $('.call__form')
    callForm.submit(function (e) {
      e.preventDefault()
    })

    callForm.validate({
      errorElement: "",
      errorPlacement: (error, element) =>
        error.appendTo(element.parent().parent()),
      rules: {
        tel: {
          maskRu: true
        }
      },
      messages: {
        name: "",
        tel: ""
      },
      submitHandler: function (form) {
        const formInstance = $(form)

        console.log('submit')
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: formInstance.serialize()
        }).done(function () {
          console.log('DONE')
          formInput.val("");
          openSuccessModal()
        });
        return false;
      }
    });
  }

  if ($('.opinion-form__modal')) {
    const opinionForm = $('.opinion-form__modal')
    opinionForm.submit(function (e) {
      e.preventDefault()
    })

    opinionForm.validate({
      errorElement: "",
      errorPlacement: (error, element) =>
        error.appendTo(element.parent().parent()),
      rules: {
        tel: {
          maskRu: true
        }
      },
      messages: {
        name: "",
        tel: ""
      },
      submitHandler: function (form) {
        const formInstance = $(form)

        console.log('submit')
        $.ajax({
          type: "POST",
          url: "mail.php",
          data: formInstance.serialize()
        }).done(function () {
          console.log('DONE')
          modalFormInput.val("");
          closeOpinionModal()
          openSuccessModal()
        });
        return false;
      }
    });
  }

  jQuery.validator.addMethod('maskRu', function (value, element) {
    console.log(/\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value));
    return /\+\d{1}\(\d{3}\)\d{3}-\d{4}/g.test(value);
  });

  if ($('[name="tel"]')) {
    $('[name="tel"]').mask("+7(999)999-9999", {
    autoclear: false
  });
  }

  $(".header__menu").on("click", "a[href^='#']", function (event) {
    event.preventDefault();
    var id = $(this).attr('href'),
      top = $(id).offset().top;
    $('body,html').animate({
      scrollTop: top
    }, 1500);
  });



  //Вызов окна колбека

  if (document.querySelector('.openCallback')) {

    openCallback = document.querySelectorAll('.openCallback');
    callbackModal = document.querySelector('.modal-wrapper__callback');

    for (let i = 0; i < openCallback.length; i++) {
      openCallback[i].addEventListener('click', function () {
        openBaseModal();
        callbackModal.classList.remove('hidden');
        setTimeout(function () {
          callbackModal.classList.remove('animation');
        }, 20);
      })

      function closecallbackPopup() {
        if (!callbackModal.classList.contains('hidden')) {
          callbackModal.classList.add('animation');
          callbackModal.addEventListener('transitionend', function (e) {
            callbackModal.classList.add('hidden');
          }, {
            capture: false,
            once: true,
            passive: false
          });
        }
      };
    }
  }

  if (document.querySelector('.openOpinion')) {

    openOpinion = document.querySelectorAll('.openOpinion');
    opinionModal = document.querySelector('.modal-wrapper__opinion');

    for (let i = 0; i < openOpinion.length; i++) {
      openOpinion[i].addEventListener('click', function () {
        openBaseModal();
        opinionModal.classList.remove('hidden');
        setTimeout(function () {
          opinionModal.classList.remove('animation');
        }, 20);
      })

      function closeOpinionModal() {
        if (!opinionModal.classList.contains('hidden')) {
          opinionModal.classList.add('animation');
          opinionModal.addEventListener('transitionend', function (e) {
            opinionModal.classList.add('hidden');
          }, {
            capture: false,
            once: true,
            passive: false
          });
        }
      };
    }
  }


  //Вызов окна колбека
  openLeftMenu = document.querySelector('.openMenu');
  leftMenuModal = document.querySelector('.modal-wrapper__left-menu');

  openLeftMenu.addEventListener('click', function () {
    openBaseModal();
    leftMenuModal.classList.remove('hidden');
    setTimeout(function () {
      leftMenuModal.classList.remove('animation');
    }, 20);
  })

  function closeleftMenuModal() {
    if (!leftMenuModal.classList.contains('hidden')) {
      leftMenuModal.classList.add('animation');
      leftMenuModal.addEventListener('transitionend', function (e) {
        leftMenuModal.classList.add('hidden');
      }, {
        capture: false,
        once: true,
        passive: false
      });
    }

  };

  successModal = document.querySelector('.modal-wrapper__success');

  function openSuccessModal() {
    openBaseModal();
    successModal.classList.remove('hidden');
    setTimeout(function () {
      successModal.classList.remove('animation');
    }, 20);
  }

  function closeSuccessModal() {
    if (!successModal.classList.contains('hidden')) {
      successModal.classList.add('animation');
      successModal.addEventListener('transitionend', function (e) {
        successModal.classList.add('hidden');
      }, {
        capture: false,
        once: true,
        passive: false
      });
    }
  };


  function closeAllModal() {
    if (document.querySelector('.openCallback')) {
      closecallbackPopup();
    }
    closeleftMenuModal();
    if (document.querySelector('.openOpinion')) {
      closeOpinionModal();
    }
    closeSuccessModal();
    closeBaseModal();
  };

  //База модальных окон
  body = document.querySelector('body');
  modalWrapper = document.querySelector('.modal-wrapper');
  modalWrapperBg = document.querySelector('.modal-wrapper__bg');
  modalWrapperClose = document.querySelectorAll('.modal-wrapper__close');

  function openBaseModal() {
    body.classList.add('noflow');
    modalWrapper.classList.remove('hidden');
    setTimeout(function () {
      modalWrapper.classList.remove('animation');
    }, 20);
  };

  function closeBaseModal() {
    body.classList.remove('noflow');
    modalWrapper.classList.add('animation');
    modalWrapper.addEventListener('transitionend', function (e) {
      modalWrapper.classList.add('hidden');
    }, {
      capture: false,
      once: true,
      passive: false
    });
  };

  for (let i = 0; i < modalWrapperClose.length; i++) {
    modalWrapperClose[i].addEventListener('click', () => {
      closeAllModal();
    });
  }

  modalWrapperBg.addEventListener('click', function () {
    closeAllModal();
  })

  document.onkeydown = function (e) {
    e = e || window.event;
    if (e.key == 'Escape' || e.key == 'Esc' || e.keyCode == 27) {
      closeAllModal();
    }
  };

});

jQuery.fn.extend({
  onAppearanceAddClass: function (class_to_add) {
    var $window = $(window),
      window_height = $window.height(),
      array_of_$elements = [];
    this.each(function (i, el) {
      array_of_$elements.push($(el));
    })
    scrollHandler();
    if (array_of_$elements.length) {
      $window.on('resize', resizeHandler).on('resize', scrollHandler).on('scroll', scrollHandler);
    }

    function resizeHandler() {
      window_height = $window.height();
    }

    function watchProcessedElements(array_of_indexes) {
      var l, i;
      for (l = array_of_indexes.length, i = l - 1; i > -1; --i) {
        array_of_$elements.splice(array_of_indexes[i], 1);
      }
      if (!array_of_$elements.length) {
        $window.off('resize', resizeHandler).off('scroll', scrollHandler).off('resize', scrollHandler);
      }
    }

    function scrollHandler() {
      var i, l, processed = [];
      for (l = array_of_$elements.length, i = 0; i < l; ++i) {
        if ($window.scrollTop() + window_height > array_of_$elements[i].offset().top) {
          array_of_$elements[i].addClass(class_to_add);
          processed.push(i);
        }
      }
      if (processed.length) {
        watchProcessedElements(processed);
      }
    }
    return this;
  }
})
$('.animate').onAppearanceAddClass('animate-start');
$('.ques__text--legal').onAppearanceAddClass('animate-start');