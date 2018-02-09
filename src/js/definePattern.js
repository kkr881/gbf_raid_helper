// bossPattern은 enemyState의 id기반
// 차후 좀 더 편한 형태 고려
// 기본 형식
/*1: {
    name : '',
    hpTrigger: {
        100:{title: '', desc: ''},
    },
    comment: {
        100:{title:'',desc:''},
    },
    commonMode:{
        100:[{title:'',desc:''}]
    },
    normalMode:{
        100:[{title:'',desc:''}]
    },
    overDriveMode:{
        100:[{title:'',desc:''}]
    }
},*/
// 826100 : 세레마그HL
// 600050 : 티아마그
var bossPattern = {
    1: {
        name: 'Lv30 티아마트',
        normalMode: {
            0: [{ title: '피블 스톰', desc: '아군 전체 데미지\n아군 전체 공격력 30% 다운' },
            { title: '러쉬 블로', desc: '랜덤 3회 데미지' }]
        },
        overDriveMode: {
            0: [{ title: '토네이도 디제스터', desc: '아군 전체 데미지' }]
        }
    },
    2: {
        name: 'Lv50 티아마트',
        normalMode: {
            0: [{ title: '피블 스톰', desc: '아군 전체 데미지\n아군 전체 공격력 30% 다운' },
            { title: '러쉬 블로', desc: '랜덤 3회 데미지' }]
        },
        overDriveMode: {
            0: [{ title: '토네이도 디제스터', desc: '아군 전체 데미지' }]
        }
    },
    600050: {
        name: 'Lv50 티아마트 마그나',
        comment: {
            0: { title: '비고', desc: '즉사 무효\nOVER DRIVE 모드 시 충전 턴 단축' }
        },
        normalMode: {
            0: [{ title: '백 드래프트', desc: '화속성 + 풍속성 아군 전체 데미지\n아군 전체 어빌리티 봉인 2턴\n보스의 방어 다운' },
            { title: '토네이도 디제스터', desc: '아군 전체 데미지\n아군 전체 오의 게이지 -5%' }]
        },
        overDriveMode: {
            0: [{ title: '난회의 템페스트', desc: '랜덤 5회 특대 데미지' },
            { title: '토네이도 디제스터', desc: '아군 전체 데미지\n아군 전체 오의 게이지 -5%' }]
        }
    },
    3: {
        name: 'Lv30 콜로서스',
        normalMode: {
            0: [{ title: '히트', desc: '보스의 공격력 업\n보스에게 데미지 컷 부여' }]
        },
        overDriveMode: {
            0: [{ title: '절섬', desc: '단일 아군에게 4배 데미지' },
            { title: '이그니스 릴리즈', desc: '아군 전체 데미지' }]
        }
    },
    4: {
        name: 'Lv50 콜로서스',
        normalMode: {
            0: [{ title: '히트', desc: '보스의 공격력 업\n보스에게 데미지 컷 부여' }]
        },
        overDriveMode: {
            0: [{ title: '절섬', desc: '단일 아군에게 4배 데미지' },
            { title: '이그니스 릴리즈', desc: '아군 전체 데미지' }]
        }
    },
    303070: {
        name: 'Lv70 콜로서스 마그나',
        comment: {
            0: { title: '비고', desc: '언데드, 즉사 무효\nOVER DRIVE 모드 시 충전 턴 단축' }
        },
        normalMode: {
            0: [{ title: '쉘터', desc: '아군 전체 데미지\n보스의 방어 업, 재생(20000) 3턴' },
            { title: '프로미넌스 리액터', desc: '아군 전체 데미지\n보스의 강화 효과 소거\n보스에게 작열\n보스의 공격력 업/방어 다운(90초)' }]
        },
        overDriveMode: {
            0: [{ title: '차원단', desc: '단일 아군에게 특대 데미지\n보스의 강화 효과 소거' }]
        }
    },
    5: {
        name: 'Lv30 리바이어선',
        normalMode: {
            0: [{ title: '볼텍스', desc: '아군 전체 데미지\n아군 전체 독 부여' }]
        },
        overDriveMode: {
            0: [{ title: '그랜드 폴', desc: '아군 전체 데미지\n아군 전체 공격력 다운' }]
        }
    },
    6: {
        name: 'Lv50 리바이어선',
        normalMode: {
            0: [{ title: '볼텍스', desc: '아군 전체 데미지\n아군 전체 독 부여' }]
        },
        overDriveMode: {
            0: [{ title: '그랜드 폴', desc: '아군 전체 데미지\n아군 전체 공격력 다운' }]
        }
    },
    402060: {
        name: 'Lv60 리바이어선 마그나',
        comment: {
            0: { title: '비고', desc: '즉사 무효\n푸른 쐐기에 걸린 아군은\n수속성 공격에 데미지를 받지 않으나\n공격 시 보스의 체력이 회복' }
        },
        normalMode: {
            0: [{ title: '푸른 쐐기', desc: '아군 전체 데미지\n푸른 쐐기를 부여' },
            { title: '궤붕의 타이달 폴', desc: '랜덤 2회 특대 데미지' }]
        },
        overDriveMode: {
            0: [{ title: '수경', desc: '아군 전체 데미지, 방어력 다운\n보스에게 반사부여\n(데미지 1000 3회, 데미지 30%컷)' },
            { title: '궤붕의 타이달 폴', desc: '랜덤 2회 특대 데미지' }]
        }
    },
    7: {
        name: 'Lv30 유그드라실',
        commonMode: {
            0: [{ title: '액시즈 문디', desc: '아군 전체 데미지' }]
        }
    },
    8: {
        name: 'Lv30 유그드라실',
        commonMode: {
            0: [{ title: '액시즈 문디', desc: '아군 전체 데미지' }]
        }
    },
    507055: {
        name: 'Lv60 유그드라실 마그나',
        comment: {
            0: { title: '비고', desc: '통상공격이 다단 히트\n(일정 횟수 무작위 공격)\n오염\n(HP가 적을수록 데미지 업)' }
        },
        normalMode: {
            0: [{ title: '네자 맨틀', desc: '화속성 + 토속성 아군 전체 데미지\n아군 전체 공격력 다운' },
            { title: '액시스 문디', desc: '아군 전체 데미지\n어빌리티 봉인, 방어 다운 부여' }]
        },
        overDriveMode: {
            0: [{ title: '창세의 루믹스', desc: '아군 전체 데미지, 오의 봉인 부여\n보스의 체력 20만 회복' },
            { title: '액시스 문디', desc: '아군 전체 데미지\n어빌리티 봉인, 방어 다운 부여' }]
        }
    },
    9: {
        name: 'Lv30 아드웰사',
        normalMode: {
            0: [{ title: '280mm 미스릴 탄', desc: '아군 전체 데미지' }]
        },
        overDriveMode: {
            0: [{ title: '성정선', desc: '아군 전체 데미지\n아군 전체 저주, 독, 오의 봉인' },
            { title: '성정포', desc: '아군 전체 데미지\n아군 전체 공격력 다운\n보스의 더블어택 확률 업' }]
        }
    },
    10: {
        name: 'Lv50 아드웰사',
        normalMode: {
            0: [{ title: '280mm 미스릴 탄', desc: '아군 전체 데미지' }]
        },
        overDriveMode: {
            0: [{ title: '성정선', desc: '아군 전체 데미지\n아군 전체 저주, 독, 오의 봉인' },
            { title: '성정포', desc: '아군 전체 데미지\n아군 전체 공격력 다운\n보스의 더블어택 확률 업' }]
        }
    },
    //여기부터
    713075: {
        name: 'Lv75 슈발리에 마그나',
        comment: {
            0: { title: '비고', desc: '언데드, 즉사 무효\n상태효과 새크리파이스\n보스에게 부여된 약화효과 갯수만큼\n공격력 7% 업/방어력 7% 다운\n턴 종료 시 고정 데미지' }
        },
        commonMode: {
            50: { title: '모드: 이지스 머지', desc: '화속성 + 토속성 아군 전체 데미지\n아군 전체 공격력 다운' },
            0: { title: '액시스 문디', desc: '아군 전체 데미지\n어빌리티 봉인, 방어 다운 부여' }
        },
        normalMode: {
            0: [{ title: '네자 맨틀', desc: '화속성 + 토속성 아군 전체 데미지\n아군 전체 공격력 다운' },
            { title: '액시스 문디', desc: '아군 전체 데미지\n어빌리티 봉인, 방어 다운 부여' }]
        },
        overDriveMode: {
            0: [{ title: '창세의 루믹스', desc: '아군 전체 데미지, 오의 봉인 부여\n보스의 체력 20만 회복' },
            { title: '액시스 문디', desc: '아군 전체 데미지\n어빌리티 봉인, 방어 다운 부여' }]
        }
    },
    11: {
        name: 'Lv30 세레스트',
        comment: {
            0: { title: '비고', desc: '언데드 상태에서\nHP 회복효과를 받으면\n회복 수치만큼 데미지를 받음' }
        },
        normalMode: {
            0: [{ title: '부정의 안개', desc: '아군 전체 언데드' },
            { title: '재생의 안개', desc: '아군 전체 재생' }]
        },
        overDriveMode: {
            0: [{ title: '보이드', desc: '아군 전체 언데드, 재생, 어빌리티 봉인 2턴' }]
        }
    },
    12: {
        name: 'Lv50 세레스트',
        comment: {
            0: { title: '비고', desc: '언데드 상태에서\nHP 회복효과를 받으면\n회복 수치만큼 데미지를 받음' }
        },
        normalMode: {
            0: [{ title: '부정의 안개', desc: '아군 전체 언데드' },
            { title: '재생의 안개', desc: '아군 전체 재생' }]
        },
        overDriveMode: {
            0: [{ title: '보이드', desc: '아군 전체 언데드, 재생, 어빌리티 봉인 2턴' }]
        }
    },

    826100: {
        name: 'Lv100 세레스트·마그나',
        hpTrigger: {
            85: { title: '소리없는 외침', desc: '보스의 약화 효과 전부 회복' },
            70: { title: '푸른 번개', desc: '아군 전체 무속성 데미지(최대 체력의 25%), 보스의 약화 효과 하나 회복' },
            40: { title: '안락사', desc: '아군 전체 수면 1~5턴, 언데드 5턴' },
            10: { title: '보이드 올', desc: '아군 전체 HP 전부 회복, 부패 6턴(턴당 데미지 300), 암흑 5턴' }
        },
        comment: {
            75: { title: '비고', desc: 'HP 75%에서 안개 모드로 전환' },
            50: { title: '비고', desc: '통상 공격을 하지 않음.\n마비, 수면, 공포 무효\nHP 50%에서 마그나 모드로 전환' },
            0: { title: '비고', desc: '기절 해제' }
        },
        commonMode: {
            75: [{ title: '검은 안개', desc: '아군 전체에 부패 5턴' }],
            50: [{ title: '어두운 감옥', desc: '단일 아군에게 그림자 3턴, 적개심 UP 3턴, 언데드 3턴 ' }],
            0: [{ title: '안락사(발동률 높음)', desc: '아군 전체 수면 1~5턴, 언데드 5턴' }],
        },
        normalMode: {
            75: [{ title: '하얀 안개', desc: '전체 무속성 데미지(최대 체력의 5%), 3분간 보스의 약화 내성' }],
            50: [{ title: '통합', desc: '보스에게 환영(무제한)' }],
            0: [{ title: '나락의 폴 다운', desc: '아군 전체 암속성 데미지, 어빌리티 봉인 3턴' }]
        },
        overDriveMode: {
            75: [{ title: '보이드', desc: '아군 전체 어빌봉인 1턴, 언데드 3턴, 재생 3턴' }],
            50: [{ title: '푸른 번개', desc: '아군 전체 무속성 데미지(최대 체력의 15%), 보스의 약화 효과 하나 회복' }],
            0: [{ title: '보이드 올', desc: '아군 전체 HP 전부 회복, 부패 6턴(턴당 데미지 300), 암흑 5턴' }]
        }
    },
    // 패턴 존재 여부 체크
    hasBossPattern: function (id) {
        return this[id] != undefined ? true : false;
    },
    getBossName: function (id) {
        return this[id] != undefined ? this[id].name : null;
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
            patternInfo: this[id][patternType][nowPatternPerHp]
        };
    }
};