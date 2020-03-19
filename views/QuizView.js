import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { Container, Button, Footer, FooterTab } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import {
  clearLocalNotification,
  setLocalNotification
} from '../utils/notification';
import {
  lightPurp,
  darkBlue,
  blue,
  skyBlue,
  salmon,
  green,
  red,
  white
} from '../utils/colors';

const NoCards = () => (
  <View style={styles.noCards}>
    <Text style={styles.noCardsText}>
      There are no question cards left to display!
    </Text>
  </View>
);

const ResultScreen = props => (
  <View style={styles.resultCard}>
    <Text style={styles.resultCardText}>
      Total questions answered: {props.totalAnswered}
    </Text>
    <Text style={styles.resultCardText}>Correct Answers: {props.correct}</Text>
    <Text style={styles.resultCardText}>
      Incorrect Answers: {props.incorrect}
    </Text>

    <View style={styles.btnView}>
      <TouchableOpacity
        style={[styles.btnStyle, { backgroundColor: darkBlue }]}
        onPress={props.restart}
      >
        <Text style={{ color: white }}>Restart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btnStyle, { backgroundColor: darkBlue }]}
        onPress={props.goBack}
      >
        <Text style={{ color: white }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ShowQuestionOrAnswer = props => (
  <TouchableWithoutFeedback onPress={props.toggle}>
    <View>
      {props.current == 'answer' ? (
        <Text style={{ fontStyle: 'normal' }}>Click Here</Text>
      ) : (
        <Text style={{ fontStyle: 'normal' }}>Click Here</Text>
      )}
    </View>
  </TouchableWithoutFeedback>
);

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    show: 'answer',
    showResults: false
  };

  showQuestionOrAnswer = () => {
    const show = this.state.show === 'answer' ? 'showanswer' : 'answer';

    this.setState({ show });
  };

  showQuestionOnCardChange = () => {
    let show = this.state.show;
    if (show === 'answer') {
      show = 'question';
    }
    return show;
  };

  userAnswered(answer) {
    let show = this.showQuestionOnCardChange();

    if (answer === 'correct') {
      this.setState({ correctAnswers: this.state.correctAnswers + 1, show });
    }
    if (answer === 'incorrect') {
      this.setState({
        incorrectAnswers: this.state.incorrectAnswers + 1,
        show
      });
    }

    if (this.state.currentQuestion === this.props.questions.length - 1) {
      this.setState({ showResults: true, show });
    } else {
      this.setState({ currentQuestion: this.state.currentQuestion + 1, show });
    }
  }

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      correctAnswers: 0,
      incorrectAnswers: 0,
      show: 'question',
      showResults: false
    });
    clearLocalNotification().then(setLocalNotification);
  };

  goBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    if (this.props.questions.length === 0) {
      return <NoCards />;
    }

    if (this.state.showResults) {
      return (
        <ResultScreen
          totalAnswered={this.props.questions.length}
          correct={this.state.correctAnswers}
          incorrect={this.state.incorrectAnswers}
          restart={this.restartQuiz}
          goBack={this.goBack}
        />
      );
    }

    const showingCard = this.props.questions[this.state.currentQuestion];

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.quizProgress}>
          <Text>
            Card {this.state.currentQuestion + 1}/{this.props.questions.length}
          </Text>
        </View>

        <View style={styles.quizCard}>
          <Text style={styles.questionText}>{showingCard.question}</Text>

          {this.state.show == 'answer' ? (
            <Text style={styles.questionText}>See Possible Answer</Text>
          ) : (
            <Text style={styles.answerText}>{showingCard.answer}</Text>
          )}
          <ShowQuestionOrAnswer
            toggle={this.showQuestionOrAnswer}
            current={this.state.show}
          />

          <View style={styles.btnView}>
            <Button
              style={[styles.btnStyle, { backgroundColor: green }]}
              onPress={() => this.userAnswered('correct')}
            >
              <Text>Correct</Text>
            </Button>

            <Button
              style={[styles.btnStyle, { backgroundColor: red }]}
              onPress={() => this.userAnswered('incorrect')}
            >
              <Text>Incorrect</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noCardsText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  resultCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  quizProgress: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    backgroundColor: skyBlue
  },
  quizCard: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 15,
    padding: 25,
    backgroundColor: salmon,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 3
  },
  resultCard: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    padding: 25,
    backgroundColor: skyBlue,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 5
  },
  questionText: {
    fontSize: 30,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  answerText: {
    fontSize: 30,
    marginBottom: 2,
    fontWeight: 'bold',
    textAlign: 'center',
    color: red
  },
  btnStyle: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

function mapStateToProps(state, { navigation }) {
  return { questions: navigation.state.params.deck.questions };
}

export default connect(mapStateToProps)(Quiz);
