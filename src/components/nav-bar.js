import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {


    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand" href="#">Logo</a>                    
                    {                       
                        <React.Fragment>
                            <Link className="nav-link" to='/createdocument'>Create Document</Link>
                            <Link className="nav-link" to='/documentlist'>All Document</Link>
                        </React.Fragment>
                    }                  

                </nav>
            </React.Fragment>
        );
    }
}

export default  NavBar;