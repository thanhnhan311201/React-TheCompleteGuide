import { useEffect, useState } from "react";
// - Nhiệm vụ chính của React component và React app là một chức năng chính là render UI, tương tác với user input, re-render
// component, quản lý state và props,... tất cả đều là để render UI.
// - Side effect là tất cả những tác động lên chương trình như: send http request, lưu trữ data trong browser storage, timer
// hoặc interval,... Những task đó không liên quan tới việc render UI, do đó chúng ta nên xử lý những task đó tại một nơi khác
// để tránh tạo ra bug mỗi khi component re-render.
// - Chúng ta sẽ sử dụng useEffect khi chúng ta cần side effects, tức là khi chúng ta tác động lên chương trình làm thay đổi
// dữ liệu, chẳng hạn như:
//    1. Update DOM
//    2. Call API
//    3.Listen DOM events
//        - Scroll
//        - Resize
//     4. Clean up
//        - Remove listener / Unsubsribe
//        - Clear timer

// - Có 3 trường hợp sử dụng useEffect: lưu ý cho cả 3 trường hợp là callback luôn được gọi sau khi component mounted
{
  function Content() {
    useEffect(() => console.log("Mounted"));

    return (
      <div>
        <h1>Hello World!</h1>
      </div>
    );
  }

  function App() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Content />}
      </div>
    );
  }

  // "Mounted"
}
// - Trường hợp 1: sử dụng useEffect với 1 đối số là callback
//    - Cú pháp: useEffect(callback)
//    - Gọi callback mỗi khi component re-render (useState)
//    - Gọi callback sau khi component thêm element vào DOM
{
  function Content() {
    const [title, setTitle] = useState("");

    useEffect(() => (document.title = title));

    return (
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
    );
  }

  function App() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Content />}
      </div>
    );
  }
}
// - Chúng ta nên đặt đoạn code dùng DOM element trong useEffect thứ nhất là để đảm bảo về mặt ý nghĩa, thứ hai để tránh
// việc chúng ta gọi DOM trước khi mounted component hoặc component re-render, vì điều này sẽ ảnh hưởng tới mặt logic code
// sau này.

// - Trường hợp 2: sử dụng useEffect với 2 đối số, 1 là callback, 2 là một mảng rỗng
//    - Cú pháp: useEffect(callback, [])
//    - Chỉ gọi callback 1 lần mỗi khi component được mounted
{
  function Content() {
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((posts) => setPosts(posts));
    }, []);

    return (
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  function App() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Content />}
      </div>
    );
  }
}
// - Chúng ta không nên sử dụng fetchAPI ở ngoài, bởi vì mỗi lần component re-render thì hàm gọi API sẽ lại được gọi, và điều
// này là nên tránh.
// - Chúng ta cũng không nên sử dụng fetchAPI ở trường hợp đầu tiên, bởi vì khi component re-render bởi hàm setPosts ở trong
// useEffect, callback trong useEffect sẽ lại được gọi và vô tình setPosts tiếp tục được gọi, do đó vô tình tạo ra vòng lặp
// vô hạn.
// - Do đó khi chúng ta cần sử dụng fetchAPI ở trong useEffect, thì chúng ta nên truyền thêm đối số thứ 2 là mảng rỗng [], vì
// lúc này callback chỉ được gọi sau khi component được mounted.

// - Trường hợp 3: sử dụng useEffect với 2 đối số, 1 là callback, 2 là một mảng chứa biến dependencies
//    - Cú pháp: useEffect(callback, [deps])
//    - Chỉ gọi callback 1 lần mỗi khi deps thay đổi
{
  const tabs = ["posts", "comments", "albums"];
  function Content() {
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState("posts");

    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then((response) => response.json())
        .then((posts) => setPosts(posts));
    }, [type]);

    return (
      <div>
        {tabs.map((tab) => (
          <button
            style={
              tab === type ? { backgroundColor: "#333", color: "#fff" } : {}
            }
            onClick={() => setType(tab)}
            key={tab}
          >
            {tab}
          </button>
        ))}
        <br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title || post.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  function App() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Content />}
      </div>
    );
  }
}

