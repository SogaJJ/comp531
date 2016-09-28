
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			return {nextId: state.nextId + 1, todoItems: [...state.todoItems, 
				{id: state.nextId + 1, text: action.text, done: false}]
			}
		case 'REMOVE_TODO':
			return {nextId: state.nextId, todoItems: state.todoItems.filter(({id, text}) => id != action.id)}
		case 'TOGGLE_TODO':
			return {nextId: state.nextId, todoItems: state.todoItems.map(({id, text, done}) => {
				return id == action.id ? {id, text, done : !done} : {id, text, done}
			})}
		default: 
			return state
	}
}

export default Reducer