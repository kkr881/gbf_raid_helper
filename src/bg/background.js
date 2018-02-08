"use strict";

var isApiLoaded = false;
var apiHost = null;
var pendingRequests = {};
var nextRequestId = 1;
var enemyCount = 0;

var raidInit = false;
var raidInfoWindow = null;
var popupPosition = 'right';
var popupEnable = true;
var viramateId = 'fgpokpknehglcioijejfeebigdnbnokj'
var apiCallCount = 1000;

var apiUrl = 'chrome-extension://' + viramateId + '/content/api.html';

function initSetting() {
    chrome.storage.local.get(null, result => {
        //스토리지 초기화 안된 상태
        if (typeof result['initalized'] === 'undefined') {
            var setting = {
                'initalized': true,
                'popupPosition': 'right',
                'popupEnable': true,
                'viramateId': 'fgpokpknehglcioijejfeebigdnbnokj',
                'apiCallCount': 1000
            };
            chrome.storage.local.set(setting, () => {
                console.log('Setting Initalized.');
            });
        } else {
            result['popupPosition'] = popupPosition;
            result['popupEnable'] = popupEnable;
            result['viramateId'] = viramateId;
            result['apiCallCount'] = apiCallCount;
        }
        onLoad();
    });
}

function onLoad() {
    window.addEventListener("message", onMessage, false);
    tryLoadApi();
    // API 주기
    // Viramate example 기준 1초(단위 ms)
    var apiTimer = new timer();
    apiTimer.start(tryRefreshCombatState, apiCallCount, false);
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
            if (!raidInit && popupEnable) {
                enemyCount = combatState.enemies.length;
                chrome.windows.getCurrent(function (win) {
                    var left = popupPosition == 'left' ? win.left + win.width : win.left - WindowSize[enemyCount].width;

                    chrome.windows.create({
                        url: chrome.runtime.getURL("src/raid_info.html"),
                        width: WindowSize[enemyCount].width,
                        height: WindowSize.height,
                        //top: Math.round(top),
                        left: Math.round(left),
                        type: 'panel'
                    }, function (window) {
                        raidInfoWindow = window;
                    });
                });
                raidInit = true;
                chrome.windows.onRemoved.addListener(function (windowId) {
                    if (raidInfoWindow == null || raidInfoWindow.id == windowId) {
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

window.addEventListener("DOMContentLoaded", initSetting, false);

// focus 기능
chrome.browserAction.onClicked.addListener(function (tab) {
    if (raidInfoWindow != null) {
        chrome.windows.update(raidInfoWindow.id, { focused: true });
    }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
    let optionKeys = Object.keys(changes);
    for (let key of optionKeys) {
        switch (key) {
            case 'popupPosition':
                popupPosition = changes[key].newValue;
                if (raidInfoWindow != null) {
                    chrome.windows.getCurrent(function (win) {
                        var left = popupPosition == 'left' ? win.left + win.width : win.left - WindowSize[enemyCount].width;
                        chrome.windows.update(raidInfoWindow.id, { left: Math.round(left) });
                    });
                }
                break;
            case 'popupEnable':
                popupEnable = changes[key].newValue;
                if (!popupEnable &&raidInfoWindow != null) {
                    chrome.windows.remove(raidInfoWindow.id);
                    raidInit = false;
                    raidInfoWindow = null;
                }
                break;
        }
    }
});