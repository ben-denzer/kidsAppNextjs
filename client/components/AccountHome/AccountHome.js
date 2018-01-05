import React from 'react';
import ChangePwForm from '../accountForms/ChangePwForm';

function AccountHome(props) {
  return (
    <div className="whiteBox">
      <ChangePwForm {...props} />
      <Modal
        Body={() => (
          <div>
            <img
              src="/static/img/playButton.png"
              alt="Re Start"
              onClick={pauseGame}
            />
          </div>
        )}
        modalOpen={paused}
        small={true}
        toggleModal={pauseGame}
      />
    </div>
  );
}

export default AccountHome;
