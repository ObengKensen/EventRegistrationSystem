import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { AiOutlineDashboard,AiOutlineFileSearch,AiOutlineLogout,AiOutlineSchedule,AiOutlineBook  } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Events from "../../components/Events"
import Avatar from "../../img/avatar.webp"


function adminEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    axios.post(`${import.meta.env.VITE_API_URL}/api/event/create`, formData)
    .then((response) => {
      console.log(response.data);
      toast.success('Event Added Successfully');
      })

    setIsModalOpen(false);
  };
  
  return(
    <div className="flex flex-col">
        <Header/>
        {/* <Events/> */}
        
        <div className="flex min-h-screen h-auto">
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

            
            <div className="flex flex-col flex-1 text-white gap-y-6">
              <div className="h-16 w-full bg-slate-800 py-4 px-2">My Events</div>

            <div className="flex flex-col items-center justify-center text-black">
                  
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    create Event
                  </button>

                  
                  {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
                      <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
                        
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-semibold">Event Details</h2>
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            &times;
                          </button>
                        </div>

                        
                        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Event Title</label>
                            <input
                              type="text"
                              name="title"
                              value={formData.Title}
                              onChange={handleChange}
                              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleChange}
                              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                              type="text"
                              name="location"
                              value={formData.Location}
                              onChange={handleChange}
                              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Event Description</label>
                            <input
                              type="text"
                              name="description"
                              value={formData.Description}
                              onChange={handleChange}
                              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>

                          
                          <button
                            type="submit"
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
                <Events />
            </div>
          </div>

        <Footer/>
    </div>

)
}

export default adminEvents