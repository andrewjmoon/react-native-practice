import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Platform,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Form,
  Item,
  Input
} from 'native-base';
import { connect } from 'react-redux';
import { white, purple, lightPurp } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import { addCard } from '../actions';

const AddCard = ({ deck, deckId, navigation, dispatch }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const onSubmit = () => {
    const card = {
      question,
      answer
    };

    dispatch(addCard(deck, card));

    addCardToDeck(deckId, card);

    navigation.navigate('DeckView', { deckId: deckId });
  };

  return (
    <KeyboardAvoidingView style={[styles.container]}>
      <Container>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 35,
              color: purple,
              paddingBottom: 20
            }}
          >
            Add Card
          </Text>
        </View>
        <Form>
          <Input
            style={[styles.spacing, styles.inputStyle]}
            placeholder="Question"
            value={question}
            onChangeText={value => setQuestion(value)}
          />

          <Input
            style={[styles.spacing, styles.inputStyle]}
            placeholder="Answer"
            value={answer}
            onChangeText={value => setAnswer(value)}
          />
        </Form>
        <TouchableOpacity
          onPress={onSubmit}
          style={
            Platform.OS === 'ios'
              ? [styles.iosSubmitBtn, { backgroundColor: purple }]
              : [styles.androidSubmitBtn, { backgroundColor: purple }]
          }
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </Container>
    </KeyboardAvoidingView>
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
    backgroundColor: 'lightblue'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40
  },
  cardTitle: {
    padding: 5,
    margin: 10,
    alignItems: 'stretch',
    backgroundColor: 'salmon'
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
    marginBottom: 20,
    marginTop: 20
  },
  inputStyle: {
    fontSize: 25,
    textAlign: 'center',
    borderColor: 'salmon',
    borderWidth: 1,
    height: 60
  }
});

export default connect(mapStateToProps)(AddCard);
