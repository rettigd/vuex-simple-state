import get from 'lodash.get'
import set from 'lodash.set'

function setup (store, el, binding) {
  let event = 'input'

  if (Object.keys(binding.modifiers).length) {
    event = Object.keys(binding.modifiers)[0]
  }

  const commitState = (event) => {
    store.commit('mutateState', {
      attribute: event.target.dataset.vuex,
      value: event.target.value
    })
  }

  el.addEventListener(event, commitState)
  el.value = get(store.state, binding.value)
  el.dataset.vuex = binding.value
}

const vuexState = {
  install (Vue) {
    Vue.directive('state', {
      bind: function (el, binding, vnode) {
        setup(vnode.context.$store, el, binding)
      },
      update: function (el, binding, vnode) {
        el.value = get(vnode.context.$store.state, binding.value)
      },
      mounted: function (el, binding, vnode) {
        setup(vnode.dirs[0].instance.$store, el, binding)
      },
      updated: function (el, binding, vnode) {
        el.value = get(vnode.dirs[0].instance.$store.state, binding.value)
      }
    })
  }
}

export function mutateState (state, value) {
  set(state, value.attribute, value.value)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vuexState)
}

export default vuexState
