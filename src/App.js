import React from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import { Switch , Route } from 'react-router-dom';
import Eventsdate from './components/Events/Eventdate';
import Eventsloc from './components/Events/Eventloc';
import Newevent from './components/Events/Newevent/Newevent';
import Home from './components/Home/Home';


function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/createEvent" exact component={Newevent} />
        <Route path="/getEventsByLoc" exact component={Eventsloc} />
        <Route path="/getEventsByDate" exact component={Eventsdate} />        
      </Switch>
    </Layout>
  );
}

export default App;
