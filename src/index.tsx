import React, { PureComponent } from 'react';
import { database } from 'firebase';
import { StyleSheet, View, Text } from 'react-native';
import Button from './Components/Button';
import List from './Components/List';
import Input from './Components/Input';

type Data = {
  id: string;
  description: string;
  completed: boolean;
}

type State = {
  description: string;
  data: Data[]
}

export default class Todo extends PureComponent<State> {
  state = {
    description: '',
    data: []
  }

  componentDidMount() {
    database().ref('list/').on('value', async (snapshot) => {
      const list = snapshot.val();

      this.setState({
        data: list ? Object.values(list) : []
      })
    });
  }

  handleCreateTask = () => {
    const { description } = this.state;

    if (!description) {
      return;
    }

    try {
      database().ref('list/').push({
        id: `${(new Date()).getTime()}`,
        description,
        completed: false
      });

      return this.setState({ description: '' });
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  handleCheckTask = (id: string, completed: boolean) => {
    try {
      const query = database().ref("list/").orderByChild("id").equalTo(id);

      return query.once("child_added", (snapshot) => {
        snapshot.ref.update({ completed: !completed })
      });
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  handleRemoveTask = (id: string) => {
    try {
      const query = database().ref("list/").orderByChild("id").equalTo(id);

      return query.once("child_added", (snapshot) => {
        snapshot.ref.remove()
      });
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  changeInputValue = (value: string) => {
    return this.setState({ description: value });
  }

  render() {
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Todo List
        </Text>
        <View>
          <Input
            placeholder="task description"
            value={this.state.description}
            onChangeText={value => this.changeInputValue(value)}
          />
          <Button onPress={this.handleCreateTask}>
            <Text style={styles.buttonText}>Add new task</Text>
          </Button>
        </View>
        <List
          data={data}
          handleCheck={this.handleCheckTask}
          handleRemove={this.handleRemoveTask}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },

  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    height: 48,
    marginVertical: 8,
    padding: 8,
  },

  title: {
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
  }
});
