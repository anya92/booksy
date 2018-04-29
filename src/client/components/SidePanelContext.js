import React, { Component } from 'react';

import SidePanel from './SidePanel';

const { Provider, Consumer } = React.createContext();

class SidePanelProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSidePanel: false,
      showBookId: '',
    };
  }

  hidePanel() {
    setTimeout(() => {
      this.setState({
        showSidePanel: false,
        showBookId: '',
      });
    }, 600);
  }

  render() {
    return (
      <Provider value={{
        showPanel: id => {
          document.body.style.overflow = 'hidden';
          this.setState({ showSidePanel: true, showBookId: id });
        },
      }}>
        {
          this.state.showSidePanel && (
            <SidePanel 
              bookId={this.state.showBookId} 
              close={this.hidePanel.bind(this)}
              auth={this.props.auth}
            />
          )
        }
        { this.props.children }
      </Provider>
    );
  }
}

export { SidePanelProvider, Consumer };