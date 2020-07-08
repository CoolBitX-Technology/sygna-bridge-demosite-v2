import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '14px',
    color: '#222b45',
    boxSizing: 'border-box',
  },
  my_1: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(4),
  },
  capitalize: {
    textTransform: 'capitalize',
    letterSpacing: '0.05rem',
    color: '#42826B',
    fontWeight: '600',
    fontFamily: 'Open Sans',
  },
}));

export default function TransInfo(props) {
  const classes = useStyles();
  const margin = {
    margin: '30px 0',
  };
  const marginTop = {
    marginTop: '30px',
  };
  const { disable, transferInfo, onChange, inputErrors } = props;
  const {
    currency_id,
    amount,
    beneficiary_name,
    beneficiary_vasp_code,
    beneficiary_address,
  } = transferInfo;

  const getError = (field) => inputErrors[field];

  return (
    <React.Fragment>
      <div style={margin}>
        <Typography variant="h6" className="title">
          transfer info
        </Typography>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className="title label_title">
              currency
            </Typography>
            <FormControl fullWidth required error={!!getError('currency_id')}>
              <Select
                id="currency_id"
                name="currency_id"
                value={currency_id}
                onChange={onChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                classes={{ root: classes.root }}
                disabled={disable}
                helperText={getError('currency')}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                <MenuItem value={'sygna:0x80000000'}>BTC</MenuItem>
                <MenuItem value={'sygna:0x8000003c'}>ETH</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className="title label_title">
              Amount
            </Typography>
            <TextField
              required
              id="amount"
              name="amount"
              type="number"
              placeholder="Ex: 0.0047"
              fullWidth
              value={amount}
              disabled={disable}
              onChange={onChange}
              inputProps={{ min: '0', step: 0.00001 }}
              helperText={getError('amount')}
              error={!!getError('amount')}
            />
          </Grid>
        </Grid>
        <div style={marginTop}>
          <Typography variant="h6" gutterBottom className="title">
            beneficiary info
          </Typography>
        </div>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className="title label_title">
              Name
            </Typography>
            <TextField
              required
              id="beneficiary_name"
              name="beneficiary_name"
              type="text"
              fullWidth
              value={beneficiary_name}
              disabled={disable}
              onChange={onChange}
              helperText={getError('beneficiary_name')}
              error={!!getError('beneficiary_name')}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className="title label_title">
              beneficiary VASP Code
            </Typography>
            <FormControl
              fullWidth
              required
              error={!!getError('beneficiary_vasp_code')}
            >
              <Select
                id="beneficiary_vasp_code"
                name="beneficiary_vasp_code"
                value={beneficiary_vasp_code}
                onChange={onChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                classes={{ root: classes.root }}
                disabled={disable}
                helperText={getError('beneficiary_vasp_code')}
              >
                <MenuItem value="" disabled>
                  Select
                </MenuItem>
                <MenuItem value={'VASPUSNY1'}>
                  VASPUSNY1 (VASP in NY, USA)
                </MenuItem>
                <MenuItem value={'VAPSJPJT1'}>
                  VAPSJPJT1 (VASP in Tokyo, Japan)
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              beneficiary virtual asset address
            </Typography>
            <TextField
              required
              id="beneficiary_address"
              name="beneficiary_address"
              placeholder="0x0b696FEB926675a2f8B55644A1669b43b9924C03"
              fullWidth
              value={beneficiary_address}
              disabled={disable}
              onChange={onChange}
              helperText={getError('beneficiary_address')}
              error={!!getError('beneficiary_address')}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
