import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TransInfo from './OriVasp/TransferInfo';
import OriginInfo from './OriVasp/OriginInfo';

const useStyles = makeStyles((theme) => ({
    layout: {
      width: 'auto',
    },
}));

export default function Originator () {
    const classes = useStyles();
    return (
        <React.Fragment>
            <main className={classes.layout}>
                <TransInfo />
                <OriginInfo />
            </main>
        </React.Fragment>
    );
}
