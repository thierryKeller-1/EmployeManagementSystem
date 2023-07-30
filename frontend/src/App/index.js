import './App.css';
import Routers from './Router';
import { Provider } from "react-redux";
import store from './Store';


function App() {
  return (
    <Provider store={store} >
    <div className="App">
      <Routers />
    </div>
    </Provider>
  );
}

export default App;
