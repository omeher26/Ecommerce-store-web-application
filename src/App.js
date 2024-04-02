import {} from "antd";
import './App.css';
import AppFooter from './components/Footer';
import AppHeader from './components/Header';
import PageContent from './components/PageContent';
import { BrowserRouter } from "react-router-dom";



function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <AppHeader/>
        <PageContent/>
        <AppFooter/>
        
      </BrowserRouter>

      
    </div>
  );
}






export default App;
