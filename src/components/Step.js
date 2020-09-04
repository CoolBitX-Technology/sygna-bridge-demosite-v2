import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  stepStyle: {
    width: '100%',
    maxWidth: '640px',
    margin: '0 auto',
    padding: '0',
    marginTop: '22px',
    backgroundColor: 'transparent',
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
      <div className={classes.circle}>
        {completed ? <Check className={classes.completed} /> : null}
      </div>
    </div>
  );
}
function getSteps() {
  return ['', '', ''];
}
export default function StepBlock(props) {
  const classes = useStyles();
  const steps = getSteps();
  const { activeStep } = props;
  const description = () => {
    if (activeStep < 1) {
      return 'Both users exchange account information';
    } else if (activeStep === 1) {
      return 'Originator VASP sends a transfer request';
    } else if (activeStep === 2) {
      return 'Beneficiary VASP replies with a confirmation certificate';
    }
    return 'Receive Certificate';
  };
  return (
    <div>
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
              if (activeStep === 1 || activeStep === 2) {
                props.onBackStep();
              }
            }}
          >
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
