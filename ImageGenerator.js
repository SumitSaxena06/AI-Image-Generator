import React, { useState } from "react";
import axios from "axios";

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/images/generations",
        { prompt, n: 1, size: "512x512" },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      setImage(response.data.data[0].url);
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>AI Image Generator</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter text prompt"
        style={{ padding: "10px", width: "300px" }}
      />
      <button onClick={generateImage} disabled={loading} style={{ marginLeft: "10px", padding: "10px" }}>
        {loading ? "Generating..." : "Generate"}
      </button>
      {image && <img src={image} alt="AI Generated" style={{ marginTop: "20px", width: "512px", height: "512px" }} />}
    </div>
  );
};

export default ImageGenerator;
