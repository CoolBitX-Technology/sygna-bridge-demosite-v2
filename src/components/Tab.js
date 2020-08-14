import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Tab, Tabs } from '@material-ui/core';

const StyledTabs = withStyles({
  root: {
    justifyContent: 'center',
  },
  indicator: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgba(16, 73, 53, 1)',
    borderRadius: '20px',
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    color: '#222B45',
    fontSize: '18px',
    padding: '25px 18px',
    borderBottom: '5px solid rgba(16, 73, 53, 0.32)',
    '&:focus': {
      opacity: 1,
    },
    cursor: 'default',
  },
}))((props) => <Tab disableRipple {...props} />);

export default function TabComponents(props) {
  const { value, tab, onChange, disabled } = props;
  return (
    <div>
      <StyledTabs value={value} centered onChange={onChange}>
        <StyledTab
          label={tab.tab1}
          value={1}
          disabled={disabled && value === 0}
        />
        <StyledTab
          label={tab.tab2}
          value={0}
          disabled={disabled && value === 1}
        />
      </StyledTabs>
    </div>
  );
}

// TabComponents.propTypes = {
//   disabled: PropTypes.bool.isRequired,
// };
