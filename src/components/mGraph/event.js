// 主要存放于mxgraph事件
import {
  mxUndoManager,
  mxEvent
} from 'mxgraph/javascript/mxClient'
export default {
  methods: {
    initUndoManager() {
      // this.undoManager
      this.undoManager = new mxUndoManager();
      const listener = (sender, evt) => {
        console.log(evt);
        console.log(sender)
        this.undoManager.undoableEditHappened(evt.getProperty('edit'));
      }
      // console.log(this.graph);
      this.graph.getModel().addListener(mxEvent.UNDO, listener)
      this.graph.getView().addListener(mxEvent.UNDO, listener)
    },
    undoFun() {
      if (this.graph.isEnabled()) {

        // console.log(this.undoManager.undo())
        this.undoManager.undo();
      }
    }
  }
}
