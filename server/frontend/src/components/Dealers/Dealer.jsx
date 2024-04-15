import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDealer, fetchDealerReviews } from '../../APIs.js';
import './Dealers.css';
import './Dealer.css';
import write_review_icon from '../assets/write-review.png'
import positive_icon from '../assets/positive-comment.png'
import neutral_icon from '../assets/neutral-comment.png'
import negative_icon from '../assets/negative-comment.png'


const Dealer = () => {

  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getDealer();
    getReviews();
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

  const getReviews = async () => {
    try {
      const reviews = await fetchDealerReviews(id);
      setReviews(reviews || []);
      setUnreviewed(reviews.length === 0);
    } catch (error) {
      console.error('Error getting dealer reviews:', error);
    }
  };

  const sentimentIcon = (sentiment) => {
    return sentiment === 'positive' ? positive_icon : sentiment === 'negative' ? negative_icon : neutral_icon;
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
          {loggedIn ? (
            <>
              <h1 style={{ color: 'grey', marginRight: '10px' }}><b>{dealer.full_name}</b></h1>
                <a href={`/postreview/${dealer['id']}`} style={{ marginRight: '10px' }}>
                  <img className='post-review-icon' src={write_review_icon} alt='write review'/>
                </a>
            </>
            ) : (<h1 style={{color:'grey'}}><b>{dealer.full_name}</b></h1>)
          }
        </div>

        <div style={{ textAlign: 'center', width: '300px' }}>
          <h3 style={{color:'grey'}}>{dealer['address']}</h3>
          <h5 style={{color:'grey', paddingBottom: '40px'}}>{dealer['city']}, {dealer['state']} {dealer['zip']}</h5>
        </div>
        
        <div class='reviews-panel'>
          {reviews.length === 0 && unreviewed === false ? (
            <text>Loading Reviews....</text>
          ): unreviewed === true? <div>No reviews yet! </div> :
          reviews.map(review => (
            <div className='review-panel'>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img className='sentiment-icon' src={sentimentIcon(review.sentiment)} alt={review.sentiment}/>
                <span className='review-sentiment'>{review.sentiment}</span>
              </div>
              <div className='review'>"{review.review}"</div>
              <div className='review-footer'>
                <div className='vehicle'>{review.car_make} {review.car_model} {review.car_year}</div>
                <div className='reviewer'>{review.name}, purchased on {review.purchase_date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </body>
  </html>
  );
};

export default Dealer
