# Vuex Simple State
### Works with Vue 2 and Vue 3 (Option API, Composition API coming soon)

## Installation
```
npm install vuex-simple-state --save
```

or

```
yarn add vuex-simple-state
```

## Add the project to your main.js
```
import store from './store'
...
import State from 'vuex-simple-state'

Vue.use(State)
```

## Add the mutation to your store
```
import { mutateState } from 'vuex-simple-state'
...
  state: {
    email: 'me@example.com',
    user: {
      email: ''
    }
  }
  mutations: {
    mutateState //Add the mutation here
  },
...
```

## Add the directive to your code
`<input v-state="[element name]">`

```
<input v-state="'email'">
```

## For modules or nested elements
`<input v-state="'[your state element].[child element]'">`

or  

`<input v-state="'[module].[your state element]'">`

or  

`<input v-state="'[module].[your state element].[child element]'">`


## Examples

```
<input v-state="'user.email'">
<input v-state="'module.email'">
<input v-state="'module.customer.email'">


// Make the store state you are bound to responsive to a data element or computed field
...
<input v-state="myDataElement">
...
  data() {
    return {
      myDataElement: 'employee.email'
    }
  }
...


```

## Events

State is sync'd on the input event, but you can update any event

```
<input v-state.blur="'user.email'">             //Updates state on focus loss
<input v-state.my-custom-event="'user.email'">  // You'll need to manually dispatch custom events
```