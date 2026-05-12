import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const ThemeToggle = ({ isDark, onToggle, theme }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text }]}>
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Switch 
        value={isDark} 
        onValueChange={onToggle}
        trackColor={{ false: '#DEE2E6', true: '#3D8BFD' }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  }
});

export default ThemeToggle;