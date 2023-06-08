import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Container, Grid } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import AddItem from "../AddItem/AddItem";
import SelectSmall from "../Select/SelectSmall";
import { ICards, IThemes } from "../TabPanelProps/types/articleTypes";
import "./TransitionsModal.css";

const fields = [
  {
    nameOfFiled: "Название:",
    label: "Название статьи",
    name: "ArticleName",
    path: "title",
  },
  {
    nameOfFiled: "Изображение:",
    label: "URL картинки",
    name: "ArticleUrl",
    path: "img",
  },
  {
    nameOfFiled: "Описание:",
    label: "Краткое описание",
    name: "ArticleDescription",
    path: "cardDescription",
  },
];

interface ITransitionsModal {
  themes?: IThemes[];
  setFieldsValues: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => void;
  cards: ICards;
  createArticle: () => void;
  isEdit?: boolean;
  open: boolean;
  setOpen: (condition: boolean) => void;
  deleteArticle?: () => void;
}

export default function TransitionsModal(props: ITransitionsModal) {
  const {
    themes,
    setFieldsValues,
    cards,
    createArticle,
    isEdit = false,
    open = false,
    setOpen,
    deleteArticle
  } = props;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {!isEdit && <AddItem handleOpen={handleOpen} />}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="box-container">
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              p={1}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {(!isEdit && "Создание статьи") || "Редактирование статьи"}
            </Typography>
            <Container
              className="modal-container"
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <CloseRoundedIcon
                onClick={handleClose}
                fontSize="large"
                sx={{
                  position: "absolute",
                  top: 15,
                  right: 15,
                  cursor: "pointer",
                }}
              />
              {!isEdit && (
                <Grid container>
                  <Grid item xs={12} md={4} lg={4}>
                    <Typography className="title">Тема:</Typography>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <SelectSmall
                      themes={themes}
                      value={cards.articleUrl}
                      chooseValue={setFieldsValues}
                    />
                  </Grid>
                </Grid>
              )}
              <>
                {fields.map((item) => (
                  <Grid container>
                    <Grid item xs={12} md={4} lg={4}>
                      <Typography className="title">
                        {item?.nameOfFiled}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                      <TextField
                        name={item?.name}
                        size="small"
                        sx={{ width: "100%" }}
                        id="outlined-basic"
                        label={item?.label}
                        variant="outlined"
                        value={cards[item.path as keyof ICards]}
                        onChange={setFieldsValues}
                        color="secondary"
                      />
                    </Grid>
                  </Grid>
                ))}
              </>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: isEdit ? "space-between" : "flex-end",
                }}
              >
                {isEdit && (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      deleteArticle?.();
                      handleClose();
                    }}
                  >
                    Удалить
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={() => {
                    createArticle();
                    handleClose();
                  }}
                >
                  {(!isEdit && "Создать") || "Редактировать"}
                </Button>
              </Box>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
