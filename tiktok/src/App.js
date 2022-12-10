import { useState, useEffect } from "react";

const channels = [
  {
    id: 1,
    name: "Họa sĩ và bọn giàu",
  },
  {
    id: 2,
    name: "Group của những nỗi buồn",
  },
  {
    id: 3,
    name: "Cả nhà cùng vui",
  },
];

function ChatChannel() {
  const [channelID, setChannelID] = useState(1);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageHandler = ({ detail }) => {
      setMessages((prev) => [...prev, detail]);
    };

    window.addEventListener(`channel-${channelID}`, messageHandler);

    return () => {
      setMessages([]);
      window.removeEventListener(`channel-${channelID}`, messageHandler);
    };
  }, [channelID]);

  return (
    <div>
      {channels.map((channel) => (
        <button
          key={channel.id}
          style={
            channelID === channel.id
              ? { backgroundColor: "#333", color: "#fff" }
              : {}
          }
          onClick={() => setChannelID(channel.id)}
        >
          {channel.name}
        </button>
      ))}
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </div>
  );
}

function App() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <ChatChannel />}
    </div>
  );
}

export default App;
