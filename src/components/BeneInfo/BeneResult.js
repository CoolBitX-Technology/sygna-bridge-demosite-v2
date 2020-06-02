import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const payments = [
    { name: 'Name', detail: 'David Beckham' },
    { name: 'Date of birth', detail: '01975-05-02' },
    { name: 'Physical Address', detail: 'Bahnhofstrasse 665, 8001 Zuric...' },
    { name: 'Unique Identity', detail: '-' },
    { name: 'National Identity Number', detail: '-' },
];

const marginTop= {
    marginTop: '30px',
};

const divider= {
    display: 'block',
    borderBottom: '1px solid #C5CEE0',
    margin: '7px 0',
};

const deepBlue = {
    borderColor: '#006FB1',
    color: '#006FB1',
};

export default function BeneResult () {
    return (
        <React.Fragment>
            <div className="border_form" style={marginTop}>
                <Typography gutterBottom variant="h6" className="title">
                    Beneficiary Result
                </Typography>
                <Typography gutterBottom variant="h6" gutterBottom className="title label_title">
                    Originator
                </Typography>
                <Grid container>
                    <Grid item xs={4} md={3}>
                        <Typography gutterBottom variant="h6" gutterBottom className="title label_title">
                            Transfer ID
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <Typography gutterBottom style={deepBlue}>
                            9eee630c20a2aa894373216b32343c...
                        </Typography>
                    </Grid>
                </Grid>
                <div style={divider}></div>
                <Grid container>
                    <Grid item xs={4} md={3}>
                        <Typography gutterBottom variant="h6" gutterBottom className="title label_title">
                            Result
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <Typography gutterBottom>
                            REJECT
                        </Typography>
                    </Grid>
                </Grid>
                <div style={divider}></div>
                <Grid container>
                    <Grid item xs={4} md={3}>
                        <Typography gutterBottom variant="h6" gutterBottom className="title label_title">
                            Signature
                        </Typography>
                    </Grid>
                    <Grid item xs={8} md={9}>
                        <Typography gutterBottom style={deepBlue}>
                        9eee630c20a2aa894373216b32343c429621b02f29c35130e7573f4d775edd8e7fd50f1a5813a234246785a2fcd542058a0b6ca3d56bc6719b8eb14c88b19301
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}
