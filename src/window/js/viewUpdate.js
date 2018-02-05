var WindowSize = {
    1: { width: 333 },
    2: { width: 640 },
    3: { width: 942 },
    height: 500
};

var updateDisplay = function (combatStateList) {
    if (combatStateList.length > 0) {
        updateBossContainer(combatStateList.length);
        for (index in combatStateList) {
            if (combatStateList[index].requireUpdate) {
                // 이름 및 HP 표기
                var $bossEl = $('#enemy' + index).parents('.content');
                $bossEl.find('.boss_name').text(combatStateList[index].name);
                // 프로그래스 바 표기
                updateProgressBar($bossEl, combatStateList[index]);
                // pattern 표기
                combatStateList[index].requireUpdate = false;
            }
        }
    }
};

var updateProgressBar = function ($el, enemyState) {
    $el.find('.progress').progress({
        percent: enemyState.getPerHp()
    });
    // modegauge 표기
    var $gaugeEl = $el.find('.progress .label');
    $gaugeEl.removeClass('black red yellow');
    $gaugeEl.addClass(ModeState.properties[enemyState.mode].color);
    $gaugeEl.text(enemyState.hasModeGauge ? enemyState.getModeStateName() : '');
};

var updateBossContainer = function (length) {
    switch (length) {
        case 3:
            bossContainerShowHide("Y", "Y", "Y");
            break;
        case 2:
            bossContainerShowHide("Y", "Y", "N");
            break;
        case 1:
            bossContainerShowHide("Y", "N", "N");
            break;
    }
    window.resizeTo(WindowSize[length].width, $('.container').outerHeight() + 40);
};

// 각 parameter가 Y일 경우 Show / N일 경우 Hide
var bossContainerShowHide = function (c1, c2, c3) {
    var $bossElList = $('.enemy_info');
    if (c1 == "Y") {
        $bossElList.eq(0).is(":visible") ? '' : $bossElList.eq(0).show();
    } else {
        $bossElList.eq(0).is(":visible") ? $bossElList.eq(0).hide() : '';
    }

    if (c2 == "Y") {
        $bossElList.eq(1).is(":visible") ? '' : $bossElList.eq(1).show();
    } else {
        $bossElList.eq(1).is(":visible") ? $bossElList.eq(1).hide() : '';
    }

    if (c3 == "Y") {
        $bossElList.eq(2).is(":visible") ? '' : $bossElList.eq(2).show();
    } else {
        $bossElList.eq(2).is(":visible") ? $bossElList.eq(2).hide() : '';
    }



};