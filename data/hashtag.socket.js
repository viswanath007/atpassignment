import * as TC from "../api/controllers/tweet.controller";


export default (app, io) => {
    let socketConnection;

    // Establishes socket connection
    io.on("connection", socket => {
        socketConnection = socket;
        socket.on("connection", () => console.log("Client connected"));
        socket.on("disconnect", () => console.log("Client disconnected"));
    });

    /**
     * Emits 10 popular hashtags from last hour
     * @param {String} msg
     */

    const sendMessage = async () => {
        const msg = await TC.getHashtagsCount();
        // TC.deleteExpiredTweets();
        console.log('msg',msg);
        if (socketConnection)
            socketConnection.emit("hashtagsCount", msg);
    }

    setInterval(() => sendMessage(), 5 * 1000); // periodically - eg: 1 min


}
