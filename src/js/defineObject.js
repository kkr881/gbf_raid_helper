// mode 1 : NORMAL / 2 : OVER DRIVE / 3 : BREAK
var ModeState = {
    NORMAL: 1,
    OVERDRIVE: 2,
    BREAK: 3,
    properties: {
        1: { value: 1, name: 'NORMAL', color: 'black', patternType: 'normalMode' },
        2: { value: 2, name: 'OVER DRIVE', color: 'red', patternType: 'overDriveMode' },
        3: { value: 3, name: 'BREAK', color: 'yellow', patternType: 'normalMode' }
    }
};

// 1102 : 마비, 1374 : 공포, 1101 : 매료, 1498 : 유혹
// 1241_2X : 마안의 석화, 1263_1X : 혼수 / 수면, 1374_1X : 턴제공포
var enemyDebuffStateList = [
    { id: '1102', className: 'paralysis' },
    { id: '1374', className: 'fear' },
    { id: '1101', className: 'attracted' },
    { id: '1498', className: 'temptation' },
    { id: '1374_11', className: 'fear_1' },
    { id: '1374_12', className: 'fear_2' },
    { id: '1374_13', className: 'fear_3' },
    { id: '1374_14', className: 'fear_4' },
    { id: '1374_15', className: 'fear_5' },
    { id: '1374_16', className: 'fear_6' },
    { id: '1374_17', className: 'fear_7' },
    { id: '1374_18', className: 'fear_8' },
    { id: '1374_19', className: 'fear_9' },
    { id: '1263_11', className: 'coma_1' },
    { id: '1263_12', className: 'coma_2' },
    { id: '1263_13', className: 'coma_3' },
    { id: '1263_14', className: 'coma_4' },
    { id: '1263_15', className: 'coma_5' },
    { id: '1263_16', className: 'coma_6' },
    { id: '1263_17', className: 'coma_7' },
    { id: '1263_18', className: 'coma_8' },
    { id: '1263_19', className: 'coma_9' },
    { id: '1241_21', className: 'flash_1' },
    { id: '1241_22', className: 'flash_2' },
    { id: '1241_23', className: 'flash_3' },
    { id: '1241_24', className: 'flash_4' },
    { id: '1241_25', className: 'flash_5' },
    { id: '1241_26', className: 'flash_6' },
    { id: '1241_27', className: 'flash_7' },
    { id: '1241_28', className: 'flash_8' },
    { id: '1241_29', className: 'flash_9' }
];

var WindowSize = {
    1: { width: 333 },
    2: { width: 640 },
    3: { width: 942 },
    height: 500
};

// 차지 패턴이 복수일 수 있으므로 배열처리
var multiPatternTemplate = function(patternArray, type, turn = null) {
    if(typeof patternArray === 'undefined') {
        return '';
    }
    return `${patternArray.map(pattern => `
        <div class="header">${replaceNewLine(pattern.title, 'html')}</div>
        <div class="meta">${type == 'commonMode' ? `공통 오의` : 
                            type == 'normalMode' ? `일반 오의` :
                            type == 'overDriveMode' ? `OVER DRIVE 오의` :
                            type == 'turn' ? `${turn}턴에 발동` : ``}</div>
        <div class="description">${replaceNewLine(pattern.desc, 'html')}</div>
    `).join('<br>')}`;
};

var singlePatternTemplate = function(pattern, perHp = null) {
    if(typeof pattern === 'undefined') {
        return '';
    }
    return `
        <div class="header">${replaceNewLine(pattern.title, 'html')}</div>
        ${perHp != null ? `<div class="meta">체력 ${perHp}%에 발동</div>` : ``}
        <div class="description">${replaceNewLine(pattern.desc, 'html')}</div>
    `;
};