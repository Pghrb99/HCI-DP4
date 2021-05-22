import React from 'react';
import { ListGroup, Badge, Button, Table } from 'react-bootstrap'
import './InfoDocument.scss';
import img1 from '../imgs/ice_hockey.jpg'
import img2 from '../imgs/ice_hockey2.png'
import img3 from '../imgs/ice_hockey3.png'
import Review from '../Review/Review'
import { faEllipsisH, faPencilAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InfoDocument = ({ data }) => {
    return (
        <div id="infodocument">
            <div id="AIP-numerics">
                <h2 >Numerics</h2>
                <ListGroup id="AIP-numerics-list" horizontal>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Easy to start</div>
                        <div class="AIP-numerics-numbers">{data[0]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Cost of equipment</div>
                        <div class="AIP-numerics-numbers">{data[1]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Schedule-flexible</div>
                        <div class="AIP-numerics-numbers">{data[2]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Safe</div>
                        <div class="AIP-numerics-numbers">{data[3]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div class="AIP-numerics-subtitle">Good for health</div>
                        <div class="AIP-numerics-numbers">{data[4]} / 10</div>
                        <div class="AIP-numerics-radius"></div>
                    </ListGroup.Item>
                </ListGroup>
            </div>
            <div id="AIP-images">
                <h2>Images</h2>
                <ListGroup id="AIP-images-list" horizontal>
                    <ListGroup.Item><img src={img1} class="AIP-images-img"></img></ListGroup.Item>
                    <ListGroup.Item><img src={img2} class="AIP-images-img"></img></ListGroup.Item>
                    <ListGroup.Item><img src={img3} class="AIP-images-img"></img></ListGroup.Item>
                </ListGroup>
            </div>
            <div id="AIP-videos">
                <h2>Videos</h2>
                <div id="AIP-videos-youtube">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/HSUdZ9sOQRU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <div id="AIP-description">
                <h2>Description</h2>
                <div class="AIP-article">
                    Ice hockey is a contact team sport played on ice, usually in an indoor or outdoor rink, in which two teams of skaters use their sticks to shoot a vulcanized rubber puck into their opponent's net to score goals. The sport is known to be fast-paced and physical, with teams usually fielding six players at a time: one goaltender to stop the puck from going into their own net, two defensemen, and three forwards who skate the span of the ice trying to control the puck and score goals against the opposing team.
                </div>
                <a target="_blank" href="https://en.wikipedia.org/wiki/Ice_hockey" class="AIP-article">Wikipedia</a>
                <a target="_blank" href="https://namu.wiki/w/%EC%95%84%EC%9D%B4%EC%8A%A4%ED%95%98%ED%82%A4" class="AIP-article">나무위키</a>
            </div>
            <div id="AIP-requirments">
                <h2>Requirments</h2>
                <div class="AIP-article">Supplies: Helmet, guards, skates, sticks, gloves</div>
                <div class="AIP-article">Number of people: 12 (each team consists of 6 players)</div>
            </div>
            <div id="AIP-achievements">
                <h2>Achievements</h2>
                <ListGroup id="AIP-achievements-list">
                    <ListGroup.Item>
                        <Badge variant="secondary">Getting into ice</Badge> Keep skating for 10 minutes.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary">Skating faster</Badge> Skate 400m in 1 minutes.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary">Getting into shot</Badge> Score more than 5 out of 10 penalty shots.
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Badge variant="secondary">Shooting accurately</Badge> Score a goal from one goal to the other.
                    </ListGroup.Item>
                </ListGroup>
                <Button id="AIP-achievements-more" variant="success"><FontAwesomeIcon icon={faEllipsisH} style={{marginRight: "10px"}}/>See more</Button>
            </div>
            <div id="AIP-reviews">
                <h2>Reviews</h2>
                <Button id="AIP-reviews-write" variant="success"><FontAwesomeIcon icon={faPencilAlt} style={{marginRight: "10px"}}/>Write a Review</Button>
                <br></br>
                <h3>Positive Opinions</h3>
                <div class="AIP-reviews-positive">
                    <Review isPositive={true} name={"Harry Potter"} years={5} achiev={20} content="You'll find it super fun. I promise." data={[1, 2, 3, 4, 5]} like={31} />
                    <Review isPositive={true} name={"Harry Potter"} years={5} achiev={20} content="You'll find it super fun. I promise." data={[1, 2, 3, 4, 5]} like={31} />

                </div>
                <h3>Negative Opinions</h3>
                <div class="AIP-reviews-negative">
                    <Review isPositive={false} name={"Steven Yeun"} years={1} achiev={6} content="It's soooo dangerous. I've broken my leg :(" data={[5, 4, 3, 2, 1]} like={17} />
                </div>
            </div>
            <div id="AIP-communities">
                <h2>Communities</h2>
                <a target="_blank" href="https://gall.dcinside.com/icehockey" class="AIP-article">dcinside.com</a>
                <a target="_blank" href="https://about.hockeycommunity.com/en-CA/" class="AIP-article">Hockey Community</a>
                <Table bordered hover id="AIP-communities-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Club Name</th>
                            <th>Region</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Hanwha Eagles</td>
                            <td>Daejeon, Korea</td>
                            <td>042-111-1111</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Lotte Giants</td>
                            <td>Busan, Korea</td>
                            <td>051-222-2222</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>Samsung Lions</td>
                            <td>Daegu, Korea</td>
                            <td>053-333-3333</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default InfoDocument;