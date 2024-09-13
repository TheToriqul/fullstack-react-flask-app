import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      try {
        await axios.post("/api/tasks", { title: newTask, completed: false });
        setNewTask("");
        fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const toggleTask = async (task) => {
    try {
      await axios.put(`/api/tasks/${task.id}`, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  }).filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = tasks.filter(task => task.completed).length;
  const activeCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-6 flex flex-col justify-center sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative py-3 sm:max-w-3xl sm:mx-auto w-full px-2 sm:px-0"
      >
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 bg-clip-padding bg-opacity-60 border border-gray-200" style={{ backdropFilter: 'blur(20px)' }}>
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600 mb-8">
                Task Master Dashboard
              </h1>
            </motion.div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Task Summary</h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{tasks.length}</p>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{completedCount}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{activeCount}</p>
                  <p className="text-sm text-gray-600">Active</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <form onSubmit={addTask} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                >
                  Add Task
                </motion.button>
              </form>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="space-x-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={`px-3 py-1 rounded-md ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("active")}
                    className={`px-3 py-1 rounded-md ${filter === "active" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter("completed")}
                    className={`px-3 py-1 rounded-md ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                  >
                    Completed
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <AnimatePresence>
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-3 bg-white p-3 rounded-lg shadow-sm mb-2"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task)}
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span
                      className={`flex-grow ${
                        task.completed ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;