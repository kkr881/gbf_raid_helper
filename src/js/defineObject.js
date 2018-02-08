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

var enemyDebuffStateList = [
    { id: '1102', className: 'paralysis' },
    { id: '1374', className: 'fear' },
    { id: '1101', className: 'attracted' }
];

var WindowSize = {
    1: { width: 333 },
    2: { width: 640 },
    3: { width: 942 },
    height: 500
};

// 차지 패턴이 복수일 수 있으므로 배열처리
var multiPatternTemplate = function(patternArray, type) {
    if(typeof patternArray === 'undefined') {
        return '';
    }
    return `${patternArray.map(pattern => `
        <div class="header">${replaceNewLine(pattern.title, 'html')}</div>
        <div class="meta">${type == 'commonMode' ? `공통 오의` : type == 'normalMode' ? `일반 오의` : `OVER DRIVE 오의`}</div>
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