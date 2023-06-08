import { Button, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AddTopic } from "../../components/API/addTopic";
import { getTopic } from "../../components/API/getTopic";
import AddFileInput from "../../components/AddFileInput/AddFileInput";
import AddItem from "../../components/AddItem/AddItem";
import EditItem from "../../components/EditItem/EditItem";
import {
  IArticles,
  INotes,
} from "../../components/TabPanelProps/types/articleTypes";
import Topic from "../../components/Topic/Topic";
import { LoadImg } from "../../hooks/upLoadFiles";
import "./articleDetailPage.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ArticleDetailPage = () => {
  const [topic, setTopic] = React.useState<IArticles>();
  const [note, setNote] = useState<INotes>({
    articleDescription: "",
    img: "",
    id: Date.now(),
  });
  const { articleId } = useParams();
  const [isAddItem, setIsAddItem] = useState<boolean>(false);
  const [isAddedText, setIsAddedText] = useState<boolean>(true);
  const { addTopicData } = AddTopic();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [loadImg, url, isLoadFile] = LoadImg();

  const navigate = useNavigate();

  const toPreviousPage = () => navigate(-1) // навигация на предыдущую страницу

  const activeItem = () => {
    // + в нижнем правом углу (добавление элемента)
    setIsAddItem(!isAddItem);
  };

  const fetchTopic = async () => {
    const response = await getTopic(`${articleId}`, "topic");
    setTopic(response as IArticles);
  };

  const addItem = () => {
    ///@ts-ignore
    const result: INotes = { ...topic, notes: [...topic?.notes, ...[note]] }; // создаём результирующий объект
    addTopicData(result, "topic", `${articleId}`);
    setNote({ ...note, articleDescription: "", img: "" }); // обнуляем инпуты
    fetchTopic();
  };

  const updateItem = (note: INotes) => { // обновление записи
    if (note) {
      const resultNotes = topic?.notes?.map((item) =>
        item?.id === note?.id ? note : item
      );
      const result = { ...topic, notes: resultNotes };
      //@ts-ignore
      addTopicData(result, "topic", `${articleId}`);
      fetchTopic();
    }
  };

  const deleteItem = (note: INotes) => { // удаление записи
    if (note) {
      const resultNotes = topic?.notes?.filter((item) =>
        item?.id !== note?.id
      );
      const result = { ...topic, notes: resultNotes };
      //@ts-ignore
      addTopicData(result, "topic", `${articleId}`);
      fetchTopic();
    }
  }

  const editItem = () => { //! Избавиться и протестить
    setIsEdit(!isEdit);
  };

  useEffect(() => {
    if (url) setNote({ ...note, img: url }); //ждём подгрузку файла из firebase
  }, [url]);

  const topicContent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e?.target?.name) {
      case "text":
        setNote({ ...note, articleDescription: e.target.value });
        if (e?.target?.value !== "")
          setIsAddedText(false); // если нет символов, делаем кнопку disable
        else setIsAddedText(true);
        return;
      case "images":
        //@ts-ignore
        return loadImg(e);
      default:
        return;
    }
  };

  useEffect(() => {
    fetchTopic(); // подгрузка данных
  }, []);
  
  return (
    <div className="article_detail_page">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80vw",
          gap: 2,
          alignItems: "center",
          backgroundColor: "white",
          padding: "1% 0",
        }}
      >
        <div onClick={toPreviousPage} className='toPreviousPage'><ArrowBackIcon /></div>
        {!isAddItem&&<EditItem isActive={isEdit} setIsActive={editItem} />}
        {topic?.notes?.map((item) => (
          <Topic
            key={item?.articleDescription}
            isEdit={isEdit}
            topic={item}
            updateItem={updateItem}
            deleteItem={deleteItem}
          />
        ))}
        {!isAddItem&&!isEdit&&<AddItem handleOpen={activeItem} />}
        <>
          {isAddItem && !isEdit && (
            <div className="addBlock">
              <TextField
                name="text"
                value={note?.articleDescription}
                id="outlined-multiline-static"
                label="Ваш текст"
                multiline
                rows={5}
                size="small"
                sx={{ width: "100%", margin: "2% 0" }}
                variant="outlined"
                onChange={topicContent}
              />
              <AddFileInput
                topicContent={topicContent}
                isLoadFile={isLoadFile}
              />
              <div className="manage-block">
              <Button
                  onClick={activeItem}
                  variant="outlined"
                >
                  Отмена
                </Button>
                <Button
                  disabled={isAddedText}
                  onClick={()=>{addItem();activeItem(); fetchTopic()}}
                  variant="contained"
                  color="success"
                >
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </>
      </Container>
    </div>
  );
};

export default ArticleDetailPage;
