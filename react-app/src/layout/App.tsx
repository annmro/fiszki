import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import '../styles/App.css';

import Navigation from './Navigation';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';


class App extends Component {

  render() {
    return (
      <Router>
        <div className="app">
          <header>
            <Header />
          </header>
          <main>
            <aside>
              <Navigation />
            </aside>
            <section className="page">
              <Main />
            </section>
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Router>
    );
  }
}
export default App;
