import "./globals/style.css";
import "./App.css";
import Profile from "./pages/Profile/Profile";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Quizz from "./pages/Quizz/Quizz";
import Course from "./pages/Course/Course";
import CreateCourse from "./pages/CreateCourse/CreateCourse";
import CreateQuestion from "./pages/CreateQuestion/CreateQuestion";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateLecture from "./pages/CreateLecture/CreateLecture";
import PopisIspita from "./pages/PopisIspita/PopisIspita";
function App() {
  return (
    <div id="sadrzaj">
      <Router>
        <Switch>
          <Route path="/prijava" component={Login} />
          <Route path="/registracija" component={Register} />
          <Route path="/profil" component={Profile} />
          <Route path="/kreirajTecaj" component={CreateCourse} />
          <Route exact path="/tecaj/:id/kviz/:pitanje?" component={Quizz} />
          <Route
            exact
            path="/tecaj/:id/ispitiAdministracija/:ispit?"
            component={PopisIspita}
          />
          <Route
            exact
            path="/tecaj/:id/pitanjeAdministracija"
            component={CreateQuestion}
          />
          <Route
            exact
            path="/tecaj/:id/lekcijaAdministracija"
            component={CreateLecture}
          />
          <Route exact path="/tecaj/:id/:lekcija?" component={Course} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
