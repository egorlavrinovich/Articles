import { initializeApp } from "firebase/app";
import { doc, getFirestore, deleteDoc } from "firebase/firestore";
import React from "react";
import { firebaseConfig } from "../../config/fireBaseConfig";
import { ICards } from "../TabPanelProps/types/articleTypes";

export function DeleteArticles() {
  const [load, setLoad] = React.useState(false);
  const [err, setErr] = React.useState("");

  async function deleteUserData(article: ICards) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log(article)
    try {
      setLoad(true);
      const articleRef = doc(db, `${article.articleUrl}`, `${article.id}`);
      const topicRef = doc(db, `topic`, `${article.topicId}`);
      await deleteDoc(articleRef);
      await deleteDoc(topicRef);
    } catch (err) {
      setErr(err as string);
    } finally {
      setLoad(false);
    }
  }
  return { deleteUserData, load, err };
}
