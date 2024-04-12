import React, { useState } from 'react';
import './Login.css';
import '../../styles/Banner.css';
import '../../styles/Body.css';
import '../../styles/Header.css';


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const loginUrl = window.location.origin + '/djangoapp/login';

  const handleLogin = async (e) => {
    e.preventDefault();

    // request user authentication
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'username': username, 'password': password }),
    });

    // check if user is authenticated
    const json = await response.json();
    if (json.status != null && json.status === 'Authenticated') {
      // save username to sessionStorage and redirect to home page
      sessionStorage.setItem('username', json.username);
      setLoggedIn(true);
      window.location.href = '/';
    } else {
      alert('The user could not be authenticated.');
    }
  };

  const handleCancel = () => {
    // clear username and password
    setUsername('');
    setPassword('');
  };

  const handleRegister = () => {
    // register logic
  };

  return (
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
        <title>BestCars - Home</title>
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
                    <li className='menu-item current-menu-item'><a href='/login' aria-current='page'>Login</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
          <form style={{ textAlign: 'center', width: '300px' }}>
            <div style={{ marginBottom: '20px' }}>
              <input
                className='input-panel'
                type='text'
                required placeholder='username'
                id='username'
                autoComplete='off'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div style={{ marginTop: '10px', position: 'relative' }}>
              <input
                className='input-panel'
                type='password'
                required placeholder='password'
                id='password'
                autoComplete='off'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <button className='action-button' type='button' onClick={handleLogin}>Login</button>
              <button className='action-button' type='button' onClick={handleCancel}>Cancel</button>
            </div>

            <div className='register-link'>
              <a href='/register' onClick={handleRegister}>Register</a>
            </div>
          </form>
        </div>
      </body>
    </html>
  );
};

export default Login;
