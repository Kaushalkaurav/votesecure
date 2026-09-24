import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { Menu, X, ShieldCheck, LogOut, LayoutDashboard, UserCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navClass = ({ isActive }) =>
    `transition ${isActive ? "text-blue-400" : "text-slate-300 hover:text-white"}`;

  const signOut = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
            <ShieldCheck size={23} />
          </span>
          <div>
            <p className="text-lg font-bold tracking-tight">VoteSecure</p>
            <p className="hidden text-[10px] uppercase tracking-[0.25em] text-slate-500 sm:block">Digital Voting</p>
          </div>
        </Link>

        <button className="rounded-lg p-2 md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`${open ? "absolute left-0 right-0 top-18.25 flex border-b border-slate-800 bg-slate-950 p-5" : "hidden"} flex-col gap-5 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}>
          {isAuthenticated ? (
            <>
              <NavLink className={navClass} to="/dashboard" onClick={() => setOpen(false)}>Dashboard</NavLink>
              <NavLink className={navClass} to="/elections" onClick={() => setOpen(false)}>Elections</NavLink>
              <NavLink className={navClass} to="/results" onClick={() => setOpen(false)}>Results</NavLink>
              {user?.role === "admin" && (
                <NavLink className={navClass} to="/admin" onClick={() => setOpen(false)}>Admin</NavLink>
              )}
              <NavLink className={navClass} to="/profile" onClick={() => setOpen(false)}>
                <span className="flex items-center gap-1"><UserCircle size={17} /> Profile</span>
              </NavLink>
              <button onClick={signOut} className="flex items-center gap-2 text-left text-red-400 hover:text-red-300">
                <LogOut size={17} /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className={navClass} to="/">Home</NavLink>
              <a className={navClass} href="#how-it-works" onClick={() => setOpen(false)}>How it works</a>
              <NavLink className={navClass} to="/login" onClick={() => setOpen(false)}>Login</NavLink>
              <Link to="/register" onClick={() => setOpen(false)} className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-500">
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
