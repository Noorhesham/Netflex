import { useState } from "react";
import {useUpdateAvatar} from "../features/authentication/useUpdateAvatar";
function Account() {
  const { uploadAvatar, isPending } = useUpdateAvatar();
  const [avatar, setAvatar] = useState("");
  return (
    <div className=" pt-20">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadAvatar(avatar);
        }}
      >
        <input
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          type="file"
        />
        <button>submit</button>
      </form>
    </div>
  );
}

export default Account;
