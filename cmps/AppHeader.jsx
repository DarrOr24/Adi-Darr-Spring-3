const { useState } = React
const { Link, NavLink } = ReactRouterDOM


export function AppHeader() {

    const [showMenu, setShowMenu] = useState(false)


    function openHeaderNav(){
        setShowMenu(prevShowMenu => !prevShowMenu)    
    }


    return <header className="app-header">
       
       <div>
            <div onClick={openHeaderNav} className={`action-icon main-nav-icon `}>
                        <img height="30" src="assets\img\dots-nav.png" alt="" />
                        <span className="action-name select">DARRADI APPS</span>  
                        {(showMenu) &&  <nav>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/about">About</NavLink>
                            <NavLink to="/mail">Mail</NavLink>
                            <NavLink to="/note">Note</NavLink>
                        </nav> } 
            </div>

            
        </div>
        
        
        
       

    </header>
}
