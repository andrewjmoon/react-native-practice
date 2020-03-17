import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY, getInitData } from './_DATA';

export function fetchDeckList() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(getInitData);
}

export async function getAllDecks() {
  try {
    const result = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    if (result !== null) {
      return result;
    } else {
      await AsyncStorage.setItem(
        DECKS_STORAGE_KEY,
        JSON.stringify(getInitData)
      );
      return getInitData;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteDeck(key) {
  try {
    const results = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
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
  try {
    const decks = await getAllDecks(title);
    decks[title].questions.push(card);
    await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(decks));
  } catch (err) {
    console.log(err);
  }
}
