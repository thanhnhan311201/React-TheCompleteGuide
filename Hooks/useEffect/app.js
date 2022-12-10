import ChatChannel from "./ChatChannel";
import { useState } from "react";

// Fake message
function emitMessage(id) {
  setInterval(() => {
    window.dispatchEvent(
      new CustomEvent(`channel-${id}`, {
        detail: `Đây là tin nhắn của kênh chat ${id}`,
      })
    );
  }, 2000);
}

emitMessage(1);
emitMessage(2);
emitMessage(3);

function App() {
  const [show, setShow] = useState(false);

  return (
    <div style={{ padding: 32 }}>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <ChatChannel />}
    </div>
  );
}
