/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../contexts/AppContext";
import { MapContext } from "../contexts/MapContext";

function Messages() {
  const { userDetails } = useContext(AppContext);
  const {
    lng: latitude,
    lat: longitude,
    handleFetchNavigation,
  } = useContext(MapContext);
  const ws = useRef(null);
  const initConnection = () => {
    const connectionInit = new WebSocket("ws://174.138.123.193:3006");
    connectionInit.onopen = (event) => {
      ws.current = connectionInit;
      // console.log("opened", event);
    };

    connectionInit.onclose = (event) => {};

    connectionInit.onerror = (event) => {
      console.log("::: error event :::", event);
    };
    connectionInit.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const type = data["type"];
      console.log(":::onmessage:::", data, event);
      switch (type) {
        case "SERVER_COORDS_MESSAGE":
          const payload = data.payload;
          switch (userDetails.role) {
            case 1:
              const driverLatLong = [
                parseFloat(payload.coords.lat),
                parseFloat(payload.coords.long),
              ];
              if (latitude && longitude) {
                handleFetchNavigation([[latitude, longitude], driverLatLong]);
              }
              break;

            default:
              break;
          }
          break;

        default:
          break;
      }
    };
  };
  useEffect(() => {
    initConnection();
  }, []);
  const handleUserMessage = (socket) => {};
  const handleDriverMessage = (socket) => {
    const sendMsgData = {
      type: "SEND_COORDS",
      payload: {
        role: `${userDetails.role}`,
        coordinate_type: "phone",
        phoneno: userDetails.bus.driverphoneno,
        gps_id: "",
        coords: { lat: latitude, long: longitude },
        message: "message",
      },
    };
    setInterval(()=>{
      socket.send(JSON.stringify(sendMsgData));
    }, 2000)
  };
  useEffect(() => {
    if (ws.current && longitude && latitude) {
      console.log(userDetails.role);
      switch (parseInt(userDetails.role)) {
        case 3:
          handleDriverMessage(ws.current);
          break;
        case 1:
          handleUserMessage(ws.current);
          break;
        default:
          break;
      }
    }
  }, [ws.current, longitude, latitude, userDetails.role]);
  return null;
}

export default Messages;
