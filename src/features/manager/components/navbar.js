import { Link, useNavigate } from "react-router-dom";

function Navbar({searchFn}){

   const navigate = useNavigate();
 

  const logout = ()=>{
    localStorage.clear();
    navigate('/?msg=looged_out')
  }
    return(
        <nav className="navbar navbar-expand-lg" data-bs-theme="light"  style={{ backgroundColor: '#e3f2fd', color: 'gray'}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/employee">Manager Dashboard</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/manager-leave-details">Leave Details</Link>
        </li>
              
      </ul>
      <span>Welcome {localStorage.getItem('username')} &nbsp;&nbsp;&nbsp;</span>
      
      &nbsp;&nbsp;
      <button className="btn btn-secondary"  onClick={logout}>LogOut</button>
    </div>
  </div>
</nav>
    )
}
export default Navbar;