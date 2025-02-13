import { IoPerson } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import AudioUploader from "./components/AudioUploader";

const App = () => {
  const [action, setAction] = useState("Sign Up");
  const [showUploader, setShowUploader] = useState(false);

  const handleActionClick = (newAction) => {
    if (newAction === "Sign Up") {
      alert("Signed up successfully! Switching to Login.");
      setAction("Login");
    } else {
      alert("Logged in successfully!");
    }
  };

  if (showUploader) {
    return <AudioUploader onBack={() => setShowUploader(false)} />;
  }

  return (
    <div className="bg-[url('/assets/bg.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center">
      <div className="lg:w-[450px] bg-white p-10 rounded-bl-[40px] rounded-se-[40px] shadow-lg">
        <h1 className="text-3xl text-blue-900 text-center mb-6 transition-all">{action}</h1>
        <div className="w-full">
          {action === "Login" ? null : (
            <div className="bg-gray-200 flex items-center gap-5 my-4 p-4 rounded transition-all">
              <IoPerson className="text-gray-700 text-xl" />
              <input type="text" className="bg-transparent border-none outline-none" placeholder="Your Username" />
            </div>
          )}
          <div className="bg-gray-200 flex items-center gap-5 my-4 p-4 rounded">
            <MdEmail className="text-gray-700 text-xl" />
            <input type="email" className="bg-transparent border-none outline-none" placeholder="Your Email" />
          </div>
          <div className="bg-gray-200 flex items-center gap-5 my-4 p-4 rounded">
            <RiLockPasswordFill className="text-gray-700 text-xl" />
            <input type="password" className="bg-transparent border-none outline-none" placeholder="Your Password" />
          </div>

          {action === "Login" && (
            <p className="text-sm text-gray-600 text-center">
              Forgot Password? <span className="text-blue-900 cursor-pointer">Click Here</span>
            </p>
          )}

          <div className="flex justify-center gap-8 mt-6">
            <button
              className={`text-xl text-white py-2 w-36 rounded-3xl ${action === "Sign Up" ? "bg-blue-900" : "bg-gray-200"}`}
              onClick={() => handleActionClick("Sign Up")}
            >
              Sign Up
            </button>
            <button
              className={`text-xl text-white py-2 w-36 rounded-3xl ${action === "Login" ? "bg-blue-900" : "bg-gray-200"}`}
              onClick={() => handleActionClick("Login")}
            >
              Login
            </button>
          </div>

          <button
            onClick={() => setShowUploader(true)}
            className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            Continue to Audio Uploader
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
