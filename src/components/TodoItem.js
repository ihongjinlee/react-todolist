// https://react-icons.github.io/react-icons/

import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { FaPencil } from 'react-icons/fa6';
import { useTodoDispatch } from './TodoContext';
import React, { useState } from 'react';

const Update = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #f1a52c;
  }
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #ff6b6b;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Update} {
      opacity: 1;
    }

    ${Remove} {
      opacity: 1;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

const UpdateFormPositioner = styled.div`
  width: 100%;
`;

const Input = styled.input`
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  padding: 4px;
  outline: none;
  font-size: 21px;
  box-sizing: border-box;
`;

function TodoItem({ id, done, text }) {
  const [updateMode, setUpdateMode] = useState(false);
  const [textValue, setTextValue] = useState(text);

  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  const onUpdate = () => {
    setUpdateMode(!updateMode);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_TEXT',
      id,
      text: textValue,
    });

    setUpdateMode(false);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>

      {!updateMode ? (
        <>
          <Text done={done}>{text}</Text>
          <Update onClick={onUpdate}>
            <FaPencil />
          </Update>
          <Remove onClick={onRemove}>
            <MdDelete />
          </Remove>
        </>
      ) : (
        <UpdateFormPositioner>
          <form onSubmit={onSubmit}>
            <Input
              autoFocus
              placeholder="할 일을 입력 후, Enter!"
              onChange={(e) => setTextValue(e.target.value)}
              value={textValue}
            />
          </form>
        </UpdateFormPositioner>
      )}
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
