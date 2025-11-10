import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#2e7d32' }, // green
    secondary: { main: '#0288d1' } // blue
  },
  components: {
    MuiAppBar: {
      defaultProps: { elevation: 1 }
    }
  }
});

export default theme;
