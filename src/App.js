import { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserCard from "./components/UserCard";
import Pagination from "./components/Pagination";

const App = () => {
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <BrowserRouter>
      <Switch>
        <Route path={["/:userId", "/"]} exact>
          <UserCard
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </Route>
      </Switch>
      <Pagination setSelectedUser={setSelectedUser} />
    </BrowserRouter>
  );
};

export default App;
