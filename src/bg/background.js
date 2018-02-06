"use strict";

var raidInit = false;
var raidInfoWindow = null;

chrome.browserAction.onClicked.addListener(function(tab) {
    if (!raidInit) {
        chrome.windows.getCurrent(function (win) {
            var width = 440;
            var height = 600;
            var left = win.left + win.width;

            chrome.windows.create({
                url: chrome.runtime.getURL("src/window/raid_info.html"),
                width: width,
                height: height,
                //top: Math.round(top),
                left: Math.round(left),
                type: 'panel'
            }, function (window) {
                raidInfoWindow = window;
            });
        });
        raidInit = true;
        chrome.windows.onRemoved.addListener(function(windowId) {
            if(raidInfoWindow.id == windowId) {
                raidInit = false;
            }
        });
    } else {
        // browserAction 버튼 재클릭 시 focus
        chrome.windows.update(raidInfoWindow.id, {focused : true});
    }
});