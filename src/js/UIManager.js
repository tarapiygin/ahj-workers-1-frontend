export default class UIManager {
  constructor() {
    this.input = document.querySelector('.hasher_overlapped');
    this.overlapEl = document.querySelector('.hasher_overlap');
    this.selectionAlgEl = document.querySelector('.algorithm-selection_title');
    this.algItemsEl = document.querySelector('.hasher_algorithm-items');
    this.resultEl = document.querySelector('.hasher_result');
    this.createFileListeners = [];
    this.clickAlgItem = [];
    this.registerEvents();
  }

  get currentAlg() {
    return this.selectionAlgEl.innerText;
  }

  drawAlgItems(algItems) {
    const md5Index = 0;
    this.selectionAlgEl.innerText = algItems[md5Index];
    algItems.forEach((alg) => {
      const item = document.createElement('li');
      item.classList.add('hasher_algorithm-item');
      item.innerText = alg;
      item.addEventListener('click', this.onClickAlgItem.bind(this));
      this.algItemsEl.append(item);
    });
  }

  addCreateFileListener(callback) {
    this.createFileListeners.push(callback);
  }

  addClickAlgItemListener(callback) {
    this.clickAlgItem.push(callback);
  }

  drawResult(data) {
    this.resultEl.innerText = data;
  }

  onCreateFile(e) {
    let files;
    if ('files' in e.currentTarget) {
      files = e.currentTarget.files;
      this.createFileListeners.forEach((o) => o.call(null, files[0]));
    } else if (e.dataTransfer.files.length > 0) {
      files = e.dataTransfer.files;
      this.createFileListeners.forEach((o) => o.call(null, files[0]));
    }
  }

  onClickAlgItem(e) {
    this.algItemsEl.classList.add('hidden');
    this.selectionAlgEl.innerText = e.currentTarget.innerText;
    this.clickAlgItem.forEach((o) => o.call(null));
  }

  registerEvents() {
    this.overlapEl.addEventListener('dragover', (e) => {
      e.preventDefault();
    });
    this.overlapEl.addEventListener('drop', (e) => {
      e.preventDefault();
      this.onCreateFile(e); // const files = Array.from(e.dataTransfer.files)
    });
    this.input.addEventListener('change', this.onCreateFile.bind(this));
    this.overlapEl.addEventListener('click', () => {
      this.input.value = null;
      this.input.dispatchEvent(new MouseEvent('click'));
    });
    this.selectionAlgEl.addEventListener('click', () => {
      this.algItemsEl.classList.remove('hidden');
    });
  }
}
