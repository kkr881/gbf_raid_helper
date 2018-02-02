var apiUrl = "chrome-extension://fgpokpknehglcioijejfeebigdnbnokj/content/api.html";

// Use this url when connecting to the API from a website.
// var apiUrl = "chrome-extension://fgpokpknehglcioijejfeebigdnbnokj/content/api.html";

var isApiLoaded = false;
var apiHost = null;
var pendingRequests = {};
var nextRequestId = 1;
var combatStateList = [];

function onLoad() {
    window.addEventListener("message", onMessage, false);
    tryLoadApi();
    window.setInterval(tryRefreshCombatState, 1000);
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
        console.log("Got request response", evt.data);
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

    console.log("Sending request", request);
    var id = nextRequestId++;
    request.id = id;
    pendingRequests[id] = callback;

    apiHost.contentWindow.postMessage(
        request, "*"
    );
};

var parseEnemyState = function(enemyData) {
    return {
        name: enemyData.name["ja"],
        id: enemyData.id,
        hasModeGauge: enemyData.hasModeGauge == 1 ? true : false,
        modeGauge: enemyData.gauge,
        // perHp : Math.cell(combatState.enemies[index].hp / combatState.enemies[index].hpMax * 100),
        hp: enemyData.hp,
        hpMax: enemyData.hpMax,
        requireUpdate: true
    };
};

function tryRefreshCombatState() {
    sendApiRequest({ type: "getCombatState" }, function (combatState) {
        if (combatState != null && combatState.enemies != null && combatState.enemies.length > 0) {
            // Display용 배열과 API 배열의 크기가 동일한 경우 Object 비교만 수행
            if(combatStateList.length == combatState.enemies.length) {
                for (index in combatState.enemies) {
                    var enemy = parseEnemyState(combatState.enemies[index]);
                    // 동일개체 체크
                    if (combatStateList[index].id == enemy.id && combatStateList[index].hpMax == enemy.hpMax) {
                        if (combatStateList[index].hp != enemy.hp) {
                            // HP가 변경되었으므로 데이터 갱신
                            combatStateList[index] = enemy;
                        }
                    } else {
                        // 타개체로 인식될 경우 데이터 갱신
                        combatStateList[index] = enemy;
                    }
                    // console.log("Boss %s Name : %s", index, combatState.enemies[index].name["ja"]);
                    // console.log("HP : %d / %d", combatState.enemies[index].hp, combatState.enemies[index].hpMax);
                    // console.log("Has OD : %s / OD : %d", combatState.enemies[index].hasModeGauge == 1 ? "Y" : "N", combatState.enemies[index].gauge);
                }
            } else {
                // Display용 배열을 전부 비우고 API 배열 데이터 Parse하여 주입
                combatStateList = [];
                for(index in combatState.enemies) {
                    combatStateList.push(parseEnemyState(combatState.enemies[index]));
                }
            }
            // Display 갱신
            updateDisplay();
        }
    });
};

window.addEventListener("DOMContentLoaded", onLoad, false);

function updateDisplay() {
    if (combatStateList.length > 0) {
        
        for (index in combatStateList) {
            if (combatStateList[index].requireUpdate) {
                var $bossEl = $('#enemy' + index).parents('.container');
                $bossEl.find('.boss_name').text(combatStateList[index].name);
                $bossEl.find('.progress').progress({
                    percent : Math.ceil(combatStateList[index].hp / combatStateList[index].hpMax * 100)
                });
            }
        }
    }
};
