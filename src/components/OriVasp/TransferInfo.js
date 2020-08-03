import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//import { Tab, Tabs } from '@material-ui/core';
import TabComponents from '../Tab';

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
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TransInfo(props) {
  const classes = useStyles();
  const margin = {
    margin: '30px 0',
  };
  const marginTop = {
    marginTop: '30px',
  };
  const [value, setValue] = React.useState(0);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };
  const { disable, transferInfo, onChange, inputErrors } = props;
  const {
    currency_id,
    //beneficiary_address,
    first_name,
    last_name,
    beneficiary_vasp_code,
    amount,
    legal_name,
  } = transferInfo;

  const [tab] = React.useState({
    tab1: 'Legal Person',
    tab2: 'Natural Person',
  });

  const getError = (field) => inputErrors[field];
  function NPerson() {
    return (
      <div>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2} className={classes.my_1}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                first name
              </Typography>
              <TextField
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
          <Grid container spacing={2} className={classes.my_1}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                last name
              </Typography>
              <TextField
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
          <Grid container spacing={2} className={classes.my_1}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                VASP Code
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
                  <MenuItem value={'BTOPTWTP'}>BTOPTWTP</MenuItem>
                  <MenuItem value={'SBIEJPTK'}>SBIEJPTK</MenuItem>
                  <MenuItem value={'BTSNKRSE'}>BTSNKRSE</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>
      </div>
    );
  }
  function LPerson() {
    return (
      <div>
        <TabPanel value={value} index={1}>
          <Grid container spacing={2} className={classes.my_1}>
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
                value={legal_name}
                disabled={disable}
                onChange={onChange}
                helperText={getError('legal_name')}
                error={!!getError('legal_name')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.my_1}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                gutterBottom
                className="title label_title"
              >
                VASP Code
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
                  <MenuItem value={'BTOPTWTP'}>BTOPTWTP</MenuItem>
                  <MenuItem value={'SBIEJPTK'}>SBIEJPTK</MenuItem>
                  <MenuItem value={'BTSNKRSE'}>BTSNKRSE</MenuItem>
                </Select>
              </FormControl>
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
                helperText={getError('currency_id')}
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
        <Grid container spacing={2} className={classes.my_1}>
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
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              beneficiary virtual asset address (compatible with VAAI)
            </Typography>
            <TextField
              required
              id="beneficiary_address"
              name="beneficiary_address"
              fullWidth
              //value=""
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
          {/* <Tabs value={value2} onChange={handleChange2}>
            <Tab label="Natural Person" {...a11yProps(0)} />
            <Tab label="Legal Person" {...a11yProps(1)} />
          </Tabs> */}
          <TabComponents value={value} tab={tab} onChange={handleChange2} />
          {NPerson()}
          {LPerson()}
        </div>
      </div>
    </React.Fragment>
  );
}
