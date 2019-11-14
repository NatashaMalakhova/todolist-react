import React from 'react';
import Task from './components/Task';
import TaskInput from './components/TaskInput';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: []
    };
  }
  addTask = task => {
    this.setState(state => {
      let { tasks } = state;
      tasks.push({
        id: Date.now(),
        title: task,
        done: false
      });
      return tasks;
    });
  };

  doneTask = id => {
    const index = this.state.tasks.map(task => task.id).indexOf(id);
    this.setState(state => {
      let { tasks } = state;
      if (tasks[index].done) {
        tasks[index].done = false;
      } else {
        tasks[index].done = true;
      }
      return tasks;
    });
  };


  deleteTask = id => {

    const conf = window.confirm(`Вы точно хотите удалить?`);
    const index = this.state.tasks.map(task => task.id).indexOf(id); 
    
    if (conf) {
      this.setState(state => {
        let { tasks } = state;
        tasks.splice(index, 1);
        return tasks;
      });
    } else {
      return this.tasks;
    }
  };
  
  save = () => {
    const tasks = this.state.tasks;
    localStorage.setItem("storage", JSON.stringify(tasks));
  };

  render() {
    const { tasks } = this.state;
    const activeTasks = tasks.filter(task => !task.done);
    const doneTasks = tasks.filter(task => task.done);
    
    return(
      <div className="App">
        <h1>Мои задачи на сегодня: </h1>
        <h2 className="top">Предстоит сделать: {activeTasks.length} </h2>
        <h2 className="top">Сделано: {doneTasks.length} </h2>
        <TaskInput addTask={this.addTask}></TaskInput>
        {tasks.map(task => (
          <Task 
          doneTask={() => this.doneTask(task.id)}
          deleteTask={() => this.deleteTask(task.id)}
          task={task} 
          key={task.id}></Task>))}
      </div>
    )
  }

  componentDidUpdate() {
    this.save();
  }
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("storage"));
    const tasks = (data && [...data]) || [];
    this.setState({ tasks });
  }
}

export default App;
 