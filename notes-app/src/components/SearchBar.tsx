import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ value, onChangeText, theme }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input, 
          { backgroundColor: theme.card, color: theme.text, borderColor: theme.border }
        ]}
        placeholder="Search notes..."
        placeholderTextColor={theme.subtext}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
  }
});

export default SearchBar;