import { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [projectName, setProjectName] = useState('');
  const [taskDetail, setTaskDetail] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName || !taskDetail || !link) return;
    // Pastikan field completed diatur default false saat penambahan task
    onAdd({ project_name: projectName, task_detail: taskDetail, link });
    setProjectName('');
    setTaskDetail('');
    setLink('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-gray-700">Nama Project:</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full bg-white border rounded p-3"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Detail Task:</label>
        <textarea
          value={taskDetail}
          onChange={(e) => setTaskDetail(e.target.value)}
          className="w-full bg-white border rounded p-3"
        />
      </div>
      <div className="mb-2">
        <label className="block text-gray-700">Link:</label>
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full bg-white border rounded p-3"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Tambah Task
      </button>
    </form>
  );
};

export default TaskForm;
