import './NameSearchPage.scss';
import NameSearchBar from './Sections/NameSearchBar/NameSearchBar'
import TopBar from './Sections/TopBar/TopBar'
import Sidemenu from '../TagSearchPage/Sections/SideMenu/Sidemenu'
import logo from './Sections/imgs/logo.svg'

function NameSearchPage(props) {
  return (
    <div className="NameSearchPage">
      <Sidemenu />
      {/*<TopBar userName={"Changhae"} isSignedIn={true}/>*/}
      <TopBar userName={"Changhae"} isSignedIn={false}/>
      <img src={logo} id="logo"/>
      <NameSearchBar/>
    </div>
  );
}
export default NameSearchPage;
