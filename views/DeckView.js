import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect, useSelector } from 'react-redux';
import { white, purple, gray, salmon, lightYellow } from '../utils/colors';
import TextButton from '../components/TextButton';
import { deleteDeck } from '../utils/api';

const DeckView = (props, { navigation }, state) => {
  const handleDelete = deckId => {
    //const { deckId } = props;
    deleteDeck(deckId);
  };

  const { deck, deckId } = props;
  return (
    <View style={[styles.container]}>
      {/* Deck Cover */}
      <View style={[styles.cardTitle, { padding: 30, marginBottom: 40 }]}>
        <Text style={{ textAlign: 'center', fontSize: 35 }}>{deck.title}</Text>
        <Text style={{ fontSize: 18, color: gray, textAlign: 'center' }}>
          {deck.questions.length} cards
        </Text>
      </View>
      {/* Deck Actions */}
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('AddCard', { deckId })}
          style={
            Platform.OS === 'android'
              ? [styles.iosSubmitBtn, { backgroundColor: purple }]
              : [styles.androidSubmitBtn, { backgroundColor: purple }]
          }
        >
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Quiz', { deck })}
          style={
            Platform.OS === 'android'
              ? [styles.iosSubmitBtn, { backgroundColor: salmon }]
              : [styles.androidSubmitBtn, { backgroundColor: salmon }]
          }
        >
          <Text style={styles.btnText}>Start Quiz</Text>
        </TouchableOpacity>

        <TextButton
          style={{ marginTop: 30 }}
          onPress={handleDelete}
          style={
            Platform.OS === 'android'
              ? [styles.iosSubmitBtn, { backgroundColor: gray }]
              : [styles.androidSubmitBtn, { backgroundColor: gray }]
          }
        >
          <Text style={styles.btnText}>Delete Deck</Text>
        </TextButton>
      </View>
    </View>
  );
};

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deck: state[deckId]
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: lightYellow
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  cardTitle: {
    padding: 2,
    margin: 10
  },
  iosSubmitBtn: {
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitBtn: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 2,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center'
  }
});

export default connect(mapStateToProps)(DeckView);
