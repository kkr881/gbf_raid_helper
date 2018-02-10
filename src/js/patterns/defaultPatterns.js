// 기본 형식
/*
    id: {
    name : 'name',
        hpTrigger: {
            perHp: {title: 'title', desc: 'desc'}
        },
        comment: {
            perHp: {title: 'title', desc: 'desc'}
        },
        commonMode:{
            perHp: [{title: 'title', desc: 'desc'}]
        },
        normalMode:{
            perHp: [{title: 'title', desc: 'desc'}]
        },
        overDriveMode:{
            perHp: [{title: 'title', desc: 'desc'}]
        },
        turn: {
            turn: [{title: 'title', desc: 'desc', option: { type: 'large/small', value: perHp }}]
        },
        condition: {
            conditionId: [{title: 'title', desc: 'desc', option: { type: 'large/small', value: perHp }}]
        },
        partyDebuff: {
            partyDebuffId: [{title: 'title', desc: 'desc', option: { type: 'large/small', value: perHp }}]
        }
},*/
var defaultPatterns = {
    9900501: {
        name: '훈련용 터렛γ',
        hpTrigger: {
            90: { title: 'HP90 트리거', desc: 'HP가 90이상일때만 노출' }
        },
        comment: {
            90: { title: 'HP90 안내', desc: 'HP가 90이상일때만 노출' },
            0: { title: 'HP0 안내', desc: 'HP가 90 미만 0이상일때만 노출' }
        },
        commonMode: {
            90: [{ title: 'HP90 공통 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 공통 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        normalMode: {
            90: [{ title: 'HP90 일반 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 일반 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        overDriveMode: {
            90: [{ title: 'HP90 OD 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 OD 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        turn: {
            1: [{
                title: '턴 트리거 테스트용', desc: 'HP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        },
        partyDebuff: {
            1525: [{
                title: '디버프 테스트용', desc: '암잔 1스 사용 시\nHP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        }
    },
    9900502: {
        name: '훈련용 터렛γ',
        hpTrigger: {
            90: { title: 'HP90 트리거', desc: 'HP가 90이상일때만 노출' }
        },
        comment: {
            90: { title: 'HP90 안내', desc: 'HP가 90이상일때만 노출' },
            0: { title: 'HP0 안내', desc: 'HP가 90 미만 0이상일때만 노출' }
        },
        commonMode: {
            90: [{ title: 'HP90 공통 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 공통 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        normalMode: {
            90: [{ title: 'HP90 일반 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 일반 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        overDriveMode: {
            90: [{ title: 'HP90 OD 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 OD 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        turn: {
            1: [{
                title: '턴 트리거 테스트용', desc: 'HP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        },
        partyDebuff: {
            1525: [{
                title: '디버프 테스트용', desc: '암잔 1스 사용 시\nHP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        }
    },
    9900503: {
        name: '훈련용 터렛γ',
        hpTrigger: {
            90: { title: 'HP90 트리거', desc: 'HP가 90이상일때만 노출' }
        },
        comment: {
            90: { title: 'HP90 안내', desc: 'HP가 90이상일때만 노출' },
            0: { title: 'HP0 안내', desc: 'HP가 90 미만 0이상일때만 노출' }
        },
        commonMode: {
            90: [{ title: 'HP90 공통 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 공통 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        normalMode: {
            90: [{ title: 'HP90 일반 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 일반 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        overDriveMode: {
            90: [{ title: 'HP90 OD 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 OD 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        turn: {
            1: [{
                title: '턴 트리거 테스트용', desc: 'HP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        },
        partyDebuff: {
            1525: [{
                title: '디버프 테스트용', desc: '암잔 1스 사용 시\nHP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        }
    },
    9900504: {
        name: '훈련용 터렛γ',
        hpTrigger: {
            90: { title: 'HP90 트리거', desc: 'HP가 90이상일때만 노출' }
        },
        comment: {
            90: { title: 'HP90 안내', desc: 'HP가 90이상일때만 노출' },
            0: { title: 'HP0 안내', desc: 'HP가 90 미만 0이상일때만 노출' }
        },
        commonMode: {
            90: [{ title: 'HP90 공통 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 공통 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        normalMode: {
            90: [{ title: 'HP90 일반 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 일반 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        overDriveMode: {
            90: [{ title: 'HP90 OD 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 OD 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        turn: {
            1: [{
                title: '턴 트리거 테스트용', desc: 'HP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        },
        partyDebuff: {
            1525: [{
                title: '디버프 테스트용', desc: '암잔 1스 사용 시\nHP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        }
    },
    9900505: {
        name: '훈련용 터렛γ',
        hpTrigger: {
            90: { title: 'HP90 트리거', desc: 'HP가 90이상일때만 노출' }
        },
        comment: {
            90: { title: 'HP90 안내', desc: 'HP가 90이상일때만 노출' },
            0: { title: 'HP0 안내', desc: 'HP가 90 미만 0이상일때만 노출' }
        },
        commonMode: {
            90: [{ title: 'HP90 공통 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 공통 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        normalMode: {
            90: [{ title: 'HP90 일반 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 일반 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        overDriveMode: {
            90: [{ title: 'HP90 OD 패턴', desc: 'HP가 90이상일때만 노출' }],
            0: [{ title: 'HP0 OD 패턴', desc: 'HP가 90 미만 0이상일때만 노출' }]
        },
        turn: {
            1: [{
                title: '턴 트리거 테스트용', desc: 'HP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        },
        partyDebuff: {
            1525: [{
                title: '디버프 테스트용', desc: '암잔 1스 사용 시\nHP가 90이상일때만 노출', option: { type: 'large', value: 90 }
            }]
        }
    }
};