import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import TouchableItem from './TouchableItem';
import CheckBox from './Checkbox';

type Data = {
  id: string;
  description: string;
  completed: boolean;
}

type Props = {
  handleCheck: (id: string, completed: boolean) => void;
  handleRemove: (id: string) => void;
  data: Data[];
}

export default class List extends PureComponent<Props> {
  renderTask = (task) => {
    const { handleCheck, handleRemove } = this.props;

    return (
      <View style={styles.taskContainer}>
        <CheckBox
          checked={task.completed}
          onChangeToggle={() => handleCheck(task.id, task.completed)}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.description, task.completed && styles.line]}>
            {task.description}
          </Text>
        </View>
        <TouchableItem
          borderless={true}
          pressColor='rgba(255, 255, 255, .16)'
          style={styles.removeTask}
          onPress={() => handleRemove(task.id)}
        >
          <FontAwesome5 name="trash-alt" color="#FFF" />
        </TouchableItem>
      </View>
    )
  }

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.text, styles.font20]}>Tasks</Text>
          <Text style={[styles.text, styles.font16]}>
            {`${data.filter(t => t.completed).length}/${data.length}`}
          </Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => this.renderTask(item)}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: 16
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16
  },

  text: {
    color: '#FFF',
    fontWeight: 'bold'
  },

  font20: {
    fontSize: 20
  },

  font16: {
    fontSize: 16
  },

  taskContainer: {
    minHeight: 40,
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, .1)',
  },

  description: {
    color: '#FFF',
    fontSize: 12,
    padding: 8
  },

  removeTask: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },

  line: {
    textDecorationLine: 'line-through'
  }

});
