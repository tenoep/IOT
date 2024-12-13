import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePageManager from "./pages/manager/HomePageManager";
import HomePageClients from "./pages/user/HomePageClients";
import HomePageAdmin from "./pages/admin/HomePageAdmin";
import DumbbellList from "./pages/manager/ListDumbbell";
import SupportPage from "./pages/manager/Support";
import Dashboard from "./pages/manager/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import ListUserAdmin from "./pages/admin/adminPageUser";
import ListDumbbellAdmin from "./pages/admin/adminPageDumbbell";
import Support from "./pages/user/Support";
import StatisticsPage from "./pages/user/Statistics";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/manager" element={<HomePageManager />} />
          <Route path="/listDumbbell" element={<DumbbellList />} />
          <Route path="/supportPage" element={<SupportPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client" element={<HomePageClients />} />
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/admin" element={<HomePageAdmin />} />
          <Route path="/admin/user" element={<ListUserAdmin />} />
          <Route path="/admin/dumbbell" element={<ListDumbbellAdmin />} />
          <Route path="/user/support" element={<Support />} />
          <Route path="/user/statistics" element={<StatisticsPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
