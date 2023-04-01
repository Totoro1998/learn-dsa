export default class ListNode {
  constructor(data, pred, next) {
    this.data = data;
    this.pred = pred;
    this.next = next;
  }
  insertAsNext(e) {
    const node = new ListNode(e, this, this.next);
    this.next && (this.next.pred = node);
    this.next = node;
    return node;
  }
  insertAsPred(e) {
    const node = new ListNode(e, this.pred, this);
    this.pred && (this.pred.next = node);
    this.pred = node;
    return node;
  }
}
