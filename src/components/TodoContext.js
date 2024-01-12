import { createContext, useReducer, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true,
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true,
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false,
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    case 'UPDATE_ALL':
      return [...action.todos];
    case 'UPDATE_TEXT':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();
const TodoDragIdContext = createContext();
const TodoDragOverIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  const dragId = useRef(0);
  const dragOverId = useRef(0);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          <TodoDragIdContext.Provider value={dragId}>
            <TodoDragOverIdContext.Provider value={dragOverId}>
              {children}
            </TodoDragOverIdContext.Provider>
          </TodoDragIdContext.Provider>
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoStateContext.Provider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoDispatchContext.Provider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoNextIdContext.Provider');
  }
  return context;
}

export function useTodoDragId() {
  const context = useContext(TodoDragIdContext);
  if (!context) {
    throw new Error('Cannot find TodoDragIdContext.Provider');
  }
  return context;
}

export function useTodoDragOverId() {
  const context = useContext(TodoDragOverIdContext);
  if (!context) {
    throw new Error('Cannot find TodoDragOverIdContext.Provider');
  }
  return context;
}
