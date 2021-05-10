import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TabComponents from '../Tab';
import { supportedCoins } from '../../config/currency';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '14px',
    color: '#222b45',
    boxSizing: 'border-box',
  },
  marginVertical: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

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
    beneficiary_address,
    first_name,
    last_name,
    beneficiary_vasp_code,
    amount,
    legal_name,
    PersonType,
  } = transferInfo;

  const tab = {
    tab1: 'Natural Person',
    tab2: 'Legal Person',
  };

  const sorted = supportedCoins.sort(function (a, b) {
    const va = a.currency_symbol.toUpperCase();
    const vb = b.currency_symbol.toUpperCase();
    if (va < vb) {
      return -1;
    }
    if (va > vb) {
      return 1;
    } else {
      return 0;
    }
  });

  const getError = (field) => inputErrors[field];
  function SelectInput() {
    return (
      <div>
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
            classes={{ root: classes.root }}
            disabled={disable}
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            <MenuItem value={'BTOPTWTP'}>BTOPTWTP, BitoPro</MenuItem>
            <MenuItem value={'SBIEJPTK'}>SBIEJPTK, SBIVCT</MenuItem>
            <MenuItem value={'DIGISGSG'}>DIGISGSG, DigiFinex Pte. Ltd.</MenuItem>
          </Select>
          {getError('beneficiary_vasp_code') ? (
            <FormHelperText>{getError('beneficiary_vasp_code')}</FormHelperText>
          ) : null}
        </FormControl>
      </div>
    );
  }
  function NPerson() {
    return (
      <div>
        <TabPanel value={PersonType} index={1}>
          <Grid container spacing={2} className={classes.marginVertical}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                first name
              </Typography>
              <TextField
                required
                id="first_name"
                name="first_name"
                type="text"
                fullWidth
                value={first_name}
                disabled={disable}
                onChange={onChange}
                helperText={getError('first_name')}
                error={!!getError('first_name')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.marginVertical}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                last name
              </Typography>
              <TextField
                required
                id="last_name"
                name="last_name"
                type="text"
                fullWidth
                value={last_name}
                disabled={disable}
                onChange={onChange}
                helperText={getError('last_name')}
                error={!!getError('last_name')}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            className={classes.marginVertical}
            component="div"
          >
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                VASP Code
              </Typography>
              {SelectInput()}
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    );
  }
  function LPerson() {
    return (
      <div>
        <TabPanel value={PersonType} index={0}>
          <Grid container spacing={2} className={classes.marginVertical}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                Legal Name
              </Typography>
              <TextField
                required
                id="legal_name"
                name="legal_name"
                type="text"
                fullWidth
                value={legal_name || ''}
                disabled={disable}
                onChange={onChange}
                helperText={getError('legal_name')}
                error={!!getError('legal_name')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.marginVertical}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                VASP Code
              </Typography>
              {SelectInput()}
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    );
  }
  return (
    <React.Fragment>
      <div style={margin}>
        <Typography variant="h6" className="title">
          transfer info
        </Typography>
        <Grid container spacing={2} className={classes.marginVertical}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className="title label_title">
              currency
            </Typography>
            <Autocomplete
              error={getError('currency_id') && getError('currency_id')}
              fullWidth
              disabled={disable}
              id="currency_id"
              value={
                supportedCoins.find(
                  (currency) => currency.currency_id === currency_id
                ) || ''
              }
              onChange={(_, v) => {
                onChange({
                  target: {
                    name: 'currency_id',
                    value: v ? v.currency_id : '',
                  },
                });
              }}
              options={sorted}
              getOptionLabel={(option) => {
                if (!option) {
                  return '';
                }
                return option.currency_symbol;
              }}
              classes={{ root: classes.root }}
              renderInput={(params) => <TextField {...params} required />}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.marginVertical}>
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
        <Grid container spacing={2} className={classes.marginVertical}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              beneficiary virtual asset address (compatible with VAAI)
            </Typography>
            <TextField
              required
              id="beneficiary_address"
              name="beneficiary_address"
              fullWidth
              value={beneficiary_address}
              disabled={disable}
              onChange={onChange}
              helperText={getError('beneficiary_address')}
              error={!!getError('beneficiary_address')}
            />
          </Grid>
        </Grid>
        <div style={marginTop}>
          <Typography variant="h6" gutterBottom className="title">
            beneficiary info
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <TabComponents
                value={PersonType}
                tab={tab}
                disabled={disable}
                onChange={(_, newValue) => {
                  onChange({
                    target: {
                      name: 'PersonType',
                      value: newValue,
                    },
                  });
                }}
              />
            </Grid>
          </Grid>
          {NPerson()}
          {LPerson()}
        </div>
      </div>
    </React.Fragment>
  );
}
