import { grey, blue } from '@mui/material/colors';

const validatedColor = (color) => (/^#([0-9A-Fa-f]{3}){1,2}$/.test(color) ? color : null);

// Paleta baseada na cor #Ffd700 (dourado)
const goldPalette = {
  50: '#fffbf0',
  100: '#fff3d6',
  200: '#ffe8b3',
  300: '#ffdc80',
  400: '#ffd14d',
  500: '#Ffd700', 
  600: '#e65c00',
  700: '#cc5200',
  800: '#b34700',
  900: '#993d00',
};

export default (server, darkMode) => ({
  mode: darkMode ? 'dark' : 'light',
  background: {
    default: darkMode ? grey[900] : grey[50],
  },
  primary: {
    main: validatedColor(server?.attributes?.colorPrimary) || (darkMode ? goldPalette[500] : goldPalette[500]),
  },
  secondary: {
    main: validatedColor(server?.attributes?.colorSecondary) || (darkMode ? goldPalette[500] : goldPalette[500]),
  },
  neutral: {
    main: grey[500],
  },
  geometry: {
    main: goldPalette[500],
  },
  blue: {
    main: blue[500],
  },
});
