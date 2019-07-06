function init(param_mode) {
    var main = document.getElementById("main");
    main.style.display = "block";
    var menu = document.getElementById("menu");
    menu.style.display = "none";

    var mode = param_mode;
    document.querySelector("h1").innerText += " tryb :" + param_mode + "s";
    var tab = ["img/1.png", "img/1.png", "img/2.png", "img/2.png", "img/3.png", "img/3.png", "img/4.png", "img/4.png", "img/5.png", "img/5.png", "img/6.png", "img/6.png", "img/7.png", "img/7.png", "img/8.png", "img/8.png"];

    var el = document.getElementsByTagName("img");

    var tab2 = [];

    for (var i = 0; i < 16; i++) { // mix images in table

        var rand_1 = Math.floor((Math.random() * (tab.length)))
        tab2.push(tab[rand_1]);
        tab.splice(rand_1, 1);

    }
    var tab3 = []; // table for 2 clicked elements
    var click = 0;
    var tab_0 = ["img/0.png"];
    var first_click = 0;
    var second_click = 0;
    var tab4 = []; // table for revealed elements
    var flag_1 = false;
    var f = function(x) {
        return function() {
            el[x].src = tab2[x]; // reverse image
            tab3.push(this)
            click++;

            if (flag_1 == false) { // starting timer
                f_time();
                flag_1 = true;
            }
            if (click == 1) {

                first_click = el[x];
                first_click.onclick = function() {
                        return false;
                    } // safeguard on clicking clicked before element
            }

            if (click == 2) {
                for (var i = 0; i < 16; i++) { // safeguard on clicking other elements

                    el[i].onclick = function() {
                        return false;
                    }
                }

                second_click = el[x];

                if (tab3.length == 2 && tab3[0].src == tab3[1].src && click == 2) { // the same cards

                    click = 0;

                    tab3.splice(0, 2);

                    tab4.push(first_click)
                    tab4.push(second_click)

                    setTimeout(function() {
                        for (var i = 0; i < 16; i++) {
                            el[i].onclick = f(i)

                        }
                        for (var i = 0; i < tab4.length; i++) { // safeguard on clicking revealed elements 
                            tab4[i].onclick = function() {
                                return false;
                            }

                        };
                    }, 600);
                };

                if (tab3[0] != tab3[1] && click == 2) { // wrong pair

                    click = 0;

                    setTimeout(function() {
                        tab3[0].src = tab_0[0];
                        tab3[1].src = tab_0[0];
                        tab3.splice(0, 2);

                        for (var i = 0; i < 16; i++) {
                            el[i].onclick = f(i)
                        }
                        for (var i = 0; i < tab4.length; i++) { // safeguard on clicking revealed elements
                            tab4[i].onclick = function() {
                                return false;
                            }
                        }
                    }, 600);
                }
            }
        }
    }
    for (var i = 0; i < 16; i++) {
        el[i].onclick = f(i)
    }

    function f_time() {

        var countDownDate = new Date().getTime() + (1000 * mode);
        var tczas = new Date().getTime();

        function zero(i) { // displaying "0" before
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function zeroms(i) {
            if (i < 100)
                i = "0" + i;
            if (i < 10)
                i = "0" + i;
            return i;
        }
        var timer_width = 100;
        var timer = setInterval(function() {
            var d = new Date(); // date

            var now = d.getTime();

            var distance = countDownDate - now;
            var min = zero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
            var sec = zero(Math.floor((distance % (1000 * 60)) / 1000));
            var msec = zeroms(Math.floor(distance % 1000))

            var timer_2 = document.getElementById("timer_div_2")

            timer_width -= (4 / (10 * mode));
            timer_2.style.width = timer_width + "%";
            if (timer_width < 0) {
                timer_width = 0;
            }
            var border = (distance / 1000);

            if (border < (mode / 5)) { // 20 % time left
                timer_2.style.backgroundColor = "red";
            }

            if (distance >= 0) {
                document.getElementById("timer").innerHTML = min + " : " + sec + " : " + msec;

            }
            if (distance < 0 && tab3.length != 2) { // Defeat 
                clearInterval(timer);
                document.getElementById("timer").innerHTML = "KONIEC";
                for (var i = 0; i < 16; i++) {
                    el[i].onclick = function() {
                        return false;
                    }
                }
                document.querySelector("h2").innerText += " PRZEGRANA "
                var reset = document.getElementById("reset");
                reset.style.opacity = 1;
            }
            if (tab4.length == 16) { // Win
                clearInterval(timer); // Stop timer
                var time_finish = new Date().getTime();
                var your_time = time_finish - tczas;
                var tmin = zero(Math.floor((your_time % (1000 * 60 * 60)) / (1000 * 60)));
                var tsec = zero(Math.floor((your_time % (1000 * 60)) / 1000));
                var tmsec = zeroms(Math.floor(your_time % 1000));
                document.querySelector("h2").innerText += "WYGRANA ! Twój czas : " + tmin + " : " + tsec + " : " + tmsec;
                var reset = document.getElementById("reset");
                reset.style.opacity = 1;
            }

        }, 1)
    }
}

function f_reset() {
    document.querySelector("h2").innerText = "";
    document.querySelector("h1").innerText = "MEMORY";
    var menu = document.getElementById("menu")
    menu.style.display = "block";
    var main = document.getElementById("main");
    main.style.display = "none";
    var reset = document.getElementById("reset");
    reset.style.opacity = 0;
    var timer_2 = document.getElementById("timer_div_2")
    timer_2.style.backgroundColor = "#4E79DB";
    timer_2.style.width = "100" + "%";
    document.getElementById("timer").innerHTML = "";
    var el = document.getElementsByTagName("img");
    for (var i = 0; i < 16; i++) {
        el[i].src = "img/0.png";
    }
}