import { useState } from 'react';

const TaskCard = ({ task, onToggleComplete, onReset, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState(task.project_name);
  const [editedTaskDetail, setEditedTaskDetail] = useState(task.task_detail);
  const [editedLink, setEditedLink] = useState(task.link);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Panggil fungsi update dari parent dengan data yang telah diedit
    onEdit(task.id, {
      project_name: editedProjectName,
      task_detail: editedTaskDetail,
      link: editedLink,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <div className="mb-2">
            <label className="block text-gray-700">Nama Project:</label>
            <input 
              type="text"
              value={editedProjectName}
              onChange={(e) => setEditedProjectName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Detail Task:</label>
            <textarea
              value={editedTaskDetail}
              onChange={(e) => setEditedTaskDetail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700">Link:</label>
            <input
              type="url"
              value={editedLink}
              onChange={(e) => setEditedLink(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-center mb-2">
            <h2 className={`text-xl font-bold ${task.completed ? 'line-through' : ''}`}>
              {task.project_name}
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task)}
                className="w-5 h-5"
              />
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onReset(task)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Reset
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
          <p className={`text-gray-700 mb-2 ${task.completed ? 'line-through' : ''}`}>
            {task.task_detail}
          </p>
          <a
            href={task.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-blue-500 ${task.completed ? 'line-through' : ''}`}
          >
            {task.link}
          </a>
        </>
      )}
    </div>
  );
};

export default TaskCard;
