"use strict";

var viramateId = 'fgpokpknehglcioijejfeebigdnbnokj'
var apiUrl = 'chrome-extension://' + viramateId + '/content/api.html';

var isApiLoaded = false;
var apiHost = null;
var pendingRequests = {};
var nextRequestId = 1;
var enemyStateList = [];
var apiCallCount = 1000;

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
            // 3개체로 시작한 전투일 경우 개체가 죽더라도 API에 내려오는 정보는 3개체
            if(enemyStateList.length == 0 || (enemyStateList.length != combatState.enemies.length)) {
                // 이전 전투가 없거나 갱신이 필요할 경우 Display용 배열을 전부 비우고 API 배열 데이터 Parse하여 주입
                enemyStateList = [];
                for(let enemyState of combatState.enemies) {
                    enemyStateList.push(new EnemyState(enemyState));
                }
            } else {
                for (let [index, enemyState] of combatState.enemies.entries()) {
                    var enemy = new EnemyState(enemyState);
                    // 동일개체 체크
                    if (enemy.isSameEnemy(enemyState)) {
                        // 동일상태 체크
                        if (enemy.isSameEnemyState(enemyState)) {
                            enemyStateList[index] = enemy;
                        }
                    } else {
                        // 타개체로 인식될 경우 데이터 갱신
                        enemyStateList[index] = enemy;
                    }
                }
            }
            // Display 갱신
            updateDisplay(enemyStateList);
        } else {
            // 테스트용 - getCombatState가 없을 경우(전투 창이 아닌 경우) 팝업창 강제 종료
            // 테스트 결과 - 리로드충인 경우 불편 예상 / 옵션화 필요
            // 옵션 예제 - 한번 창을 띄우면 닫지 않으면 유지 / 전투 상태에 따라 자동 창 닫기
            // bossContainerShowHide("N", "N", "N");
            window.close();
        }
    });
};

window.addEventListener("DOMContentLoaded", onLoad, false);


