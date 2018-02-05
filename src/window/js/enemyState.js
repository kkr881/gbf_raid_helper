// mode 1 : NORMAL / 2 : OVER DRIVE / 3 : BREAK
var ModeState = {
    NORMAL : 1,
    OVERDRIVE : 2,
    BREAK : 3,
    properties : {
        1: {value : 1, name : "NORMAL", color : 'black'},
        2: {value : 2, name : "OVER DRIVE", color : 'red'},
        3: {value : 3, name : "BREAK", color : 'yellow'}
    }
};

function EnemyState (enemyData) {
    this.name = enemyData.name["ja"];
    this.id =  enemyData.id;
    this.hasModeGauge = enemyData.hasModeGauge == 1 ? true : false;
    this.modeGauge = enemyData.gauge;
    this.hp =  enemyData.hp;
    this.hpMax = enemyData.hpMax;
    this.requireUpdate = true;
    this.mode = enemyData.mode;
    this.recast = enemyData.recast;
    this.recastMax = enemyData.recastMax;
};

// 동일 개체 체크
// id와 hpMax 비교
EnemyState.prototype.isSameEnemy = function(id, hpMax) {
    return (this.id == id) && (this.hpMax == hpMax) ? true : false;
};

// recastMax : 차지 턴 최대 값 / recastMax - recast : 현재 차지 턴
// recastMax == recast 일 경우 차지턴 0
// recast == 1 인 경우 맥스턴
// recast 관련 사항은 좀 더 확인 필요
EnemyState.prototype.isMaxChargeTurn = function() {
    return this.recast == 1 ? true : false;
};

// 현재 Mode에 맞는 명칭 반환
EnemyState.prototype.getModeStateName = function() {
    return ModeState.properties[this.mode].name;
};

// HP와 HPMAX 값을 퍼센트로 반환
EnemyState.prototype.getPerHp = function() {
    return Math.ceil(this.hp / this.hpMax * 100);
};
