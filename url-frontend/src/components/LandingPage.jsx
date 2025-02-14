import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const baseUrl = "http://localhost:4000"; // Ensure backend is running on this

export default function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    const socket = io(baseUrl, { transports: ["websocket", "polling"] });

    socket.on("connect", () => {
      console.log("✅ Connected to Socket.IO");
    });

    socket.on("analyticsUpdate", (data) => {
      console.log("📊 Received analytics update:", data);
      if (shortUrl && data.shortId === shortUrl.split("/").pop()) {
        setAnalytics({ totalClicks: data.totalClicks });
      }
    });

    return () => {
      socket.off("analyticsUpdate");
      socket.disconnect();
      console.log("❌ Disconnected from Socket.IO");
    };
  }, [shortUrl]);

  const handleShorten = async () => {
    if (!url) return;
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${baseUrl}`, { url });
      setShortUrl(`${baseUrl}/${response.data.id}`);
    } catch (error) {
      console.error("❌ Error shortening URL", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchAnalytics = async () => {
    if (!shortUrl) return;
    const shortId = shortUrl.split("/").pop();
    try {
      const response = await axios.get(`${baseUrl}/analytics/${shortId}`);
      setAnalytics(response.data);
    } catch (error) {
      console.error("❌ Error fetching analytics", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
        
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button
          onClick={handleShorten}
          className={`w-full py-2 rounded transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>

        {shortUrl && (
          <div className="mt-4">
            <p className="text-gray-700">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-semibold"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {shortUrl && (
          <button
            onClick={fetchAnalytics}
            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            View Analytics
          </button>
        )}

        {analytics && (
          <div className="mt-4 text-gray-700">
            <p>Total Clicks: {analytics.totalClicks}</p>
          </div>
        )}
      </div>
    </div>
  );
}
