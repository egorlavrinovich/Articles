import { initializeApp } from "firebase/app";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import React from "react";
import { firebaseConfig } from "../../config/fireBaseConfig";
import { ICards } from "../TabPanelProps/types/articleTypes";

export function UpdateArticles() {
  const [load, setLoad] = React.useState(false);
  const [err, setErr] = React.useState("");

  async function updateUserData(article: ICards) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log(article)
    try {
      setLoad(true);
      const articleRef = doc(db, `${article.articleUrl}`, `${article.id}`);
      await updateDoc(articleRef,  article as any );
    } catch (err) {
      setErr(err as string);
    } finally {
      setLoad(false);
    }
  }
  return { updateUserData, load, err };
}
