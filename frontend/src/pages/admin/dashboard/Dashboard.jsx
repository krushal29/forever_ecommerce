import Items from "../../../components/AdminDashboard/items/Items"
import Navbar from "../../../components/AdminDashboard/navbar/Navbar"


//css
import '../dashboard/dashboard.css'

const Dashboard = ({children}) => {
  return (
    <>
    <Navbar/>
    <div className="display1">
      <div className="firstside">
    <Items/>
      </div>
      <div className="secondside">
    {children}
      </div>
    </div>
    </>
  )
}

export default Dashboard