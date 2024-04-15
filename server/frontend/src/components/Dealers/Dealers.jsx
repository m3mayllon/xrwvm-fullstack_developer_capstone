import React, { useState, useEffect } from 'react';
import { fetchDealers, fetchDealersByState } from '../../APIs.js';
import './Dealers.css';
import write_review_icon from '../assets/write-review.png'


const Dealers = () => {

  const [dealersList, setDealersList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getDealers();
    setLoggedIn(sessionStorage.getItem('username') !== null);
  }, []);

  const getDealers = async () => {
    try {
      const dealers = await fetchDealers();
      const uniqueStates = [...new Set(dealers.map(dealer => dealer.state))];
      setDealersList(dealers);
      setStatesList(uniqueStates);
    } catch (error) {
      console.error('Error getting dealers:', error);
    }
  };

  const filterDealers = async (state) => {
    try {
      const dealers = await fetchDealersByState(state);
      setDealersList(dealers);
    } catch (error) {
      console.error('Error filtering dealers:', error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
  
    // request user logout
    const response = await fetch('/djangoapp/logout', {
      method: 'GET',
    });
  
    // check if user is logged out
    const json = await response.json();
    if (json) {
      // remove username from sessionStorage and reload page
      let username = sessionStorage.getItem('username');
  
      sessionStorage.removeItem('username');
      window.location.reload();
      alert(username + ' has been logged out.');
    } else {
      alert('The user could not be logged out.');
    }
  };

return(
  <html lang='en-US'>
    <head>
      <meta charset='UTF-8'/>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
      <meta property='og:title' content='BestCars Dealership - Home'/>
      <meta property='og:locale' content='en_US'/>
      <meta property='og:type' content='article'/>
      <link rel='stylesheet' href='../../styles/Banner.css'/>
      <link rel='stylesheet' href='../../styles/Body.css'/>
      <link rel='stylesheet' href='../../styles/Header.css'/>
      <link rel='stylesheet' type='text/css' media='all' href='https://fonts.googleapis.com/css?family=Poppins:100,100italic,200,200italic,300,300italic,regular,italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic|Lato:100,100italic,300,300italic,regular,italic,700,700italic,900,900italic|Teko:300,regular,500,600,700&#038;subset=latin,latin-ext&#038;display=swap'/>
      <link rel='stylesheet' type='text/css' media='all' href='https://www.elegantthemes.com/layouts/wp-content/themes/Divi/style-static.min.css?ver=4.24.2'/>
      <title>BestCars - Dealers</title>
    </head>

    <body className='et_divi_theme et_show_nav et_fullwidth_nav et_fixed_nav et_header_style_left'>
      <div id='page-container'>
        <header id='main-header' data-height-onload='66'>
          <div className='container clearfix'>
            <div className='title-container'>
              <h1><a href='/'>BestCars</a></h1>
            </div>
            <div id='et-top-navigation' data-height='66' data-fixed-height='40'>
              <nav id='top-menu-nav'>
                <ul id='top-menu' className='nav'>
                  <li className='menu-item'><a href='/'>Home</a></li>
                  <li className='menu-item'><a href='/about'>About</a></li>
                  <li className='menu-item'><a href='/contact'>Contact</a></li>
                  {loggedIn ? (
                    <li className='menu-item'>
                      <span><b>{sessionStorage.getItem('username')}</b></span>
                      <a href="#" id='logout' onClick={handleLogout}>Logout</a>
                    </li>
                  ) : (
                    <li className='menu-item'><a href='/login'>Login</a></li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </div>

      <div className='main-container'>
        <table style={{ borderCollapse: 'collapse', width: '80%', left: '10%' }}>
          <tr>
            <th className='id-column'>ID</th>
            <th className='long-column'>Name</th>
            <th className='long-column'>Address</th>
            <th className='small-column'>City</th>
            <th className='tiny-column'>Zip Code</th>
            <th className='small-column'>
              <select name='state' id='state' onChange={(e) => filterDealers(e.target.value)}>
                <option value='' selected disabled hidden>State</option>
                <option value='All'>All States</option>
                  {statesList.sort().map(state => (<option value={state}>{state}</option>))}
              </select>
            </th>
            {loggedIn ? (<th className='id-column'></th>):<></>}
          </tr>

          {dealersList.map(dealer => (
            <tr>
              <td>{dealer['id']}</td>
              <td><a className='dealer-item' href={'/dealer/'+dealer['id']}>{dealer['full_name']}</a></td>
              <td>{dealer['address']}</td>
              <td>{dealer['city']}</td>
              <td>{dealer['zip']}</td>
              <td>{dealer['state']}</td>
              {loggedIn ? (<td><a href={`/postreview/${dealer['id']}`}><img className='review-icon' src={write_review_icon} alt='write review'></img></a></td>):<></>}
            </tr>
          ))}
        </table>
      </div>
    </body>
  </html>
  );
};

export default Dealers
