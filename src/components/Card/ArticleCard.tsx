import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./articleCard.css";
import { ICards } from "../TabPanelProps/types/articleTypes";
import { Link } from "react-router-dom";
import { ReactNode, useCallback } from "react";

interface IArticleCard extends ICards {
  edit?: boolean;
}

export default function ArticleCard({
  cardDescription,
  img,
  topicId,
  title,
  edit = false,
}: IArticleCard) {

  const linkToComponent = useCallback(
    (component: ReactNode) => {
      if (!edit) return <Link style={{textDecoration:'none', color:'black'}} to={`article/${topicId}`}>{component}</Link>;
      else return component;
    },
    [edit, topicId]
  );

  return (
    <>
      {linkToComponent(
        <Card className="articleCard" sx={{ maxHeight: "35vh", display:'flex', flexDirection:'column' }}>
          <CardMedia
            sx={{ width: "60%", objectFit: "contain", alignSelf:'center' }}
            component="img"
            alt="Картинка"
            image={img}
          />
          <CardContent>
            <Typography
              gutterBottom
              component="div"
              sx={{ display: "flex", justifyContent: "center", textDecoration:'none', fontWeight:'500', textIndent:'15px' }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", width: "100%" }}
            >
              {cardDescription}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
