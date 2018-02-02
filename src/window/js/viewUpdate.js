var updateDisplay = function (combatStateList) {
    if (combatStateList.length > 0) {
        updateBossContainer(combatStateList.length);
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

var updateBossContainer = function(length) {
    switch(length) {
        case 3 :
            bossContainerShowHide("Y", "Y", "Y");
        break;
        case 2 :
            bossContainerShowHide("Y", "Y", "N");
        break;
        case 1 :
            bossContainerShowHide("Y", "N", "N");
        break;
    }
};

// 각 parameter가 Y일 경우 Show / N일 경우 Hide
var bossContainerShowHide = function(c1, c2, c3) {
    var $bossElList = $('.container');
    if(c1 == "Y") {
        $bossElList.eq(0).is(":visible") ? '' : $bossElList.eq(0).show();
    } else {
        $bossElList.eq(0).is(":visible") ? $bossElList.eq(0).hide() : '';
    }

    if(c2 == "Y") {
        $bossElList.eq(1).is(":visible") ? '' : $bossElList.eq(1).show();
    } else {
        $bossElList.eq(1).is(":visible") ? $bossElList.eq(1).hide() : '';
    }

    if(c3 == "Y") {
        $bossElList.eq(2).is(":visible") ? '' : $bossElList.eq(2).show();
    } else {
        $bossElList.eq(2).is(":visible") ? $bossElList.eq(2).hide() : '';
    }
    
    
    
};