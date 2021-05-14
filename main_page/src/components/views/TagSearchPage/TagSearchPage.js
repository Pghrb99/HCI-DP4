import './TagSearchPage.scss';
import TagSearchBar from './Sections/TagSearchBar/TagSearchBar'
import TopBar from './Sections/TopBar/TopBar'
import logo from './Sections/imgs/logo.svg' 

function TagSearchPage() {
  return (
    <div className="TagSearchPage">
      <TopBar userName={"Changhae"} isSignedIn={true}/>
      <img src={logo} id="logo"/>
      <TagSearchBar mode={true}/>
    </div>
  );
}
export default TagSearchPage;