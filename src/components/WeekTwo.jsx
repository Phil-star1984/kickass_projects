import React from "react";

import Draggable from "react-draggable";

function WeekTwo() {
  // Definieren Sie hier die Handler-Funktionen
  const handleStart = (e, data) => {
    console.log("Start Dragging", data);
    // Ihr Code für den Start des Dragging-Vorgangs
  };

  const handleDrag = (e, data) => {
    console.log("Dragging", data);
    // Ihr Code während des Dragging-Vorgangs
  };

  const handleStop = (e, data) => {
    console.log("Stop Dragging", data);
    // Ihr Code beim Beenden des Dragging-Vorgangs
  };
  return (
    <div className="weektwo_outer_container">
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        grid={[10, 10]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div>
          <div className="handle">
            Drag this element
            <div>Task 01</div>
            <div>Task 02</div>
          </div>
        </div>
      </Draggable>
      <h1>Simple Project Planner</h1>
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
  );
}

export default WeekTwo;
