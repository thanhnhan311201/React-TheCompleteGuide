import { useState } from "react";

const gifts = ["CPU i9", "RAM 32GB", "RGB Keyboard"];

function App() {
  const [gift, setGift] = useState([]);

  const handleUpdate = () => {
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

    setGift((prev) => [...prev, randomGift]);
  };

  return (
    <div style={{ padding: 32 }}>
      <h1>{gift.length === 0 ? "Chưa có phần thưởng" : "Phần thưởng:"}</h1>
      <ul>
        {gift.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <button onClick={handleUpdate}>Lấy thưởng</button>
    </div>
  );
}
