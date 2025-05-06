import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";

interface Product {
    name: string;
    price: number;
    quantity: number;
}

interface SaleEntry {
    date: string;
    products: Product[];
}

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState<SaleEntry[]>([]);
    const [totalSales, setTotalSales] = useState<number>(0);
    const [inputDay, setInputDay] = useState('');
    const [inputMonth, setInputMonth] = useState('');
    const [inputYear, setInputYear] = useState('');
    const [filter, setFilter] = useState({day: "", month: "", year: ""});

    useEffect(() => {
        const fetchSales = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/admin-dashboard", {
                method: "GET",
                headers: { authorization: `Bearer ${token}` }
            })

            if (response.status === 403) {
                navigate("/admin-login");
                return;
            }

            const data: SaleEntry[] = await response.json();

            if (Array.isArray(data)) {
                setSales(data);
                updateTotal(data);
            } else {
                console.warn("Pogresan format");
            }

        }

        fetchSales();
    }, []);    

    const updateTotal = (entries: SaleEntry[] = []) => {
        let total = 0;

        entries.forEach(entry => {
            entry.products?.forEach(p => {
                total += p.price * p.quantity;
            })
        })
        setTotalSales(total);
    }

    const applyFilter = () => {
        setFilter({
            day: inputDay,
            month: inputMonth,
            year: inputYear
        })
    }

    const getFilteredSales = () => {
        return sales.filter(entry => {
            const [d, m, y] = entry.date.split("-").map(Number);
            if (filter.day && Number(filter.day) !== d) return false;
            if (filter.month && Number(filter.month) !== m) return false;
            if (filter.year && Number(filter.year) !== y) return false;
            return true;
        });
    };

    const filteredSales: SaleEntry[] = getFilteredSales();

    useEffect(() => {
        if (filteredSales) updateTotal(filteredSales);
    }, [filter, sales])

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="day"> Dan: </label>
            <input onChange={e => setInputDay(e.target.value)} value={inputDay} type="text" id="day"/>

            <br/>

            <label htmlFor="month"> Mesec: </label>
            <input onChange={e => setInputMonth(e.target.value)} value={inputMonth} type="text" id="month"/>

            <br/>

            <label htmlFor="year"> Godina: </label>
            <input onChange={e => setInputYear(e.target.value)} value={inputYear} type="text" id="year"/>

            <br/>

            <button id="search" onClick={applyFilter}> Pretraži </button>

            <div>
                {filteredSales && filteredSales.map(entry => (
                    <div key={entry.date}>
                        <div className="fw-bold"> {entry.date} </div>
                        {entry.products.map((p: Product, i: number) => (
                            <div key={i}> 
                                <span> {p.name} x {p.quantity} </span>
                                <span> {p.price * p.quantity} RSD </span>
                            </div>
                        ))}
                    <div style={{width: "100%", height: "1px", backgroundColor: "black"}}></div>
                    </div>
                ))}
            </div>

            <div> <b> Ukupno: </b> {totalSales} RSD</div>

            <button id="logoutBtn" onClick={() => {
                localStorage.removeItem("token");
                navigate("/admin-login");
            }}>Izloguj se</button>
        </div>
    )
}

export default AdminDashboard;