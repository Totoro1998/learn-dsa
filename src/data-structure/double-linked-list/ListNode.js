export default class ListNode {
  data;
  pred;
  succ;
  constructor(data, pred, succ) {
    this.data = data;
    this.pred = pred;
    this.succ = succ;
  }

  insertAsSucc(e) {
    const node = new ListNode(e, this, this.succ);
    this.succ && (this.succ.pred = node);
    this.succ = node;
    return node;
  }

  insertAsPred(e) {
    const node = new ListNode(e, this.pred, this);
    this.pred && (this.pred.succ = node);
    this.pred = node;
    return node;
  }
}
