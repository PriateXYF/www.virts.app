export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'www.virts.app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
    script: [{
        src: '/js/jquery.min.js',
      },
      {
        src: '/js/jquery.scrollex.min.js',
      },
      {
        src: '/js/jquery.scrolly.min.js',
      },
      {
        src: '/js/browser.min.js',
      },
      {
        src: '/js/breakpoints.min.js',
      },
      {
        src: '/js/util.js',
      },
      {
        src: '/js/main.js',
        async: true,
        defer: true,
        body: true
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{
    src: '@/plugins/leancloud',
    mode: 'client'
  }, {
    src: '@/plugins/kurimudb',
    mode: 'client'
  }, ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['kurimudb-zero-config'],
  },
}
