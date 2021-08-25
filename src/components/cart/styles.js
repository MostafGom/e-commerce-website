import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    // marginBottom: theme.spacing(2),
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#eeeeee',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },

  emptyCart: {
    textDecoration: 'none',
    backgroundColor: '#ffd740',
    textAlign: 'center',
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    width: '50%',
    borderRadius: theme.spacing(2),
    color: 'black',
    '&:hover': {
      // backgroundColor: theme.palette.primary.light,
      backgroundColor: '#ffe57f',
    }
  }


}));