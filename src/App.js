import { Outlet } from 'react-router-dom';
import Header from './components/header';
import CLientFooter from './components/footer';

import { useSelector } from 'react-redux';
import CustomerChatBox from './components/customerchatbox/CustomerChatBox';

function App() {
  const { isLogin, role } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Header />
      <Outlet />
      {isLogin && ['ADMIN','ORGANIZATION'].includes(role) && <CustomerChatBox />}
      <CLientFooter />
    </div>
  );
}

export default App;
