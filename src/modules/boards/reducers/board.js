const board = (state = { cards: [], memberCount: 0 }, action) => {
  console.log(action.type)
  switch(action.type) {
    case 'RECEIVE_BOARD':
      return {
        ...state,
        boardName: action.board.name,
        boardKey: action.key,
        cards: Object.keys(action.board.cards).map((key) => {
          var card = action.board.cards[key];
          return {
            key,
            title: card.title,
            category: card.category,
            points: card.points || 0,
            completed: false,
            isIncremental: card.isIncremental || false,
            numberOfCompletions: 0
          }
        }),
        boardUserFullName: null,
        memberCount: action.board.memberCount,
        user: null,
        score: 0
      }
    case 'BOARD_UPDATED_WITH_USER_DATA':
      let completedCards = action.completedCards || [];
      return {
        ...state,
        user: action.user,
        score: action.score,
        cards: state.cards.map((item) => {
          return {
            ...item,
            completed: completedCards[item.key] ? true : false,
            numberOfCompletions: completedCards[item.key] || 0
          }
        })
      }
    case 'RECEIVE_BOARD_USERDETAILS':
      return {
        ...state,
        boardUserFullName: action.details.fullName
      }
    default: return state;
  }
}

export default board;
