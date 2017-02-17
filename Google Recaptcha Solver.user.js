// ==UserScript==
// @name         Google Recaptcha Solver
// @namespace    Google Recaptcha Solver
// @version      1.0.0
// @description  Userscript for automatically solving Google Recaptcha
// @author       Royalgamer06 & Tackyou & DarKWinGTM
// @match        https://www.google.com/recaptcha/api2/*
// @grant        GM_xmlhttpRequest
// @connect      127.0.0.1
// ==/UserScript==

if (location.href.indexOf('frame') > -1) {
    console.log('[RC] FRAME FOUND');
    var dlLink = null;
    setTimeout(function() {
        console.log('[RC] SELECTING AUDIO PUZZLE');
        document.getElementById("recaptcha-audio-button").click();
    }, Math.random() * 2222 + 1337);
    var audio = setInterval(function() {
        if (document.querySelector('.rc-audiochallenge-download-link') !== null) {
            console.log('[RC] AUDIO FOUND');
            clearInterval(audio);
            setInterval(function() {
                var newLink = document.querySelector('.rc-audiochallenge-download-link').href;
                if (newLink.length > 0 && newLink != dlLink) {
                    dlLink = newLink;
                    var host = window.location.host.replace("http://www.","").replace("www.","");
                    host = host.substr(0, host.lastIndexOf("."));
                    var url = 'http://127.0.0.1:5000/captcha?web=' + host + '&url=' + dlLink;
                    console.log('[RC] SENDING AUDIO');
                    console.log('[RC] REQUEST URL: ' + url);
                    GM_xmlhttpRequest({
                        method: "GET",
                        url: url,
                        timeout: 120000,
                        onload: function(reponse) {
                            console.log('[RC] REQUEST SUCCESFUL');
                            var result = reponse.responseText.toLowerCase().trim().replace("to", "two").replace("tree", "three");
                            if (result !== null) {
                                console.log('[RC] SOLUTION: ' + result);
                                if (/^([0-9]| |one|two|three|four|five|six|seven|eight|nine|zero)+$/.test(result)) {
                                    console.log('[RC] CONFIDENT ENOUGH');
                                    document.getElementById('audio-response').value = result;
                                    setTimeout(function() {
                                        console.log('[RC] VERIFYING SOLUTION');
                                        document.getElementById('recaptcha-verify-button').click();
                                    }, Math.random() * 2222 + 1337);
                                } else {
                                    console.log('[RC] NOT CONFIDENT ENOUGH');
                                    retry();
                                }
                            } else {
                                retry();
                            }
                        },
                        onerror: function() {
                            console.log('[RC] REQUEST UNSUCCESFUL');
                            retry();
                        },
                        ontimeout: function() {
                            console.log('[RC] REQUEST TIMED OUT');
                            retry();
                        }
                    });
                }
            }, 5 * 1337);
        }
    }, 1337);
}

function retry() {
    setTimeout(function() {
        if (document.getElementById("recaptcha-reload-button")) {
            console.log('[RC] RETRYING');
            document.getElementById("recaptcha-reload-button").click();
        }
    }, Math.random() * 2222 + 3 * 1337);
}