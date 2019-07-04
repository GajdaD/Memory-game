function init(tryb) {
    var main = document.getElementById("main"); // wyswietlenie maina
    main.style.display = "block";
    var menu = document.getElementById("menu") // ukrycie menu
    menu.style.display = "none";

    var tryb_1 = tryb;
    document.querySelector("h1").innerText += " tryb :" + tryb + "s"; // wypisanie trybu gry
    var tab = ["img/1.png", "img/1.png", "img/2.png", "img/2.png", "img/3.png", "img/3.png", "img/4.png", "img/4.png", "img/5.png", "img/5.png", "img/6.png", "img/6.png", "img/7.png", "img/7.png", "img/8.png", "img/8.png"]; // pierwsza tablica z wszystkimi obrazkami

    var el = document.getElementsByTagName("img");

    var tab2 = [] // tablica w ktorej bede pomieszane obrazki

    for (var i = 0; i < 16; i++) { // petla ktora miesza

        var a = Math.floor((Math.random() * (tab.length)))
        tab2.push(tab[a]);
        tab.splice(a, 1);

    }
    var tab3 = []; // tablica do ktorej wpisujemy dwa wybrane elementy
    var klik = 0; // zmienna na klik 
    var tab0 = ["img/0.png"]; // tablica, w ktorej jest tylko "odwrocony" obrazek 
    var jeden = 0;
    var dwa = 0;
    var tab4 = []; // tablica w ktorej wpisujemy odgadniete pary
    var flaga = false;
    var f = function(x) {
        return function() {
            el[x].src = tab2[x]; // odkrycie obrazka
            tab3.push(this) // wrzucenie do tablicy
            klik++; // zwiekszenie klika 

            if (flaga == false) { // sluzy do startu czasu razem z pierwszym klikiem
                czas();
                flaga = true;
            }
            if (klik == 1) { // jesli jest to pierwszy klikniety obrazek


                jeden = el[x];
                jeden.onclick = function() {
                        return false;
                    } // zabezpieczenie przed kliknieciem 2 razy w ten sam
            }

            if (klik == 2) { // drugi klik
                for (var i = 0; i < 16; i++) { // zabezpieczenie zeby nie mozna byla klikac innych obrazkow

                    el[i].onclick = function() {
                        return false;
                    }
                }

                dwa = el[x];

                //    setTimeout(function () { // 600ms oczekiwania 

                if (tab3.length == 2 && tab3[0].src == tab3[1].src && klik == 2) { //dobra para

                    klik = 0; // powrót z klikiem do wartości 0

                    tab3.splice(0, 2); // wyczyszczenie tablicy 

                    tab4.push(jeden) // wrzucenie do tablicy odkrytych
                    tab4.push(dwa) // to samo 

                    setTimeout(function() {
                        for (var i = 0; i < 16; i++) {
                            el[i].onclick = f(i) // zastosowanie funkcji na klik od wszystkich

                        }
                        for (var i = 0; i < tab4.length; i++) { // zabezpieczenie przed klikaniem w odkryte juz pary
                            tab4[i].onclick = function() {
                                return false;
                            }

                        } //////////////////////////// 
                    }, 600);
                } ////////////////////////////

                if (tab3[0] != tab3[1] && klik == 2) { //zla para

                    klik = 0; // wyzerowanie klika 

                    setTimeout(function() {
                        tab3[0].src = tab0[0]; // zakrycie obrazka
                        tab3[1].src = tab0[0]; // też 
                        tab3.splice(0, 2); // wyczyszczenie tablicy 

                        for (var i = 0; i < 16; i++) {
                            el[i].onclick = f(i) // funkcja do klikania do wszystkich 

                        }
                        for (var i = 0; i < tab4.length; i++) { // zabezpieczenie przed klikaniem w odkryte juz pary
                            tab4[i].onclick = function() {
                                return false;
                            }

                        } //////////////////////////// 
                    }, 600);
                } ////

                //        }, 600);
                //////
            }

        }

    }
    for (var i = 0; i < 16; i++) { // zastosowanie funkcji do wszystkich obrazków
        el[i].onclick = f(i)

    }

    function czas() {

        //////
        var countDownDate = new Date().getTime() + (1000 * tryb_1); // liczenie ile czasu ma byc
        var tczas = new Date().getTime();

        function zero(i) { // funkcja na wyswitlanie 0 przed
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function zeroms(i) { // ta sama tylko dla milisekund
            if (i < 100)
                i = "0" + i;
            if (i < 10)
                i = "0" + i;
            return i;
        }
        var szer = 100; //szerokosc paska 
        var timer = setInterval(function() {
                var d = new Date(); // data

                var now = d.getTime(); // teraz 

                var distance = countDownDate - now; //roznica pomiedzy teraz a tym ile chcemy
                var min = zero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))); // obliczanie ile jest min 
                var sec = zero(Math.floor((distance % (1000 * 60)) / 1000)); // to samo dla sekund
                var msec = zeroms(Math.floor(distance % 1000)) // dla ms

                var timer_2 = document.getElementById("timer_div_2")

                szer -= (4 / (10 * tryb_1)); // zmniejszamy o tyle procent 
                timer_2.style.width = szer + "%";
                if (szer < 0) {
                    szer = 0;
                }
                var granica = (distance / 1000) // zamienia na sekundy 

                if (granica < (tryb_1 / 5)) { // 20 % pozsotalego czasu
                    timer_2.style.backgroundColor = "red";
                }

                if (distance >= 0) {
                    document.getElementById("timer").innerHTML = min + " : " + sec + " : " + msec; // wyswietlanie czasu

                }
                if (distance < 0 && tab3.length != 2) { // jesli sie skonczy odliczanie ///////// PRZEGRANA 
                    clearInterval(timer);
                    document.getElementById("timer").innerHTML = "KONIEC"; // napis na zegarze koniec
                    for (var i = 0; i < 16; i++) { // zabezpieczenie zeby nie mozna byla klikac innych obrazkow
                        el[i].onclick = function() {
                            return false;
                        }
                    }

                    document.querySelector("h2").innerText += " PRZEGRANA "
                    var reset = document.getElementById("reset"); // wyswietlenie przycisku reset
                    reset.style.opacity = 1;
                }
                if (tab4.length == 16) { ////// WYGRANA ///////////////////////
                    clearInterval(timer); // zatrzymanie zegara 
                    var tczaskoniec = new Date().getTime(); // czas na koniec
                    var twojczas = tczaskoniec - tczas // twoj czas
                    var tmin = zero(Math.floor((twojczas % (1000 * 60 * 60)) / (1000 * 60))); // obliczanie ile jest min 
                    var tsec = zero(Math.floor((twojczas % (1000 * 60)) / 1000)); // to samo dla sekund
                    var tmsec = zeroms(Math.floor(twojczas % 1000)) // dla ms
                    document.querySelector("h2").innerText += "WYGRANA ! Twój czas : " + tmin + " : " + tsec + " : " + tmsec; // wyswietlenie wygrana i czasu
                    var reset = document.getElementById("reset"); // wyswietlenie przycisku reset
                    reset.style.opacity = 1;
                }

            }, 1)
            /////////////////////////////////////////////////////////////
    }

} //koniec init
function f_reset() {
    document.querySelector("h2").innerText = ""; //wyczyszczenie napisu
    document.querySelector("h1").innerText = "MEMORY"; // wrocenie do samego napisu memory
    var menu = document.getElementById("menu")
    menu.style.display = "block"; // pokazanie menu z wyborem trybu
    var main = document.getElementById("main");
    main.style.display = "none"; // ukrycie maina 
    var reset = document.getElementById("reset");
    reset.style.opacity = 0; // ukrycie przycisku reset
    var timer_2 = document.getElementById("timer_div_2")
    timer_2.style.backgroundColor = "#4E79DB"; // zmiana koloru na standartowy czarny
    timer_2.style.width = "100" + "%"; // ustawianie paska timera na cala szerokosc
    document.getElementById("timer").innerHTML = ""; // wyczyszczenie napisu z timera
    var el = document.getElementsByTagName("img");
    for (var i = 0; i < 16; i++) { // zakrycie wszystkich obrazkow
        el[i].src = "img/0.png";
    }
}