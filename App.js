import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import TabNav from './components/TabNav';
import DeckView from './components/DeckView';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { white, purple } from './utils/colors';

const MainNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: TabNav,
      navigationOptions: {
        header: null
      }
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      })
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        },
        title: navigation.state.params.deckId
      })
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple
        }
      })
    }
  })
);

export default () => {
  return (
    <Provider store={createStore(reducer)}>
      <View style={{ flex: 1, backgroundColor: 'salmon' }}>
        <MainNavigator />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
