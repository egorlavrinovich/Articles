import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
  } from "firebase/storage";
import { useState } from "react";

export function LoadImg() {
  const [url, setUrl] = useState("");
  const [isLoadFile,setIsLoadFile] = useState<boolean>(false)
  function loadImage(event: any) {
    if (!event?.target?.files?.length) return;
    let file = event?.target?.files[0];

    const storage = getStorage();
    const cartoonRef = ref(storage, `${file?.name}`);
    const uploadTask = uploadBytesResumable(cartoonRef, file);

    setIsLoadFile(false)

    uploadBytes(cartoonRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setIsLoadFile(true)
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setUrl(downloadURL);
      })
    });
  }
  return [loadImage, url, isLoadFile] as const;
}
