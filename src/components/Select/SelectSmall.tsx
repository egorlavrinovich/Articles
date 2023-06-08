import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { IThemes } from '../TabPanelProps/types/articleTypes';

interface ISelectSmal{
  themes?:IThemes[]
  chooseValue?:(e: SelectChangeEvent<string>) => void
  value?:string
}

export default function SelectSmall(props:ISelectSmal) {

  const {themes,chooseValue,value} = props

  return (
    <FormControl sx={{minWidth: 140,width:'100%' }} size="small">
      <InputLabel id="demo-select-small-label">Тема</InputLabel>
      <Select
        name='ArticleTheme'
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="ArticleId"
        onChange={chooseValue}
        color='secondary'
      >
        {themes?.map((item)=><MenuItem value={item?.url}>{item?.tabName}</MenuItem>)}
      </Select>
    </FormControl>
  );
}