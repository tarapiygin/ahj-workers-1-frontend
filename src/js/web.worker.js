import crypto from 'crypto-js';

self.addEventListener('message', (e) => {
  const { file, algorithm } = e.data;
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const wordArray = crypto.lib.WordArray.create(reader.result);
    let hash;
    switch (algorithm) {
      case 'MD5':
        hash = crypto.MD5(wordArray).toString(crypto.enc.Hex);
        break;
      case 'SHA1':
        hash = crypto.SHA1(wordArray).toString(crypto.enc.Hex);
        break;
      case 'SHA256':
        hash = crypto.SHA256(wordArray).toString(crypto.enc.Hex);
        break;
      case 'SHA512':
        hash = crypto.SHA512(wordArray).toString(crypto.enc.Hex);
        break;
      default:
        hash = '';
        break;
    }
    self.postMessage(hash);
  };
});
