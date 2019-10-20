import React, { PureComponent } from 'react';
import { database } from 'firebase';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
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

export default class Todo extends PureComponent<Props, State> {
  state = {
    description: '',
    data: []
  }

  componentDidMount() {
    this.fetchLocalStorage();

    database().ref('list/').on('value', async (snapshot) => {
      const list = snapshot.val();

      if (list) {
        await AsyncStorage.setItem('tasks', JSON.stringify(Object.values(list)))
        .then(() => {
          console.log('It was saved successfully')
        })
        .catch(() => {
          console.log('There was an error saving the product')
        })
      }

      this.setState({
        data: list ? Object.values(list) : []
      })
    });
  }

  fetchLocalStorage = async () => {
    await AsyncStorage.getItem('tasks')
    .then((result) => {
      this.setState({ data: JSON.parse(result)})
    })
    .catch(() => {
      console.log('An error occurred while fetching local data')
    })
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

      this.setState({ description: '' })
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  changeInputValue = (value) => {
    this.setState({
      description: value
    })
  }

  handleCheckTask = (id, completed) => {
    try {
      const query = database().ref("list/").orderByChild("id").equalTo(id);

      query.once("child_added", (snapshot) => {
        snapshot.ref.update({ completed: !completed })
      });
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  handleRemoveTask = (id) => {
    try {
      const query = database().ref("list/").orderByChild("id").equalTo(id);

      query.once("child_added", (snapshot) => {
        snapshot.ref.remove()
      });
    } catch(err) {
      console.log('ERROR: ', err);
    }
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
