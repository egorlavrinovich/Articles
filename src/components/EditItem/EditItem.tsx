import DoneIcon from "@mui/icons-material/Done";
import "./editItem.css";
import EditIcon from "@mui/icons-material/Edit";

const styles = {
  position: "fixed",
  bottom: "5%",
  left: "5%",
  fontSize: "5vh",
  fill: "#14abd5ad",
  cursor: "pointer",
  border: "4px solid #14abd5ad",
  borderRadius: "50%",
  padding: "4px",
};


interface EditItemProps {
  isActive: boolean;
  setIsActive: any;
}

const EditItem = (props: EditItemProps) => {
  const { isActive, setIsActive } = props;

  return (
    <div className="removeItem" onClick={setIsActive}>
      {isActive ? <DoneIcon sx={styles}/> : <EditIcon sx={styles} />}
    </div>
  );
};

export default EditItem;
