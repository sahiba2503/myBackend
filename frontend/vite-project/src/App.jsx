
//.................................................................

import "./App.css";
import Header from '../Header'
import Sidenav from '../Sidenav'
import MainContainer from '../MainContainer'

function App() {
  return (
    <div>
      <Header />
      <div>
        <Sidenav />
        <MainContainer />
      </div>
    </div>
  )
}

export default App

