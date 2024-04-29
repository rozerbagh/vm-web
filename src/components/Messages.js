import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../contexts/AppContext";

function Messages({latitude, longitude}) {
  const {userDetails} = useContext(AppContext)
  const ws = useRef(null);
  const initConnection = () => {
    const connectionInit = new WebSocket("ws://localhost:3006");
    connectionInit.onopen = (event) => {
      ws.current = connectionInit;
      console.log("opened", event)
    };

    connectionInit.onclose = (event) => {};

    connectionInit.onerror = (event) => {};
    connectionInit.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, event);
      if (data.type === "SERVER_COORDS_MESSAGE") {
        console.log("Server coords event response:", data.payload);
      }
    }
  };
  useEffect(() => {
    initConnection();
  }, []);
  useEffect(() => {
    if ((ws.current && longitude && latitude)) {
      const sendMsgData = {
        type: "SEND_COORDS",
        payload: {
          role: "3",
          coordinate_type: "phone",
          phoneno: userDetails.bus.driverphoneno,
          gps_id: "",
          coords: { lat: latitude, long: longitude },
          message: "message",
        },
      };
      setInterval(() => {
        ws.current.send(JSON.stringify(sendMsgData));
      }, 1000);
    } else {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws.current, longitude, latitude, userDetails]);
  return null;
}

export default Messages;
