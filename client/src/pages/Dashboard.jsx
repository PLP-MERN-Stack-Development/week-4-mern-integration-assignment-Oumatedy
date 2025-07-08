import { useEffect, useState } from 'react';
import TaskCard from '@/components/TaskCard';
import TaskDialog from '@/components/TaskDialog';
import API from '@/services/api';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  const load = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {load();}, []);

  const createTask = async (payload) => {
    const res = await API.post('/tasks', payload);
    setTasks((prev) => [...prev, res.data]);
    toast({ title: 'Task created successfully' });
    setDialogOpen(false);
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const res = await API.put(`/tasks/${id}`, { completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? res.data : t)));
    toast({ title: `Task ${res.data.completed ? 'completed' : 'reopened'} successfully` });
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast({ title: 'Task deleted successfully' });
  };

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <Button 
            className="bg-black text-white hover:bg-gray-800" 
            onClick={() => setDialogOpen(true)}
          >
            Add Task
          </Button>
        </div>
     
        <section
          className="grid gap-6
                     sm:grid-cols-2
                     lg:grid-cols-3
                     xl:gap-4"
        >
          {tasks.map((t) => (
            <TaskCard
              key={t._id}
              task={t}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </section>
      </main>
      
      <TaskDialog 
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={createTask}
      />
    </>
  );
}