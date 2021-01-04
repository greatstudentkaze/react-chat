const reducer = (state, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        roomId: action.payload.roomId,
        username: action.payload.username,
      }
    default:
      return state;
  }
};

export default reducer;
