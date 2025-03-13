import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

  // Mengambil data task dari Supabase
    const fetchTasks = async () => {
        setLoading(true);
        const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: true });
        if (error) {
        console.error('Error fetching tasks:', error);
        } else {
        setTasks(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // Tambah task baru
    const addTask = async (task) => {
        const { data, error } = await supabase
        .from('tasks')
        .insert({ ...task, completed: false })
        .single();
        if (error) {
        console.error('Error adding task:', error);
        } else {
        setTasks((prev) => [...prev, data]);
        }
    };

    // Toggle status task (optimistic update)
    const toggleComplete = async (task) => {
    // Optimistic update: langsung update UI
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
    const updatedStatus = !task.completed;
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: updatedStatus })
      .eq('id', task.id)
      .select() // Menambahkan select() untuk mengembalikan data
      .single();
  
    if (error || !data) {
      console.error('Error updating task:', error);
      // Jika gagal, kembalikan state ke kondisi semula
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, completed: task.completed } : t))
      );
    } else {
      // Jika berhasil, pastikan state sesuai data terbaru
      setTasks((prev) =>
        prev.map((t) => (t.id === data.id ? data : t))
      );
    }
    };

    
    // Update task (edit)
    const updateTask = async (id, updatedData) => {
        const { data, error } = await supabase
        .from('tasks')
        .update(updatedData)
        .eq('id', id)
        .select() // Tambahkan select() di sini
        .single();
    
        if (error || !data) {
        console.error('Error updating task:', error);
        } else {
        setTasks((prev) =>
            prev.map((t) => (t.id === data.id ? data : t))
        );
        }
    };

    // Reset semua task: mengubah completed ke false untuk semua task
    const resetAllTasks = async () => {
        // Optimistic update: langsung set semua task completed ke false di UI
        setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));
        const { data, error } = await supabase
        .from('tasks')
        .update({ completed: false })
        // Hanya update yang sebelumnya sudah true, agar tidak terjadi update tak perlu
        .match({ completed: true })
        .select();
        if (error || !data) {
        console.error('Error resetting all tasks:', error);
        // Jika gagal, refresh data
        fetchTasks();
        } else {
        // Pastikan state di-update dengan data terbaru
        fetchTasks();
        }
    };

    // Reset task (ubah completed ke false) dengan penanganan error
    const resetTask = async (task) => {
        if (!task.completed) return;
        // Optimistic update: langsung set completed ke false
        setTasks((prev) =>
        prev.map((t) =>
            t.id === task.id ? { ...t, completed: false } : t
        )
        );
        const { data, error } = await supabase
        .from('tasks')
        .update({ completed: false })
        .eq('id', task.id)
        .select() // Tambahkan select() untuk mengembalikan data
        .single();
    
        if (error || !data) {
        console.error('Error resetting task:', error);
        // Jika gagal, kembalikan state ke kondisi semula
        setTasks((prev) =>
            prev.map((t) => (t.id === task.id ? { ...t, completed: task.completed } : t))
        );
        } else {
        setTasks((prev) =>
            prev.map((t) => (t.id === data.id ? data : t))
        );
        }
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Task Airdrop</h1>
        <TaskForm onAdd={addTask} />
        {/* Tombol Reset Semua Task */}
        <button
            onClick={resetAllTasks}
            className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        >
            Reset Semua Task
        </button>
        {loading ? (
            <p>Loading tasks...</p>
        ) : (
            tasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                onToggleComplete={toggleComplete}
                onReset={resetTask}
                onEdit={updateTask}
            />
            ))
        )}
        </div>
    );
}
