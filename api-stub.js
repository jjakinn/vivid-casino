// Stub API calls for chanced.com mirror
(function() {
  const ORIGIN = location.origin;
  
  // Stub fetch
  const _fetch = window.fetch;
  window.fetch = function(url, opts) {
    const u = url.toString();
    if (u.includes('api.chanced.com') || u.includes('tracking.chanced.com') || u.includes('intercom.io') || u.includes('pusher.com')) {
      console.log('[STUB] fetch:', u);
      return Promise.resolve(new Response('{}', {status: 200, headers: {'content-type': 'application/json'}}));
    }
    return _fetch.apply(this, arguments);
  };
  
  // Stub XMLHttpRequest
  const _open = XMLHttpRequest.prototype.open;
  const _send = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url) {
    this._stubbed = url.includes('api.chanced.com') || url.includes('tracking.chanced.com') || url.includes('intercom.io');
    this._stubUrl = url;
    return _open.apply(this, arguments);
  };
  XMLHttpRequest.prototype.send = function() {
    if (this._stubbed) {
      console.log('[STUB] XHR:', this._stubUrl);
      const self = this;
      setTimeout(function() {
        self.readyState = 4;
        self.status = 200;
        self.responseText = '{}';
        self.response = '{}';
        if (self.onreadystatechange) self.onreadystatechange();
        if (self.onload) self.onload();
      }, 0);
      return;
    }
    return _send.apply(this, arguments);
  };
  
  // Stub WebSocket
  const _WebSocket = window.WebSocket;
  window.WebSocket = function(url) {
    console.log('[STUB] WebSocket:', url);
    const fake = {
      send: function(){},
      close: function(){},
      onopen: null, onmessage: null, onclose: null, onerror: null,
      readyState: 1
    };
    setTimeout(function() {
      if (fake.onopen) fake.onopen({});
    }, 0);
    return fake;
  };
  window.WebSocket.CONNECTING = 0;
  window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2;
  window.WebSocket.CLOSED = 3;
})();
