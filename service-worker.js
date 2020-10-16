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
    "revision": "b7834a2dab8fe3ed85ca394e78cbdaf8"
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
    "url": "assets/js/10.fd9edecc.js",
    "revision": "3ce114854f3eaf3f410ebef5a2deb4bc"
  },
  {
    "url": "assets/js/11.f3020724.js",
    "revision": "5a333f822798293231572ebda21d2634"
  },
  {
    "url": "assets/js/12.f6ed0d22.js",
    "revision": "71c73e1703830cf1898266dad9d6c561"
  },
  {
    "url": "assets/js/13.9bd24e62.js",
    "revision": "c8b8b3d8ab0106775db9d503617f3445"
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
    "url": "assets/js/17.8d9aa21a.js",
    "revision": "cc2d565c1343c7684f00bce5b2e77bac"
  },
  {
    "url": "assets/js/18.223e90de.js",
    "revision": "8453d92a849a50a0b6e5dce08ed12465"
  },
  {
    "url": "assets/js/19.4844eb3b.js",
    "revision": "d0d92e786966c13bba7e376e53026c91"
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
    "url": "assets/js/21.4ccae6d8.js",
    "revision": "9e380e525129d12be30fa844207e3349"
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
    "url": "assets/js/9.3f8f5a75.js",
    "revision": "56da086653056f7822ead579040b4106"
  },
  {
    "url": "assets/js/app.2c15efbf.js",
    "revision": "a42cc0880c4731953693c95780216e7e"
  },
  {
    "url": "frame/index.html",
    "revision": "9bab77dd8045d923fe442cb3b0d5f85e"
  },
  {
    "url": "frame/jquery/index.html",
    "revision": "53b0d5d217c0aa4d3222e966ae51cefe"
  },
  {
    "url": "frame/react/index.html",
    "revision": "6a5917450912f10274c25d10b78ec0ce"
  },
  {
    "url": "frame/vue/index.html",
    "revision": "f2b859d09635bc333f4f1109f94adae0"
  },
  {
    "url": "frame/vue/watch.html",
    "revision": "0a738a778d0005962b6d5153cf98725d"
  },
  {
    "url": "index.html",
    "revision": "8e40c44f0112e0d945e138e77fedf873"
  },
  {
    "url": "logo.png",
    "revision": "1e8869febc0e03e86fbbfca2298c9d8c"
  },
  {
    "url": "typescript/index.html",
    "revision": "1147f4db67fca2eb74e0cf05a35b9944"
  },
  {
    "url": "typescript/loop.html",
    "revision": "a70245294e1efd087ce43e346af57973"
  },
  {
    "url": "typescript/what.html",
    "revision": "5ee0e688fa9149af56812e752c429090"
  },
  {
    "url": "web/css/index.html",
    "revision": "2ecc02ac65a3eec07b18ffe28aeee2f9"
  },
  {
    "url": "web/html/index.html",
    "revision": "b6d1fc60a3c2f57454c3e3fb1d16c7ff"
  },
  {
    "url": "web/index.html",
    "revision": "14409f9f3fd4e2606cc51e42918c02ab"
  },
  {
    "url": "web/javascript/index.html",
    "revision": "cbb88e29be7392b817b5887a70582270"
  },
  {
    "url": "web/javascript/scoped.html",
    "revision": "033a60e167508f5fd67f7e3b87fe338e"
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
