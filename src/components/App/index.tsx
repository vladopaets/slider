import React from 'react';
import Slider from "../Slider";

import './styles.scss';

function App() {
    return (
        <div className="app">
            <Slider
                itemsPerSlide={2}
            >
                <div className='slide'>1</div>
                <div className='slide'>2</div>
                <div className='slide'>3</div>
                <div className='slide'>4</div>
                <div className='slide'>5</div>
                <div className='slide'>6</div>
                <div className='slide'>7</div>
                <div className='slide'>8</div>
            </Slider>
        </div>
    );
}

export default App;
