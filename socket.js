const { Server } = require("socket.io");

let io;

function initSocket(server) {
    io = new Server(server, { 
        cors: { 
            origin: "http://localhost:5173", // Update if your frontend runs on a different port
            methods: ["GET", "POST"]
        } 
    });

    io.on("connection", (socket) => {
        console.log("✅ Client Connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("❌ Client Disconnected:", socket.id);
        });
    });
}

const sendAnalyticsUpdate = async (shortId) => {
    const URL = require("./models/urlSchema");
    const result = await URL.findOne({ shortId });

    if (result && io) {
        io.emit("analyticsUpdate", {
            shortId,
            totalClicks: result.visitHistory.length,
        });
    }
};

module.exports = { initSocket, sendAnalyticsUpdate };
