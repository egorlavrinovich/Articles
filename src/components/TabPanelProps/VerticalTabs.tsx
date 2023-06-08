import { Container, Grid, SelectChangeEvent } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import * as React from "react";
import { useState } from "react";
import { defaultCard } from "../../config/defaultTopic";
import { IPath } from "../API/addTopic";
import { DeleteArticles } from "../API/deleteItem";
import { UpdateArticles } from "../API/updateArticle";
import ArticleCard from "../Card/ArticleCard";
import EditItem from "../EditItem/EditItem";
import Loader from "../Loader/Loader";
import TransitionsModal from "../Modal/TransitionsModal";
import { TabPanel } from "./TabPanel/TabPanel";
import "./TabelPanel.css";
import { ICards, IThemes } from "./types/articleTypes";

interface IVerticalTabs {
  themes: IThemes[];
  load: boolean;
  err?: string;
  fetchThemes: () => void;
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs({
  themes,
  load,
  fetchThemes,
}: IVerticalTabs) {
  const [value, setValue] = useState(0);
  const [editItem, setEditItem] = useState<ICards>(defaultCard as ICards);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { deleteUserData } = DeleteArticles();

  const { updateUserData } = UpdateArticles();

  const [editCardItem, setEditCardItem] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const editCard = (item: ICards) => {
    // открываем модалку и сетим выбранные объект
    setEditItem(item);
    setEditCardItem(true);
  };

  const changeCard = async () => {
    // обновляем данные
    await updateUserData(editItem);
    fetchThemes();
  };

  const deleteArticle = async () => {
    await deleteUserData(editItem);
    fetchThemes();
  };

  const setFieldsValues = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    switch (e?.target?.name) {
      case "ArticleTheme":
        return setEditItem({
          ...editItem,
          articleUrl: e?.target?.value as IPath,
        });
      case "ArticleName":
        return setEditItem({ ...editItem, title: e?.target?.value });
      case "ArticleUrl":
        return setEditItem({ ...editItem, img: e?.target?.value });
      case "ArticleDescription":
        return setEditItem({ ...editItem, cardDescription: e?.target?.value });
      default:
        return;
    }
  };

  const renderArticleContent = (themes: IThemes, index: number) => {
    return (
      <TabPanel value={value} index={index} key={themes.url}>
        <Grid container item>
          {themes?.cards?.map((theme) => (
            <Grid item xs={12} sm={6} md={3} key={theme.id}>
              <div className="card" onClick={() => editCard(theme)}>
                <ArticleCard edit={isEdit} {...theme}/>
              </div>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    );
  };

  const renderArticleLabel = (item: IThemes, index: number) => {
    return <Tab label={item?.tabName} {...a11yProps(index)} key={item.url} />;
  };

  return (
    <>
      <Container maxWidth={false} sx={{ backgroundColor: "skyblue" }}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "Menu",
            display: "flex",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          {load && <Loader />}
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              display: "flex",
              minHeight: "100vh",
              width: "20%",
              minWidth: "100px",
              borderRight: 1,
              borderColor: "divider",
              marginRight: "1%",
            }}
          >
            {themes?.map(renderArticleLabel)}
          </Tabs>
          {themes?.map(renderArticleContent)}
        </Box>
      </Container>
      <TransitionsModal
        isEdit={isEdit}
        open={editCardItem}
        setOpen={setEditCardItem}
        setFieldsValues={setFieldsValues}
        themes={themes}
        cards={editItem}
        createArticle={changeCard}
        deleteArticle={deleteArticle}
      />
      <EditItem isActive={isEdit} setIsActive={() => setIsEdit(!isEdit)} />
    </>
  );
}
