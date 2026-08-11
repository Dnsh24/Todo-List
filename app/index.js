
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { TaskContext } from '../context/TaskContext';

export default function HomeScreen() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [filter, setFilter] = useState('All');

  const toggleComplete = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const toggleImportant = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, important: !task.important }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') {
      return !task.completed;
    }

    if (filter === 'Completed') {
      return task.completed;
    }

    if (filter === 'Important') {
      return task.important;
    }

    return true;
  });

  const total = tasks.length;
  const active = tasks.filter((task) => !task.completed).length;
  const completed = tasks.filter((task) => task.completed).length;
  const important = tasks.filter((task) => task.important).length;

  const renderTask = ({ item }) => (
    <View
      style={[
        styles.taskCard,
        item.important && styles.importantTaskCard,
      ]}
    >
      <TouchableOpacity
        style={[
          styles.checkbox,
          item.completed && styles.checkboxCompleted,
        ]}
        onPress={() => toggleComplete(item.id)}
      >
        {item.completed && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>

      <Text
        style={[
          styles.taskTitle,
          item.completed && styles.completedText,
          item.important && styles.importantText,
        ]}
      >
        {item.title}
      </Text>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => toggleImportant(item.id)}
      >
        <Text style={styles.star}>
          {item.important ? '★' : '☆'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => deleteTask(item.id)}
      >
        <Text style={styles.delete}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F4F6F8"
      />

      <View style={styles.header}>
        <Text style={styles.title}>Task Master</Text>
        <Text style={styles.subtitle}>
          Organize your day efficiently
        </Text>
      </View>

      <View style={styles.counterRow}>
        <Counter value={total} label="Total" />
        <Counter value={active} label="Active" />
        <Counter value={completed} label="Done" />
        <Counter value={important} label="Starred" />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/task')}
      >
        <Text style={styles.addButtonText}>
          + Add Task
        </Text>
      </TouchableOpacity>

      <View style={styles.filterRow}>
        {['All', 'Active', 'Completed', 'Important'].map(
          (tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.filterTab,
                filter === tab && styles.activeFilter,
              ]}
              onPress={() => setFilter(tab)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === tab && styles.activeFilterText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks found.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

function Counter({ value, label }) {
  return (
    <View style={styles.counter}>
      <Text style={styles.counterValue}>{value}</Text>
      <Text style={styles.counterLabel}>{label}</Text>
    </View>
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
    marginBottom: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A237E',
  },

  subtitle: {
    fontSize: 14,
    color: '#546E7A',
  },

  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  counter: {
    flex: 1,
    marginHorizontal: 3,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
  },

  counterValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E88E5',
  },

  counterLabel: {
    fontSize: 11,
    color: '#37474F',
  },

  addButton: {
    height: 50,
    backgroundColor: '#3F51B5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#ECEFF1',
    borderRadius: 10,
    padding: 3,
    marginBottom: 16,
  },

  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },

  activeFilter: {
    backgroundColor: '#FFFFFF',
  },

  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#607D8B',
  },

  activeFilterText: {
    color: '#3F51B5',
  },

  list: {
    paddingBottom: 20,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },

  importantTaskCard: {
    backgroundColor: '#FFFDE7',
    borderColor: '#FFD54F',
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#78909C',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  checkboxCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },

  checkmark: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  taskTitle: {
    flex: 1,
    fontSize: 15,
    color: '#263238',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#90A4AE',
  },

  importantText: {
    fontWeight: '700',
    color: '#BF360C',
  },

  iconButton: {
    padding: 6,
  },

  star: {
    fontSize: 20,
    color: '#FFB300',
  },

  delete: {
    fontSize: 18,
    color: '#E53935',
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#78909C',
  },
});

