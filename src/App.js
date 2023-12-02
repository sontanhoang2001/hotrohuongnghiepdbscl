import { Outlet } from 'react-router-dom';
import Header from './components/header';
import CLientFooter from './components/footer';

import { useSelector } from 'react-redux';
import CustomerChatBox from './components/customerchatbox/CustomerChatBox';

function App() {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Header />
      <Outlet />
      {isLogin && <CustomerChatBox/>}
      <CLientFooter />
    </div>
  );
}


export default App;
