# Vuex Simple State
### Works with Vue 2 and Vue 3

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


## Vue 2 Example

```
<input v-state="'user.email'">
<input v-state="'module.email'">
<input v-state="'module.customer.email'">


// Make the store state you are bound to reactive to a data element or computed field
...
<input v-state="element">
...
  data() {
    return {
      element: 'employee.email'
    }
  }
...


```

## Vue 3 Example

```
<input v-state="'user.email'">
<input v-state="'module.email'">
<input v-state="'module.customer.email'">

<input v-state="data.element"> //Reactive element
...
  setup() {
    const data = reactive({
      element: 'employee.email'
    })
    return {
      data
    }
  }
...

```


## Events

State is sync'd on the input event, but you can update on any event

```
<input v-state.blur="'user.email'">             //Updates state on focus loss
<input v-state.my-custom-event="'user.email'">  // You'll need to manually dispatch custom events
```