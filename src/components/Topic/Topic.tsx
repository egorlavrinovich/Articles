import { useEffect, useState } from "react";
import { Button, CardMedia } from "@mui/material";
import { Input } from "@mui/material";
import { INotes } from "../TabPanelProps/types/articleTypes";
import AddFileInput from "../AddFileInput/AddFileInput";
import { LoadImg } from "../../hooks/upLoadFiles";
import "./topic.css";

interface TopicProps {
  topic: INotes;
  isEdit: boolean;
  updateItem: (note: INotes) => void;
  deleteItem: (note: INotes) => void
}

const Topic = (props: TopicProps) => {
  const { topic, isEdit, updateItem , deleteItem } = props;

  const [note, setNote] = useState<INotes>({
    id: topic?.id,
    articleDescription: topic?.articleDescription,
    img: topic?.img,
  });

  const [editTopic, setEditTopic] = useState<boolean>(false); // редактируем топик или нет

  const [loadImg, url, isLoadFile] = LoadImg(); // загрузка изображения

  const topicContent = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e?.target?.name) {
      case "text":
        setNote({ ...note, articleDescription: e.target.value });
        return;
      case "images":
        //@ts-ignore
        return loadImg(e);
      case "urlImage":
        setNote({ ...note, img: e.target.value });
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    if (url) setNote({ ...note, img: url }); //ждём подгрузку файла из firebase
  }, [url]);

  return (
    <>
      <div className="topic" onClick={() => setEditTopic(!editTopic)}>
        <div>{note?.articleDescription}</div>
        {note?.img&&<CardMedia
          sx={{ maxHeight: "450px", width: "90%", objectFit: "contain" }}
          component="img"
          alt="Картинка"
          image={note?.img}
        />}
      </div>
      {editTopic && isEdit && (
        <div className="editTopicBlock">
          <div className='title'>Редактирование</div>
          <Input
            name="text"
            value={note?.articleDescription}
            onChange={topicContent}
          />
          <Input name="urlImage" value={note?.img} onChange={topicContent} />
          <AddFileInput topicContent={topicContent} isLoadFile={isLoadFile} />
          <div className='manage-block'>
            <Button
              onClick={() => {
                deleteItem(note)
                setEditTopic(!editTopic);
              }}
              variant="contained"
              color="warning"
            >
              Удалить
            </Button>
            <Button
              onClick={() => {
                updateItem(note);
                setEditTopic(!editTopic);
              }}
              variant="contained"
              color="success"
            >
              Сохранить
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Topic;
