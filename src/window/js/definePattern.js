// bossPattern은 enemyState의 id기반
// 차후 좀 더 편한 형태 고려
// 826100 : 세레마그HL
// 9900504 : 테스트 몬스터
var bossPattern = {
    826100: {
        name: 'Lv100 세레스트·마그나',
        hpTrigger: {
            85: { title: '85% 소리없는 외침', desc: '보스의 약화 효과 전부 회복' },
            70: { title: '70% 푸른 번개', desc: '아군 전체 무속성 데미지(최대 체력의 25%), 보스의 약화 효과 하나 회복' },
            40: { title: '40% 안락사', desc: '아군 전체 수면 1~5턴, 언데드 5턴' },
            10: { title: '10% 보이드 올', desc: '아군 전체 HP 전부 회복, 부패 6턴(턴당 데미지 300), 암흑 5턴' }
        },
        comment: {
            75: { title: '비고', desc: 'HP 75%에서 안개 모드로 전환' },
            50: { title: '비고', desc: '통상 공격을 하지 않음.\n마비, 수면, 공포 무효 HP 50%에서 마그나 모드로 전환' },
            0: { title: '비고', desc: '기절 해제' }
        },
        commonMode: {
            75: { title: '검은 안개', desc: '아군 전체에 부패 5턴' },
            50: { title: '어두운 감옥', desc: '단일 아군에게 그림자 3턴, 적개심 UP 3턴, 언데드 3턴 ' },
            0: { title: '안락사(발동률 높음)', desc: '아군 전체 수면 1~5턴, 언데드 5턴' },
        },
        normalMode: {
            75: { title: '하얀 안개', desc: '전체 무속성 데미지(최대 체력의 5%), 3분간 보스의 약화 내성' },
            50: { title: '통합', desc: '보스에게 환영(무제한)' },
            0: { title: '나락의 폴 다운', desc: '아군 전체 암속성 데미지, 어빌리티 봉인 3턴' }
        },
        overDriveMode: {
            75: { title: '보이드', desc: '아군 전체 어빌봉인 1턴, 언데드 3턴, 재생 3턴' },
            50: { title: '푸른 번개', desc: '아군 전체 무속성 데미지(최대 체력의 15%), 보스의 약화 효과 하나 회복' },
            0: { title: '보이드 올', desc: '아군 전체 HP 전부 회복, 부패 6턴(턴당 데미지 300), 암흑 5턴' }
        }
    },
    // 패턴 존재 여부 체크
    hasBossPattern: function (id) {
        return this[id] != undefined ? true : false;
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
            let afterPatternPerHp = i +1 < patternPerHpList.length ?patternPerHpList[i+1] : null;
            // 현재 HP와 해당하는 패턴이 동일할 경우 해당하는 패턴 노출
            if (patternPerHp == perHp) {
                nowPatternPerHp = patternPerHp;
                break;
            } else if(afterPatternPerHp == perHp) {
                nowPatternPerHp = afterPatternPerHp;
                break;
            }

            if(afterPatternPerHp == null) {
                nowPatternPerHp = patternPerHp;
                break;
            } else {
                if(afterPatternPerHp > perHp && perHp > patternPerHp) {
                    nowPatternPerHp = patternPerHp;
                    break;
                } else {
                    continue;
                }
            }
        }
        // nowPatternPerHp 값 체크 후 패턴 Object 반환
        if(nowPatternPerHp != null) {
            return this[id][patternType][nowPatternPerHp];
        } else {
            return null;
        }
    }
};