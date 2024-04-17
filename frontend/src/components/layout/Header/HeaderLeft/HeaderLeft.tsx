import { Link } from "react-router-dom"
import { Links } from "../Header"
import { NavLink } from "react-router-dom"

const HeaderLeft = () => {
  return (
    <div className="navbar-start">
      <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost text-base-100 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {Links.map((link) => (
              <li key={link.id}>
                <NavLink to={link.url}>{link.title}</NavLink>
                {link.children &&
                  link.children.map((child) => (
                    <li key={child.id}>
                      <NavLink to={child.url}>{child.title}</NavLink>
                    </li>
                  ))}
              </li>
            ))}
          </ul>
        </div>
        <Link to='/' className=" text-base-100 font-semibold text-[28px]">
          Новис
        </Link>
    </div>
  )
}

export default HeaderLeft