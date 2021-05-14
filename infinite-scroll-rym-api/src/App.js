import CharacterList from "./components/CharacterList" 
import './styles/Global.css'
import Normalize from 'react-normalize'
import {Route, BrowserRouter, Switch} from 'react-router-dom'



function App() {
  return (
    <>
    
    <Normalize/>
      <BrowserRouter>

        <Switch>
          <Route exact path='/' component={CharacterList}/>
        </Switch>

      </BrowserRouter>
    </>
);
}

export default App;
