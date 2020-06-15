import get from 'lodash.get'
import set from 'lodash.set'

const vuexState = {
  install(Vue) {
    Vue.mixin({
      methods: {
        commitState(event) {
          this.$store.commit('mutateState', {
            attribute: event.target.dataset['vuex'],
            value: event.target.value
          })
        }
      }
    }),
    Vue.directive('state', {
      bind: function(el, binding, vnode) {
        let commitState = binding.value;
        let target = binding.arg
            
        if (Object.keys(binding.modifiers).length !== 0) {
          target = `${target}.${Object.keys(binding.modifiers).join(".")}`
        }

        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          el.addEventListener('keyup', commitState)
        }
        if (el.nodeName === 'SELECT') {
          el.addEventListener('change', commitState)
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

export const mutateState = function (state, value) {
  set(state, value.attribute, value.value);
}

export default vuexState

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vuexState)
}
