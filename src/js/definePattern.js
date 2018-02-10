// bossPattern은 enemyState의 id기반
var bossPattern = {
    // 패턴 존재 여부 체크
    hasBossPattern: function (id) {
        return this[id] != undefined ? true : false;
    },
    getBossName: function (id) {
        return this[id] != undefined ? this[id].name : null;
    },
    isShowPattern: function (pattern, perHp) {
        let patternOption = pattern.option;
        let isShow = false;
        switch (patternOption.type) {
            case 'large':
                isShow = perHp > patternOption.value ? true : false;
                break;
            case 'small':
                isShow = perHp < patternOption.value ? true : false;
                break;
        }
        return isShow;
    },
    getTurnPattern: function (id, turn, perHp) {
        let turnPattern = this[id]["turn"] != undefined && this[id]["turn"][turn] != undefined ? this[id]["turn"][turn] : null;
        if (turnPattern != null && this.isShowPattern(turnPattern[0], perHp)) {
            return {
                type: 'turn',
                turn: turn,
                patternInfo: turnPattern
            }
        } else {
            return null;
        }
    },
    getPatternList: function(id, type) {
        return this[id][type] != undefined ? this[id][type] : null;
    },
    getConditionPattern: function (id, conditions, perHp) {
        let conditionPatternList = this.getPatternList(id, "condition");
        if (conditionPatternList != null) {
            let conditionPatternIds = Object.keys(conditionPatternList);
            for (let conditionPatternId of conditionPatternIds) {
                if (conditions.indexOf(conditionPatternId) != -1
                    && this.isShowPattern(conditionPatternList[conditionPatternId][0], perHp)) {
                    return {
                        type: 'condition',
                        turn: null,
                        patternInfo: this[id]["condition"][conditionPatternId]
                    }
                }
            }
        } else {
            return null;
        }
    },
    getDebuffPattern : function(id, partyDebuffList, perHp) {
        let debuffPatternList = this.getPatternList(id, "partyDebuff");
        if(debuffPatternList != null) {
            let debuffPatternIds = Object.keys(debuffPatternList);
            for(let debuffPatternId of debuffPatternIds) {
                for(let partyDebuff of partyDebuffList) {
                    if(partyDebuff.indexOf(debuffPatternId) != -1
                        && this.isShowPattern(this[id]["partyDebuff"][debuffPatternId][0], perHp)) {
                        return {
                            type: 'partyDebuff',
                            turn: null,
                            patternInfo: this[id]["partyDebuff"][debuffPatternId]
                        }
                    }
                }
            }
        } else {
            return null;
        }
    },
    getTypeByPatternPerHp: function (id, patternType, perHp) {
        if (typeof this[id][patternType] === 'undefined') {
            return null;
        }
        let patternObj = this[id][patternType];
        let patternPerHpList = Object.keys(patternObj);
        let nowPatternPerHp = null;
        for (i = 0; i < patternPerHpList.length; i++) {
            let patternPerHp = patternPerHpList[i];
            let afterPatternPerHp = i + 1 < patternPerHpList.length ? patternPerHpList[i + 1] : null;
            // 첫번째 패턴이 현재 HP보다 클 경우 패턴이 없음
            if (i == 0 && patternPerHp > perHp) {
                return null;
            }
            // 현재 HP와 해당하는 패턴이 동일할 경우 해당하는 패턴 노출
            if (afterPatternPerHp == perHp) {
                nowPatternPerHp = afterPatternPerHp;
                break;
            }

            // 현재 HP와 해당하는 패턴이 동일하거나
            // patternPerHp가 patternPerHPList의 마지막일 경우
            if (patternPerHp == perHp || afterPatternPerHp == null) {
                nowPatternPerHp = patternPerHp;
                break;
            } else {
                if (afterPatternPerHp > perHp && perHp > patternPerHp) {
                    nowPatternPerHp = patternPerHp;
                    break;
                } else {
                    continue;
                }
            }
        }
        // nowPatternPerHp 값 체크 후 패턴 Object 반환
        return {
            patternPerHp: nowPatternPerHp,
            type: patternType,
            turn: null,
            patternInfo: this[id][patternType][nowPatternPerHp]
        };
    }
};
$.extend(bossPattern, defaultPatterns, primalBeastPatterns, magnaPatterns, magnaHLPatterns);