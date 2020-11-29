node  = document.createElement('link');
node.type = 'text/css';
node.href = browser.extension.getURL('css/main.css');
node.rel  = 'stylesheet';
node.media = 'all';
document.getElementsByTagName('head')[0].appendChild(node);

node = document.createElement('script');
node.src = browser.extension.getURL('js/mustache.min.js');
document.head.appendChild(node);

node = document.createElement('script');
node.type = 'module';
node.src = browser.extension.getURL('main.js');
document.head.appendChild(node);

node.onload = function(){
  var detail = { 
      getURL: function(path) { return browser.extension.getURL(path); } 
  };
  var eventDetail = cloneInto(detail, document, { cloneFunctions: true });
  var event = new CustomEvent("cgt-loader-event", { detail: eventDetail });
  document.dispatchEvent(event);
};