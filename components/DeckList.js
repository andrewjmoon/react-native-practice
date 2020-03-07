import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppLoading } from 'expo';
import { white, gray, purple } from '../utils/colors';
import { fetchDeckList } from '../utils/api';
import { receiveDecks } from '../actions';
import { connect, useDispatch } from 'react-redux';

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
  /*
  componentDidMount() {
    const { dispatch } = this.props;
    fetchDeckList()
      .then(decks => dispatch(receiveDecks(decks)))
      .then(() => {
        this.setState(() => ({
          ready: true
        }));
      });
  }
*/

  const { decks, navigation } = props;

  if (ready === false) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
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
    backgroundColor: white
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  cardTitle: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: purple,
    margin: 10
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
