import get from 'lodash.get'
import set from 'lodash.set'

function setup(store, el, target) {

  const commitState = (event) => {
    store.commit('mutateState', {
      attribute: event.target.dataset['vuex'],
      value: event.target.value
    })
  }
  
  el.addEventListener('input', commitState)
  el.value = get(store.state, target)
  el.dataset.vuex = target

}

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
        setup(vnode.context.$store, el, binding.value)
      },
      update: function (el, binding, vnode) {
        el.value = get(vnode.context.$store.state, binding.value)
      },
      mounted: function(el, binding, vnode) {        
        setup(vnode.dirs[0].instance.$store, el, binding.value)
      },
      updated: function (el, binding, vnode) {
        el.value = get(vnode.dirs[0].instance.$store.state, binding.value)
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
