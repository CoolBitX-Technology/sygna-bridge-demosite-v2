import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
  const { sampleInfo, onChange, inputErrors, setInputErrors } = props;

  const {
    currency_id,
    beneficiary_address,
    VAAI,
    first_name,
    last_name,
    beneficiary_vasp_code,
  } = sampleInfo;

  //const getError = (field) => inputErrors[field];
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const form = e.target;
  //     const isValid = form.checkValidity(); // 目前的表單資料是不是有效的
  //     // const isValid = true;
  //     const formData = new FormData(form); //表單的資料拿出來
  //     const validationMessages = Array.from(formData.keys()).reduce(
  //       (acc, key) => {
  //         // console.log(`key = ${key}`);
  //         acc[key] = form.elements[key].validationMessage;
  //         return acc;
  //       },
  //       {}
  //     );
  //     if (!isValid) {
  //       setInputErrors(validationMessages);
  //       props.onError();
  //       return;
  //     }
  //     onShare();
  //   };
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <form autoComplete="off" noValidate>
          <div style={margin}>
            <Typography variant="h6" className="title">
              transfer info
            </Typography>
            console.log(`currency_id(index) = ${currency_id}`);
            <Grid container spacing={2} className={classes.my_1}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className="title label_title"
                >
                  currency
                </Typography>
                <FormControl
                  fullWidth
                  //error={!!getError('currency_id')}
                >
                  <Select
                    id="currency_id"
                    name="currency_id"
                    value={currency_id}
                    onChange={onChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    classes={{ root: classes.root }}
                    //helperText={getError('currency_id')}
                  >
                    <MenuItem value="" disabled>
                      Select
                    </MenuItem>
                    <MenuItem value={'sygna:0x80000000'} index={1}>
                      BTC
                    </MenuItem>
                    <MenuItem value={'sygna:0x8000003c'} index={2}>
                      ETH
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
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
            {/* {console.log(`currency_id = ${currency_id}`)} */}
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
