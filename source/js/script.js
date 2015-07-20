/* ====================================
   Onload functions
   ==================================== */


var aeApp = aeApp || {};

    aeApp.resize = function() {
        aeApp.windowHeight      = $(window).height();
        aeApp.windowWidth       = $(window).width();
        aeApp.documentHeight    = $(document).height();
        aeApp.transitionBegin   = (aeApp.documentHeight - aeApp.windowHeight) - 100;

        $('.max-height').each(function() {
          $(this).css('height', aeApp.windowHeight);
        });

        $('.image-container').find('img').each(function() {
          var imageWidth = $(this).width();
          var imageHeight = $(this).height();

          $(this).css({
            "margin-top": -imageHeight / 2,
            "margin-left": -imageWidth / 2
          })
        });

    };


    aeApp.projectHover = function() {
        $('a.project-link').hover(function(){

            $(this).parents('article').addClass('activeHover');
            $(this).parent().siblings('.cover-img').velocity("stop").velocity({
                opacity: "1",
            }, {
                duration: 400,
                easing: "easeInOut",
                display: "block"
            });
        }, function(){
            $(this).parents('article').removeClass('activeHover');
            $(this).parent().siblings('.cover-img').velocity("stop").velocity({
                opacity: "0",
            }, {
                duration: 400,
                easing: "easeInOut",
                display: "none"
            });
        });



        $('a.project-link').mousemove(function(e) {
          var parentOffset = $(this).offset();
          var relX = (e.pageX - parentOffset.left) / 2;
          var relY = e.pageY - parentOffset.top;

          $(this).parent().siblings('.cover-img').css({
            left: relX,
            top: relY
          });
        });


    };

    aeApp.scroll = function() {
        $(document).on('scroll', function(){
            aeApp.scrollPosition    = $(window).scrollTop();
            aeApp.footerOpacity     = (aeApp.scrollPosition - aeApp.transitionBegin) / 200;
            if ( aeApp.scrollPosition > aeApp.transitionBegin ) {
                $('.footer-bg').css('opacity', aeApp.footerOpacity);
            } else {
              $('.footer-bg').css('opacity', 0);
            }
        });
    }

    aeApp.slider = function(){
      var slider = $('.slider');

      slider.on('init afterChange',  function(event, slick, currentSlide, nextSlide){
          var $status = $('.paging-info p');
          var i = (currentSlide ? currentSlide : 0) + 1;

          var active = $('.slick-active');
          var bgColor = '#' + active.data("color");

          $status.text(i + '/' + slick.slideCount);

          $('.slick-active').find('img').each(function() {
            var imageWidth = $(this).width();
            var imageHeight = $(this).height();
            $(this).css({
              "margin-top": -imageHeight / 2,
              "margin-left": -imageWidth / 2
            })
          });

          $('body').removeAttr('class');
          if (bgColor == '#000') {
            $('body').addClass('black-bg');
          } else {
            $('body').addClass('white-bg');
          }

          $('body').velocity("stop").velocity({
              backgroundColor: bgColor
          }, {
              duration: 1200,
              easing: "easeInOut"
          });
      });

      $( window ).load(function() {
        $('.slick-active').find('img').each(function() {
          var imageWidth = $(this).width();
          var imageHeight = $(this).height();
          $(this).css({
            "margin-top": -imageHeight / 2,
            "margin-left": -imageWidth / 2
          })
        });
      });

      slider.slick({
        dots: false,
        infinite: false,
        speed: 0,
        fade: true,
        slidesToShow: 1,
        dots: false
      });

    }

    aeApp.lightboxIn = function(link, closeLink, lightbox){
      link.click(function(e){
        e.preventDefault();
        lightbox.velocity("stop").velocity({
            opacity: "1",
            top: 0
        }, {
            duration: 400,
            easing: "easeInOut",
            display: "block"
        });
      });
      closeLink.click(function(e){
        e.preventDefault();
        lightbox.velocity("stop").velocity({
            opacity: "0",
            top: "24px"
        }, {
            duration: 400,
            easing: "easeInOut",
            display: "none"
        });
      });
    }





/* ====================================
   Onload functions
   ==================================== */

