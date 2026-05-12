# React Native Keep Notes App

A simple, responsive React Native Notes application built with Expo, featuring Light/Dark mode, Search functionality and dynamic screen orientation.

## 📂 Folder Structure

```text
src/
├── app/
│   └── index.tsx            # Main Entry Point (Contains all state, logic, and screens)
├── components/
│   ├── NoteCard.tsx         # Reusable card UI for individual notes
│   ├── SearchBar.tsx        # Reusable search input
│   └── ThemeToggle.tsx      # Switch to toggle Light/Dark mode
├── constants/
│   └── dummyData.js         # Initial placeholder data
└── theme/
    └── colors.js            # Light and Dark color palettes
```

## 🚀 Setup and Run Instructions
Follow these steps to get the project running on your local machine.

1. Prerequisites
Make sure you have Node.js installed on your computer.

2. Install Dependencies
Open your terminal, navigate to your project folder, and run:

```Bash
npm install
```

3. Install Expo Modules
This app uses a specific Expo module for handling screen rotation. Install it by running:

```Bash
npx expo install expo-screen-orientation
```


4. Start the App
Launch the Expo development server:
```Bash
npx expo start
```
5. View the App
On a physical device: Download the Expo Go app on your iOS or Android phone, then scan the QR code that appears in your terminal.

On a simulator: Press i in the terminal to open the iOS Simulator, or press a to open the Android Emulator.