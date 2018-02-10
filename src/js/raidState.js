// 현재 턴, 파티 버프/디버프 정보, 보스(들)의 상태정보
class RaidState {
    constructor(combatState) {
        let partyBuffList = [];
        let partyDebuffList = [];

        for (let partyState of combatState.party) {
            partyBuffList.push(partyState.buffs);
            partyDebuffList.push(partyState.debuffs);
        }

        this.turn = combatState.turn;
        this.partyBuffList = partyBuffList;
        this.partyDebuffList = partyDebuffList;
    }

    hasPartyBuff(buffId) {
        for(let partyBuff of this.partyBuffList) {
            if(partyBuff.indexOf(buffId)) {
                return true;
            }
        }

        return false;
    }

    hasPartyDebuff(debuffId) {
        for(let partyDebuff of this.partyDebuffList) {
            if(partyDebuff.indexOf(debuffId)) {
                return true;
            }
        }

        return false;
    }
}