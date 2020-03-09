$(document).ready(function(){

  $('ul li').has('ul').on('click', function() {
    $(this).find('ul').slideToggle(500);
  })

  $('.panel').each(function() {

    var panelNo = $(this).attr('id');
    var panelNo = panelNo.match(/\d+/);
    $(this).prepend('<span class="number">' + panelNo + '</span>');
  });

  $('#html-link a, #css-link a, #javascript-link a').append(' >>');

  $('#save-name').on('click', function() {
    var name = $('#name').val();
    $(this).attr('disabled', 'disabled');

    if (typeof(Storage) !== "undefined") {
      sessionStorage.setItem('name', name);
    } else {
      alert('change to google chrome');
    }
  });

  if(sessionStorage.getItem('name')) {

    var savedName = sessionStorage.getItem('name');
    $('#welcome-back').html('<p>Programmer/Web developer: ' + savedName + '</p>');
    $('.name-save').hide();
  }

  var score = 0;

  $('.button').on('click', function() {

    $('.score').show();
    /* question six code */
    if($(this).attr('id') == 'q6') {
      var q6ImageVal = $('#q6-image-input').val();
      var img = $('.q6-image').html(q6ImageVal);
      var image = img.find('img');

      if(q6ImageVal.indexOf('beard') >= 0) {
        $(this).nextAll('.output-2').html('<p>Did you change the image though??</p>')
      };

      image.on('error', function() {
        $(this).attr('alt', 'Your code may be valid. However, the image is not displaying as the filename is probably incorrect.');
      });
    } //if attr id

    if($(this).prevAll('input').val() != '') {

      var answer = $(this).prevAll('input').val();
      var answer = $.trim(answer);
      var qId = $(this).attr('id');
      var regexAnswer = answers[qId].regex;
      var isItRight = regexAnswer.test(answer);

      if(isItRight === true) {
        /* prevent further clicks */
        $(this).attr('disabled', 'disabled');

        $(this).prevAll('.number').addClass('completed');

        $(this)
          .nextAll('.output')
          .html('<p class="correct">Your code is correct</p>');

        score++;
        $('#score').text(score);

        $(this)
          .parent()
          .addClass('correctly-answered')
          .removeClass('incorrectly-answered');

         /* question eight code */
        if($(this).attr('id') == 'q8') {
          $(this).nextAll('.box').addClass('active');
        }
        /* question nine code */
        if($(this).attr('id') == 'q9') {
           $(this).nextAll('.box').addClass('my-box').html('<p>You have given me the class of "my-box" and so I have inherited these silly css style rules from <code>.my-box {}</code></p>');
        }

        /*q14*/
        var colorCounter = 0;
        var clicks = 0;
        $('.my-click-box').on('click', function() {
          clicks++;
          $(this).animate({
            width: '+=50px'
          }, 1000)
          .html('<p>You have clicked ' + clicks + ' times</p>');

          var colors = ['red','blue', 'green'];
          $(this).css({
            backgroundColor: colors[colorCounter]
          })
          colorCounter++;
          if(colorCounter == colors.length) {
            colorCounter = 0;
          }
        });

        /*q16*/
        if( $(this).attr('id') == 'q16') {

          for(var i=0;i<=1000;i++) {
              $('#q16').nextAll('.output').append('<span class="thousand">' + i + '</span>');
            }


            function myFunction() {
              for(var i=0;i<=1000;i++) {
                console.log(i);
              }
            }
            console.log(myFunction());
          } /*q16*/

      } else { // if is true else if is false

        $(this)
          .nextAll('.output')
          .html('<p class="incorrect">Your code is not correct. Try again</p>');

          $(this).prevAll('.number').addClass('incorrectly-completed');

          $('#score')
            .text(score);

          $(this)
            .parent()
            .addClass('incorrectly-answered');

          $(this)
            .prevAll('input')
            .select();

           /* question eight code */
          if($(this).attr('id') == 'q8') {
            $(this).nextAll('.box').removeClass('active');
          }
        } // else if false //
      } else { // else if input val == ''
        $(this)
          .nextAll('.output')
          .html('<p class="incorrect">Have you tried to type anything??</p>');
      } // input val
    });// on click function


  $('.help-me').on('click', function() {
    if($(this).prevAll('input').val() != '') {
      $(this).nextAll('.help').slideToggle();
    } else {
      $(this).nextAll('.output').html('<p class="incorrect">Have you tried to type anything?? Have a go first.</p>');
    }
  });

  var questions = $('.panel').length;
  $('#score-length').text(questions);

  /* exercise seven */
  var q6ImageVal = $('#q6-image-input').val();
  $('.q6-image').html(q6ImageVal);

  $('#q6-help').on('click', function() {
    console.log('click');
    $('#q6-image-input').select();
  });

  $('.panel').on('mouseover', function() {
    $(this).addClass('grow');
    $('.panel').not($(this)).removeClass('grow');
  });

  /* q10 */
  $('#q10').on('click', function() {
    if($(this).is(':checked')) {
      score++;
      $('#score')
          .text(score);
      $(this).attr('disabled', 'disabled')
            .closest('.panel')
            .addClass('correctly-answered')
            .removeClass('incorrectly-answered');
    }
  });

  function smoothScroll() {
   $('a[href*="#"]:not([href="#"])' ).click(function() {
     if(location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
       var target = $(this.hash);
       target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
       if(target.length) {
         $('html, body').animate({
           scrollTop: target.offset().top
         }, 1200);
         return false;
       }
     }
   });
  } // smoothScroll

  smoothScroll();



});// ready

var answers = {
    q1: {
      regex: /<html>.*<\/html>/
    },
    q2: {
      regex: /<body>.*<\/body>/
    },
    q3: {
      regex: /<h1>.+<\/h1>/
    },
    q4: {
      regex: /<style>.*<\/style>/
    },
    q5: {
      regex: /<div\s+id=["']my-div["']>\s*<\/div>/
    },
    q6: {
      regex: /<img\s*src=["']\.\.\/\.\.\/images\/[\w\-]+\.png['"]>/
    },
    q7: {
      regex: /p\s*{\s*color:\s*green\s*;\s*}/i
    },
    q8: {
      regex: /div:hover\s*{\s*background-color\s*:\s*blue;\s*}/i,
      addclass: 'active'
    },
    q9: {
      regex: /<div\s+class="my-box"\s*>\s*<\/div>/i
    },
    q11: {
      regex: /<script>\s*<\/script>/i
    },
    q12: {
      regex: /var\s*\w+\s+=\s*['A-Za-z0-9 !_+#" ]*;?/i
    },
    q13: {
      regex: /var\s*\w+\s+=\s\[\s*['"]\w+["']\s*,\s*["']\w*['"]\s*,\s*["']\w*['"]\s*];?/i
    },
    q14: {
      regex: /myBox\.addEventListener\('click'\);?/
    },
    q15: {
      regex: /function\s+\w+\(\)\s+{}/i
    },
    q16: {
      regex: /for \(var i = 0; i <= 100[01]; i\+\+\) { console.log\(i\);/
    },
    q17: {
      regex: /^\b(?:false|0|undefined|NaN|null)\b/
    },
    q18: {
      regex: /[$\w'"_]+\s*==\s*[$\w'"_]+\s*[$\w'"]*/i
    },
    q19: {
      regex: /if\s*\(\s*[$\w'"_]+\s*==\s*[$\w'"_]+\s*[$\w'"]*\s*\)\s*{[\w\/\s]+}/i
    }
};
