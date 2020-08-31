import React from 'react';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PrivateInfo from './BeneInfo/Private';

const useStyles = makeStyles((theme) => ({
  padding: {
    padding: '0 10px',
  },
}));

const TestBtn = withStyles({
  root: {
    marginBottom: '0',
    padding: '8px 15px',
    lineHeight: 1.5,
    fontSize: '14px',
    '&:hover': {
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
    },
  },
})(Button);

const TestIcon = {
  marginRight: '5px',
  fontSize: '32px',
};

const TestBlu = withStyles({
  root: {
    borderColor: '#006FB1',
    color: '#006FB1',
    wordWrap: 'break-word',
  },
})(Typography);

export default function BeneInfo(props) {
  const classes = useStyles();
  const { onAccept, onReject, signedData, clickCount, transferInfo } = props;
  const {
    originator_vasp,
    beneficiary_vasp,
    currency_id,
    amount,
  } = signedData.transaction;

  const { private_info, signature, transfer_id, data_dt } = signedData;

  const transcations = [
    { name: 'Beneficiary Vasp Code', detail: beneficiary_vasp.vasp_code },
    {
      name: 'Originator Address',
      detail: originator_vasp.addrs[0].address,
    },
    { name: 'Originator VASP Code', detail: originator_vasp.vasp_code },
    {
      name: 'Beneficiary Address',
      detail: beneficiary_vasp.addrs[0].address,
    },
    { name: 'Transaction Currency', detail: currency_id },
    { name: 'Amount', detail: amount },
  ];
  const VeriText = () => {
    return (
      <ListItemText>
        {clickCount === 0 ? null : (
          <List disablePadding={true}>
            <ListItem
              style={{ padding: 0, color: '#34C174' }}
              disableGutters={true}
            >
              <CheckCircleRoundedIcon style={TestIcon} />
              <Typography style={{ fontFamily: 'Open Sans', paddingLeft: '0' }}>
                Verify Success!
              </Typography>
            </ListItem>
          </List>
        )}
      </ListItemText>
    );
  };
  const Click = () => {
    return (
      <Typography>
        {clickCount < 2 ? (
          <TestBtn
            onClick={() => {
              if (clickCount === 1) {
                props.onDycrypt();
                //回傳父層（Content.js）使 activeStep 增加數值（打勾）
              }
              props.onClick();
            }}
            variant="contained"
            className="btn btn-primary"
          >
            {clickCount === 0 ? 'Verify' : 'Decrypt'}
          </TestBtn>
        ) : null}
      </Typography>
    );
  };

  return (
    <React.Fragment>
      <List>
        <ListItem disableGutters={true}>
          {VeriText(props)}
          {Click(props)}
        </ListItem>
      </List>
      <div className="border_form">
        <Typography component="h6" gutterBottom className="title">
          transfer info
        </Typography>
        <Grid container>
          <Grid item xs={4} md={3}>
            <Typography variant="h6" className="title label_title">
              Private Info
            </Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <TestBlu className={classes.root}>{private_info}</TestBlu>
          </Grid>
        </Grid>
        <div className="divider"></div>
        <Typography gutterBottom variant="h6" className="title label_title">
          Transaction
        </Typography>
        <Grid container spacing={1} className={classes.padding}>
          {transcations.map((transcation) => (
            <React.Fragment key={transcation.name}>
              <Grid item xs={4} md={3}>
                <Typography gutterBottom>{transcation.name}</Typography>
              </Grid>
              <Grid item xs={8} md={9}>
                <TestBlu gutterBottom>{transcation.detail}</TestBlu>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <div className="divider"></div>
        <Grid container>
          <Grid item xs={4} md={3}>
            <Typography variant="h6" className="title label_title">
              Date
            </Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <TestBlu>{data_dt}</TestBlu>
          </Grid>
        </Grid>
        <div className="divider"></div>
        <Grid container>
          <Grid item xs={4} md={3}>
            <Typography variant="h6" className="title label_title">
              Signature
            </Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <TestBlu>{signature}</TestBlu>
          </Grid>
        </Grid>
        <div className="divider"></div>
        <Grid container>
          <Grid item xs={4} md={3}>
            <Typography variant="h6" className="title label_title">
              transfer ID
            </Typography>
          </Grid>
          <Grid item xs={8} md={9}>
            <TestBlu>{transfer_id}</TestBlu>
          </Grid>
        </Grid>
      </div>
      {clickCount === 2 ? (
        <PrivateInfo
          onAccept={onAccept}
          onReject={onReject}
          transferInfo={transferInfo}
        />
      ) : null}
    </React.Fragment>
  );
}
