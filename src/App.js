import React, { useState } from "react";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import initialData from "initial-data";
import Column from "components/column";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

function App() {
  const [state, setState] = useState(initialData);

  const onDragStart = (start) => {
    // To change color
    //               1
    // document.body.style.color = "orange";
    // document.body.style.transition = "background-color 0.2s ease";

    //                2
    // to disable droppable in certain conditions
    const homeIndex = state.columnOrder.indexOf(start.source.droppableId);

    setState({
      ...state,
      homeIndex,
    });
  };

  const onDragUpdate = (update) => {
    //              1
    // const { destination } = update;
    // const opacity = destination
    //   ? destination?.index / Object.keys(state.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  const onDragEnd = (result) => {
    //              1
    // document.body.style.color = "inherit";
    // document.body.style.backgroundColor = "inherit";

    //               2 lesson 11
    setState({ ...state, homeIndex: null });
    //        end   2

    // reorder our column
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds); // this will create a new taskIds array with the same content as our last array
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Container>
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          const isDropDisabled = index < state.homeIndex; // this will stop dragging backwards

          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              // isDropDisabled={isDropDisabled}
              isDropDisabled={false}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}

export default App;
