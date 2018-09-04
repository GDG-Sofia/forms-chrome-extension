declare var chrome: any;

chrome.runtime.onMessage.addListener(() => {
  console.log('received event from popup');
});
