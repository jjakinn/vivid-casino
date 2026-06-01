// Stub API calls for chanced.com mirror
(function() {
  const ORIGIN = location.origin;
  
  // Mock game data with real CDN image URLs
  const MOCK_GAMES = {
    "getcontent": {
      "data": [
        {
          "type": "banner",
          "slug": "main-banner",
          "show_in_home": true,
          "data": {
            "images": [
              { "image": "images/home/vegasmatt-main.webp", "url": "/", "open_in_new_tab": false },
              { "image": "images/home/hero-girl.html", "url": "/", "open_in_new_tab": false }
            ]
          }
        },
        {
          "type": "category",
          "slug": "slots",
          "name": "Slots",
          "show_in_home": true,
          "show_in_menu": true,
          "games": [
            { "id": 1, "title": "Gates of Olympus", "provider_name": "pragmatic", "identifier": "vs20olympgate", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/pragmatic/vs20olympgate.webp" },
            { "id": 2, "title": "Sweet Bonanza", "provider_name": "pragmatic", "identifier": "vs20fruitsw", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/pragmatic/vs20fruitsw.webp" },
            { "id": 3, "title": "Big Bass Bonanza", "provider_name": "pragmatic", "identifier": "vs10txbigbass", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/pragmatic/vs10txbigbass.webp" },
            { "id": 4, "title": "Sugar Rush", "provider_name": "pragmatic", "identifier": "vs20sugarrush", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/pragmatic/vs20sugarrush.webp" },
            { "id": 5, "title": "Wolf Gold", "provider_name": "pragmatic", "identifier": "vs25wolfgold", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/pragmatic/vs25wolfgold.webp" },
            { "id": 6, "title": "Madame Destiny", "provider_name": "pragmatic", "identifier": "vs20madame", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/pragmatic/vs20madame.webp" }
          ]
        },
        {
          "type": "category",
          "slug": "live-casino",
          "name": "Live Casino",
          "show_in_home": true,
          "show_in_menu": true,
          "games": [
            { "id": 10, "title": "Lightning Roulette", "provider_name": "evolution", "identifier": "evol_lightning_roulette", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/evolution/evol_lightning_roulette.webp" },
            { "id": 11, "title": "Crazy Time", "provider_name": "evolution", "identifier": "evol_crazy_time", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/evolution/evol_crazy_time.webp" },
            { "id": 12, "title": "Blackjack Classic", "provider_name": "evolution", "identifier": "evol_blackjack_classic", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/evolution/evol_blackjack_classic.webp" }
          ]
        },
        {
          "type": "category",
          "slug": "originals",
          "name": "Originals",
          "show_in_home": true,
          "show_in_menu": true,
          "games": [
            { "id": 20, "title": "Mines", "provider_name": "original", "identifier": "mines", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/original/mines.webp" },
            { "id": 21, "title": "Plinko", "provider_name": "original", "identifier": "plinko", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/original/plinko.webp" },
            { "id": 22, "title": "Dice", "provider_name": "original", "identifier": "dice", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/original/dice.webp" },
            { "id": 23, "title": "Limbo", "provider_name": "original", "identifier": "limbo", "image": "https://d3ta80o5sbquaz.cloudfront.net/images/original/limbo.webp" }
          ]
        },
        {
          "type": "section",
          "slug": "provider-logo",
          "show_in_home": true
        }
      ]
    }
  };

  // Stub fetch
  const _fetch = window.fetch;
  window.fetch = function(url, opts) {
    const u = url.toString();
    if (u.includes('api.chanced.com/api/getcontent')) {
      console.log('[STUB] returning mock getcontent');
      return Promise.resolve(new Response(JSON.stringify(MOCK_GAMES.getcontent), {status: 200, headers: {'content-type': 'application/json'}}));
    }
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
