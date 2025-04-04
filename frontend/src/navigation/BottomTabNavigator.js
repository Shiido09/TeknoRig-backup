import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { getItem } from '../services/authService'; // Import SQLite function

// Import screens
import LandingPage from '../screens/LandingPage';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import styles
import styles from '../styles/navigation/BottomTabNavigatorStyles';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  // Display the full name for all tabs
  const displayName = name;
  
  return (
    <View style={styles.iconContainer}>
      <Text 
        style={[styles.label, focused ? styles.activeLabel : {}]}
        numberOfLines={1}
      >
        {displayName}
      </Text>
    </View>
  );
};

const BottomTabNavigator = ({ navigation, route }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [lastLogoutTime, setLastLogoutTime] = useState(null);

  // Check login status whenever the tab navigator is focused or when params change
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getItem('token');
      const logoutTime = await getItem('lastLogoutTime');
      
      // Update logout time if it changed
      if (logoutTime !== lastLogoutTime) {
        setLastLogoutTime(logoutTime);
      }
      
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Also check when the screen comes into focus
    const unsubscribe = navigation.addListener('focus', checkLoginStatus);
    return unsubscribe;
  }, [navigation, lastLogoutTime, route.params?.refresh]);

  // Re-render tabs based on login state
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarShowLabel: false,
      })}
      key={isLoggedIn ? 'logged-in' : 'logged-out'} // Force re-render when login state changes
    >
      <Tab.Screen name="Home" component={LandingPage} />
      {isLoggedIn ? (
        <>
          <Tab.Screen name="Notification" component={NotificationScreen} />
          <Tab.Screen name="Me" component={ProfileScreen} />
        </>
      ) : null}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
