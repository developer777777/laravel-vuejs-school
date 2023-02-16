import './bootstrap';

import { createApp, h } from 'vue'
import { createInertiaApp, Link } from '@inertiajs/vue3'
import MainLayout from "./layouts/MainLayout.vue"
import VueSweetalert2 from 'vue-sweetalert2';

import { ZiggyVue } from 'ziggy';
import { Ziggy } from './ziggy';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    let page = pages[`./Pages/${name}.vue`]

    page.default.layout = page.default.layout || MainLayout
    return page

  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue, Ziggy)
      .component("Link", Link)
      .mixin({methods: {route}})
      .use(VueSweetalert2)
      .mount(el)
  },
})
