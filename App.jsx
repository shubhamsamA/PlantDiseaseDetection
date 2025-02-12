import { useState, useEffect, useCallback } from "react";
import { FaLeaf, FaMoon, FaSun } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Handle file selection via drag & drop
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) {
      toast.error("Invalid file type. Please upload a PNG or JPG.");
      return;
    }
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setPrediction("");  // Reset previous predictions
    setProgress(0);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    maxFiles: 1,
  });

  // Optimize memory: Free object URL after image preview
  useEffect(() => {
    if (!selectedFile) return;
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      toast.error("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setProgress(30); // Start progress
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      setProgress(60);

      if (!response.ok) {
        throw new Error("Failed to get prediction. Please try again.");
      }

      const data = await response.json();
      setPrediction(data.prediction);
      toast.success("Prediction successful!");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Error connecting to the server.");
    } finally {
      setLoading(false);
      setProgress(100);

      // Reset form after prediction
      setTimeout(() => {
        setSelectedFile(null);
        setPreview(null);
        setPrediction("");
        setProgress(0);
      }, 7000);  // Reset form after 7 seconds
    }
  };

  return (
    <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100"} min-h-screen`}>
      <ToastContainer position="top-right" autoClose={4000} />

      {/* Navbar */}
      <nav className="bg-green-600 p-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center">
          <FaLeaf className="text-white text-3xl mr-2" />
          <span className="text-white font-bold text-lg">Plant Disease Classifier</span>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className="text-white text-xl">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-6">
            Plant Disease Classification
          </h1>

          {/* Drag & Drop Upload */}
          <div {...getRootProps()} className="border-2 border-dashed border-gray-300 dark:border-gray-500 p-6 text-center cursor-pointer">
            <input {...getInputProps()} />
            {selectedFile ? (
              <p className="text-green-600 font-medium">File Selected: {selectedFile.name}</p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Drag & drop an image here, or click to select</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-4 px-6 py-2 text-white font-bold rounded-lg w-full ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {loading ? <ClipLoader color="#fff" size={20} /> : "Predict"}
          </button>

          {/* Progress Bar */}
          {loading && (
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          {/* Image Preview */}
          {preview && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-white text-center">Selected Image:</h3>
              <img src={preview} alt="Selected" className="mx-auto mt-4 rounded-lg shadow-md max-h-80" />
            </div>
          )}

          {/* Prediction Result */}
          {prediction && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-green-600 dark:text-green-300">Prediction: {prediction}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
