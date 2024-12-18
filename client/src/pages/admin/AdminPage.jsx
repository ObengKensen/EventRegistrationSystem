import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineDashboard,AiOutlineFileSearch,AiOutlineLogout,AiOutlineSchedule,AiOutlineBook  } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import LineChart from "../../components/LineChart";
import { NavLink } from "react-router-dom";
import { useEffect,useState } from "react";
import Avatar from "../../img/avatar.webp"


const AdminPage = () => {
    const [users, setUsers] = useState([])
    const [events, setEvents] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/users")
    .then(({data}) => {
      setUsers(data)
    })
    .catch(err => {
      console.log(err.message)
    })
  },[])

  useEffect(() => {
    axios.get("http://localhost:3000/adminEvents")
    .then(({data}) => {
      setEvents(data)
    })
    .catch(err => {
      console.log(err.message)
    })
  },[])

  const today = new Date().toDateString()

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/event/delete/${eventId}`);
            
            if (response.data.success) {
                toast.success('Event deleted successfully');
                // Update your events list here
                setEvents(events.filter(event => event._id !== eventId));
            } else {
                toast.error('Failed to delete event');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            toast.error(error.response?.data?.message || 'Failed to delete event');
        }
    };

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
                        <li ><NavLink to={"/admin"} className="flex items-center gap-2 py-2 hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"><AiOutlineDashboard />Dashboard</NavLink></li>
                        <li><NavLink to={"/adminEvent"} className="flex items-center gap-2 py-2 py-2 hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"><AiOutlineBook />Events</NavLink></li>
                        <li><NavLink to={"/adminRegistered"} className="flex items-center gap-2 py-2 py-2 hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"><AiOutlineFileSearch />Registered</NavLink></li>
                        <li><NavLink to={"/admin"} className="flex items-center gap-2 py-2 py-2 hover:bg-[rgba(0,0,0,0.3)] cursor-pointer"><AiOutlineLogout />Logout</NavLink></li>
                    </ul>
                </div>

                {/* right */}
                <div className="flex flex-col flex-1 text-white gap-y-6">
                    <div className="h-16 w-full bg-slate-800 py-4 px-2">My Dashboard</div>

                    <div className="h-32 mr-6 ml-6 flex justify-between gap-x-2">
                        <div className="flex-1 border-1">
                            <div className="bg-slate-800 text-center">Regsitered Users</div>
                            <p className="flex items-center gap-2 text-xl bg-[gray] justify-center h-[82%]">{users ? users.length : 0} <VscAccount /></p>
                        </div>
                        <div className="flex-1">
                            <div className="bg-slate-800 text-center">Events</div>
                            <p className="flex items-center gap-2 text-xl bg-[gray] justify-center h-[82%]">{events ? events.length : 0} <AiOutlineSchedule /></p>
                        </div>
                        <div className="flex-1">
                            <div className="bg-slate-800 text-center">Customers</div>
                            <p className="flex items-center gap-2 text-xl bg-[gray] justify-center h-[82%]">{users ? users.length : 0} <AiOutlineBook /></p>
                        </div>
                    </div>

                    <div className="flex mr-6 ml-6 gap-x-2">
                        <div className="flex-1 h-32 bg-[gray] px-2">
                            <p>Events</p>
                            <div className="bg-[white] h-[10px] rounded">
                                <div className="bg-[blue] h-full w-[30%] rounded"></div>
                            </div>
                            <p>Customers</p>
                            <div className="bg-[white] h-[10px] rounded">
                                <div className="bg-[blue] h-full w-[60%] rounded"></div>
                            </div>
                            <p>Registered Members</p>
                            <div className="bg-[white] h-[10px] rounded">
                                <div className="bg-[blue] h-full w-[10%] rounded"></div>
                            </div>
                        </div>
                        <div className="w-[20%] bg-[gray] flex flex-col">
                            <div className="bg-slate-800 text-center">{today.slice(4,7)}</div>
                            <div className="flex-1 text-center text-6xl items-center">{today.slice(8,10)}</div>
                            <div className="text-center">{today.slice(0,3)}</div>
                        </div>
                    </div>

                    <LineChart />
                </div>
            </div>

            <Footer/>
        </div>
    
    )
}

export default AdminPage;