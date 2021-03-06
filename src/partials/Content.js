import crypto from 'crypto';
import React from 'react';
import bip21 from 'bip21';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
  OriAddress,
} from '../config/index';
import { supportedCoins } from '../config/currency';
import 'typeface-noto-sans';
import 'typeface-open-sans';
import Beneficiary from '../components/BeneInfo/Beneficiary';
import TabComponents from '../components/Tab';
import StepBlock from '../components/Step';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    borderRadius: '0',
  },
  stepBlock: {
    padding: '22px 0 33px',
  },
  leftPadding: {
    padding: '20px',
    borderRadius: '0',
  },
  rightPadding: {
    padding: '20px 30px',
  },
}));
function Content(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [value, setValue] = React.useState(0);
  const tab = {
    tab1: 'Originator VASP',
    tab2: 'Beneficiary VASP',
  };
  const [sampleInfo, setSampleInfo] = React.useState({
    currency_id: 'sygna:0x80000000',
    first_name: 'Bob',
    last_name: 'Baxter',
    beneficiary_address: '1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY',
    VAAI:
      'bitcoin:1KFHE7w8BhaENAswwryaoccDb6qcT6DbYY?personType=NaturalPerson&primaryIdentifier=Baxter&secondaryIdentifier=Bob&vc=DIGISGSG',
    beneficiary_vasp_code: 'DIGISGSG',
  });
  const [transferInfo, setTransferInfo] = React.useState({
    currency_id: 'sygna:0x80000000',
    first_name: '',
    last_name: '',
    beneficiary_address: '',
    beneficiary_vasp_code: '',
    amount: '',
    legal_name: '',
    PersonType: 1,
    originator_address: '32tAGdxdU1tucMtwpAdTm9Fy3te1QYv7pG',
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
      const address = obj['beneficiary_address']; //=== obj.beneficiary_address
      const n = address.indexOf(':');
      if (n >= 3) {
        const currency = address.substring(0, n).toLowerCase();
        const decoded = bip21.decode(address, currency);
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
            ...OriAddress[coins],
          };
        }
      }
    }
    if (event.target.name === 'currency_id') {
      obj['beneficiary_address'] = '';
      obj = { ...obj, ...OriAddress[obj.currency_id] };
    }
    setTransferInfo(obj);
  };
  const handleStep = () => {
    setActiveStep(0);
    setClickCount(0);
    setValue(1);
  };
  const handleStart = () => {
    setValue(1);
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
              address: transferInfo.originator_address,
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
        console.log('Unknown step');
    }
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className={classes.root}>
          <div className={classes.stepBlock}>
            <StepBlock activeStep={activeStep} onBackStep={handleStep} />
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
