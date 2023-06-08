import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import "./addFileinput.css";

interface AddFileInputProps {
  topicContent: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  isLoadFile:boolean
}

const AddFileInput = (props: AddFileInputProps) => {
  const { topicContent, isLoadFile } = props;

  return (
    <div className="input__wrapper">
      <input
        name="images"
        type="file"
        id="input__file"
        className="input input__file"
        onChange={topicContent}
        multiple
      />
      <label htmlFor="input__file" className="input__file-button">
        <span className="input__file-icon-wrapper">
          <FileDownloadOutlinedIcon />
        </span>
        <span className="input__file-button-text">Выберите файл ({(isLoadFile&&1) || 0})</span>
      </label>
    </div>
  );
};

export default AddFileInput;
