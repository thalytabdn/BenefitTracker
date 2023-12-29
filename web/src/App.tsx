import React from "react";
import {
    Routes,
    Route,
    Outlet,
    Link,
    useMatch,
    useResolvedPath,
  } from "react-router-dom";
  import type { LinkProps } from "react-router-dom";
import Login from "./pages/Login/Login";
import Consulta from "./pages/Consulta/Consulta";
  
  export default function App() {
    return (

        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="consulta-beneficios" element={<Consulta />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
  }
  
  function CustomLink({ children, to, ...props }: LinkProps) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
  
    return (
      <div>
        <Link
          style={{ textDecoration: match ? "underline" : "none" }}
          to={to}
          {...props}
        >
          {children}
        </Link>
        {match && " (active)"}
      </div>
    );
  }
  
  function Layout() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <CustomLink to="/login">Login</CustomLink>
            </li>
            <li>
              <CustomLink to="/consulta-beneficios">Consultar Benefífios</CustomLink>
            </li>
          </ul>
        </nav>
  
        <hr />
  
        <Outlet />
      </div>
    );
  }
  
  function Home() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
  
  function About() {
    return (
      <div>
        <h1>About</h1>
      </div>
    );
  }
  
  function NoMatch() {
    return (
      <div>
        <h1>Nothing to see here!</h1>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }