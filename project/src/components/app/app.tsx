import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  title: string;
  genre: string;
  releaseYear: number;
}

function App(props: AppScreenProps): JSX.Element {
  return (
    <MainScreen {...props}/>
  );
}

export default App;
