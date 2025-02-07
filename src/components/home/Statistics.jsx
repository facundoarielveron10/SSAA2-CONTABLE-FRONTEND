// REACT
import { useState, useEffect } from "react";

// STATISTICS
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";

// ICONS
import { FaUsers, FaUsersSlash, FaUserCheck } from "react-icons/fa";

// AXIOS
import clientAxios from "src/config/ClientAxios";

// COMPONENTS
import Spinner from "../Spinner";

// ZUSTAND
import { useLoginStore } from "src/zustand/loginStore";

export default function Statistics() {
    // YEARS
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 2024 + 1 },
        (_, index) => 2024 + index
    );

    // STATES
    const [loading, setLoading] = useState(false);
    const [year, setYear] = useState(currentYear);
    const [userStats, setUserStats] = useState({
        totalUsers: 0,
        confirmedUsers: 0,
        unconfirmedUsers: 0,
    });
    const [seatStats, setSeatStats] = useState([
        { month: "Enero", Asientos: 0 },
        { month: "Febrero", Asientos: 0 },
        { month: "Marzo", Asientos: 0 },
        { month: "Abril", Asientos: 0 },
        { month: "Mayo", Asientos: 0 },
        { month: "Junio", Asientos: 0 },
        { month: "Julio", Asientos: 0 },
        { month: "Agosto", Asientos: 0 },
        { month: "Septiembre", Asientos: 0 },
        { month: "Octubre", Asientos: 0 },
        { month: "Noviembre", Asientos: 0 },
        { month: "Diciembre", Asientos: 0 },
    ]);
    const [totalSeats, setTotalSeats] = useState();

    // FUNCTIONS
    const getStats = async () => {
        setLoading(true);
        try {
            const { data } = await clientAxios.get(`/stats/stats?year=${year}`);
            setUserStats({
                totalUsers: data.totalUsers,
                confirmedUsers: data.confirmedUsers,
                unconfirmedUsers: data.unconfirmedUsers,
            });
            setSeatStats(data.monthlySeats);
            setTotalSeats(data.totalSeats);
        } catch (error) {
            toast.error(errorResponse(error));
        } finally {
            setLoading(false);
        }
    };

    // EFFECTS
    useEffect(() => {
        getStats();
    }, [year]);

    // ZUSTAND
    const { primaryColor } = useLoginStore();

    return loading ? (
        <Spinner />
    ) : (
        <div className="stats">
            <div className="stats-users">
                <div className="stats-card">
                    <div className="stats-card-data">
                        <p>{userStats.totalUsers} Usuarios totales</p>
                        <FaUsers fontSize={30} />
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-data">
                        <p>{userStats.confirmedUsers} Usuarios confirmados</p>
                        <FaUserCheck fontSize={30} />
                    </div>
                </div>
                <div className="stats-card">
                    <div className="stats-card-data">
                        <p>
                            {userStats.unconfirmedUsers} Usuarios no confirmados
                        </p>
                        <FaUsersSlash fontSize={30} />
                    </div>
                </div>
            </div>
            <div className="stats-seats">
                <div className="stats-dates">
                    <h3 className="stats-title">
                        Cantidad de Asientos Registrados en
                    </h3>
                    <div className="stats-filter">
                        <select
                            id="year"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                        >
                            {years.map((yearOption) => (
                                <option key={yearOption} value={yearOption}>
                                    {yearOption}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="stats-content">
                    <BarChart width={600} height={300} data={seatStats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Asientos" fill={primaryColor} />
                    </BarChart>
                    <p className="stats-seats-total">
                        <span>{totalSeats}</span> Asientos Registrados Totales
                    </p>
                </div>
            </div>
        </div>
    );
}
