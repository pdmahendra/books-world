import axios from "axios";
import { API } from "../index";
import { toast } from "react-hot-toast";

const handleImageUpload = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(`${API.upload.imgUpload}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);

    return response.data;
  } catch (error) {
    toast.error("Error uploading image.");
  }
};

export default handleImageUpload;
