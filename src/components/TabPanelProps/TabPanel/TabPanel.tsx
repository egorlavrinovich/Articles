import { Box, Typography } from '@mui/material';
import './TabPanel.css'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    
  }
  
 export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        className='tab-panel'
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }