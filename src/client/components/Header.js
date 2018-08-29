import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
// import * as Navbar from '../styled/Header';
import Search from './Search';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  }
})

class Navbar extends Component {
  state = {

  }

  render() {
    const { auth, classes } = this.props;

    return (
      <div style={{
        flexGrow: 1,
        zIndex: 1200,
      }}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" style={{ flexGrow: 1 }}>
              <Link to="/" style={{
                color: '#FFF',
                textDecoration: 'none',
              }}>Booksy</Link>
            </Typography>
            {/* <Search /> */}
            {
              !auth
              ? (
                <a
                  href="/auth/google"
                  style={{
                    color: '#FFF',
                    textDecoration: 'none',
                  }}>
                  <Button color="inherit">
                    Login with Google
                  </Button>
                </a>
              ) : (
                <a
                  href="/auth/logout"
                  style={{
                    color: '#FFF',
                    textDecoration: 'none',
                  }}>
                  <Button color="inherit">
                    logout
                  </Button>
                </a>
              )
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

// export default ({ auth }) => (
//   <Navbar.Nav>
//     <Navbar.Wrapper> {/* to fix the overflow issue */}
//       <Navbar.Icon
//         menu
//         className="fa fa-bars"
//         onClick={() => document.getElementById('side-nav').classList.toggle('open')}
//       />
//       <Navbar.Brand><Link to="/">booksy</Link></Navbar.Brand>
//       <Navbar.Icon
//         search
//         className="fa fa-search"
//         onClick={() => {
//           document.getElementById('search-bar').classList.remove('hide');
//           document.getElementById('search-bar').classList.add('display');
//         }}
//       />
//       <Search />
//       <Navbar.Icon
//         ellipsis
//         className="fa fa-ellipsis-v"
//         onClick={() => document.getElementById('auth').classList.toggle('open')}
//       />
//       {
//         auth
//         ? ( 
//             <Navbar.Auth id="auth">
//               <Navbar.Username>
//                 {auth.name}
//               </Navbar.Username>
//               <Navbar.Email>
//                 {auth.email}
//               </Navbar.Email>
//               <Navbar.Link>
//                 <a href="/auth/logout">Logout</a>
//               </Navbar.Link>
//             </Navbar.Auth>
//           )
//         : (
//             <Navbar.Auth id="auth">
//               <Navbar.Link>
//                 <a href="/auth/google">Login with Google</a>
//               </Navbar.Link>
//             </Navbar.Auth>
//           )
//       }
//     </Navbar.Wrapper>
//   </Navbar.Nav>
// );

export default withStyles(styles)(Navbar);
