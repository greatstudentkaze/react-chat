const reducer = (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        roomId: action.payload.roomId,
        username: action.payload.username,
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      }
    case 'SET_MESSAGES':
      return {
        ...state,
        joined: true,
        messages: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
