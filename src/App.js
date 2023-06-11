import logo from './logo.svg';
import './App.css';
import Search from '../src/pages/Search'
import Header from '../src/components/Header/Header'
import Footer from '../src/components/Footer/Footer'
function App() {
  return (
    <div className="App">
      <Header/>
      <Search/>
      <Footer/>
    </div>
  );
}

export default App;
