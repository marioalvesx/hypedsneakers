import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
// import Cart from "./pages/";

const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      {/* <Route path="/cart" component={Cart} /> */}
    </Switch>
  );
};

export default Routes;
