import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";

import { dummyNotes } from "../constants/dummyData";
import { lightTheme, darkTheme } from "../theme/color";
import ThemeToggle from "../components/ThemeToggler";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";

export default function AppIndex() {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");
  const [currentView, setCurrentView] = useState("list"); // 'list' | 'editor' conditional rendering

  const [notes, setNotes] = useState(dummyNotes);
  const [searchQuery, setSearchQuery] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);

  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const containerWidth = isTablet ? 600 : "100%";
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    setIsDark(systemColorScheme === "dark");
  }, [systemColorScheme]);

  useEffect(() => {
    async function configureOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    configureOrientation();
  }, []);

  const handleSave = () => {
    if (!editTitle.trim() && !editContent.trim()) {
      setCurrentView("list");
      return;
    }

    if (editingNoteId) {
      const updatedNotes = notes.map((note) => {
        if (note.id === editingNoteId) {
          return {
            ...note, // Keep the old ID and Date
            title: editTitle.trim() || "Untitled Note",
            snippet:
              editContent.trim().split("\n")[0] || "No additional content",
          };
        }
        return note;
      });
      setNotes(updatedNotes);
    } else {
      const newNote = {
        id: Date.now().toString(),
        title: editTitle.trim() || "Untitled Note",
        snippet: editContent.trim().split("\n")[0] || "No additional content",
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setNotes([newNote, ...notes]); 
    }

    setCurrentView("list");
    setEditTitle("");
    setEditContent("");
    setEditingNoteId(null);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.snippet.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <View
        style={[
          styles.container,
          { width: containerWidth, alignSelf: "center" },
        ]}
      >

        {currentView === "list" && (
          <>
            <View style={styles.headerRow}>
              <Text style={[styles.headerTitle, { color: theme.text }]}>
                Keep Notes
              </Text>
              <ThemeToggle
                isDark={isDark}
                onToggle={() => setIsDark(!isDark)}
                theme={theme}
              />
            </View>

            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              theme={theme}
            />

            <FlatList
              data={filteredNotes}
              numColumns={2}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={{ gap: 12 }}
              contentContainerStyle={styles.listPadding}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={{ flex: 1 }}>
                  <NoteCard
                    note={item}
                    theme={theme}
                    onPress={() => {
                      setEditingNoteId(item.id);
                      setEditTitle(item.title);
                      setEditContent(item.snippet);
                      setCurrentView("editor");
                    }}
                  />
                </View>
              )}
            />

            <Pressable
              style={[styles.fab, { backgroundColor: theme.primary }]}
              onPress={() => {
                setEditingNoteId(null); 
                setEditTitle("");
                setEditContent(""); 
                setCurrentView("editor");
              }}
            >
              <Text style={styles.fabText}>+</Text>
            </Pressable>
          </>
        )}

        {currentView === "editor" && (
          <KeyboardAvoidingView
            style={styles.flex1}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ImageBackground
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1683749809614-9bf2102f4f4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bm90ZXMlMjBhcHB8ZW58MHx8MHx8fDA%3D",
              }}
              style={styles.imageHeader}
              imageStyle={{ borderRadius: 16 }}
            ></ImageBackground>
            <View style={styles.headerActions}>
              <Pressable
                style={styles.actionBtn}
                onPress={() => setCurrentView("list")}
              >
                <Text style={styles.actionText}>Back</Text>
              </Pressable>
              <Pressable
                style={[styles.actionBtn, { backgroundColor: theme.primary }]}
                onPress={handleSave}
              >
                <Text style={styles.actionText}>Save</Text>
              </Pressable>
            </View>

            <View style={styles.editorBody}>
              <TextInput
                style={[
                  styles.editorTitle,
                  { color: theme.text, borderBottomColor: theme.border },
                ]}
                placeholder="Note Title"
                placeholderTextColor={theme.subtext}
                value={editTitle}
                onChangeText={setEditTitle}
              />
              <TextInput
                style={[styles.editorContent, { color: theme.text }]}
                placeholder="Start writing..."
                placeholderTextColor={theme.subtext}
                multiline
                textAlignVertical="top"
                value={editContent}
                onChangeText={setEditContent}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  flex1: { flex: 1 },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  headerTitle: { fontSize: 28, fontWeight: "bold" },
  listPadding: { paddingHorizontal: 20, paddingBottom: 100 },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: { color: "#FFF", fontSize: 32, fontWeight: "300", marginTop: -4 },

  imageHeader: { height: 120, margin: 20, padding: 20 },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  actionBtn: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  actionText: { color: "#FFF", fontWeight: "600", fontSize: 14 },
  editorBody: { flex: 1, paddingHorizontal: 20 },
  editorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 15,
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  editorContent: { flex: 1, fontSize: 16, lineHeight: 24 },
});
