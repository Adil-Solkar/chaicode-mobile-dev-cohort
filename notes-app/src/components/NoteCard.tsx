import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

const NoteCard = ({ note, theme, onPress }) => {
  return (
    <Pressable 
      style={({ pressed }) => StyleSheet.compose(
        styles.cardContainer,
        [
          { backgroundColor: theme.card, borderColor: theme.border },
          pressed && { opacity: 0.7 }
        ]
      )}
      onPress={onPress}
    >
      <Text style={[styles.title, { color: theme.text }]}>{note.title}</Text>
      <Text numberOfLines={2} style={[styles.snippet, { color: theme.subtext }]}>
        {note.snippet}
      </Text>
      <Text style={[styles.date, { color: theme.subtext }]}>{note.date}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  snippet: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
    fontWeight: '500',
  }
});

export default NoteCard;
