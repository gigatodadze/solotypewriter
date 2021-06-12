// import 'Gen' from  "sentence-generator";

// const jsdom = require('jsdom')

// const dom = new jsdom.JSDOM("")

// const jquery = require('jquery')(dom.window)

// const sentenceGenerator = require("sentence-generator");


// const gen = sentenceGenerator('src/content.txt');

// const a = gen.take(3);
// return;


var count = 10;
var zero;
var user_seconds;
var isPaused = false;
var isStopped = false;
var digit_first, digit_second;

var pauseButton = "off";




function start() {
    timerInit();
}

function counterReset() {
    if (user_seconds == null || user_seconds == "") {
        count = 10;
        // დიფოლტ ტექსტის ზომა
    } else {
        count = user_seconds;
        //აქ ვწერთ რამდენჯერაც ბევრწამიანია დიდი ტექსტი
    }
}

function seperateDigits() {

    //add a zero if below 10
    if (count < 10) {
        count = "0" + count;
    } else {
        count = "" + count;
    }

    //split the 2 digits up into seperate strings
    digit_first = count.slice(0,1);
    digit_second = count.slice(1,2);
}

 function buttonStart() {
   
    if($("#button_start").hasClass("active")) {
        if(isPaused == false) {
            counterReset();
        } else {
            isPaused = false;
        }

        if (isStopped == true) {
            isStopped = false;
        } else {
         }

        $("#button_pause").addClass("active");

        // console.log(count);
        
        $.ajax({
            url: 'http://metaphorpsum.com/paragraphs/'+ Math.ceil(count/10),
            type: "GET",
            success: function(data){
                $('#text-to-write').append(data);
            },
            error: function(data){
             alert("error!");
            }
           });

           var i = 0;

           $( document ).ready(function() {    
           $("#place-to-write").keypress(function(){
            var x = $('#text-to-write').text().trim(); 
            var y = $('#place-to-write').text();
                debugger;
                 if (x[i-1] == " "){
                    //
                }
                else if( y[i-1] !=x[i-1] ){
                    $("#place-to-write").css({ background: "red" });
                    console.log('i match')
                    console.log(x[i-1]);
                    console.log(y[i-1]);
                }
                else {
                    console.log('i donttt')
                    console.log(y[i-1]);
                    $("#place-to-write").css({ background: "#006400	" });
                }
            i++;
          });
          $('#place-to-write').keyup(function(e){
            console.log(e.which);  
            if(e.keyCode == 8) {
                console.log('delete here')
                console.log(x[i-1]);
                console.log(y[i-1]);
               i--;
            }
            if(e.keyCode == 32) {
                console.log('space')
                console.log(x[i-1]);
                console.log(y[i-1]);
               i--;
            }
        });
        });
           

        $("#button_start").animate({opacity: ".5"}, 600);
        $("#button_pause").animate({opacity: "1"}, 600);
        $("#button_stop").animate({opacity: "1"}, 600);
        $("#button_stop").addClass("active");
        $("#button_start").removeClass("active");
        $("#options_set").removeClass("active");
        $("#options_set").animate({opacity: ".5"}, 600);
        start();
    } else {
     }
}


function buttonPause() {
    if($("#button_pause").hasClass("active")) {
        isPaused = true;
        $("#button_pause").css("opacity", ".5");
        $("#button_start").animate({opacity: "1"}, 600);
        setTimeout('$("#button_start").addClass("active")', 600);
    }	
}


function buttonStop() {
    if($("#button_stop").hasClass("active")) {
        isStopped = true;
        counterReset();
        $("#button_pause").animate({opacity: ".5"}, 600);
        $("#button_start").animate({opacity: "1"}, 600);
        $("#button_stop").animate({opacity: ".5"}, 600);
        setTimeout('$("#button_start").addClass("active")', 600);
        $("#button_stop").removeClass("active");
        $("#options_set").addClass("active");
        $("#options_set").animate({opacity: "1"}, 600);


        counterReset();
        seperateDigits();
        
        document.getElementById("countdown-left").innerHTML=digit_first;
        document.getElementById("countdown-right").innerHTML=digit_second;
    }
}

function randomNumber(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}




function counter() {

    if(isPaused == false) {

    seperateDigits();

     document.getElementById("countdown-left").innerHTML=digit_first;
    document.getElementById("countdown-right").innerHTML=digit_second;

     if (count == '00') {
        
        $("#button_start").animate({opacity: "1"}, 600);
        $("#button_start").addClass("active");

        $("#button_pause").removeClass("active");
        $("#button_pause").animate({opacity: ".5"}, 600);

        $("#button_stop").removeClass("active");
        $("#button_stop").animate({opacity: ".5"}, 600);

        $("#options_set").addClass("active");
        $("#options_set").animate({opacity: "1"}, 600);

        isPaused = false;

    }


    
    if (count != 0 && isStopped == false) {
        setTimeout("counter()", 1000)
    } else {
    }

    count = count - 1;

   }

}



function timerInit() {
    counter();
}


 $("#button_start").click(function() {
    buttonStart();
});

 $("#button_pause").click(function() {
    buttonPause();
});

 $("#button_stop").click(function() {
    buttonStop();
});

function checkOptions(form) {
            if($("#options_set").hasClass("active")) {

                   user_seconds = options_form.elements["user_seconds"].value;

                    if (user_seconds != "") {
                       count = options_form.elements["user_seconds"].value;
                       $("#options_inner_cont").animate({height:0},400).addClass('hide');
                       $("#checkmark_cont").animate({opacity:1}, 800, function() {
                               $("#checkmark_cont").delay(500).animate({opacity:0}, 800);
                   });
                      } else {
                   }
        }
    }

        $("#button_toggleOptions").click(function(){
            if($("#options_inner_cont").hasClass('hide')) {
                  $("#options_inner_cont").animate({height:120},400).removeClass('hide');
              } else { 
                    $("#options_inner_cont").animate({height:0},400).addClass('hide');
              }
            });