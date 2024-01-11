import styled from 'styled-components';
import TodoItem from './TodoItem';
import {
  useTodoDispatch,
  useTodoDragId,
  useTodoDragOverId,
  useTodoState,
} from './TodoContext';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const todos = useTodoState();
  const dragId = useTodoDragId();
  const dragOverId = useTodoDragOverId();
  const dispatch = useTodoDispatch();

  function handleSort() {
    const todosClone = [...todos];

    // 해체 할당
    [todosClone[dragId.current], todosClone[dragOverId.current]] = [
      todosClone[dragOverId.current],
      todosClone[dragId.current],
    ];

    dispatch({
      type: 'UPDATE_ALL',
      todos: todosClone,
    });
  }

  return (
    <TodoListBlock>
      {todos.map(({ id, text, done }, index) => (
        <div
          key={id}
          draggable
          onDragStart={() => (dragId.current = index)}
          onDragEnter={() => (dragOverId.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <TodoItem id={id} text={text} done={done} />
        </div>
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
