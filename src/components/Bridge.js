import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';

import Code from './CodeData/Code';

const inputStyles = makeStyles({
  root: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: '18px',
  },
  accept: {
    color: '#049956',
  },
  reject: {
    color: '#CC2A32',
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 20px',
    borderRadius: '0',
    backgroundColor: '#fff',
  },
  capitalize: {
    textTransform: 'capitalize',
    padding: '17px 15px',
    backgroundColor: '#104935',
    color: '#fff',
    fontFamily: 'Open Sans',
  },
}));

function Bridge(props) {
  const classes = useStyles();
  const { activeStep, clickAccept, signedData } = props;
  console.log(`signedData = ${JSON.stringify(signedData)}`);
  function OriVASP() {
    const classes = inputStyles();
    const originator_vasp_code = _.get(
      signedData,
      ['transaction', 'originator_vasp', 'vasp_code'],
      '-'
    );

    return (
      <div className={classes.marginBottom}>
        <Typography variant="h6" gutterBottom className="title label_title">
          Originator VASP code
        </Typography>
        <TextField
          id="originator_vasp_code"
          name="originator_vasp_code"
          value={originator_vasp_code}
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </div>
    );
  }
  function BeneVASP() {
    const classes = inputStyles();
    const beneficiary_vasp_code = _.get(
      signedData,
      ['transaction', 'beneficiary_vasp', 'vasp_code'],
      '-'
    );
    return (
      <div className={classes.marginBottom}>
        <Typography variant="h6" gutterBottom className="title label_title">
          Beneficiary VASP code
        </Typography>
        <TextField
          id="beneficiary_vasp_code"
          name="beneficiary_vasp_code"
          defaultValue="-"
          value={beneficiary_vasp_code}
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </div>
    );
  }
  function Result() {
    const classes = inputStyles();
    const value = () => {
      if (activeStep === 3 && clickAccept === true) {
        //return {a:"ACCEPT",c:'a'};
        return 'ACCEPT';
      } else if (activeStep === 3 && clickAccept !== true) {
        return 'REJECT';
      } else if (activeStep > 0 && activeStep < 3) {
        return 'WAITING';
      } else {
        return '-';
      }
    };
    const color = () => {
      if (activeStep === 3 && clickAccept === true) {
        return classes.accept;
      } else if (activeStep === 3 && clickAccept !== true) {
        return classes.reject;
      }
    };
    return (
      <div className={classes.marginBottom}>
        <Typography variant="h6" gutterBottom className="title label_title">
          Result
        </Typography>
        <TextField
          id="result"
          name="result"
          fullWidth
          inputProps={{ readOnly: true, className: color() }}
          value={value()}
        />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Typography variant="h5" className={classes.capitalize}>
        Bridge Service
      </Typography>
      <Paper elevation={0} className={classes.root}>
        <form action="">
          {console.log(`activeStep = ${activeStep}`)}
          <OriVASP />
          <BeneVASP />
          <Result />
          {activeStep > 1 ? <Code signedData={signedData} /> : null}
        </form>
      </Paper>
    </React.Fragment>
  );
}

export default Bridge;
