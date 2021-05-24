import React, {useState} from 'react'
import './TagSearchPage.scss';
import TagSearchBar from './Sections/TagSearchBar/TagSearchBar'
import TopBar from './Sections/TopBar/TopBar'
import Sidemenu from './Sections/SideMenu/Sidemenu'
import logo from './Sections/imgs/tagLogo.svg'
import {useHistory } from 'react-router';

function TagSearchPage(props) {
  const [tags, setTags] = useState([]);
  
  const history = useHistory();
  const onClick = () => {
    if(tags.length == 0) {
      return;
    }
    history.push({
      pathname: '/result',
      state: {
        tags: tags
      }
    })
  }
  return (
    <div className="TagSearchPage">
      <Sidemenu />
      {/*<TopBar userName={"Changhae"} isSignedIn={true}/>*/}
      <TopBar userName={"Changhae"} isSignedIn={false}/>
      <img src={logo} id="logo"/>
      <TagSearchBar tags={tags} setTags={setTags} onClick={onClick}/>
    </div>
  );
}
export default TagSearchPage;
