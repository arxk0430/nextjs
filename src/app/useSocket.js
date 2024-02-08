import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
	const [socket, setSocket] = useState();

	const socketInitializer = useCallback(async () => {
		await fetch('/api')
		setSocket(io('http://localhost:3001'));
	}, [])

	
	useEffect(() => {
        if (!socket) {
            socketInitializer()
            .then(() => console.log("Set up socket success"))
            .catch(err => console.error("Set up socket fail:", err));
        }
        return () => {
            if (socket) {
                socket.close()
            }
        }
	}, [socket])

    return socket;
}