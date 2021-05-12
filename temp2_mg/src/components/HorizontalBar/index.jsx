import React from 'react';
import './index.css';

class HorizontalBar extends React.Component {
    render() {
        return (
            <div>
                <nav>
                    <ul id="hori_bar">
                        <li><a href="#numerics">Numerics</a></li>
                        <li><a href="#images">Images</a></li>
                        <li><a href="#videos">Videos</a></li>
                        <li><a href="#description">Description</a></li>
                        <li><a href="#cummunities">Communities</a></li>
                        <li><a href="#requierments">Requierements</a></li>
                        <li><a href="#achievements">Achievements</a></li>
                        <li><a href="#reviews">Reviews</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default HorizontalBar;