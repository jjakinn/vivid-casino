// Stub API calls for chanced.com mirror
(function() {
  const CDN = "https://d3ta80o5sbquaz.cloudfront.net";

  // Working Pragmatic Play game IDs
  const PRAGMATIC_GAMES = [
    { id: 1, title: "Sweet Bonanza", identifier: "vs20fruitsw", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: false, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 2, title: "Gates of Olympus", identifier: "vs20olympgate", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: true, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 3, title: "Big Bass Bonanza", identifier: "vs10txbigbass", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: false, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 4, title: "Sugar Rush", identifier: "vs20sugarrush", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: false, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 5, title: "Wolf Gold", identifier: "vs25wolfgold", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: true, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 6, title: "Joker's Jewels", identifier: "vs5joker", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: false, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 7, title: "Egyptian Dreams", identifier: "vs25scarabqueen", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: false, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 8, title: "The Dog House", identifier: "vs20doghouse", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: false, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 9, title: "Aztec King", identifier: "vs25aztecking", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: false, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" },
    { id: 10, title: "The Hand of Midas", identifier: "vs20midas", software: "pragmatic", provider: "pragmatic", provider_name: "Pragmatic Play", has_jackpot: false, provider_id: 1, updated_at: "2024-01-01T00:00:00.000Z" }
  ];

  // Mock category data
  const MOCK_ACTIVE_CATEGORIES = {
    result: {
      categories: [
        {
          id: 1,
          name: "Slots",
          slug: "slots",
          type: "category",
          show_in_home: true,
          show_in_menu: true,
          api_slug: "slots",
          data: { hide_pills: false, hide_sort_by: false },
          games: PRAGMATIC_GAMES.slice(0, 6)
        },
        {
          id: 2,
          name: "Featured",
          slug: "featured",
          type: "category",
          show_in_home: true,
          show_in_menu: true,
          api_slug: "featured",
          data: { hide_pills: false, hide_sort_by: false },
          games: PRAGMATIC_GAMES.slice(2, 8)
        },
        {
          id: 3,
          name: "New Releases",
          slug: "new-releases",
          type: "category",
          show_in_home: true,
          show_in_menu: true,
          api_slug: "new-releases",
          data: { hide_pills: false, hide_sort_by: false },
          games: PRAGMATIC_GAMES.slice(4, 10)
        }
      ],
      providers: [
        { id: 1, name: "Pragmatic Play", count: 10, banned_states: [] }
      ],
      promo_race: null
    }
  };

  const MOCK_MAIN_BANNER = {
    result: {
      categories: [
        {
          id: 1,
          title: "Welcome Bonus",
          slug: "welcome",
          image: "images/home/vegasmatt-main.webp",
          url: "/",
          open_in_new_tab: false
        }
      ]
    }
  };

  const MOCK_ALL_GAMES = {
    results: {
      data: PRAGMATIC_GAMES,
      current_page: 1,
      last_page: 1,
      per_page: 20,
      total: PRAGMATIC_GAMES.length
    },
    providers: [
      { id: 1, name: "Pragmatic Play", count: 10, banned_states: [] }
    ]
  };

  const MOCK_USER = {
    id: 1,
    username: "guest",
    balance: 0,
    game_mode: "SC",
    jackpot_amount: null,
    can_bypass_geofencing: false
  };

  const MOCK_SITE_CONFIG = {};

  // Helper to get response for a URL
  function getMockResponse(url) {
    if (url.includes('/active-categories')) return JSON.stringify(MOCK_ACTIVE_CATEGORIES);
    if (url.includes('/main-banner')) return JSON.stringify(MOCK_MAIN_BANNER);
    if (url.includes('/all/games') || url.includes('/slots') || url.includes('/featured') || url.includes('/new-releases')) return JSON.stringify(MOCK_ALL_GAMES);
    if (url.includes('/site-config')) return JSON.stringify(MOCK_SITE_CONFIG);
    if (url.includes('/user') && !url.includes('/users/')) return JSON.stringify(MOCK_USER);
    return '{}';
  }

  // Stub fetch
  const _fetch = window.fetch;
  window.fetch = function(url, opts) {
    const u = url.toString();
    if (u.includes('api.chanced.com') || u.includes('tracking.chanced.com') || u.includes('intercom.io') || u.includes('pusher.com')) {
      console.log('[STUB] fetch:', u);
      return Promise.resolve(new Response(getMockResponse(u), {status: 200, headers: {'content-type': 'application/json'}}));
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
  XMLHttpRequest.prototype.send = function(body) {
    if (this._stubbed) {
      console.log('[STUB] XHR:', this._stubUrl);
      const self = this;
      const response = getMockResponse(this._stubUrl);
      setTimeout(function() {
        self.readyState = 4;
        self.status = 200;
        self.responseText = response;
        self.response = response;
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
