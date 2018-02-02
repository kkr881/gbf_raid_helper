var apiUrl = "chrome-extension://fgpokpknehglcioijejfeebigdnbnokj/content/api.html";

// Use this url when connecting to the API from a website.
// var apiUrl = "chrome-extension://fgpokpknehglcioijejfeebigdnbnokj/content/api.html";

var isApiLoaded = false;
var apiHost = null;
var pendingRequests = {};
var nextRequestId = 1;
var raidInfoWindow = null;
var raidInit = false;
var extensionId = chrome.runtime.id;

function onLoad() {
    window.addEventListener("message", onMessage, false);
    tryLoadApi();
    //window.setInterval(tryRefreshCombatState, 1000);
};

function tryLoadApi() {
    console.log("Loading API");
    apiHost = document.querySelector("iframe#api_host");

    apiHost.addEventListener("load", onApiLoaded, false);
    apiHost.src = apiUrl;
};

function onApiLoaded() {
    console.log("API loaded");
    isApiLoaded = true;
};

function onMessage(evt) {
    if (evt.data.type !== "result")
        return;

    if (evt.data.result && evt.data.result.error) {
        console.log("Request failed", evt.data.result.error);
        return;
    } else {
        //console.log("Got request response", evt.data);
    }

    var callback = pendingRequests[evt.data.id];
    if (!callback)
        return;

    callback(evt.data.result);
};

function sendApiRequest(request, callback) {
    if (!isApiLoaded) {
        console.log("API not loaded");
        callback({ error: "api not loaded" });
        return;
    }

    //console.log("Sending request", request);
    var id = nextRequestId++;
    request.id = id;
    pendingRequests[id] = callback;

    apiHost.contentWindow.postMessage(
        request, "*"
    );
};

function tryRefreshCombatState() {
    sendApiRequest({ type: "getCombatState" }, function (combatState) {
        if (combatState != null && combatState.enemies != null && combatState.enemies.length > 0) {
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
            }
            chrome.runtime.sendMessage(extensionId, combatState);
            //for (index in combatState.enemies) {
                // console.log("Boss %s Name : %s", index, combatState.enemies[index].name["ja"]);
                // console.log("HP : %d / %d", combatState.enemies[index].hp, combatState.enemies[index].hpMax);
                // console.log("Has OD : %s / OD : %d", combatState.enemies[index].hasModeGauge == 1 ? "Y" : "N", combatState.enemies[index].gauge);
            //}
        }
    });
};

window.addEventListener("DOMContentLoaded", onLoad, false);