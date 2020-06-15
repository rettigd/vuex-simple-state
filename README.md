# Vuex Simple State

## Add the project to your main.js
```
import store from './store'
....
import State from 'vuex-state'

Vue.use(State)

```

### Add the mutation to your store
```
import { mutateState } from 'vuex-state'
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

### Add the directive to your code
<input v-state:[your state element]="commitState">
```
<input v-state:email="commitState">
```

Thats it!

### For modules or nested elements
<input v-state:[your state element][child element]="commitState">  
or  
<input v-state:[module][your state element]="commitState">  
or  
<input v-state:[module][your state element][child element]="commitState">  

```
<input v-state:user.email="commitState">
```
