"use strict";

var updateDisplay = function (enemyStateList) {
    if (enemyStateList.length > 0) {
        updateBossContainer(enemyStateList.length);
        for (let [index, enemyState] of enemyStateList.entries()) {
            if (enemyState.requireUpdate) {
                var $bossEl = $('#enemy' + index).parents('.content');
                // 이름 및 주요 디버프 표기
                updateEnemyState($bossEl, enemyState);
                // 프로그래스 바 표기
                updateProgressBar($bossEl, enemyState);
                // pattern 표기
                updatePatternArea($bossEl, enemyState);
                updateBossContainer(enemyStateList.length);
                enemyState.requireUpdate = false;
            }
        }
    }
};

var insertObjByEl = function($el, obj) {
    if(obj == null) {
        $el.removeClass('show');
    } else {
        $el.find('.header').html(obj.title.replace(/\n/g, '<br>'));
        $el.find('.description').html(obj.desc.replace(/\n/g, '<br>'));
        $el.addClass('show');
    }
};

var updatePatternArea = function($el, enemyState) {
    let $chargeEl = $el.parent().find('.enemy_charge_pattern');
    let $triggerEl = $el.parent().find('.enemy_trigger_pattern');
    let $commentEl = $el.parent().find('.enemy_comment');
    if(!bossPattern.hasBossPattern(enemyState.id)) {
        $chargeEl.removeClass('show');
        $triggerEl.removeClass('show');
        $commentEl.removeClass('show');
        return false;
    }
    // 차지턴 패턴 영역
    
    // 체력 트리거 영역
    let enemyTriggerObj = bossPattern.getTypeByPatternPerHp(enemyState.id, "hpTrigger", enemyState.getPerHp());
    insertObjByEl($triggerEl, enemyTriggerObj);
    
    // 체력별 부가정보
    let enemyCommentObj = bossPattern.getTypeByPatternPerHp(enemyState.id, "comment", enemyState.getPerHp());
    insertObjByEl($commentEl, enemyCommentObj);
};

// "http://game-a1.granbluefantasy.jp/assets_en/img/sp/ui/icon/status/x64/status_" + (statusOverride || obj.status) + ".png')"
// 버프 디버프 아이콘 주소
// 버프 디버프 노출 조건을 어떻게 할지 고민 필요
// 임시로 마비 공포 상태는 노출되도록
// 마비 id 1102
// 공포 id 1374

var updateEnemyState = function ($el, enemyState) {
    // 보스 이미지 노출
    $el.find('.boss_portrait').attr('src', enemyState.getBossPortraitUrl());
    // 이름 및 주요 디버프 표기
    $el.find('.boss_name').text(enemyState.name);

    if (enemyState.conditions.length > 0) {
        for (let debuffState of enemyDebuffStateList) {
            enemyState.conditions.includes(debuffState.id)
                ? $el.find('.' + debuffState.className).addClass('show')
                : $el.find('.' + debuffState.className).removeClass('show');
        }
    }
};

var updateProgressBar = function ($el, enemyState) {
    // HP 퍼센트 표기
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