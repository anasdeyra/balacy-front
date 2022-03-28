import { useContext } from "react";
import authContext from "../../contextes/authContext";
import AdminDashboard from "./AdminDashboard";
import TrusteeDashboard from "./TrusteeDashboard";
import ResidentDashboard from "./ResidentDashboard";

export default function Dashboard() {
  const { user } = useContext(authContext);

  return (
    <>
      {user.type === "Admin" && <AdminDashboard />}
      {user.type === "Syndic" && <TrusteeDashboard />}
      {user.type === "Resident" && <ResidentDashboard />}
    </>
  );
}
