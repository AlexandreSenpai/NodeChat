import { Fragment } from 'react';
import GlobalStyle from './static/globalstyle';
import { ThemeProvider } from 'styled-components';
import theme from './static/theme';
import Routes from './routes';

function App() {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes />
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
