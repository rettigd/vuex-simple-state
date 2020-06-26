import get from 'lodash.get'
import set from 'lodash.set'

function setup (store, el, binding) {
  const event = getEvent(binding)

  const commitState = event => commit(store)

  el.addEventListener(event, commitState)
  el.value = get(store.state, binding.value)
  el.dataset.vuex = binding.value
}

function update (store, el, binding) {
  el.value = get(store.state, binding.value)
  el.dataset.vuex = binding.value
}

function commit (store) {
  store.commit('mutateState', {
    attribute: event.target.dataset.vuex,
    value: event.target.value
  })
}

function getEvent (binding) {
  let event = 'input'

  if (Object.keys(binding.modifiers).length) {
    event = Object.keys(binding.modifiers)[0]
  }

  return event
}

function destroy (store, el, binding) {
  const event = getEvent(binding)
  const commitState = event => commit(store)

  el.removeEventListener(event, commitState)
}

const vuexState = {
  install (Vue) {
    Vue.directive('state', {
      bind: function (el, binding, vnode) {
        setup(vnode.context.$store, el, binding)
      },
      update: function (el, binding, vnode) {
        update(vnode.context.$store, el, binding)
      },
      unbind: function (el, binding, vnode) {
        destroy(vnode.context.$store, el, binding)
      },
      mounted: function (el, binding, vnode) {
        setup(vnode.dirs[0].instance.$store, el, binding)
      },
      updated: function (el, binding, vnode) {
        update(vnode.dirs[0].instance.$store, el, binding)
      },
      unmounted: function (el, binding, vnode) {
        destroy(vnode.dirs[0].instance.$store, el, binding)
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
