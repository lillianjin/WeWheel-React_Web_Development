import React, { Component } from 'react'
import './Footer.css';

class Footer extends Component {

  render() {
    return( 
      <footer class="site-footer">
        <div class="footer-container">
          <div class="row">
            <div class="col-sm-12 col-md-6">
              <h6>About</h6>
              <p><i>WeWheel </i> is a team project of <i>The Art of Web Programming</i> in UIUC. This app provides a platform where users can search for nearby shared cars, and provide idle cars for others.</p>
            </div>

            <div class="col-sm-12 col-md-6">
              <h6>Contact Us</h6>
              <ul class="footer-links">
                <li><a href="https://github.com/lillianjin">Lu Jin</a></li>
                <li><a href="https://github.com/mattaranki">Tiaoyu Ao</a></li>
                <li><a href="https://github.com/Xiaolu85">Xiaolu Qi</a></li>
                <li><a href="https://github.com/baohe-zhang">Baohe Zhang</a></li>
              </ul>
            </div>
          </div>
          <hr></hr>
        </div>

        <div class="footer-container">
          <div class="row">
            <div class="col-sm-12">
              <p class="copyright-text">Copyright &copy; 2019 WeWheel</p>
            </div>
          </div>
        </div>
      </footer>
    );  
  }
}

export default Footer;
