import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TaskContext } from '../contexts/TaskContext';

export default function TaskDetailsScreen() {
  const route = useRoute();
  const { id } = route.params;
  const { tasks } = useContext(TaskContext);

  const task = tasks.find(t => t.id === id);

  if (!task) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Tarefa não encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.description}</Text>
      <Text style={styles.label}>Data de cadastro:</Text>
      <Text style={styles.value}>
        {task.createdAt ? new Date(task.createdAt).toLocaleString() : '-'}
      </Text>
      <Text style={styles.label}>Data de conclusão:</Text>
      <Text style={styles.value}>
        {task.done && task.completedAt
          ? new Date(task.completedAt).toLocaleString()
          : '-'}
      </Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{task.done ? 'Concluída' : 'Pendente'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  label: { marginTop: 12, fontWeight: 'bold' },
  value: { marginLeft: 8, fontSize: 16 },
  notFound: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 40 }
});