"use strict";

// 배열간 비교 prototype 선언
var equalsArray = function (array1, array2) {
    // if the other array is a falsy value, return
    if (!array1)
        return false;

    // compare lengths - can save a lot of time 
    if (array1.length != array2.length)
        return false;

    for (var i = 0, l=array1.length; i < l; i++) {
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
var replaceNewLine = function(str, type) {
    if(type == 'html') {
        return str.replace(/\n/g, '<br>');
    } else if(type == 'json') {
        return str.replace(/<br>/g, '\n');
    }
}