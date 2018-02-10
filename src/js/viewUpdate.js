"use strict";

var updateDisplay = function (enemyStateList, raidState) {
    if (enemyStateList.length > 0) {
        ///updateBossContainer(enemyStateList.length);
        for (let [index, enemyState] of enemyStateList.entries()) {
            var $bossEl = $('#enemy' + index).parents('.content');
            // 이름 및 주요 디버프 표기
            updateEnemyState($bossEl, enemyState);
            // 프로그래스 바 표기
            updateProgressBar($bossEl, enemyState);
            // pattern 표기
            updatePatternArea($bossEl, enemyState, raidState);
            updateBossContainer(enemyStateList.length);
        }
    }
};

var insertObjByEl = function ($el, obj, pattern = null) {
    if (obj == null) {
        $el.removeClass('show');
    } else {
        if (Array.isArray(obj.patternInfo)) {
            $el.html(multiPatternTemplate(obj.patternInfo, obj.type, obj.turn));
        } else {
            $el.html(singlePatternTemplate(obj.patternInfo, pattern == 'trigger' ? obj.patternPerHp : null));
        }
        $el.addClass('show');
    }
};

var updatePatternArea = function ($el, enemyState, raidState) {
    if (!bossPattern.hasBossPattern(enemyState.id)) {
        $el.parent().find('.enemy_pattern').removeClass('show');
        return false;
    }
    // 턴 패턴이 존재할 경우 공통 / 차지턴 패턴은 노출하지 않음
    // 무조건 턴 패턴이 발동해야하므로
    // 해당 조건에 대한 부분은 추가 확인 필요
    // 턴 패턴 조회
    let $turnEl = $el.parent().find('.enemy_turn_pattern');
    let enemyTurnObj = bossPattern.getTurnPattern(enemyState.id, raidState.turn, enemyState.getPerHp());
    console.log('enemyTurnObj is %s', Array.isArray(enemyTurnObj));
    console.log(enemyTurnObj);
    insertObjByEl($turnEl, enemyTurnObj);
    if(enemyTurnObj == null) {
        // 공통 패턴 조회
        let $commonEl = $el.parent().find('.enemy_common_pattern');
        let enemyCommonObj = bossPattern.getTypeByPatternPerHp(enemyState.id, "commonMode", enemyState.getPerHp());
        insertObjByEl($commonEl, enemyCommonObj);
        // 차지턴 패턴 조회
        let $chargeEl = $el.parent().find('.enemy_charge_pattern');
        let enemyChargeObj = bossPattern.getTypeByPatternPerHp(enemyState.id, enemyState.getModeStatePatternType(), enemyState.getPerHp());
        insertObjByEl($chargeEl, enemyChargeObj);
    }
    // 체력 트리거 조회
    let $triggerEl = $el.parent().find('.enemy_trigger_pattern');
    let enemyTriggerObj = bossPattern.getTypeByPatternPerHp(enemyState.id, "hpTrigger", enemyState.getPerHp());
    insertObjByEl($triggerEl, enemyTriggerObj, 'trigger');
    // 체력별 부가정보
    let $commentEl = $el.parent().find('.enemy_comment');
    let enemyCommentObj = bossPattern.getTypeByPatternPerHp(enemyState.id, "comment", enemyState.getPerHp());
    insertObjByEl($commentEl, enemyCommentObj);

    // 차지턴 MAX일 경우 경고
    let $alertEl = $el.parent().find('.enemy_common_pattern, .enemy_charge_pattern');
    enemyState.isMaxChargeTurn() ? $alertEl.addClass('alert') : $alertEl.removeClass('alert');
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
    let bossNameKo = bossPattern.getBossName(enemyState.id);
    $el.find('.boss_name').text(bossNameKo != null ? bossNameKo : enemyState.name);
    // 임시 패턴 존재 여부 정보 노출용
    // 패턴이 없는 보스일 경우 해당 보스의 ID 노출
    if (bossPattern.hasBossPattern(enemyState.id)) {
        $el.find('.pattern_check').text(`패턴이 존재합니다.`);
    } else {
        $el.find('.pattern_check').text(`패턴 없음. 보스 ID : ${enemyState.id}`);
        let undefinedBossId = enemyState.id;
        let undefinedBossName = enemyState.name;
        let undefinedBoss = {};
        undefinedBoss[undefinedBossId] = undefinedBossName;
        chrome.storage.local.set(undefinedBoss, () => {
            console.log('Undefined Boss Info Saved');
        });
    }

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