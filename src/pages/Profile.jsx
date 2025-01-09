import { useContext } from "react";
import { context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { user, loading } = useContext(context);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-slate-800 p-8 rounded-lg shadow-lg text-center border border-slate-700 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4">{user?.name || "Guest"}</h1>
          <p className="text-lg text-slate-300">{user?.email || "No email available"}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
