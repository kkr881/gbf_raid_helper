"use strict";

var viramateId = 'fgpokpknehglcioijejfeebigdnbnokj'
var apiUrl = 'chrome-extension://' + viramateId + '/content/api.html';

var isApiLoaded = false;
var apiHost = null;
var pendingRequests = {};
var nextRequestId = 1;
var enemyStateList = [];
var apiCallCount = 1000;

var raidInit = false;
var raidInfoWindow = null;

function onLoad() {
    window.addEventListener("message", onMessage, false);
    tryLoadApi();
    // API 주기
    // Viramate example 기준 1초(단위 ms)
    window.setInterval(tryRefreshCombatState, apiCallCount);
};

function tryLoadApi() {
    console.log("Loading Viramate API");
    apiHost = document.querySelector("iframe#api_host");

    apiHost.addEventListener("load", onApiLoaded, false);
    apiHost.src = apiUrl;
};

function onApiLoaded() {
    console.log("Viramate API loaded");
    isApiLoaded = true;
};

function onMessage(evt) {
    if (evt.data.type !== "result")
        return;

    if (evt.data.result && evt.data.result.error) {
        console.log("Request failed", evt.data.result.error);
        return;
    }

    var callback = pendingRequests[evt.data.id];
    if (!callback)
        return;

    callback(evt.data.result);
};

function sendApiRequest(request, callback) {
    if (!isApiLoaded) {
        console.log("Viramate API not loaded");
        callback({ error: "api not loaded" });
        return;
    }

    var id = nextRequestId++;
    request.id = id;
    pendingRequests[id] = callback;

    apiHost.contentWindow.postMessage(
        request, "*"
    );
};

function tryRefreshCombatState() {
    sendApiRequest({ type: "getCombatState" }, function (combatState) {
        if (combatState != null && combatState.enemies != null) {
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
                chrome.windows.onRemoved.addListener(function (windowId) {
                    if (raidInfoWindow.id == windowId) {
                        raidInit = false;
                        raidInfoWindow = null;
                    }
                });
            } else {
                // browserAction 버튼 재클릭 시 focus
                // 주기별로 계속 반복되는 오류로 주석처리
                //chrome.windows.update(raidInfoWindow.id, { focused: true });
            }
        } else {
            if (raidInfoWindow != null) {
                chrome.windows.remove(raidInfoWindow.id);
                raidInit = false;
                raidInfoWindow = null;
            }
        }
    });
};

window.addEventListener("DOMContentLoaded", onLoad, false);

// focus 기능
chrome.browserAction.onClicked.addListener(function (tab) {
    if (raidInfoWindow != null) {
        chrome.windows.update(raidInfoWindow.id, { focused: true });
    }
});