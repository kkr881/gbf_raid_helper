"use strict";

class EnemyState {
    constructor(enemyData) {
        // name의 값을 한글로 대치할 필요가 있는지 검토
        this.name = enemyData.name["ja"];
        this.id = enemyData.id;
        this.cjs = enemyData.cjs.replace("enemy_", "");
        this.hasModeGauge = enemyData.hasModeGauge == 1 ? true : false;
        this.modeGauge = enemyData.gauge;
        this.hp = enemyData.hp;
        this.hpMax = enemyData.hpMax;
        this.mode = enemyData.mode;
        this.recast = enemyData.recast;
        this.recastMax = enemyData.recastMax;
        this.conditions = enemyData.conditions;
    }
    // http://game-a1.granbluefantasy.jp/assets_en/img/sp/assets/enemy/s/(cjs replace enemy_, "").png
    // 보스 초상화 주소
    getBossPortraitUrl() {
        return "http://game-a1.granbluefantasy.jp/assets_en/img/sp/assets/enemy/s/" + this.cjs + ".png";
    }
    // 동일 개체 체크 id와 hpMax 비교
    isSameEnemy(enemyState) {
        return (this.id == enemyState.id) && (this.hpMax == enemyState.hpMax) ? true : false;
    }
    // 동일 상태 체크 HP와 디버프 상태가 동일한지 체크
    isSameEnemyState(enemyState) {
        return (this.hp == enemyState.hp) && equalsArray(this.conditions, enemyState.conditions);
    }
    // recastMax : 차지턴 최대 값 -1 ex) 4일 경우 차지턴은 3
    // recastMax - recast : 현재 차지턴
    // recast == 1인 경우 차지턴 MAX
    // 해당 부분 관련하여 좀 더 확인 필요
    isMaxChargeTurn() {
        return (ModeState.BREAK != this.mode) && (this.recast == 1) ? true : false;
    }
    // 현재 Mode에 맞는 명칭 반환
    getModeStateName() {
        return ModeState.properties[this.mode].name;
    }
    getModeStatePatternType() {
        return ModeState.properties[this.mode].patternType;
    }
    // HP와 HPMAX 값을 퍼센트로 반환
    getPerHp() {
        return Math.ceil(this.hp / this.hpMax * 100);
    }
}