// - Chúng ta có thể sử dụng useEffect để lắng nghe DOM events.
// - Ví dụ: sử dụng useEffect để lắng nghe sự kiện scroll để hiển thị button goOntOp, nếu cuộn chuột lớn hơn 200px thì hiển
// thị button, nếu nhỏ hơn thì ẩn.
{
  const tabs = ["posts", "comments", "albums"];
  function Content() {
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState("posts");
    const [showGoOnTop, setShowGoOnTop] = useState(false);

    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then((response) => response.json())
        .then((posts) => setPosts(posts));
    }, [type]);

    useEffect(() => {
      const scrollHandler = () => {
        setShowGoOnTop(window.scrollY >= 200);
      };

      window.addEventListener("scroll", scrollHandler);
    }, []);

    return (
      <div>
        {tabs.map((tab) => (
          <button
            style={
              tab === type ? { backgroundColor: "#333", color: "#fff" } : {}
            }
            onClick={() => setType(tab)}
            key={tab}
          >
            {tab}
          </button>
        ))}
        <br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title || post.name}</li>
          ))}
        </ul>
        {showGoOnTop && (
          <button
            onClick={() => window.scrollTo(0, 0)}
            style={{ position: "fixed", right: 20, bottom: 20 }}
          >
            Go to top
          </button>
        )}
      </div>
    );
  }

  function App() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Content />}
      </div>
    );
  }
}
// - Khi lắng nghe một DOM event thì chúng ta cần lưu ý là khi component unmount, tuy nhiên addEventListener vẫn còn được thực
// hiện chứ nó không hề bị xóa bỏ theo component, điều đó dẫn tới một vấn đề là bị "memory leak". Có nghĩa component đã được
// unmounted nhưng addEventListener vẫn còn nằm trong bộ nhớ và vẫn còn "running", rồi khi chúng ta mounted lại component thì
// lúc này vô tình lại tạo thêm một eventListener khác.
// - Để tránh điều đó thì mỗi khi component được unmounted thì chúng ta phải removeEventListener, để làm được điều đó chúng ta
// sẽ sử dụng cleanup function của useEffect.
// - Công dụng chính của cleanup function là dọn dẹp bộ nhớ khi component unmounted.
// - Cleanup function sẽ được định nghĩa thông qua return của useEffect, và sẽ được gọi trước khi component được unmounted.
{
  const tabs = ["posts", "comments", "albums"];
  function Content() {
    const [title, setTitle] = useState("");
    const [posts, setPosts] = useState([]);
    const [type, setType] = useState("posts");
    const [showGoOnTop, setShowGoOnTop] = useState(false);

    useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/${type}`)
        .then((response) => response.json())
        .then((posts) => setPosts(posts));
    }, [type]);

    useEffect(() => {
      const scrollHandler = () => {
        setShowGoOnTop(window.scrollY >= 200);
      };

      window.addEventListener("scroll", scrollHandler);

      // Cleanup function
      return () => {
        window.removeEventListener("scroll", scrollHandler);
      };
    }, []);

    return (
      <div>
        {tabs.map((tab) => (
          <button
            style={
              tab === type ? { backgroundColor: "#333", color: "#fff" } : {}
            }
            onClick={() => setType(tab)}
            key={tab}
          >
            {tab}
          </button>
        ))}
        <br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title || post.name}</li>
          ))}
        </ul>
        {showGoOnTop && (
          <button
            onClick={() => window.scrollTo(0, 0)}
            style={{ position: "fixed", right: 20, bottom: 20 }}
          >
            Go to top
          </button>
        )}
      </div>
    );
  }

  function App() {
    const [show, setShow] = useState(false);
    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Content />}
      </div>
    );
  }
}

// - Mỗi khi làm việc với React component, mà component có thể unmounted bất cứ lúc nào, mà ở trong component có sử dụng những
// phương thức như setInterval, setTimeOut, async, addEventListener, subcribeEvent,... thì mỗi lần unmounted component thì
// chúng ta phải remove tất cả những phương thức đó bằng cleanup function.
{
  function Content() {
    const [countdown, setCountdown] = useState(180);

    useEffect(() => {
      const timeID = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timeID);
    }, []);

    return (
      <div>
        <h1>{countdown}</h1>
      </div>
    );
  }

  function App() {
    const [show, setShow] = useState(false);

    return (
      <div style={{ padding: 32 }}>
        <button onClick={() => setShow(!show)}>Toggle</button>
        {show && <Content />}
      </div>
    );
  }
}
// - Một điều lưu ý là cleanup function luôn được gọi trước khi callback được gọi (trừ lần mounted đầu tiên). Điều này sẽ giúp
// chúng ta trong việc dọn dẹp bộ nhớ mỗi lần thao tác logic trong useEffect (giả sử trong useEffect tạo ra một URL blob chứa
// ảnh để preview, thì khi chúng ta chọn một tấm ảnh khác thì tấm ảnh cũ vẫn còn được lưu trong bộ nhớ, điều này dễ dẫn tới
// memory leak)

// - Ứng dụng 1: preview ảnh
{
  function ImagePreview() {
    const [avatar, setAvatar] = useState();

    useEffect(() => {
      return () => {
        avatar && URL.revokeObjectURL(avatar.preview); // Khi chúng ta thay đổi ảnh, thì xóa object chứa ảnh cũ ra khỏi bộ nhớ
      };
    }, [avatar]);

    const previewAvatarHandler = (e) => {
      const file = e.target.files[0];

      file.preview = URL.createObjectURL(file); // Tạo object chứa link dẫn ảnh
      console.log(file);

      setAvatar(file);
    };

    return (
      <div>
        <input type="file" onChange={previewAvatarHandler} />
        {avatar && <img src={avatar.preview} alt="" width="80%" />}
      </div>
    );
  }
}

// - Ứng dụng 2: Render comment in Chat App
// - Trong ví dụ này chúng ta sẽ tạo ra một fake event tượng trưng cho sự kiện user chat, nhiệm vụ của chúng ta là bắt sự
// kiện chat của người dùng rồi render ra tin nhắn chat của người dùng. Tuy nhiên khi mà chúng ta đổi sang một kênh chat khác
// (hoặc rời khỏi kênh chat) thì chúng ta sẽ không lắng nghe sự kiện chat của kênh cũ trước đó, cho nên chúng ta phải dùng
// cleanup function để removeEventListener ở kênh chat trước đó, nếu không thì khi mà chúng ta đang ở kênh chat mới thì chúng
// ta sẽ vừa bắt tin nhắn chat ở kênh chat 1 và kênh chat 2 rồi render ra ở kênh chat 2. Điều này dẫn tới ở bên kênh chat 2
// sẽ vừa có tin nhắn chat ở kênh 1 và kênh 2, đó là BUG.
// - Đây được gọi là cơ chế Subcribe/Unsubcribe
{
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
}

// - Lưu ý: tất cả những state, những biến, data được sử dụng bên trong callback function của useEffect mà có thể cập nhật tùy
// vào mục đích sử dụng của component thì phải được thêm vào dependencies array.
