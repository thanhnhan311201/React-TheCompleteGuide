import { useState, useEffect } from "react";

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

export default ImagePreview;
