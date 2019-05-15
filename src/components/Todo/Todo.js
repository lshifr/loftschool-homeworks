import React, { PureComponent } from 'react';
import Card from '../Card';
import './Todo.css';
import withLocalstorage from '../../HOCs/withLocalstorage';

const handleTodoAdd = (e, getValue, refresh, onTodoAdd) => {
  const text = getValue(e);
  if (text) {
    refresh(e);
    onTodoAdd(text);
  }
};

const handleTodoEnter = (e, getValue, refresh, onTodoAdd) => {
  if (e.which === 13 || e.keyCode === 13) {
    handleTodoAdd(e, getValue, refresh, onTodoAdd);
    return false;
  } else {
    return true;
  }
};

const TodoInput = ({ onTodoAdd }) => {
  let input;
  const getValue = () => input.value;
  const refhresh = () => (input.value = '');
  return (
    <div className="todo-item todo-item-new">
      <input
        className="todo-input t-input"
        placeholder="Введите задачу"
        onKeyPress={e => handleTodoEnter(e, getValue, refhresh, onTodoAdd)}
        ref={node => (input = node)}
      />
      <span
        className="plus t-plus"
        onClick={e => {
          handleTodoAdd(e, getValue, refhresh, onTodoAdd);
          return false;
        }}
      >
        +
      </span>
    </div>
  );
};

const TodoItem = ({ text, completed, id }) => (
  <div className="todo-item t-todo">
    <p className="todo-item__text">{text}</p>
    <span className="todo-item__flag t-todo-complete-flag" data-todo-id={id}>
      [{completed ? 'x' : ' '}]
    </span>
  </div>
);

class Todo extends PureComponent {
  getId() {
    const { savedData } = this.props;
    const biggest = savedData.reduce((acc, el) => Math.max(acc, el.id), 0);
    return biggest + 1;
  }

  addTodo = todoText => {
    const { saveData, savedData } = this.props;
    saveData([...savedData, this.createNewRecord(todoText)]);
  };

  toggleRecordComplete = event => {
    const { saveData, savedData } = this.props;
    const node = event.target.closest('.todo-item__flag');
    let id = node ? parseInt(node.dataset.todoId, 10) : null;
    if (id && !isNaN(id)) {
      saveData(
        savedData.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  };

  createNewRecord = text => ({
    text: text,
    id: this.getId(),
    completed: false
  });

  render() {
    const todos = this.props.savedData;
    return (
      <Card>
        <div className="todo t-todo-list" onClick={this.toggleRecordComplete}>
          <TodoInput onTodoAdd={this.addTodo} />
          {todos.map(todo => (
            <TodoItem {...todo} key={todo.id} />
          ))}
        </div>
      </Card>
    );
  }
}

export default withLocalstorage('todo-app', [])(Todo);
