import crypto from 'crypto';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
//import { Tab, Tabs } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import * as bridgeUtil from '@sygna/bridge-util';
import Bridge from '../components/Bridge';
import Originator from '../components/OriVASP';
import BeneInfo from '../components/BeneVASP';
import {
  defaultOriginatorInfo,
  FAKE_PRIVATE_KEY,
  FAKE_PUBLIC_KEY,
  address,
} from '../config';
import 'typeface-noto-sans';
import 'typeface-open-sans';
import Beneficiary from '../components/BeneInfo/Beneficiary';
import TabComponents from '../components/Tab';

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,
    height: '100%',
    borderRadius: '0',
  },
  stepBlock: {
    padding: '22px 0 33px',
  },
  stepStyle: {
    width: '100%',
    maxWidth: '640px',
    margin: '0 auto',
    padding: '0',
    marginTop: '22px',
    backgroundColor: 'transparent',
  },
  leftPadding: {
    padding: '20px',
    borderRadius: '0',
  },
  rightPadding: {
    padding: '20px 30px',
  },
  textCenter: {
    textAlign: 'center',
  },
}));

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 12,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#42826B',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#42826B',
    },
  },
  line: {
    borderColor: '#9FB6AE',
    borderTopWidth: 5,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#9FB6AE',
    display: 'flex',
    height: 30,
    alignItems: 'center',
  },
  active: {
    color: '#42826B',
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completed: {
    color: '#fff',
    zIndex: 1,
    fontSize: 18,
    width: 30,
    height: 30,
    backgroundColor: '#104935',
    borderRadius: '50%',
    svg: {
      width: 24,
      height: 24,
    },
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <div className={classes.circle}>
          <Check className={classes.completed} />
        </div>
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

function getSteps() {
  return ['', '', ''];
}

function Content(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [value, setValue] = React.useState(0);
  const tab = {
    tab1: 'Originator VASP',
    tab2: 'Beneficiary VASP',
  };
  const [sampleInfo, setSampleInfo] = React.useState({
    currency_id: 'sygna:0x80000000',
    first_name: 'Alice',
    last_name: 'Andrews',
    beneficiary_address: '0x0b696FEB926675a2f8B55644A1669b43b9924C03',
    VAAI:
      'bitcoin:0x0b696FEB926675a2f8B55644A1669b43b9924C03?personType=NaturalPerson&primaryIdentifier=Andrews&secondaryIdentifier=Alice&vc=BTSNKRSE',
    beneficiary_vasp_code: 'BTSNKRSE',
  });
  const [transferInfo, setTransferInfo] = React.useState({
    currency_id: '',
    first_name: '',
    last_name: '',
    beneficiary_address: '',
    beneficiary_vasp_code: '',
    amount: '',
    legal_name: '',
  });
  const [clickCount, setClickCount] = React.useState(0);
  const [clickAccept, setClickAccept] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [error, hasError] = React.useState(false);
  const [inputErrors, setInputErrors] = React.useState({});
  const [signedData, setSignedData] = React.useState({});

  const sampleChange = (event) => {
    const obj = { ...sampleInfo };
    obj[event.target.name] = event.target.value;
    //inputErrors[event.target.name] = '';
    //console.log(`address.currency_id obj = ${JSON.stringify(obj)}`);
    const { currency_id, beneficiary_address, VAAI } = address;
    if (event.target.name === 'currency_id') {
      address[obj.currency_id] = 'sygna:0x8000003c';
      setSampleInfo({ currency_id, beneficiary_address, VAAI });
      console.log(`address.currency_id obj = ${JSON.stringify(obj)}`);
    }
  };

  const handleChange = (event) => {
    const obj = { ...transferInfo };
    obj[event.target.name] = event.target.value;
    inputErrors[event.target.name] = '';
    //console.log(`handleChange obj = ${JSON.stringify(obj)}`);
    setTransferInfo(obj);

    //if
  };
  const handleStart = () => {
    setValue(1);
    //setActiveStep(activeStep + 1);
  };
  const handleSend = () => {
    setValue(0);
    setActiveStep(activeStep + 1);
    const privateObj = {
      originator: {
        name: defaultOriginatorInfo.name,
        date_of_birth: defaultOriginatorInfo.birth,
      },
      beneficiary: {
        name: transferInfo.beneficiary_name,
      },
    };
    const private_info = bridgeUtil.crypto.sygnaEncodePrivateObj(
      privateObj,
      FAKE_PUBLIC_KEY
    );
    const current = new Date().toISOString();
    const msgObj = {
      //我要加密的東西（明文）
      private_info: private_info,
      transaction: {
        originator_vasp: {
          vasp_code: defaultOriginatorInfo.vasp_code,
          addrs: [
            {
              address: defaultOriginatorInfo.address,
            },
          ],
        },
        beneficiary_vasp: {
          vasp_code: transferInfo.beneficiary_vasp_code,
          addrs: [
            {
              address: transferInfo.beneficiary_address,
            },
          ],
        },
        currency_id: transferInfo.currency_id,
        amount: transferInfo.amount,
      },
      data_dt: current,
      signature: '',
    };
    //signedObj = {...msgObj ,signature:'xxxxxxxxx' }
    const signedObj = bridgeUtil.crypto.signObject(msgObj, FAKE_PRIVATE_KEY);
    const transfer_id = crypto
      .createHash('sha256')
      .update(JSON.stringify(signedObj), 'utf8')
      .digest()
      .toString('hex');

    setSignedData({
      ...signedObj,
      transfer_id,
    });
  };
  const handleDycrypt = () => {
    setActiveStep(activeStep + 1);
  };
  const handleClick = () => {
    setClickCount(clickCount + 1);
  };
  const handleAccept = () => {
    setValue(1);
    setActiveStep(activeStep + 1);
    setClickAccept(true);
    setDisable(true);
  };
  const handleReject = () => {
    setValue(1);
    setActiveStep(activeStep + 1);
    setDisable(true);
  };
  const handleError = () => {
    hasError(true);
  };
  function getStepContent(getSteps) {
    switch (getSteps) {
      case 0:
        if (activeStep === 0) {
          return (
            <Beneficiary
              error={error}
              //onShare={handleShare}
              onStart={handleStart}
              sampleInfo={sampleInfo}
              onChange={sampleChange}
              //value={value}
              onError={handleError}
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
            />
          );
        } else {
          return (
            <BeneInfo
              onClick={handleClick}
              onDycrypt={handleDycrypt}
              onAccept={handleAccept}
              onReject={handleReject}
              signedData={signedData}
              clickCount={clickCount}
              activeStep={activeStep}
              beneficiary_name={transferInfo.beneficiary_name}
            />
          );
        }
      case 1:
        return (
          <Originator
            error={error}
            onSend={handleSend}
            activeStep={activeStep}
            transferInfo={transferInfo}
            onChange={handleChange}
            //value={value}
            clickAccept={clickAccept}
            disable={disable}
            onError={handleError}
            inputErrors={inputErrors}
            setInputErrors={setInputErrors}
            signedData={signedData}
            tab={tab}
          />
        );
      default:
        // throw new Error('Unknown step');
        console.log('Unknown step');
    }
  }
  //增加一頁 0＆1 同一敘述
  const description = () => {
    if (activeStep < 2) {
      return 'Prepare Data';
    } else if (activeStep === 2) {
      return 'Verify Signature';
    } else if (activeStep === 3) {
      return 'Confirm Transfer';
    } else {
      return 'Receive Certificate';
    }
  };
  return (
    <React.Fragment>
      <div className="container">
        <div className={classes.root}>
          <div className={classes.stepBlock}>
            <Typography variant="h5" className={classes.textCenter}>
              {description()}
            </Typography>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
              className={classes.stepStyle}
            >
              {steps.map((label, index) => (
                <Step
                  key={index.toString()}
                  onClick={() => {
                    if (activeStep > 3) {
                      return;
                    }
                    if (activeStep === 1) {
                      setActiveStep(0);
                      setClickCount(0);
                      setValue(0);
                    } else if (activeStep === 2 && clickCount === 0) {
                      setActiveStep(1);
                      setValue(1);
                    } else if (activeStep === 2 && clickCount === 1) {
                      setActiveStep(1);
                      setClickCount(0);
                      setValue(1);
                    } else if (activeStep === 3) {
                      setActiveStep(activeStep - 1); //activeStep+-*/   === ==       =
                      setClickCount(clickCount - 1); //clickCount === 0 => true / false
                    } else if (activeStep > 0) {
                      setActiveStep(activeStep - 1);
                      setValue(value - 1);
                    }
                  }}
                >
                  <StepLabel StepIconComponent={QontoStepIcon}>
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
          <Grid container spacing={3}>
            {/* {activeStep < 2 ? (
            <Grid item xs={12}>
              <Test />
            </Grid>
          ) : (
            <Grid item xs={12} md={8}>
              <Test />
            </Grid>
            )} */}
            {/* VASP & Info */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                className={(classes.root, classes.leftPadding)}
              >
                <div>
                  {/* <StyledTabs value={value} centered>
                    <StyledTab label="Originator VASP" value={1} />
                    <StyledTab label="Beneficiary VASP" value={0} />
                  </StyledTabs> */}
                  <TabComponents value={value} tab={tab} />
                  <Typography className={classes.padding} />
                </div>
                {getStepContent(value)}
              </Paper>
            </Grid>
            {/* Bridge Service */}
            {activeStep < 1 ? null : (
              <Grid item xs={12} md={4}>
                <Paper elevation={0} className={classes.root}>
                  <Bridge
                    activeStep={activeStep}
                    clickAccept={clickAccept}
                    signedData={signedData}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Content;
