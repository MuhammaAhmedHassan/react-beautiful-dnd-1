import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) =>
    props.isDragDisabled
      ? "rgba(0, 0, 255, .2)"
      : props.isDragging
      ? "antiquewhite"
      : "white"};
  display: flex;
`;

// const Handle = styled.div`
//   width: 20px;
//   height: 20px;
//   background-color: orange;
//   border-radius: 4px;
//   margin-right: 8px;
// `;

function task(props) {
  const { task, index } = props;

  const isDragDisabled = task.id === "task-1";

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(
        provided,
        snapshot // snapshot contains properties to style component during a drag
      ) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {/* 
            This is a drag handle; square from where we can only drag
          <Handle {...provided.dragHandleProps} /> 
          
          */}
          {task.content}
        </Container>
      )}
    </Draggable>
  );
}

export default task;
