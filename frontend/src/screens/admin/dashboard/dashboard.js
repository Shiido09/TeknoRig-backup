import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../../../redux/actions/statActions';
import { getTopOrderedProducts } from '../../../redux/actions/orderActions';
import { logout } from '../../../services/authService';
import styles from '../../../styles/screens/admin/dashboard/dashboardStyle';

const AdminDashboard = ({ navigation }) => {
  const dispatch = useDispatch();

  // Access stats and top favorites from Redux
  const { loading: statsLoading, stats, error: statsError } = useSelector((state) => state.stats);
  const { loading: topFavoritesLoading, topProducts: topFavorites, error: topFavoritesError } = useSelector(
    (state) => state.topProducts
  );

  useEffect(() => {
    dispatch(fetchStats());
    dispatch(getTopOrderedProducts());
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Logout Successful', 'You have been logged out.');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Logout Failed', 'An error occurred while logging out.');
      console.error('Logout error:', error);
    }
  };

  const renderStatCard = (stat) => (
    <View key={stat.title} style={[styles.statCard, { backgroundColor: stat.backgroundColor }]}>
      <MaterialIcons name={stat.icon} size={30} color={stat.color} style={styles.statIcon} />
      <View style={styles.statTextContainer}>
        <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
        <Text style={styles.statTitle}>{stat.title}</Text>
      </View>
    </View>
  );

  const renderTopItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.productDetails?.product_images[0]?.url || 'https://via.placeholder.com/150' }}
        style={styles.productImage}
      />
      <Text style={styles.productName}>{item.productDetails?.product_name || 'Unknown Product'}</Text>
      <Text style={styles.productOrders}>{item.totalQuantity} Purchases</Text>
    </View>
  );

  const features = [
    { title: 'Manage Orders', icon: 'list', screen: 'displayOrder' },
    { title: 'Manage Products', icon: 'inventory', screen: 'displayProduct' },
    { title: 'Manage Users', icon: 'people', screen: 'displayUser' },
    { title: 'Manage Reviews', icon: 'rate-review', screen: 'displayReviews' },
  ];

  const renderFeatureButton = (feature) => (
    <TouchableOpacity
      key={feature.title}
      style={styles.featureButton}
      onPress={() => navigation.navigate(feature.screen)}
    >
      <MaterialIcons name={feature.icon} size={24} color="#FFFFFF" />
      <Text style={styles.featureText}>{feature.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Admin Dashboard</Text>
        {statsLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : statsError ? (
          <Text style={styles.errorText}>{statsError}</Text>
        ) : (
          <>
            <View style={styles.statsContainer}>
              {renderStatCard({
                title: 'Total Orders',
                value: stats.totalOrders,
                icon: 'shopping-cart',
                color: '#FF9800',
                backgroundColor: '#FFE0B2',
              })}
              {renderStatCard({
                title: 'Total Users',
                value: stats.totalUsers,
                icon: 'people',
                color: '#388E3C',
                backgroundColor: '#C8E6C9',
              })}
              {renderStatCard({
                title: 'Total Revenue',
                value: `₱${stats.totalRevenue}`,
                icon: 'attach-money',
                color: '#1976D2',
                backgroundColor: '#BBDEFB',
              })}
              {renderStatCard({
                title: 'Total Reviews',
                value: 200,
                icon: 'rate-review',
                color: '#D32F2F',
                backgroundColor: '#FFCDD2',
              })}
            </View>

            <Text style={styles.subHeader}>Top Favorites</Text>
            <View style={styles.topItemsContainer}>
              {topFavoritesLoading ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : topFavoritesError ? (
                <Text style={styles.errorText}>{topFavoritesError}</Text>
              ) : topFavorites && topFavorites.length > 0 ? (
                <FlatList
                  data={topFavorites}
                  renderItem={renderTopItem}
                  keyExtractor={(item) => item.productId}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              ) : (
                <Text style={styles.noDataText}>No top favorites available</Text>
              )}
            </View>
          </>
        )}
        <Text style={styles.subHeader}>Features</Text>
        <View style={styles.featuresContainer}>
          {features.map(renderFeatureButton)}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#FFFFFF" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminDashboard;