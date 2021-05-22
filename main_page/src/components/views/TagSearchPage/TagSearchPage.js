import './TagSearchPage.scss';
import TagSearchBar from './Sections/TagSearchBar/TagSearchBar'
import TopBar from './Sections/TopBar/TopBar'
import Sidemenu from './Sections/SideMenu/Sidemenu'
import logo from './Sections/imgs/logo.svg'

function TagSearchPage(props) {
  return (
    <div className="TagSearchPage">
      <Sidemenu />
      {/*<TopBar userName={"Changhae"} isSignedIn={true}/>*/}
      <TopBar userName={"Changhae"} isSignedIn={false}/>
      <img src={logo} id="logo"/>
      <TagSearchBar mode={true}/>
    </div>
  );
}
export default TagSearchPage;
