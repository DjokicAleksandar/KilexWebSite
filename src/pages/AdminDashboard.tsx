import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <label htmlFor="day">Dan: </label>
            <input type="text" id="day"/>

            <label htmlFor="month"> Mesec: </label>
            <input type="text" id="month"/>

            <label htmlFor="year"> Godina: </label>
            <input type="text" id="year"/>

            <br/>

            <button id="search"> Pretraži </button>

            <div>
                <div id="salesData"></div>
                <div id="totalSales"></div>
                <button id="logoutBtn" onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/admin-login");
                }}>Izloguj se</button>
            </div>
        </div>
    )
}

export default AdminDashboard;