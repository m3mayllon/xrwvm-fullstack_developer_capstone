import React, { useState } from 'react';
import './Register.css';
import '../../styles/Banner.css';
import '../../styles/Body.css';
import '../../styles/Header.css';
import user_icon from '../assets/user.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'


const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const registerUrl = window.location.origin + '/djangoapp/register';

  const handleRegister = async (e) => {
    e.preventDefault();

    // check if all fields are filled
    if (!username || !password || !email || !firstName || !lastName) {
        alert('Please fill in all fields.');
        return;
    }

    // request user registration
    const response = await fetch(registerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        'username': username, 
        'password': password,
        'email': email,
        'firstName': firstName, 
        'lastName':lastName
      }),
    });

    // check if user is registered and authenticated
    const json = await response.json();
    if (json.status != null && json.status === 'Authenticated') {
      // save username to sessionStorage and redirect to home page
      sessionStorage.setItem('username', json.username);
      setLoggedIn(true);
      window.location.href = '/';

    } else if (json.error === 'Already registered') {
        alert('User with same username or email is already registered. Please try again.');
    
    } else {
      alert('The user could not be registered.');
    }
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
        <title>BestCars - Register</title>
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
                    <li className='menu-item'><a href='/login'>Login</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
        </div>

        <div className='main-container'>
          <form style={{ textAlign: 'center', width: '300px' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ position: 'relative' }}>
                <span className='icon-container'>
                  <img className='icon-image' src={user_icon} alt='username'></img>
                </span>
                <input
                  className='input-panel'
                  type='text'
                  required placeholder='username'
                  id='username'
                  autoComplete='off'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ paddingLeft: '30px' }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <div style={{ position: 'relative' }}>
                <span className='icon-container'>
                  <img className='icon-image' src={user_icon} alt='first name'></img>
                </span>
                <input
                  className='input-panel'
                  type='text'
                  required placeholder='first name'
                  id='firstName'
                  autoComplete='off'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={{ paddingLeft: '30px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '10px' }}>
              <div style={{ position: 'relative' }}>
                <span className='icon-container'>
                  <img className='icon-image' src={user_icon} alt='last name'></img>
                </span>
                <input
                  className='input-panel'
                  type='text'
                  required placeholder='last name'
                  id='lastName'
                  autoComplete='off'
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  style={{ paddingLeft: '30px' }}
                />
                </div>
              </div>

            <div style={{ marginBottom: '10px' }}>
              <div style={{ position: 'relative' }}>
                <span className='icon-container'>
                  <img className='icon-image' src={email_icon} alt='email'></img>
                </span>
                <input
                  className='input-panel'
                  type='email'
                  required placeholder='email'
                  id='email'
                  autoComplete='off'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '30px' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '10px', position: 'relative' }}>
              <div style={{ position: 'relative' }}>
                <span className='icon-container'>
                  <img className='icon-image' src={password_icon} alt='password'></img>
                </span>
                <input
                  className='input-panel'
                  type='password'
                  required placeholder='password'
                  id='password'
                  autoComplete='off'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '30px' }}
                />
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button className='action-button' type='button' onClick={handleRegister}>Register</button>
            </div>

          </form>
        </div>
      </body>
    </html>
  );
};

export default Register;
