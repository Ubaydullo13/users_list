export function userReducer(state=[], actions) {
    switch (actions.type) {
      case 'ADD_USER':
        return [...state, {
          id: actions.id,
          name: actions.name,
          age: actions.age
        }];
        
      case 'DELETE_USER':
          return state.filter(user => user.id!== actions.id);
             case 'EDIT':
            return state.map(user => user.id === actions.id? {...user, name: actions.name, age: actions.age} : user);
      default:
        return state
    }
  }