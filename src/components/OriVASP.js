import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TransInfo from './OriVasp/TransferInfo';
import OriginInfo from './OriVasp/OriginInfo';
import Button from '@material-ui/core/Button';
import BeneResult from './BeneInfo/BeneResult';

const useStyles = makeStyles(() => ({
  layout: {
    width: 'auto',
  },
  buttons: {
    paddingTop: '30px',
    textAlign: 'center',
  },
}));

export default function Originator(props) {
  const classes = useStyles();
  const {
    activeStep,
    clickAccept,
    disable,
    transferInfo,
    onChange,
    onSend,
    inputErrors,
    setInputErrors,
    signedData,
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const isValid = form.checkValidity(); // 目前的表單資料是不是有效的
    const formData = new FormData(form); //表單的資料拿出來
    const validationMessages = Array.from(formData.keys()).reduce(
      (acc, key) => {
        acc[key] = form.elements[key].validationMessage;
        return acc;
      },
      {}
    );
    if (!isValid) {
      setInputErrors(validationMessages);
      props.onError();
      return;
    }
    onSend();
  };
  return (
    <React.Fragment>
      <div className={classes.layout}>
        {activeStep === 3 ? (
          <BeneResult
            activeStep={activeStep}
            clickAccept={clickAccept}
            signedData={signedData}
          />
        ) : null}
        <form noValidate onSubmit={handleSubmit}>
          <TransInfo
            disable={disable}
            transferInfo={transferInfo}
            onChange={onChange}
            inputErrors={inputErrors}
          />
          {activeStep === 3 ? null : (
            <div>
              <OriginInfo transferInfo={transferInfo} onChange={onChange} />
              <div className={classes.buttons}>
                <Button
                  variant="contained"
                  type={'submit'}
                  className="btn btn-primary"
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </React.Fragment>
  );
}
