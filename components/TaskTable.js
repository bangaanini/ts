const TaskTable = ({ tasks }) => {
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Nama Project</th>
            <th className="py-2 px-4 border">Detail Task</th>
            <th className="py-2 px-4 border">Link</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td className="py-2 px-4 border">{task.project_name}</td>
              <td className="py-2 px-4 border">{task.task_detail}</td>
              <td className="py-2 px-4 border">
                <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {task.link}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default TaskTable;
  
