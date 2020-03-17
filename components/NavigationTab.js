import React from 'react';
import { createAppContainer } from 'react-navigation';
import {
  createMaterialTopTabNavigator,
  createBottomTabNavigator
} from 'react-navigation-tabs';
import DeckList from '../views/DeckList';
import AddDeck from '../views/AddDeck';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { salmon, white } from '../utils/colors';

const router = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) =>
        Platform.OS === 'android' ? (
          <MaterialIcons name="collections" size={30} color={salmon} />
        ) : (
          <MaterialIcons name="code" size={30} color={white} />
        )
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) =>
        Platform.OS === 'android' ? (
          <MaterialIcons name="playlist-play" size={30} color={salmon} />
        ) : (
          <MaterialIcons name="playlist-add-check" size={30} color={white} />
        )
    }
  }
};

const navigationOptions = {
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Platform.OS === 'android' ? salmon : white,
    style: {
      padding: 10,
      height: Platform.OS === 'android' ? 60 : 'auto',
      //fontSize: 18,
      backgroundColor: Platform.OS === 'android' ? white : salmon,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
};

const TabNav =
  Platform.OS === 'android'
    ? createBottomTabNavigator(router, navigationOptions)
    : createMaterialTopTabNavigator(router, navigationOptions);

export default createAppContainer(TabNav);
