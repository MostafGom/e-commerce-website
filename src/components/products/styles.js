import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: '#eee',
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },

  home__img: {
    width: '100%',
    zIndex: -1,
    marginBottom: '-10px',
    maskImage: 'linear-gradient(to bottom, rgb(0, 0, 0, 1), rgb(0, 0, 0, 0))',
    maxHeight: '50vh',
    objectFit: 'cover'
  }
}));