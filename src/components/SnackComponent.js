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

const snackstyles = makeStyles(theme => ({
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
	const { className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant]
	return (
		<SnackbarContent
			className={clsx(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					className={classes.close}
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>
			]}
			{...other}
		/>
	);
}

MySnackbarContent.propTypes = {
	className: PropTypes.string,
	message: PropTypes.string,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['success', 'error', '']).isRequired,
};

const SnackComponent = props => {
	return (
		<Snackbar
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			open={props.open}
			autoHideDuration={props.duration}
			onClose={props.onClose}
			ContentProps={{
				'aria-describedby': 'message-id',
			}}
		>
			<MySnackbarContent
				onClose={props.onClose}
				variant={props.variant}
				message={props.message}
			/>
		</Snackbar>
	)
}

export default SnackComponent;