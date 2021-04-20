// React
import React from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

//Local CSS
import './dashboard.css';
import Doctors from './doctors/doctors';
import Patient from './patients/patient';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMd, faHandHoldingMedical} from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 200;

// styling for material ui components
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  listColor: {
    backgroundColor: theme.palette.background.paper,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundImage: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
      
    },
  },
  navLink: {
    textDecoration: 'none',
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh'
  },
}));


function Dashboard(props) {

  // for menu
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


//  Render Drawer
  const drawer = (
    <div className="sidebar">
        <h1 className="brand-logo">Minic</h1>
        <List>
          <NavLink to="/doctor" className={classes.navLink} activeClassName="active" exact>
          <ListItem button>
            <ListItemIcon><FontAwesomeIcon className="nav-icons" icon={faUserMd}/></ListItemIcon>
           <ListItemText primary="Doctors" />
          </ListItem>
          </NavLink>
          <NavLink className={classes.navLink} to="/patient" exact>
            <ListItem button>
            <ListItemIcon><FontAwesomeIcon className="nav-icons" icon={faHandHoldingMedical}/></ListItemIcon>
            <ListItemText primary="Patient" />
            </ListItem >
          </NavLink>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <h1>Minic</h1>

          <div className="profile" >
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <Avatar className={classes.purple}>OP</Avatar>
            </Button>
          </div>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
           {/* Mobile Drawer */}
           {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          > 
          {/* Desktop Drawer */}
           {drawer}
          </Drawer>
        </Hidden>
      </nav>


      <main className={classes.content}>
        <div className={classes.toolbar} />
            <div className="nav-link">
                <Switch>
                    <Route exact path="/doctor" component={Doctors}></Route>
                    <Route exact path="/patient" component={Patient} />
                    <Route exact path="/:id">
                        <p>Error 404</p>
                    </Route>
                </Switch>
            </div>
      </main>
    </div>
  );
}

export default Dashboard;