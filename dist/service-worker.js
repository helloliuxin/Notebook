/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "deed5a80f9c2b87ca9fc7cdc1df2489a"
  },
  {
    "url": "assets/css/0.styles.fa33c848.css",
    "revision": "adb8087668e3adb2ea144a6f9baf0c43"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.115de761.js",
    "revision": "57db09fa1d3c2287f7265feeba54c654"
  },
  {
    "url": "assets/js/11.f3020724.js",
    "revision": "5a333f822798293231572ebda21d2634"
  },
  {
    "url": "assets/js/12.5741b649.js",
    "revision": "b26ce057f4d919c7f0f3985973f68785"
  },
  {
    "url": "assets/js/13.265e3502.js",
    "revision": "3f682899fe2b800f71801aa5ddefccbd"
  },
  {
    "url": "assets/js/14.7f57a709.js",
    "revision": "50fc9f437b86dbe8e2bdc872ad9a4789"
  },
  {
    "url": "assets/js/15.b9bdf725.js",
    "revision": "97b37b57596067278f3cc054c6b0ca10"
  },
  {
    "url": "assets/js/16.6390b3cf.js",
    "revision": "ee6fca2fcce45ea17f3198a1545385b8"
  },
  {
    "url": "assets/js/17.44f04fc2.js",
    "revision": "3a84c041d5fdf6f944c7b81fc34c7064"
  },
  {
    "url": "assets/js/18.925e2e74.js",
    "revision": "c4db04c0f7831764e4818894826683b4"
  },
  {
    "url": "assets/js/19.b02babc0.js",
    "revision": "2e31e95e1df15603f4b8c57cf513165a"
  },
  {
    "url": "assets/js/2.5cd01ec4.js",
    "revision": "5ff1a1c6a8b162efedc2c9ba497cf607"
  },
  {
    "url": "assets/js/20.0127e308.js",
    "revision": "8a39b56466643e1019a41b9ccb639183"
  },
  {
    "url": "assets/js/21.3eddde23.js",
    "revision": "b45cad0cea12fce6aa8b90045379f2b9"
  },
  {
    "url": "assets/js/22.5060622b.js",
    "revision": "a87b1515abba1aefb41773871d36c145"
  },
  {
    "url": "assets/js/23.5650a5b7.js",
    "revision": "a1704cd0cc6dbb641a53a49e54289318"
  },
  {
    "url": "assets/js/24.0322581d.js",
    "revision": "0c8b32703f87408ae633f9cd9444804e"
  },
  {
    "url": "assets/js/3.b2070294.js",
    "revision": "13499cc79d7755b6820de7c8c282bc96"
  },
  {
    "url": "assets/js/4.99cd819a.js",
    "revision": "3bcce52c19998bce7ff2565af2b3ab53"
  },
  {
    "url": "assets/js/5.ca51fcdd.js",
    "revision": "ca832f6a5e8b1d48200c7867484f0809"
  },
  {
    "url": "assets/js/6.1c9e6b06.js",
    "revision": "1e8b9b88c004e8b0d585710cb484da27"
  },
  {
    "url": "assets/js/7.cb0f0a87.js",
    "revision": "a587ef2e1e971510fcd7b71dc743af5e"
  },
  {
    "url": "assets/js/8.97bc3521.js",
    "revision": "1acb4adab12c63145327e2fb88929bde"
  },
  {
    "url": "assets/js/9.282a18cb.js",
    "revision": "b636d441f9d4d61e35a6b5fbe492acf1"
  },
  {
    "url": "assets/js/app.cdc0303a.js",
    "revision": "4437c99647696586bce77a00ad021bbb"
  },
  {
    "url": "frame/index.html",
    "revision": "97cc1294f9ab03e0cd29f9e8c9820ea2"
  },
  {
    "url": "frame/jquery/index.html",
    "revision": "eec9ba7e31969d1405190db41714681c"
  },
  {
    "url": "frame/react/index.html",
    "revision": "25f44d0b5ce4d97f3a9307ec3e3bd6ef"
  },
  {
    "url": "frame/vue/index.html",
    "revision": "2a2e376dc864683eee4c6b72fb46d738"
  },
  {
    "url": "frame/vue/watch.html",
    "revision": "cd2143b3d5349bb28deb6306f1088291"
  },
  {
    "url": "index.html",
    "revision": "4351a5e4f9587c66268e76a090fa940a"
  },
  {
    "url": "logo.png",
    "revision": "1e8869febc0e03e86fbbfca2298c9d8c"
  },
  {
    "url": "typescript/index.html",
    "revision": "aa6c8cbb1c394274820c54ac78a8d4c0"
  },
  {
    "url": "typescript/loop.html",
    "revision": "4ffcf4eee7308c546bbc1f47b2c2dd45"
  },
  {
    "url": "typescript/what.html",
    "revision": "f47934d4b754a24cb49a98d5a8d86443"
  },
  {
    "url": "web/css/index.html",
    "revision": "dbabcbe780cdae20bf2467b159ffd92d"
  },
  {
    "url": "web/html/index.html",
    "revision": "3629cfbfc49fd24184b719d7ba2eb6eb"
  },
  {
    "url": "web/index.html",
    "revision": "75d87f722c25a310c2f34c75418d8a53"
  },
  {
    "url": "web/javascript/index.html",
    "revision": "8c884eeb96e07715dd085c969dfde875"
  },
  {
    "url": "web/javascript/scoped.html",
    "revision": "c8bc5358136e4c498cbcf5e9ab7960a4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
