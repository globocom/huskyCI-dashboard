import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';

const variantIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
};

const snackstyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
  },
}));

function MySnackbarContent(props) {
  const classes = snackstyles();
  const {
    className, message, onClose, variant,
  } = props;
  const Icon = variantIcon[variant];
  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={(
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
)}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />
  );
}

MySnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'error', '']).isRequired,
};

MySnackbarContent.defaultProps = {
  className: '',
};

const SnackComponent = (props) => {
  const {
    open, duration, onClose, variant, message,
  } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
    >
      <MySnackbarContent
        onClose={onClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
};

SnackComponent.propTypes = {
  open: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'error', '']).isRequired,
  message: PropTypes.string.isRequired,
};

SnackComponent.defaultProps = {
  duration: null,
};

export default SnackComponent;
