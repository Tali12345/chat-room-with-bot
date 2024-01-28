import React from 'react';

function Reply(props) {
  return (
    <button type="button" className="transparentButton" id={props.id} onClick={props.handleClickReply}>
      <div className="iconContainer" id={props.id}>
        {Number(props.replyMessageIndex) === props.id ?
          <svg id={props.id} width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id={props.id} fillRule="evenodd" clipRule="evenodd" d="M11 5a1 1 0 00-1.707-.707l-7 7a1 1 0 000 1.414l7 7A1 1 0 0011 19v-3.025c1.691-.011 3.83.133 5.633.583 1.088.27 1.973.633 2.565 1.076.567.424.802.864.802 1.366a1 1 0 102 0c0-1.925-.598-4.66-2.42-6.937-1.719-2.15-4.462-3.805-8.58-4.036V5z" fill="currentColor" />
          </svg>
          :
          <svg id={props.id} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path id={props.id} d="m28.88 30a1 1 0 0 1 -.88-.5 15.19 15.19 0 0 0 -13-7.5v6a1 1 0 0 1 -.62.92 1 1 0 0 1 -1.09-.21l-12-12a1 1 0 0 1 0-1.42l12-12a1 1 0 0 1 1.09-.21 1 1 0 0 1 .62.92v6.11a17.19 17.19 0 0 1 15 17 16.34 16.34 0 0 1 -.13 2 1 1 0 0 1 -.79.86zm-14.38-10a17.62 17.62 0 0 1 13.5 6 15.31 15.31 0 0 0 -14.09-14 1 1 0 0 1 -.91-1v-4.59l-9.59 9.59 9.59 9.59v-4.59a1 1 0 0 1 1-1h.54z" /><path d="m0 0h32v32h-32z" fill="none" />
          </svg>
        }
      </div>
    </button>)
}

export default Reply;