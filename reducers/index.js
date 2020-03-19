import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK } from '../actions';

function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case REMOVE_DECK:
      const { id } = action;
      const { [id]: value, ...rest } = state;
      return {
        ...rest
      };
    /*
    case ADD_CARD:
      const card = { question: action.question, answer: action.answer };
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          questions: state[action.id].questions.concat([card])
        }
      };
      */

    case ADD_CARD:
      return {
        ...state,
        [action.deck.title]: {
          ...state[action.deck.title],
          questions: state[action.deck.title].questions.concat(action.card)
        }
      };
    default:
      return state;
  }
}

export default decks;
