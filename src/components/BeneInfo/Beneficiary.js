import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  layout: {
    width: 'auto',
  },
  buttons: {
    paddingTop: '30px',
    textAlign: 'center',
  },
}));

export default function Beneficiary(props) {
  const classes = useStyles();
  const {
    activeStep,
    clickAccept,
    disable,
    transferInfo,
    onChange,
    onShare,
    inputErrors,
    setInputErrors,
    signedData,
  } = props;

  //const [error, hasError] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const isValid = form.checkValidity(); // 目前的表單資料是不是有效的
    // const isValid = true;
    const formData = new FormData(form); //表單的資料拿出來
    const validationMessages = Array.from(formData.keys()).reduce(
      (acc, key) => {
        // console.log(`key = ${key}`);
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
    onShare();
  };
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {/* <TransInfo
            disable={disable}
            transferInfo={transferInfo}
            onChange={onChange}
            inputErrors={inputErrors}
          /> */}
          {/* 不等於 0 不等於 3 */}

          <div className={classes.buttons}>
            <Button
              variant="contained"
              type={'submit'}
              className="btn btn-primary"
            >
              Share
            </Button>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
