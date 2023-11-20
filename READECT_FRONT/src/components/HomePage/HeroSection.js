import { NavLink } from 'react-router-dom';

function HeroSection() {
    return (
        <div className='main-part'>
            {/* <div className="nav-mobile-title">
                Readect
            </div> */}
            <div className='container herosection'>
                <div className='row'>
                    <div className='col-md-6 col-10 order-md-0 order-1 hero-text mx-auto'>
                        <h1>Best Place To Increase Your <span>Imagination</span></h1>
                        <div>
                            <a href="#typesid"><button className='hero-btn'>Explore</button></a>
                            <NavLink to="/upload"><button className='hero-btn'>Start Writting</button></NavLink>
                        </div>
                    </div>
                    <div className='col-md-6 col-10 order-md-1 order-0 hero-img mx-auto'>
                        <figure>
                            <img src="./images/laptop.png" alt="laptopimg" className='laptop-hero' />
                            <img src="./images/mobile.png" alt="mobileimg" className='mobile-hero' />
                        </figure>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection