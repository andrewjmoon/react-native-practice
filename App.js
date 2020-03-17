import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import TabNav from './components/NavigationTab';
import DeckView from './views/DeckView';
import AddCard from './views/AddCard';
import Quiz from './views/QuizView';
import { white, skyBlue, lightYellow, green } from './utils/colors';

const MainNavigator = createAppContainer(
  createStackNavigator({
    Home: {
      screen: TabNav,
      navigationOptions: {
        headerShown: false
      }
    },
    DeckView: {
      screen: DeckView,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: skyBlue
        }
      })
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: skyBlue
        },
        title: navigation.state.params.deckId
      })
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        headerTintColor: white,
        headerStyle: {
          backgroundColor: green
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
    backgroundColor: lightYellow,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
