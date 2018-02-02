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
    // API 주기
    window.setInterval(tryRefreshCombatState, 1000);
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
    // 디버깅용 코드
    // } else {
    //     console.log("Got request response", evt.data);
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
    // 디버깅용 코드
    // console.log("Sending request", request);
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
        hp: enemyData.hp,
        hpMax: enemyData.hpMax,
        requireUpdate: true
    };
};

function tryRefreshCombatState() {
    sendApiRequest({ type: "getCombatState" }, function (combatState) {
        if (combatState != null && combatState.enemies != null && combatState.enemies.length > 0) {
            // 3개체로 시작한 전투일 경우 개체가 죽더라도 API에 내려오는 정보는 3개체
            if(combatStateList.length == 0 || (combatStateList.length != combatState.enemies.length)) {
                // 이전 전투가 없거나 갱신이 필요할 경우 Display용 배열을 전부 비우고 API 배열 데이터 Parse하여 주입
                combatStateList = [];
                for(index in combatState.enemies) {
                    combatStateList.push(parseEnemyState(combatState.enemies[index]));
                }
            } else {
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
                    // 데이터 테스트 코드
                    // console.log("Boss %s Name : %s", index, combatState.enemies[index].name["ja"]);
                    // console.log("HP : %d / %d", combatState.enemies[index].hp, combatState.enemies[index].hpMax);
                    // console.log("Has OD : %s / OD : %d", combatState.enemies[index].hasModeGauge == 1 ? "Y" : "N", combatState.enemies[index].gauge);
                }
            }
            // Display 갱신
            updateDisplay(combatStateList);
        } else {
            bossContainerShowHide("N", "N", "N");
        }
    });
};

window.addEventListener("DOMContentLoaded", onLoad, false);


