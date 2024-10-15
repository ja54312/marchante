//Components
import BannerHeader from './BannerHeader/BannerHeader'
import NavBar from './NavBar/NavBar'
//Styles
import './Header.scss'

const Header = () => {
    return (
        <header>
            <BannerHeader />
            <NavBar />
        </header>
    )
}

export default Header