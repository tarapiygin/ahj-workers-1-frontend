import UIManager from './UIManager';
import Worker from './web.worker';

export default class Hasher {
  constructor() {
    this.UIManager = new UIManager();
    this.algItems = ['MD5', 'SHA1', 'SHA256', 'SHA512'];
    this.file = null;
    this.registerEvents();
  }

  init() {
    this.UIManager.drawAlgItems(this.algItems);
  }

  createHashFile(file = null) {
    if (file !== null) this.file = file;
    if (this.file === null) return;
    const worker = new Worker('web.worker.js');
    worker.addEventListener('message', (e) => {
      this.UIManager.drawResult(e.data);
      worker.terminate();
    });
    worker.addEventListener('error', (e) => {
      console.error(e);
    });
    worker.postMessage({ file: this.file, algorithm: this.UIManager.currentAlg });
  }

  registerEvents() {
    this.UIManager.addCreateFileListener(this.createHashFile.bind(this));
    this.UIManager.addClickAlgItemListener(this.createHashFile.bind(this));
  }
}
