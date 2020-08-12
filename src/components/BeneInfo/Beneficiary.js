import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import QRCode from 'qrcode.react';
import { currencyItems } from '../../config';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
  },
  buttons: {
    paddingTop: '30px',
    textAlign: 'center',
  },
  my_1: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Beneficiary(props) {
  const classes = useStyles();
  const margin = {
    margin: '30px 0',
  };
  const marginTop = {
    marginTop: '30px',
  };
  const { sampleInfo, onChange } = props;

  const {
    currency_id,
    beneficiary_address,
    VAAI,
    first_name,
    last_name,
    beneficiary_vasp_code,
  } = sampleInfo;

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <form autoComplete="off" noValidate>
          <div style={margin}>
            <Typography variant="h6" className="title">
              transfer info
            </Typography>
            <Grid container spacing={2} className={classes.my_1}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="title label_title"
                >
                  currency
                </Typography>
                <Autocomplete
                  fullWidth
                  freeSolo
                  id="currency_id"
                  value={currencyItems.find(
                    (currency) => currency.value === currency_id
                  )}
                  onChange={(_, v) => {
                    onChange({
                      target: {
                        name: 'currency_id',
                        value: v ? v.value : '',
                      },
                    });
                  }}
                  options={currencyItems}
                  getOptionLabel={(option) => {
                    return option.title;
                  }}
                  //getOptionSelected={(option) => option.title}
                  inputProps={{ 'aria-label': 'Without label' }}
                  classes={{ root: classes.root }}
                  renderInput={(params) => <TextField {...params} />}
                  //renderOption={(option) => option.title}
                />
              </Grid>
            </Grid>
            console.log(`abc = ${currency_id}`);
            <Grid container spacing={2} className={classes.my_1}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="title label_title"
                >
                  virtual asset address
                </Typography>
                <TextField
                  id="beneficiary_address"
                  name="beneficiary_address"
                  fullWidth
                  value={beneficiary_address}
                  disabled
                  onChange={onChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CopyToClipboard text={beneficiary_address}>
                          <Button
                            className="btn"
                            style={{ minWidth: 'auto', padding: '5px' }}
                          >
                            <FileCopyOutlinedIcon />
                          </Button>
                        </CopyToClipboard>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <div style={marginTop}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom className="title">
                    Sygna Bridge Transaction Information
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className="title label_title"
                  >
                    If the sending VASP supports Sygna Bridge service, please
                    copy the account information code or send the information
                    below.
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} className={classes.my_1}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom className="title">
                    virtual asset account Information (VAAI)
                  </Typography>
                  <TextField
                    id="VAAI"
                    name="VAAI"
                    fullWidth
                    value={VAAI}
                    disabled
                    onChange={onChange}
                    multiline
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <CopyToClipboard text={VAAI}>
                            <Button
                              className="btn"
                              style={{ minWidth: 'auto', padding: '5px' }}
                            >
                              <FileCopyOutlinedIcon />
                            </Button>
                          </CopyToClipboard>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <QRCode value={VAAI} />
                </Grid>
              </Grid>
            </div>
            <div style={marginTop}>
              <Typography variant="h6" gutterBottom className="title">
                natural person
              </Typography>
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
                    disabled
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
                    disabled
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
                  <TextField
                    id="beneficiary_vasp_code"
                    name="beneficiary_vasp_code"
                    type="text"
                    fullWidth
                    value={beneficiary_vasp_code}
                    disabled
                  />
                </Grid>
              </Grid>
            </div>
          </div>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              type={'submit'}
              className="btn btn-primary"
              onClick={props.onStart}
            >
              Request a Payment
            </Button>
          </div>
        </form>
      </main>
    </React.Fragment>
  );
}
