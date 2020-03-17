import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { gray, purple, lightYellow, salmon } from '../utils/colors';
import { fetchDeckList } from '../utils/api';
import { receiveDecks } from '../actions';
import { connect, useDispatch, useSelector } from 'react-redux';

const DeckList = props => {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDeckList()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => {
        setReady(() => ({
          ready: true
        }));
      });
  }, [dispatch]);

  const { decks, navigation } = props;

  if (ready === false) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.center}>Welcome to the Flashcard Game</Text>
      {Object.values(decks).map(deck => {
        const { title, questions } = deck;
        return (
          <View style={[styles.container]} key={title}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('DeckView', { deckId: title })
              }
            >
              <View style={[styles.cardTitle]}>
                <Text
                  style={{
                    fontSize: 22,
                    textAlign: 'center',
                    marginBottom: 10,
                    marginTop: 10
                  }}
                >
                  {title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    color: gray,
                    textAlign: 'center',
                    marginBottom: 10
                  }}
                >
                  {questions.length} card(s)
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightYellow
  },
  center: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 30,
    marginTop: 30
  },
  center2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  cardTitle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: purple,
    margin: 10,
    backgroundColor: salmon
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
