export async function register() {
  await chrome.scripting.unregisterContentScripts({ ids: ['css-injection'] }).catch(() => {});
  /** @type {string} */
  const urls = (await chrome.storage.local.get('urls'))['urls'];
  if (!urls) return;

  const excludeMatches = urls
    .trim()
    .split(/\r\n|\n|\r/)
    .map((url) => url.trim());

  /** @type {chrome.scripting.RegisteredContentScript} */
  const contentScript = {
    id: 'css-injection',
    matches: ['<all_urls>'],
    css: ['css/opt-out-dark-theme.css'],
    runAt: 'document_start',
    allFrames: true,
    world: 'MAIN',
    excludeMatches, // dark mode enabled
  };

  return await chrome.scripting.registerContentScripts([contentScript]).catch((e) => e);

  // console.log(await chrome.scripting.getRegisteredContentScripts());
}
