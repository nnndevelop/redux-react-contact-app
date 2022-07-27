const initialState = [
    {
        id: 0,
        name: 'John Smith',
        email: 'john.smith@gmail.com',
        number: 123
    },
    {
        id: 1,
        name: 'William Smith',
        email: 'will.smith@gmail.com',
        number: 789
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@gmail.com',
        number: 654
    },
]

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CONTACT':
            state = [...state, action.payload];
            return state;
        case 'UPDATE_CONTACT':
            const updateState = state.map(contact => contact.id === action.payload.id ? action.payload : contact);
            state = updateState
            return state;
        case 'DELETE_CONTACT':
            const filterContacts = state.filter(contact => contact.id !== action.payload && contact)
            state = filterContacts;
            return state;
        default:
            return state
    }
}
export default contactReducer