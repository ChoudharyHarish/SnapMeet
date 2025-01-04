import React, { useState } from "react";
import { useCreatePostMutation } from "../../redux/postApiSlice";
import { useDispatch } from "react-redux";
import { toggleCreateModal } from "../../redux/authSlice";

const CreateModal = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const [createPost] = useCreatePostMutation();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("description", description);
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await createPost(formData);
      setDescription("");
      setSelectedFiles([]);
      dispatch(toggleCreateModal());
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-[200] text-textPrimary">
      <div className="bg-background p-4 rounded-lg w-1/4 h-auto   shadow-lg relative ">
        <h1 className="text-lg font-semibold text-center mb-4">
          Create New Post
        </h1>
        <div className="flex flex-col gap-4  justify-center items-center">
          <div className="border-dashed border-2 border-gray-400 rounded-lg p-6 w-full text-center cursor-pointer ">
            <p className="text-gray-500">
              {selectedFiles.length > 0
                ? "Add more photos/videos"
                : "Drag and drop photos/videos here"}
            </p>
            <label className="block mt-2 text-sm font-medium text-blue-600 cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*, video/*"
                className="hidden"
                onChange={handleFileChange}
              />
              Select from computer
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-2 w-full">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative">
                  <div className="group">
                    {file.type.startsWith("video/") ? (
                      <video
                        src={URL.createObjectURL(file)}
                        className="w-full h-24 object-cover rounded"
                        controls
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-24 object-cover rounded"
                      />
                    )}

                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full h-3 w-3 p-3 flex items-center justify-center  text-sm opacity-75 hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-4">
            <textarea
              className=" p-2 rounded w-full resize-none bg-background outline-none "
              placeholder="Add a description..."
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
              onClick={() => handleSubmit()}
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateModal;
