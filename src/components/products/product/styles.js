import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: theme.spacing(1),
    backgroundColor: '#fff',
    transition: 'all 0.25s ease-in-out',
    outlineColor: 'yellow',
    '&:hover': {
      transform: 'scale(1.05)',
      outline: '2px solid yellow',

    },

  },

  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  desc: {
    // height: '50px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));