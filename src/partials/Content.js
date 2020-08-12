import crypto from 'crypto';
import React from 'react';
import bip21 from 'bip21';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
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
} from '../config/index';
import { supportedCoins } from '../config/currency';
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
    first_name: 'Bob',
    last_name: 'Baxter',
    beneficiary_address: '0x0b696FEB926675a2f8B55644A1669b43b9924C03',
    VAAI:
      'bitcoin:0x0b696FEB926675a2f8B55644A1669b43b9924C03?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=BTSNKRSE',
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
    PersonType: 1,
  });
  const [clickCount, setClickCount] = React.useState(0);
  const [clickAccept, setClickAccept] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [error, hasError] = React.useState(false);
  const [inputErrors, setInputErrors] = React.useState({});
  const [signedData, setSignedData] = React.useState({});
  const sampleChange = (event) => {
    let obj = { ...sampleInfo };
    obj[event.target.name] = event.target.value;
    if (event.target.name === 'currency_id') {
      obj = { ...obj, ...address[obj.currency_id] };
    }
    setSampleInfo(obj);
  };
  const handleChange = (event) => {
    let obj = { ...transferInfo };
    obj[event.target.name] = event.target.value;
    inputErrors[event.target.name] = '';
    if (event.target.name === 'beneficiary_address') {
      const abc = obj['beneficiary_address']; //=== obj.beneficiary_address
      const n = abc.indexOf(':');
      if (n >= 3) {
        const currency = abc.substring(0, n).toLowerCase();
        //const vaai = abc;
        const decoded = bip21.decode(abc, currency);
        const result = supportedCoins.find((data) => {
          return data.currency_name.toLowerCase() === currency;
        });
        if (result) {
          const coins = result.currency_id;
          const person = decoded.options.personType;
          const personType = person === 'NaturalPerson' ? 1 : 0;
          obj = {
            ...obj,
            currency_id: coins,
            PersonType: personType,
            first_name: decoded.options.secondaryIdentifier,
            last_name: decoded.options.primaryIdentifier,
            legal_name: decoded.options.legalPersonName,
            beneficiary_address: decoded.address,
            beneficiary_vasp_code: decoded.options.vc,
          };
        }
      }
    }
    if (event.target.name === 'currency_id') {
      obj['beneficiary_address'] = '';
    }
    setTransferInfo(obj);
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
              onStart={handleStart}
              sampleInfo={sampleInfo}
              onChange={sampleChange}
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
              transferInfo={transferInfo}
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
            clickAccept={clickAccept}
            disable={disable}
            onError={handleError}
            inputErrors={inputErrors}
            setInputErrors={setInputErrors}
            signedData={signedData}
          />
        );
      default:
        // throw new Error('Unknown step');
        console.log('Unknown step');
    }
  }
  //增加一頁 0＆1 同一敘述
  const description = () => {
    if (activeStep < 1) {
      return 'Prepare Data';
    } else if (activeStep === 1) {
      return 'Verify Signature';
    } else if (activeStep === 2) {
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
                    if (activeStep === 1 || activeStep === 2) {
                      setActiveStep(0);
                      setClickCount(0);
                      setValue(1);
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
            {/* VASP & Info */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                className={(classes.root, classes.leftPadding)}
              >
                <div>
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
