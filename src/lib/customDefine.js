"use strict";

// 배열간 비교 prototype 선언
var equalsArray = function (array1, array2) {
    // if the other array is a falsy value, return
    if (!array1)
        return false;

    // compare lengths - can save a lot of time 
    if (array1.length != array2.length)
        return false;

    for (var i = 0, l = array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!array1[i].equals(array2[i]))
                return false;
        }
        else if (array1[i] != array2[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}

// JSON의 \n을 html 의 <br>태그로 전환
var replaceNewLine = function (str, type) {
    if (type == 'html') {
        return str.replace(/\n/g, '<br>');
    } else if (type == 'json') {
        return str.replace(/<br>/g, '\n');
    }
}

// dynamic timer
function timer() {
    var timer = {
        running: false,
        iv: 5000,
        timeout: false,
        cb: function () { },
        start: function (cb, iv, sd) {
            var elm = this;
            clearInterval(this.timeout);
            this.running = true;
            if (cb) this.cb = cb;
            if (iv) this.iv = iv;
            if (sd) elm.execute(elm);
            this.timeout = setTimeout(function () { elm.execute(elm) }, this.iv);
        },
        execute: function (e) {
            if (!e.running) return false;
            e.cb();
            e.start();
        },
        stop: function () {
            this.running = false;
        },
        set_interval: function (iv) {
            clearInterval(this.timeout);
            this.start(false, iv);
        }
    };
    return timer;
}

// text를 file로 저장
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}