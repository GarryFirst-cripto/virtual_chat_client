import React from 'react';
import ReactDOM from 'react-dom';
import * as icon from './messIcons';
import './messStyles.scss';

export const oK = 'Ok';

function MyModal({ isShowing, hide, caps, mode }) {
  if (isShowing === true) {
    let ico;
    const butts = [];
    if (mode) {
      butts.push(
        <button id="keyModal" type="button" className="modal-button" onClick={hide}>
          {oK}
        </button>
      );
      butts.push(
        <button id="keyModal" type="button" className="modal-button" onClick={hide}>
          Cancel
        </button>
      );
      ico = icon.icoAsk;
    } else {
      butts.push(
        <button id="keyModal" type="button" className="modal-button" onClick={hide} onKeyUp={hide}>
          {oK}
        </button>
      );
      ico = icon.icoAlert;
    }
    return ReactDOM.createPortal(
      <>
        <div className="modal-overlay" />
        <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
          <div className="modal">
            <div className="modal-header">
              <img src={ico} type="image/x-icon" alt="Icon" className="modal-img" />
              <div className="modal-label">
                {caps}
              </div>
            </div>
            <div className="modal-footer">
              {butts}
            </div>
          </div>
        </div>
      </>, document.body
    );
  }
  return null;
}

let showPoint;
export class ModalWindow extends React.Component {
  constructor(props) {
    super(props);
    this.caption = '';
    this.doHide = this.doHide.bind(this);
    this.doShow = this.doShow.bind(this);
    showPoint = this.doShow;
    this.state = { showing: false };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, true);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, true);
  }

  handleKeyPress(event) {
    event.stopImmediatePropagation();
    this.logick = true;
  }

  doShow(mess, mode = false, callback = undefined) {
    this.caption = mess;
    this.mode = mode;
    this.callback = callback;
    this.setState({ showing: true });
  }

  doHide(event) {
    this.caption = '';
    this.setState({ showing: false });
    if (this.callback) this.callback(event.currentTarget.innerText);
  }

  render() {
    const { showing } = this.state;
    return (
      <MyModal isShowing={showing} hide={this.doHide} caps={this.caption} mode={this.mode} />
    );
  }
}

export function showModal(mess, mode, callback) {
  showPoint(mess, mode, callback);
  setTimeout(() => document.getElementById('keyModal').focus(), 1060);
}
