import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'typeface-noto-sans';
import 'typeface-open-sans';
import { defaultOriginatorInfo } from '../../config';

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: '14px',
    color: '#CC2A32',
    boxSizing: 'border-box',
  },
  my_1: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(4),
  },
}));

export default function OriginInfo() {
  const classes = useStyles();
  const {
    name,
    vasp_code,
    address,
    phy_address,
    birth,
    place,
    identity,
    identity_num,
  } = defaultOriginatorInfo;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="border_form boder_form_done">
        <Typography variant="h6" gutterBottom className="title">
          originator info
        </Typography>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className="title label_title">
              name
            </Typography>
            <TextField id="name" name="name" value={name} fullWidth disabled />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className="title label_title">
              originator VASP
            </Typography>
            <FormControl fullWidth>
              <Select
                id="vasp_code"
                name="vasp_code"
                value={vasp_code}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                classes={{ root: classes.root }}
                disabled
              >
                <MenuItem value={vasp_code} disabled>
                  {vasp_code}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              Originator Virtual Asset Address
            </Typography>
            <TextField
              required
              id="o_address"
              name="o_address"
              value={address}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              Physical Address
            </Typography>
            <TextField
              required
              id="phy_address"
              name="phy_address"
              value={phy_address}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              Date of birth
            </Typography>
            <TextField
              id="birth"
              name="birth"
              value={birth}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              Place of birth
            </Typography>
            <TextField
              id="place"
              name="place"
              value={place}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              Unique Identity
            </Typography>
            <TextField
              id="identity"
              name="identity"
              value={identity}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.my_1}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom className="title label_title">
              National Identity Number
            </Typography>
            <TextField
              required
              id="identity_num"
              name="identity_num"
              value={identity_num}
              fullWidth
              disabled
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
