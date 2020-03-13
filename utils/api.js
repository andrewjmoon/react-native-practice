import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY, getInitData } from './_DATA';

export function fetchDeckList() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(getInitData);
}

export async function getAllDecks() {
  const result = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  if (result !== null) {
    return result;
  } else {
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(getInitData));
    return getInitData;
  }
}

export async function removeDeck(key) {
  const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
  const data = results;
  data[key] = undefined;
  delete data[key];
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
}

export function submitDeck({ deck, key }) {
  return AsyncStorage.mergeItem(
    DECKS_STORAGE_KEY,
    JSON.stringify({
      [key]: deck
    })
  );
}

export async function addCardToDeck(title, card) {
  const decks = await getAllDecks();
  decks[title].questions.push(card);
  AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
}
