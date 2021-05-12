import './TagSearchPage.css';
import TagSearchBar from '../components/TagSearchBar'
import SideMenu from '../components/SideMenu'
import TopBar from '../components/TopBar'
import logo from '../logo.svg'; 

function TagSearchPage() {
  return (
    <div className="TagSearchPage">
      <TopBar userName={"Changhae"} isSignedIn={true}/>
      <SideMenu />
      <img src={logo} id="logo"/>
      <TagSearchBar mode={true}/>
    </div>
  );
}
export default TagSearchPage;
