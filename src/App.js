import React, { Component } from 'react';
import logo from './logo.svg';
import Sayonara from './services/sayonara';


class App extends Component {

  componentDidMount() {
    this.setState({
      siteJson: false,
      error: false
    });
    Sayonara.getSayonaraSite().then((siteJson) => {
      this.setState({
        siteJson
      });
    }).catch((error) => {
      this.setState({
        error: 'Error Getting the Sayonara Public API! Please check the Javascript console. :('
      });
    })
  }

  // Function to transform titles to # friendly links
  getHashLinkFromTitle(title, includeHash) {
    const urlTitle = title.toLowerCase().replace(/\s/g, '-');
    if(includeHash) {
      return `#${urlTitle}`
    }
    return urlTitle;
  }

  render() {
    let error;

    if(this.state && this.state.error) {
      error = (
        <div className="error">
          {this.state.error}
        </div>
      )
    }

    let sayonaraTitle = (
      <h1 className="App__title">Adios</h1>
    );
    let sayonaraEntryLinks = [];
    let sayonaraEntries = [];
    if(this.state && this.state.siteJson) {
      // Set our title in the header
      sayonaraTitle = (
        <h1 className="App__title">{this.state.siteJson.siteName}</h1>
      )
      this.state.siteJson.pages[0].entryTypes[0].entries.forEach((entry) => {
        // Add a link to the entry
        sayonaraEntryLinks.push((
          <li key={this.getHashLinkFromTitle(entry.title)}>
            <a href={this.getHashLinkFromTitle(entry.title, true)}>{entry.title}</a>
          </li>
        ));

        // Add the section and html
        sayonaraEntries.push((
          <section key={this.getHashLinkFromTitle(entry.title)}>
            <h1 id={this.getHashLinkFromTitle(entry.title)}
              className="App__entries__entry-title">{entry.title}
            </h1>
            <div dangerouslySetInnerHTML={{__html: entry.content}}></div>
          </section>
        ))
      });
    }
    return (
      <div className="App">
        <header className="App__header">
          <img src={logo} className="App__logo" alt="logo" />
          {sayonaraTitle}
          <nav>
            <ul className="App__header__link-list">
              {sayonaraEntryLinks}
            </ul>
          </nav>
        </header>
        <p className="App__intro">
          Welcome the SayonaraJS Client, Adios!
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {error}
        <main className="App__entries">
          {sayonaraEntries}
        </main>
      </div>
    );
  }
}

export default App;
