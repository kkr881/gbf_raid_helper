var magnaPatterns = {
    600050: {
        name: 'Lv50 티아마트 마그나',
        comment: {
            0: { title: '비고', desc: '즉사 무효\nOVER DRIVE 모드 시 충전 턴 단축' }
        },
        normalMode: {
            0: [{ title: '백 드래프트', desc: '아군 전체 화속성 + 풍속성 데미지\n아군 전체 어빌리티 봉인 2턴\n보스의 방어 다운' },
            { title: '토네이도 디제스터', desc: '아군 전체 데미지\n아군 전체 오의 게이지 -5%' }]
        },
        overDriveMode: {
            0: [{ title: '난회의 템페스트', desc: '랜덤 5회 특대 데미지' },
            { title: '토네이도 디제스터', desc: '아군 전체 데미지\n아군 전체 오의 게이지 -5%' }]
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
    507055: {
        name: 'Lv60 유그드라실 마그나',
        comment: {
            0: { title: '비고', desc: '통상공격이 다단 히트\n(일정 횟수 무작위 공격)\n오염\n(HP가 적을수록 데미지 업)' }
        },
        normalMode: {
            0: [{ title: '네자 맨틀', desc: '아군 전체 화속성 + 토속성 데미지\n아군 전체 공격력 다운' },
            { title: '액시스 문디', desc: '아군 전체 데미지\n어빌리티 봉인, 방어 다운 부여' }]
        },
        overDriveMode: {
            0: [{ title: '창세의 루믹스', desc: '아군 전체 데미지, 오의 봉인 부여\n보스의 체력 20만 회복' },
            { title: '액시스 문디', desc: '아군 전체 데미지\n어빌리티 봉인, 방어 다운 부여' }]
        }
    },
    713075: {
        name: 'Lv75 슈발리에 마그나',
        hpTrigger: {
            50: { title: '빛의 검', desc: '랜덤 5회 광속성 데미지\n5번째 공격을 맞은 아군에게\n마비 부여 및 모든 강화 효과 소거' }
        },
        comment: {
            0: { title: '비고', desc: '언데드, 즉사 무효\n상태효과 새크리파이스\n보스에게 부여된 약화효과 갯수만큼\n공격력 7% 업/방어력 7% 다운\n턴 종료 시 고정 데미지' }
        },
        commonMode: {
            50: [{ title: '모드: 이지스 머지', desc: '보스에게 전속성 데미지 컷\n방어력 업, 약화내성 업\n재생(턴 당 65535) 부여' }],
            0: [{ title: '빛의 검', desc: '랜덤 5회 광속성 데미지\n5번째 공격을 맞은 아군에게\n마비 부여 및 모든 강화 효과 소거' }]
        },
        turn: {
            1: [{
                title: '모드: 이지스 머지', desc: '보스에게 전속성 데미지 컷\n방어력 업, 약화내성 업\n재생(턴 당 65535) 부여', option: { type: 'large', value: 50 }
            }]
        },
        condition: {
            1003: [{
                title: '모드: 이지스 머지 해제', desc: '약화내성 업이 디스펠 된 경우 발동\n모드: 이지스 머지로 부여된 강화 효과 삭제\n보스에게 새크리파이스\n더블어택 확률 업, 공격 업 부여', option: { type: 'large', value: 50 }
            }]
        }
    },
    826076: {
        name: 'Lv75 세레스트 마그나',
        hpTrigger: {
            50: { title: '오버드 이네인', desc: '아군 암속성 전체 데미지\n진정한 힘 개방\n(공격력 다운, 더블어택 비율 업)' },
            25: { title: '보이드 올', desc: '아군 전체 HP 회복(상한 5000)\n아군 전체 암흑 2턴, 암속성 방어 다운 2턴,\n부패 10턴 부여' }
        },
        comment: {
            0: { title: '비고', desc: '즉사 내성\n심연의 안개는 일반 공격과 마찬가지로\n차지 턴 증가' }
        },
        normalMode: {
            0: [{ title: '무상의 안개', desc: '아군 전체 더블어택 비율 다운 3턴\n 부패 2턴, 언데드:심도1 5턴 부여' },
            { title: '고요한 안개', desc: '보스의 약화 효과 하나 회복\n더블어택 비율 업\n아군 전체 재생 효과 6턴 부여' }]
        },
        overDriveMode: {
            0: [{title:'오버드 이네인', desc:'아군 암속성 전체 데미지\n언데드:심도1 5턴 부여'}]
        },
        partyDebuff: {
            1525: [{
                title: '심연의 안개', desc: '아군 전체 모든 상태 효과 소거\n어빌리티 봉인 1턴, 부패 2턴\n언데드:심도2 5턴 부여', option: { type: 'large', value: 25 }
            }]
        }
    }
};