import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    connectionState === 1 ? console.log("Already connected.") : connectionState === 2 ? console.log("Connecting...") : ("")

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: 'restapi-empresas-test',
            bufferCommands: true
        });
        console.log("Connected.")
    } catch (err: any) {
        console.log("Error: ", err);
        throw new Error("Error: ", err);
    }
};

export default connect;