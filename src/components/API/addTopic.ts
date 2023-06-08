import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

import { useState } from "react";
import { firebaseConfig } from "../../config/fireBaseConfig";
import { IArticles, ICards, INotes } from "../TabPanelProps/types/articleTypes";

export type IPath = "js" | "react" | "ts" | "topic" | "redux" | "git" | "jest" | "diff" | "html";

export function AddTopic() {
  const [load, setLoad] = useState(false);
  const [err, setErr] = useState("");

  async function addTopicData(
    data: ICards | IArticles | INotes,
    path: IPath ,
    id: string | number | undefined
  ) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    try {
      setLoad(true);
      if (id !== undefined) {
        await setDoc(doc(db, path, `${id}`), data);
      } else {
        throw new Error("Invalid id");
      }
    } catch (err) {
      setErr(err as string);
    } finally {
      setLoad(false);
    }
  }
  return { addTopicData, load, err };
}
