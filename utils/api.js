import { AsyncStorage } from 'react-native';
import { getInitData, DECKS_STORAGE_KEY } from './_DATA';

export function fetchDeckList(decks) {
  return AsyncStorage.getItem(decks).then(getInitData);
}

export async function getAllDecks(decks) {
  try {
    const result = await AsyncStorage.getItem(decks);
    if (result !== null) {
      return result;
    } else {
      await AsyncStorage.setItem(decks, JSON.stringify(getInitData));
      return getInitData;
    }
  } catch (err) {
    console.log(err);
  }
}
export async function getDeck(id) {
  try {
    const deck = await AsyncStorage.getItem(id);
    return JSON.parse(deck);
  } catch (error) {
    console.log('Error getting deck by id: ', error);
  }
}

export async function deleteDeck(key, decks) {
  const results = await AsyncStorage.getItem(decks);
  const data = JSON.parse(results);
  data[key] = undefined;
  delete data[key];
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
}

export function submitDeck({ deck, key }, decks) {
  return AsyncStorage.mergeItem(
    decks,
    JSON.stringify({
      [key]: deck
    })
  );
}
export async function addCardToDeck(title, card) {
  try {
    const { questions } = await getDeck(title);

    return AsyncStorage.mergeItem(
      title,
      JSON.stringify({
        title,
        questions: questions.concat([card])
      })
    );
  } catch (err) {
    console.log(err);
  }
}
