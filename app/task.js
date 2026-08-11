
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from 'react-native';
import { router } from 'expo-router';
import { TaskContext } from '../context/TaskContext';

export default function TaskScreen() {
  const { setTasks } = useContext(TaskContext);
  const [taskText, setTaskText] = useState('');

  const saveTask = () => {
    const title = taskText.trim();

    if (!title) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: title,
      completed: false,
      important: false,
    };

    setTasks((currentTasks) => [
      newTask,
      ...currentTasks,
    ]);

    Keyboard.dismiss();

    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F4F6F8"
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>
            ← Back
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Add New Task
        </Text>

        <Text style={styles.subtitle}>
          What do you want to accomplish?
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Task
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your task..."
          placeholderTextColor="#90A4AE"
          value={taskText}
          onChangeText={setTaskText}
          multiline
          autoFocus
        />
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          !taskText.trim() && styles.disabledButton,
        ]}
        onPress={saveTask}
        disabled={!taskText.trim()}
      >
        <Text style={styles.saveButtonText}>
          Save Task
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  header: {
    marginTop: 10,
    marginBottom: 30,
  },

  backButton: {
    fontSize: 16,
    color: '#3F51B5',
    fontWeight: '600',
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A237E',
  },

  subtitle: {
    fontSize: 14,
    color: '#546E7A',
    marginTop: 5,
  },

  inputContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#37474F',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    minHeight: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CFD8DC',
    padding: 16,
    fontSize: 16,
    color: '#263238',
    textAlignVertical: 'top',
  },

  saveButton: {
    height: 52,
    backgroundColor: '#3F51B5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  disabledButton: {
    backgroundColor: '#9FA8DA',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

