


/* eslint-disable react/prop-types */
import React from "react";

const Task = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="w-full flex justify-between items-center bg-slate-700 text-slate-300 p-4 rounded-lg shadow-lg border border-slate-600">
      {/* Task Details */}
      <div className="space-y-1">
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-slate-400">{description}</p>
      </div>

      {/* Controls Section */}
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
          className="w-6 h-6 accent-green-500 cursor-pointer"
        />
        
        {/* Delete Button */}
        <button
          onClick={() => deleteHandler(id)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300 ease-in-out shadow-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
