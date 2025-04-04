import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AdminDashboard = ({ navigation }) => {
    const stats = [
        { title: 'Total Orders', value: 120, icon: 'shopping-cart', color: '#FF9800', backgroundColor: '#FFE0B2' },
        { title: 'Total Users', value: 50, icon: 'people', color: '#388E3C', backgroundColor: '#C8E6C9' },
        { title: 'Total Revenue', value: '₱150,000', icon: 'attach-money', color: '#1976D2', backgroundColor: '#BBDEFB' },
        { title: 'Total Reviews', value: 200, icon: 'rate-review', color: '#D32F2F', backgroundColor: '#FFCDD2' },
    ];

    const features = [
        { title: 'Manage Orders', icon: 'list', screen: 'displayOrder' },
        { title: 'Manage Products', icon: 'inventory', screen: 'displayProduct' },
        { title: 'Manage Users', icon: 'people', screen: 'UsersScreen' },
        { title: 'Settings', icon: 'settings', screen: 'SettingsScreen' },
    ];

    const renderStatCard = (stat) => (
        <View key={stat.title} style={[styles.statCard, { backgroundColor: stat.backgroundColor }]}>
            <MaterialIcons name={stat.icon} size={30} color={stat.color} style={styles.statIcon} />
            <View style={styles.statTextContainer}>
                <Text style={[styles.statValue, { color: stat.color }]}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
        </View>
    );

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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Admin Dashboard</Text>
            <View style={styles.statsContainer}>
                {stats.map(renderStatCard)}
            </View>
            <Text style={styles.subHeader}>Features</Text>
            <View style={styles.featuresContainer}>
                {features.map(renderFeatureButton)}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#121212',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    statCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        width: '48%',
        marginBottom: 16,
        elevation: 4, // Adds shadow for better visibility
    },
    statIcon: {
        marginRight: 12,
    },
    statTextContainer: {
        flex: 1,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    statTitle: {
        fontSize: 14,
        color: '#555555',
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureButton: {
        width: '48%',
        padding: 16,
        backgroundColor: '#2A2A2A',
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    featureText: {
        fontSize: 14,
        color: '#FFFFFF',
        marginTop: 8,
    },
});

export default AdminDashboard;