import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const itemsFromBackend = [
  { id: uuid(), content: "First Task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "ToDo",
    items: itemsFromBackend,
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
  },
  [uuid()]: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function WeekTwoSecond() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [userInput, setUserInput] = useState("");

  const handleClick = (e) => {
    e.preventDefault();

    const newTask = { id: uuid(), content: userInput };

    // Aktualisieren Sie den State, um den neuen Task hinzuzufügen
    setColumns((prevColumns) => {
      // Annahme: Sie fügen den neuen Task zur "ToDo"-Spalte hinzu
      const newColumns = { ...prevColumns };
      const toDoColumnKey = Object.keys(newColumns).find(
        (key) => newColumns[key].name === "ToDo"
      );
      if (toDoColumnKey) {
        newColumns[toDoColumnKey].items.push(newTask);
      }
      return newColumns;
    });

    setUserInput("");
  };

  return (
    <div
    className="taskmanager_outer_container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        border: "2px solid white",
        borderRadius: "10px",
        marginTop: "10px",
        padding: "20px",
      }}
    >
      <div>
        <h1>Easy Task Manager</h1>
        <input
          className="task_input"
          placeholder="Enter task here"
          style={{ height: "30px" }}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></input>
        <button
          onClick={handleClick}
          style={{ marginLeft: 8, backgroundColor: "white", color: "black" }}
        >
          Add Task
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          height: "75vh",
          border: "2px solid white",
          borderRadius: "10px",
          marginTop: "10px",
          padding: 20,
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "#0d0d0d"
                              : "black",
                            border: "1px solid white",
                            borderRadius: 10,
                            padding: 10,
                            /* width: "33%", */
                            minWidth: 300,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        border: "1px solid white",
                                        borderRadius: 10,
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "red"
                                          : "",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default WeekTwoSecond;
