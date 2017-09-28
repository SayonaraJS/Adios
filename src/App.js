import React, { Component } from 'react';
import ScrollableAnchor from 'react-scrollable-anchor';
import { configureAnchors } from 'react-scrollable-anchor';
import { slide as Menu } from 'react-burger-menu';
import logo from './logo.svg';
import hamburger from './hamburger.svg';
import Sayonara from './services/sayonara';


class App extends Component {

  componentDidMount() {

    // configure our scrolling
    configureAnchors({offset: -110, scrollDuration: 400});

    // Set the initial component state
    this.setState({
      isSidebarOpen: false,
      siteJson: false,
      error: false
    });
    // Make the request to the Sayonara API
    Sayonara.getSayonaraSite().then((siteJson) => {
      this.setState({
        siteJson
      });
    }).catch((error) => {
      this.setState({
        error: 'Error Getting the Sayonara Public API! Please check the Javascript console :('
      });
    })
  }

  // Function to transform titles to # friendly links
  // @param title - The string containing the entry title
  // @param includeHash - True / undefined, wether or not to prepend a hashtag
  getHashLinkFromTitle(title, includeHash) {
    const urlTitle = title.toLowerCase().replace(/\s/g, '-');
    if(includeHash) {
      return `#${urlTitle}`
    }
    return urlTitle;
  }

  closeSidebar() {
    this.setState({
      isSidebarOpen: false
    })
  }

  // Function called to display the DOM
  render() {

    // Return nothing if no state
    if(!this.state) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    // Create a div containing our error if we have one
    let error;
    if(this.state.error) {
      error = (
        <div className="error">
          {this.state.error}
        </div>
      )
    }

    // Initialize our App title and Entries
    let sayonaraTitle = (
      <h1 className="App__title">Adios</h1>
    );
    let sayonaraEntryLinks = [];
    let sayonaraEntries = [];

    // Check if we have the site
    if(this.state.siteJson) {

      // Set our title in the header
      sayonaraTitle = (
        <h1 className="App__title">{this.state.siteJson.siteName}</h1>
      )

      // Iterate through the first (and only) page's first (and only) entryTypes' entries.
      this.state.siteJson.pages[0].entryTypes[0].entries.forEach((entry) => {
        // Add a link to the entry
        sayonaraEntryLinks.push((
          <li key={this.getHashLinkFromTitle(entry.title)}>
            <a className="menu-item"
              onClick={() => this.closeSidebar()}
              href={this.getHashLinkFromTitle(entry.title, true)}>
              {entry.title}
            </a>
          </li>
        ));

        // Add the section and html
        sayonaraEntries.push((
          <section key={this.getHashLinkFromTitle(entry.title)}>
            <ScrollableAnchor id={this.getHashLinkFromTitle(entry.title)}>
              <h1 className="App__entries__entry-title">{entry.title}
              </h1>
            </ScrollableAnchor>
            <div dangerouslySetInnerHTML={{__html: entry.content}}></div>
          </section>
        ))
      });
    }
    // Our final HTML that should be displayed
    return (
      <div className="App">
        <header className="App__header">
          <div className="App__header__hamburger">
            <img src={hamburger}
              className="App__header__hamburger__button" alt="logo"
              onClick={() => {
                this.setState({
                  isSidebarOpen: true
                });
              }}
              />
            <Menu isOpen={this.state.isSidebarOpen}>
              <nav>
                <ul className="App__header__hamburger__link-list">
                  <li className="App__header__hamburger__link-list__close"
                    onClick={() => this.closeSidebar()}>
                    X
                  </li>
                  {sayonaraEntryLinks}
                </ul>
              </nav>
            </Menu>
          </div>
          <img src={logo} className="App__logo" alt="logo" />
          {sayonaraTitle}
          <nav className="App__header__nav">
            <ul className="App__header__link-list">
              {sayonaraEntryLinks}
            </ul>
          </nav>
        </header>
        <main className="App__entries">
          {error}
          <p className="App__intro">
            Welcome the SayonaraJS Client, Adios!
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>

          {sayonaraEntries}
        </main>
      </div>
    );
  }
}

export default App;
