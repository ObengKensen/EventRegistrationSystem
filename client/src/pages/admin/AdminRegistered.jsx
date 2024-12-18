import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { AiOutlineDashboard,AiOutlineFileSearch,AiOutlineLogout,AiOutlineSchedule,AiOutlineBook  } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Avatar from "../../img/avatar.webp"


function AdminRegistered() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/users")
    .then(({data}) => {
      setUsers(data)
    })
    .catch(err => {
      console.log(err.message)
    })
  },[])

  return(
    <div className="flex flex-col">
        <Header/>
        {/* <Events/> */}
        
        <div className="flex h-screen">
            {/* left */}
            <div className="flex flex-col w-[20%] bg-slate-800 text-white">
                <div className="flex flex-col gap-2 py-6 px-6 items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                        <img className="object-cover" src={Avatar} alt="" />
                    </div>
                    <div className="profile">
                        <h3 className="text-center">James Larbie</h3>
                        <p className="text-center">Admin</p>
                    </div>
                </div>

                <ul className="list-none px-6 flex flex-col gap-y-4 ">
                    <li ><Link to={"/admin"} className="flex items-center gap-2 py-2 hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"><AiOutlineDashboard />Dashboard</Link></li>
                    <li><Link to={"/adminEvent"} className="flex items-center gap-2 py-2 py-2 hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"><AiOutlineBook />Events</Link></li>
                    <li><Link to={"/adminRegistered"} className="flex items-center gap-2 py-2 py-2 hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"><AiOutlineFileSearch />Registered</Link></li>
                    <li><Link to={"/admin"} className="flex items-center gap-2 py-2 py-2 hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"><AiOutlineLogout />Logout</Link></li>
                </ul>
            </div>

            {/* right */}
            <div className="flex flex-col flex-1 text-white gap-y-6">
                <div className="h-16 w-full bg-slate-800 py-4 px-2">Registered Customers</div>
                
                <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 ml-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border border-gray-300 text-left">Phone</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Role</th>
            <th className="px-4 py-2 border border-gray-300 text-left">Time created</th>
          </tr>
        </thead>
        <tbody>
          
          
          {users ? users.map(user => {
            return (<tr key={user.id} className="bg-white hover:bg-gray-100 text-black">
              <td className="px-4 py-2 border border-gray-300">{user.phone}</td>
              <td className="px-4 py-2 border border-gray-300">{user.name}</td>
              <td className="px-4 py-2 border border-gray-300">{user.email}</td>
              <td className="px-4 py-2 border border-gray-300">{user.role}</td>
              <td className="px-4 py-2 border border-gray-300">{user.updatedAt}</td>
            </tr> )
          })
        : <tr><td colSpan="5">No users found</td></tr>}
        </tbody>
      </table>
    </div>
            </div>
          </div>

        <Footer/>
    </div>

)
}

export default AdminRegistered