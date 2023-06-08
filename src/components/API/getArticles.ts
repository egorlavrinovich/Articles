import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore
} from "firebase/firestore";

import React from "react";
import {
  IThemes
} from "../TabPanelProps/types/articleTypes";
import { firebaseConfig } from "../../config/fireBaseConfig";

interface IRequestParam {
  path: string;
}

export function GetArticles() {
  const [load, setLoad] = React.useState(false);
  const [err, setErr] = React.useState("");

  async function getUserData({ path }: IRequestParam) {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    try {
      setLoad(true);
      const result = await getDocs(collection(db, "articles"))
        .then((res) => res.docs.map((item: any) => item.data()))
        .then((res) => {
          const article = res.map(async (item: IThemes) => {
            const articleRef = await getDocs(collection(db, `${item?.url}`));
            item.cards = articleRef.docs.map((cards: any) => cards.data());
            return item;
          });
          return Promise.all(article);
        });
      return result;
    } catch (err) {
      setErr(err as string);
    } finally {
      setLoad(false);
    }
  }
  return { getUserData, load, err };
}
