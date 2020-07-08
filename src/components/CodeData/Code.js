import React from 'react';
import Typography from '@material-ui/core/Typography';
import ReactJson from 'react-json-view';

function Code(props) {
  const { signedData } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom className="title label_title">
        Code Data
      </Typography>
      {Object.keys(signedData).length === 0 ? null : (
        <ReactJson
          src={signedData}
          theme="bright:inverted"
          displayDataTypes={false}
          displayObjectSize={false}
          enableClipboard={false}
          collapseStringsAfterLength={25}
          collapsed={2}
          style={{ wordBreak: 'break-all' }}
        />
      )}
    </React.Fragment>
  );
}

export default Code;
