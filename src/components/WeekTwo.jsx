import React, { useState, useEffect } from "react";
import { ResizableBox } from "react-resizable";
import Draggable from "react-draggable";

function WeekTwo() {
  const [userInput, setUserInput] = useState("");
  const [taskList, setTaskList] = useState(() => {
    // Versuchen Sie, die gespeicherte Task-Liste beim Laden zu laden
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const handleStop = (e, data, index) => {
    console.log("Stop Dragging", data);

    // Aktualisieren Sie die Position des verschobenen Tasks
    const updatedTasks = [...taskList];
    updatedTasks[index] = { ...updatedTasks[index], x: data.x, y: data.y };
    setTaskList(updatedTasks);

    // Speichern Sie die aktualisierte Liste im LocalStorage
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    console.log(taskList);
  };

  const createTask = () => {
    const newTask = { content: userInput, x: 0, y: 0 };
    const updatedTasks = [...taskList, newTask];
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setUserInput("");
  };

  // Funktion, um die Positionen aller Tasks zurückzusetzen
  const resetXy = () => {
    const resetTasks = taskList.map((task) => ({ ...task, x: 0, y: 0 }));
    setTaskList(resetTasks);
    localStorage.setItem("tasks", JSON.stringify(resetTasks));
  };

  const deleteLocalStorage = () => {
    localStorage.clear();
    setTaskList([]);
  };

  return (
    <div className="weektwo_outer_container">
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter new task"
      ></input>
      <button onClick={createTask}>+</button>
      <button onClick={resetXy}>Reset XY</button>
      <button onClick={deleteLocalStorage}>Delete All Tasks</button>

      <h1>Simple Project Planner</h1>
      <div className="weektwo_inner_big_container">
        <div className="task_container">
          {taskList.map((item, index) => (
            <Draggable
              key={index}
              axis="both"
              handle=".handle"
              defaultPosition={{ x: item.x, y: item.y }}
              position={null}
              grid={[5, 5]}
              scale={1}
              onStop={(e, data) => handleStop(e, data, index)}
            >
              <ResizableBox width={100} height={100}>
                <div className="handle">{item.content}</div>
              </ResizableBox>
            </Draggable>
          ))}
        </div>
        <div className="weektwo_inner_container">
          {/* week one */}
          <div className="weektwo_item">1</div>
          <div className="weektwo_item">2</div>
          <div className="weektwo_item">3</div>
          <div className="weektwo_item">4</div>
          <div className="weektwo_item">5</div>
          <div className="weektwo_item">6</div>
          <div className="weektwo_item">7</div>

          {/* week two */}
          <div className="weektwo_item">8</div>
          <div className="weektwo_item">9</div>
          <div className="weektwo_item">10</div>
          <div className="weektwo_item">11</div>
          <div className="weektwo_item">12</div>
          <div className="weektwo_item">13</div>
          <div className="weektwo_item">14</div>

          {/* week three */}
          <div className="weektwo_item">15</div>
          <div className="weektwo_item">16</div>
          <div className="weektwo_item">17</div>
          <div className="weektwo_item">18</div>
          <div className="weektwo_item">19</div>
          <div className="weektwo_item">20</div>
          <div className="weektwo_item">21</div>

          {/* week four */}
          <div className="weektwo_item">22</div>
          <div className="weektwo_item">23</div>
          <div className="weektwo_item">24</div>
          <div className="weektwo_item">25</div>
          <div className="weektwo_item">26</div>
          <div className="weektwo_item">27</div>
          <div className="weektwo_item">28</div>

          {/* week five */}
          <div className="weektwo_item">29</div>
          <div className="weektwo_item">30</div>
          <div className="weektwo_item">31</div>
          <div className="weektwo_item">32</div>
          <div className="weektwo_item">33</div>
          <div className="weektwo_item">34</div>
          <div className="weektwo_item">35</div>
        </div>
      </div>
    </div>
  );
}

export default WeekTwo;

{
  /* <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[5, 5]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <ResizableBox width={100} height={100}>
          <div
            className="handle"
            style={{
              backgroundColor: "blue",
              width: "100%",
              height: "100%",
              borderRadius: "5px",
              padding: "7px",
            }}
          >
            Drag task element
            <div>- Task 01</div>
            <div>- Task 02</div>
          </div>
        </ResizableBox>
      </Draggable> */
}
