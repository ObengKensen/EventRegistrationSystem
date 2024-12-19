import Header from "../components/Header";
import Events from "../components/Events";
import Footer from "../components/Footer";

const EventPage = () =>{
    return (
        <div className="flex flex-col">
            <Header/>
            <Events/>
            <Footer/>
        </div>
    )
}

export default EventPage;