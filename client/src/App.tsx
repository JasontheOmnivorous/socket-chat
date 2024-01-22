import { useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000");

function App() {
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");

  socket.on("receiveMessage", (message: string) => {
    setMessageList([...messageList, message]);
  });

  const handleSendMessage = () => {
    socket.emit("sentMessage", message);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="border border-gray-300 rounded-xl w-[90%] h-[60%] flex flex-col items-start justify-end">
        {/* message field */}
        <div className="flex flex-col gap-2 p-2">
          {messageList.map((item, index) => (
            <div className="bg-gray-200 p-2 rounded-full" key={index}>
              {item}
            </div>
          ))}
        </div>
        {/* sending field */}
        <div className="flex flex-row items-center justify-center border-t border-gray-300 w-full p-2 gap-1">
          <input
            value={message}
            onChange={(evt) => setMessage(evt.target.value)}
            type="text"
            className="border border-gray-400 p-2 rounded-xl w-[70%] h-auto focus:outline-blue-500"
            placeholder="send message..."
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 p-2 rounded-full text-white w-20 h-auto hover:bg-blue-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
