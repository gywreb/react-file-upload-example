import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState();
  const handleUpload = async () => {
    try {
      const form = new FormData();
      const categories = ["60816e224edd74546c2a6c1d"];
      form.append("name", "new product");
      form.append("price", "10000");
      categories.map((category, index) => {
        form.append(`categories[${index}]`, category);
      });
      form.append("featuredImg", image);
      const { data } = await axios.post(
        "http://139.180.196.41:6969/adminPanel/api/product",
        form,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc0FjdGl2ZSI6dHJ1ZSwiZnVsbG5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGUiOiI2MDdjZjRhMjk0YmI3NjUxZWQ2MmNiMTYiLCJjcmVhdGVkQXQiOiIyMDIxLTA0LTE5VDAzOjExOjE0LjkzOFoiLCJ1cGRhdGVkQXQiOiIyMDIxLTA0LTE5VDAzOjExOjE0LjkzOFoiLCJpYXQiOjE2MTkxMDU1MzQsImV4cCI6MTYxOTcxMDMzNH0.4IJFPzBqgc_F_UMRMCD5lgYun2lH56PXnFqog4149lM",
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    setImage(file);
    reader.onerror = () => {
      console.log("error on load image");
    };
  };
  return (
    <>
      <div className="App">
        <div>
          <input
            accept="image/*"
            className="hidden"
            id="button-file"
            type="file"
            onChange={handleUploadChange}
          />
        </div>
        <button onClick={handleUpload}>create product</button>
      </div>
      <img
        src="http://139.180.196.41:6969/adminPanel/api/file/a711db008e7dfc34840a05c04f5f32ec26ba78f2.jpg"
        style={{ width: 500 }}
      />
    </>
  );
}

export default App;
