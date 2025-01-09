import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { context, server } from "../main";
import { toast } from "react-hot-toast";
import Task from "../components/Task";
import { Navigate } from "react-router-dom";

const Home = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const { isAuthenticated } = useContext(context);

    // Update Task
    const updateHandler = async (id) => {
        try {
            const { data } = await axios.put(
                `${server}/tasks/${id}`,
                {},
                { withCredentials: true }
            );
            toast.success(data.message);
            setRefresh((prev) => !prev);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Delete Task
    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${server}/tasks/${id}`, {
                withCredentials: true,
            });
            toast.success(data.message);
            setRefresh((prev) => !prev);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    // Add New Task
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${server}/tasks/new`,
                { title, description },
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setTitle("");
            setDescription("");
            toast.success(data.message);
            setLoading(false);
            setRefresh((prev) => !prev);
        } catch (error) {
            toast.error(error.response.data.message);
            setLoading(false);
        }
    };

    // Fetch Tasks
    useEffect(() => {
        axios
            .get(`${server}/tasks/alltasks`, { withCredentials: true })
            .then((res) => {
                setTasks(res.data.tasks);
            })
            .catch((e) => {
                toast.error(e.response.data.message);
            });
    }, [refresh]);

    if (!isAuthenticated) return <Navigate to="/login" />;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col items-center p-6 space-y-8">
            {/* Task Form Section */}
            <div className="w-full md:w-2/3 lg:w-1/2 bg-slate-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Manage Your Tasks</h1>
                <form onSubmit={submitHandler} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="p-3 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="p-3 bg-slate-700 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 text-white rounded-lg font-semibold ${
                            loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                        } transition-all duration-300`}
                    >
                        {loading ? "Adding Task..." : "Add Task"}
                    </button>
                </form>
            </div>

            {/* Task List Section */}
            <section className="w-full md:w-2/3 lg:w-1/2 space-y-4">
                <h2 className="text-2xl font-semibold text-center mb-4">Your Tasks</h2>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Task
                            key={task._id}
                            id={task._id}
                            title={task.title}
                            description={task.description}
                            isCompleted={task.isCompleted}
                            updateHandler={updateHandler}
                            deleteHandler={deleteHandler}
                        />
                    ))
                ) : (
                    <p className="text-center text-slate-400">No tasks available. Add some tasks to get started!</p>
                )}
            </section>
        </div>
    );
};

export default Home;

