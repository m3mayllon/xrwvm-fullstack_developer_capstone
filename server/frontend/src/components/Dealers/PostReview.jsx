import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCarModels, fetchDealer, postDealerReview } from '../../APIs.js';
import './Dealers.css';
import './Dealer.css';
import './PostReview.css';
import write_review_icon from '../assets/write-review.png'


const PostReview = () => {

  const [carsList, setCarList] = useState([]);
  const [dealer, setDealer] = useState({});
  const [carModel, setCarModel] = useState();
  const [year, setYear] = useState(2015);
  const [date, setDate] = useState('');
  const [review, setReview] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getDealer();
    getCarModels();
    setLoggedIn(sessionStorage.getItem('username') !== null);
  }, []);
  
  const getDealer = async () => {
    try {
      const dealer = await fetchDealer(id);
      setDealer(dealer[0] || {});
    } catch (error) {
      console.error('Error getting dealer:', error);
    }
  };

  const getCarModels = async () => {
    try {
      const carModels = await fetchCarModels();
      setCarList(carModels);
    } catch (error) {
      console.error('Error getting car models:', error);
    }
  };
  
  const postReview = async () => {

    // check if all fields are filled
    if (!carModel || !year || !date || !review) {
        alert('Please fill in all fields.');
        return;
    }

    // format json data
    let reviewer = `${sessionStorage.getItem('firstname')} ${sessionStorage.getItem('lastname')}`;
    if (reviewer.trim() === 'null null') {
      reviewer = sessionStorage.getItem('username');
    }
    const carModelSplit = carModel.split(' ');
    const jsonData = JSON.stringify({
      'name': reviewer,
      'dealership': id,
      'car_make': carModelSplit[0],
      'car_model': carModelSplit[1],
      'car_year': year,
      'purchase': true,
      'purchase_date': date,
      'review': review,
    });

    // request post review
    const hasPosted = await postDealerReview(jsonData);
    if (hasPosted) {
      // if successfull, then redirect back to dealer
      window.location.href = window.location.origin + '/dealer/' + id;
    } else {
      alert('The review could not be posted.');
    }
  };

  const handleSliderChange = (event) => {
    setYear(parseInt(event.target.value));
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
      // remove username from sessionStorage and redirect back to dealer
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin + '/dealer/' + id;
      alert(username + ' has been logged out.');
    } else {
      alert('The user could not be logged out.');
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
      <title>BestCars - Dealer</title>
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
                      <a href='#' id='logout' onClick={handleLogout}>Logout</a>
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <>
              <h1 style={{ color: 'grey', marginRight: '10px' }}><b>{dealer.full_name}</b></h1>
              <img className='post-review-icon' src={write_review_icon} alt='write review' style={{ marginRight: '10px', filter: 'grayscale(100%)'}}/>
            </>
        </div>

        <form style={{ textAlign: 'center', width: '300px' }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ textAlign: 'left', position: 'relative' }}>
              <span>Car Make</span>
              <select className='input-box' id='carModels' onChange={(e) => setCarModel(e.target.value)}>
                <option value='' selected disabled hidden>Choose Car Make and Model</option>
                {carsList.sort((a, b) => {
                  // concatenate make and model strings for comparison
                  const makeModelA = `${a.make} ${a.model}`;
                  const makeModelB = `${b.make} ${b.model}`;
                  // compare concatenated strings
                  return makeModelA.localeCompare(makeModelB);
                })
                .map((car, index) => (
                  <option key={index} value={`${car.make} ${car.model}`}>{car.make} {car.model}</option>
                ))}
                </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ textAlign: 'left', position: 'relative' }}>
              <span>Car Year</span>
              <div class='slider-container'>
                <span style={{ marginRight: '8px' }} id='year'><b>{year}</b></span>
                <input 
                  className='slider'  
                  type='range' 
                  min='2015' 
                  max='2023' 
                  value={year} 
                  step='1'  
                  id='year-range' 
                  onChange={handleSliderChange}
                />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ textAlign: 'left', position: 'relative' }}>
              <span>Purchase Date</span>
              <input
                className='input-box'
                type='date'
                onChange={(e) => {
                  // split date and rearrange to format (dd/mm/yyyy)
                  const parts = e.target.value.split('-');
                  const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
                  setDate(formattedDate);
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <textarea 
                cols='40' 
                rows='10'
                type='text'
                required placeholder='Write a review'
                id='review' 
                autoComplete='off'
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <button className='action-button' type='button' onClick={postReview}>Submit Review</button>
          </div>
        </form>
      </div>
    </body>
  </html>
  );
};

export default PostReview
