import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import './addItem.css'
interface AddItemProps {
  handleOpen: () => void;
}

const AddItem = (props: AddItemProps) => {
  const { handleOpen } = props;
  return (
    <div className="addItem">
      <AddCircleOutlineRoundedIcon
        sx={{
          position: "fixed",
          bottom: "5%",
          right: "5%",
          fontSize: "8vh",
          fill: "#14abd5ad",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      />
    </div>
  );
};

export default AddItem;
