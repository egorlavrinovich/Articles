import { SelectChangeEvent } from "@mui/material";
import React, { useCallback, useState } from "react";
import { AddTopic, IPath } from "../../components/API/addTopic";
import { GetArticles } from "../../components/API/getArticles";
import TransitionsModal from "../../components/Modal/TransitionsModal";
import VerticalTabs from "../../components/TabPanelProps/VerticalTabs";
import {
  ICards,
  IThemes,
} from "../../components/TabPanelProps/types/articleTypes";
import {
  defaultCard,
  defaultImages,
  defaultTopic,
} from "../../config/defaultTopic";
import "./MainPage.css";

const MainPage = () => {
  const [themes, setThemes] = React.useState<IThemes[]>([]);
  const { getUserData, load } = GetArticles();
  const { addTopicData } = AddTopic();

  const [cards, setCadrs] = useState<ICards>(defaultCard as ICards);

  const [addCard, setAddCard] = useState<boolean>(false);

  const sortArticles = (articles: IThemes[]) => articles.sort((a, b) => a?.id - b?.id); // Сортируем темы

  const fetchThemes = React.useCallback(async () => {
    const response = await getUserData();
    setThemes(sortArticles(response as IThemes[]));
  }, []);

  const createArticle = useCallback(async () => {
    const topicId = Date.now();
    await addTopicData( { ...defaultTopic, articleDescription : cards.title || '' }, "topic", topicId);
    await addTopicData(
      //@ts-ignore
      { ...cards, topicId, id: Date.now(), img: cards.img || defaultImages[cards.articleUrl] || ''},
      cards.articleUrl,
      Date.now()
    );
    fetchThemes();
    setCadrs(defaultCard as ICards)
  }, [cards, addTopicData, fetchThemes]);

  React.useEffect(() => {
    fetchThemes();
  }, [fetchThemes]);

  const setFieldsValues = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    switch (e?.target?.name) {
      case "ArticleTheme":
        return setCadrs({
          ...cards,
          articleUrl: e?.target?.value as IPath,
          id: Date.now(),
        });
      case "ArticleName":
        return setCadrs({ ...cards, title: e?.target?.value });
      case "ArticleUrl":
        return setCadrs({ ...cards, img: e?.target?.value });
      case "ArticleDescription":
        return setCadrs({ ...cards, cardDescription: e?.target?.value });
      default:
        return;
    }
  };

  return (
    <div className="mainPage">
      <VerticalTabs fetchThemes={fetchThemes} themes={themes} load={load} />
      <TransitionsModal
        open={addCard}
        setOpen={setAddCard}
        setFieldsValues={setFieldsValues}
        themes={themes}
        cards={cards}
        createArticle={createArticle}
      />
    </div>
  );
};

export default MainPage;
