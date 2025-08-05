import { debounce } from './debounce.js';
import { register } from './register.js';

const urls = (await chrome.storage.local.get('urls'))['urls'];

/** @type {HTMLTextAreaElement} */
const urlsInput = document.querySelector('#urls');
urlsInput.value = urls;

/** @type {HTMLDivElement} */
const errorDiv = document.querySelector('#error');

const error = await register();
errorDiv.innerText = error ?? '';

urlsInput.addEventListener(
  'input',
  debounce(async function (event) {
    await chrome.storage.local.set({ urls: urlsInput.value });
    const error = await register();
    errorDiv.innerText = error ?? '';
    console.log('saved');
  }, 100),
);