;(function($, window, document) {

  aeApp.lightboxIn($('.project-info-link a'), $('.close-info'), $('.project-info') );

  $( window ).resize(function() {
    aeApp.resize();
    aeApp.scroll();
  });

  enquire.register("(max-width: 767px) ", {
    match: function() {
      $('a.project-link').unbind(aeApp.projectHover());
      $('.cover-img').removeAttr("style")
    },
    unmatch: function() {
      aeApp.projectHover();
    }
  });

  enquire.register("(min-width: 768px) ", {
    match: function() {
      aeApp.projectHover();
    },
    unmatch: function() {
      $('a.project-link').unbind(aeApp.projectHover());
      $('.cover-img').removeAttr("style")
    }
  });


  aeApp.resize();

  aeApp.windowHeight    = $(window).height();
  aeApp.windowWidth     = $(window).width();
  aeApp.documentHeight    = $(document).height();
  aeApp.transitionBegin   = (aeApp.documentHeight - aeApp.windowHeight) - 100;

  aeApp.scroll();
  aeApp.slider();



} (window.jQuery, window, document));


// showGrid();

function showGrid() {
  $('[class*="container"]').each(function() {
    $(this).addClass("showgrid");
  });

  $('.row').each(function() {
    $(this).addClass("showgrid");
  });

  $('[class*="col-"]').each(function() {
    $(this).addClass("showgrid");
  });
}

function hideGrid() {
  $('.showgrid').each(function() {
    $(this).removeClass("showgrid");
  });
}


console.log('%c Austen Ezzell 2015', 'background: #fff; color: #01C5C6; font-size: 12px');






  // Include Polyfill to add pointer-events: non to browsers that don't support it.
  // PointerEventsPolyfill.initialize({});

  // STICKY HEADER

  // $('.article-header').waypoint(function(direction) {
  //   if(direction == 'down'){
  //     $('.article-title').addClass('stuck');
  //   } else {
  //     $('.article-title').removeClass('stuck');
  //   }
  // }, {
  //   offset: '-420px'
  // });





// aeApp.hoverArticleHeader = function() {

//   var hoverElement = $('.article-hover');

//   $('.nav-links a').hover(function(){
//     var href = $(this).attr('href');
//     $.ajax({
//       url:href,
//       type:'GET',
//       success: function(data){
//           hoverElement.attr('style', $(data).find('.article-header').attr('style') );
//       }
//     });
//     hoverElement.addClass('hover');
//   }, function(){
//       hoverElement.removeClass('hover');
//   });

//   $('.nav-links a').click(function(){
//     hoverElement.addClass('clicked')
//   });

// };





// aeApp.nextIssue = function() {

//   var nextIssueLink = $('.next-issue-link');
//   var href = nextIssueLink.attr('href');

//   $.ajax({
//     url:href,
//     type:'GET',
//     success: function(data){
//         $('.next-issue-img').attr('style', $(data).find('.article-header').attr('style') );
//     }
//   });

//   $('.next-issue-img').velocity({opacity: "0"});

//   nextIssueLink.hover(function(){

//     $('.next-issue-img').velocity("stop").velocity({
//         opacity: "1",
//     }, {
//         duration: 400,
//         easing: "easeInOut",
//         display: "block"
//     });
//   }, function(){
//     $('.next-issue-img').velocity("stop").velocity({
//         opacity: "0",
//     }, {
//         duration: 400,
//         easing: "easeInOut",
//         display: "none"
//     });
//   });

// }




// aeApp.readBar = function() {

//     aeApp.windowHeight    = $(window).height();
//     aeApp.windowWidth     = $(window).width();

//   // Reading Progress Indicator
//     var progressBarWidth  = aeApp.windowWidth-40;

//     var getMax = function(){
//       return $(document).height() - $(window).height() - $('.article-header').height();
//     }

//     var getValue = function(){
//       return $(window).scrollTop() - $('.article-header').height();
//     }

//     if ('max' in document.createElement('progress')) {
//       var progressBar = $('progress');

//       progressBar.attr({ max: getMax() }).css("width", progressBarWidth);

//       $(document).on('scroll', function(){
//         progressBar.attr({ value: getValue() });
//       });

//       $(window).resize(function(){
//         progressBar.attr({ max: getMax(), value: getValue() });
//       });

//     } else {

//       var progressBar = $('.progress-bar'),
//           max         = getMax(),
//           value,
//           width;

//       var getWidth = function() {
//         value = getValue();
//         width = (value/max) * 100;
//         width = width + '%';
//         return width;
//       }

//       var setWidth = function(){
//         progressBar.css({ width: getWidth() });
//       }

//       $(document).on('scroll', setWidth);
//       $(window).on('resize', function(){
//         max = getMax();
//         setWidth();
//       });
//     }

// }
