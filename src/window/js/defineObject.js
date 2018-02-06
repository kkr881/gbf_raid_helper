// mode 1 : NORMAL / 2 : OVER DRIVE / 3 : BREAK
var ModeState = {
    NORMAL: 1,
    OVERDRIVE: 2,
    BREAK: 3,
    properties: {
        1: { value: 1, name: 'NORMAL', color: 'black' },
        2: { value: 2, name: 'OVER DRIVE', color: 'red' },
        3: { value: 3, name: 'BREAK', color: 'yellow' }
    }
};

var enemyDebuffStateList = [
    { id: '1102', className: 'paralysis' },
    { id: '1374', className: 'fear' }
];

var WindowSize = {
    1: { width: 333 },
    2: { width: 640 },
    3: { width: 942 },
    height: 500
};