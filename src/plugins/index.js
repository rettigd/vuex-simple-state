import get from 'lodash.get'
import set from 'lodash.set'

const YVuex = {
  install(Vue) {
    Vue.mixin({
      methods: {
        yCommit(event) {
          this.$store.commit('yVuexSet', {
            attribute: event.target.dataset['vuex'],
            value: event.target.value
          })
        }
      }
    }),
    Vue.directive('yvuex', {
      bind: function(el, binding, vnode) {
        let yCommit = binding.value;
        let target = binding.arg
            
        if (Object.keys(binding.modifiers).length !== 0) {
          target = `${target}.${Object.keys(binding.modifiers).join(".")}`
        }

        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          el.addEventListener('keyup', yCommit)
        }
        if (el.nodeName === 'SELECT') {
          el.addEventListener('change', yCommit)
        }

        el.value = get(vnode.context.$store.state, target)
        el.dataset.vuex = target
      },
      update: function (el, binding, vnode) {
        let target = binding.arg
        if (Object.keys(binding.modifiers).length !== 0) {
          target = `${target}.${Object.keys(binding.modifiers).join(".")}`
        }
        el.value = get(vnode.context.$store.state, target)
      }
    })
  }
}

export const yVuexSet = function (state, value) {
  set(state, value.attribute, value.value);
}

export default YVuex

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(YVuex)
}
