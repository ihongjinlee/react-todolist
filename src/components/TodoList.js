import styled from 'styled-components';
import TodoItem from './TodoItem';

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  return (
    <TodoListBlock>
      <TodoItem text="할 일 하나" done={true} />
      <TodoItem text="할 일 둘" done={true} />
      <TodoItem text="할 일 셋" done={false} />
      <TodoItem text="할 일 넷" done={false} />
    </TodoListBlock>
  );
}

export default TodoList;
