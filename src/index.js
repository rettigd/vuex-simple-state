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
        let target = binding.value
        var store = vnode.context.$store

        const commitState = (event) => {
          store.commit('mutateState', {
            attribute: event.target.dataset['vuex'],
            value: event.target.value
          })
        }

        el.addEventListener('input', commitState)

        el.value = get(store.state, target)
        el.dataset.vuex = target
      },
      update: function (el, binding, vnode) {
        let target = binding.value

        el.value = get(vnode.context.$store.state, target)
      },
      mounted: function(el, binding, vnode) {
        
        let target = binding.value
        var store = vnode.dirs[0].instance.$store

        const commitState = (event) => {
          store.commit('mutateState', {
            attribute: event.target.dataset['vuex'],
            value: event.target.value
          })
        }
       
        el.addEventListener('input', commitState)

        el.value = get(store.state, target)
        el.dataset.vuex = target
      },
      updated: function (el, binding, vnode) {
        let target = binding.value
        let store  = vnode.dirs[0].instance.$store

        el.value = get(store.state, target)
      }
    })
  }
}

export function  mutateState (state, value) {
  set(state, value.attribute, value.value);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vuexState)
}

export default vuexState
