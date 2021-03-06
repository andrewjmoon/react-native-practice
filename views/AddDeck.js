import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { white, purple } from '../utils/colors';
import { submitDeck } from '../utils/api';
import { addDeck } from '../actions';

const AddDeck = props => {
  const [deckTitle, setdeckTitle] = useState('');
  const createDeck = () => {
    const emptyDeck = {
      title: deckTitle,
      questions: []
    };

    props.dispatch(
      addDeck({
        [deckTitle]: emptyDeck
      })
    );

    submitDeck(emptyDeck, deckTitle)
      .then(
        setdeckTitle(() => ({
          deckTitle: ''
        }))
      )
      .then(resetDeck);

    props.navigation.navigate('DeckView', { deckId: deckTitle });
  };

  const resetDeck = () => {
    setdeckTitle('');
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text
        style={[
          styles.center,
          { fontSize: 25, marginBottom: 10, marginTop: 20 }
        ]}
      >
        What is the title of the new Deck?
      </Text>
      <TextInput
        style={[styles.spacing, styles.inputStyle]}
        placeholder="Deck Title"
        value={String(deckTitle)}
        onChangeText={value => setdeckTitle(value)}
      />

      <TouchableOpacity
        onPress={createDeck}
        style={
          Platform.OS === 'android'
            ? [styles.iosSubmitBtn, { backgroundColor: purple }]
            : [styles.androidSubmitBtn, { backgroundColor: purple }]
        }
      >
        <Text style={styles.btnText}>Create Deck</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  center: {
    marginLeft: 30,
    marginRight: 30
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
  },
  spacing: {
    paddingBottom: 20,
    paddingTop: 20,
    marginTop: 20,
    marginBottom: 20
  },
  inputStyle: {
    fontSize: 20,
    textAlign: 'center',
    borderColor: purple,
    borderWidth: 5
  }
});

export default connect()(AddDeck);
