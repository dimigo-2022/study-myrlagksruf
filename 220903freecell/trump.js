/**
 * 트럼프 카드를 생성해주는 클래스입니다. 처음 Trump를 생성하면 카드는 섞이지 않은 상태입니다.
 */
export class Trump {
    /** 카드 배열 */
    max = 13;
    card = [];
    constructor() {
        for (let i = 0; i < this.max * 4; i++) {
            this.card[i] = i;
        }
    }
    /**
     * 카드를 셔플해주는 메서드입니다. 이 메서드를 호출하면 카드가 셔플됩니다. 하지만 이미 pick()으로 뽑은 카드는 셔플되지 않습니다.
     */
    shuffle() {
        for (let i = 0; i < this.max; i++) {
            let temp = Math.floor(Math.random() * (this.max * 4 - i)) + i;
            let pick = this.card[temp];
            this.card[temp] = this.card[i];
            this.card[i] = pick;
        }
    }
    /**
     * @return {Generator<iNext,iNext,undefined>}
     * 한 번 pick()을 호출하면 카드가 저장되면서 카드를 뽑을 준비를 합니다.
     *
     *
     * ```js
     *  // 예제 : 하나만 뽑기
     * const t = new Trump();
     * t.suffle();
     * const p = t.pick();
     * let n = p.next();
     * console.log(n.value);
     *
     *
     * ```
     * ```js
     *  // 예제 : 두개 뽑기
     * const t = new Trump();
     * t.suffle();
     * const p = t.pick();
     * let n = p.next();
     * console.log(n.value.num);
     * n = p.next();
     * console.log(n.value.num);
     *
     *
     * ```
     * ```js
     *  // 예제 : 끝난지 확인하기
     * const t = new Trump();
     * t.suffle();
     * const p = t.pick();
     * let n = p.next();
     * console.log(n.value);
     * if(n.done){
     *  console.log('다 뽑음')
     * } else {
     *  console.log('아직 남음')
     * }
     *
     *
     * ```
     *  ```js
     *  // 예제 : 남은 카드 확인
     * const t = new Trump();
     * t.suffle();
     * const p = t.pick();
     * let n = p.next();
     * console.log(n.value.remain);
     * ```
     */
    *pick() {
        const card = [...this.card];
        for (let i = 0; i < this.max * 4; i++) {
            yield {
                num: card[i],
                remain: this.max * 4 - i - 1
            };
        }
        return {
            num: -1,
            remain: -1
        };
    }
}
