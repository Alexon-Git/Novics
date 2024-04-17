import { Links } from '../Header'
import { Link } from 'react-router-dom'

const HeaderCenter = () => {
  return (
    <>
      <div className="navbar-center hidden lg:flex lg:gap-32">
        <ul className="menu menu-horizontal text-base-100 px-1">
          {Links.map((link) => (
            <>
              {!link.children ? (
                <li key={link.id}>
                  {link.url ? (
                    <Link to={link.url}>{link.title}</Link>
                  ) : (
                    <a href={link.anchor}>{link.title}</a>
                  )}
                </li>
              ) : (
                <li key={link.id}>
                  <details>
                    <summary>
                      {link.url ? (
                        <Link to={link.url}>{link.title}</Link>
                      ) : (
                        <a href={link.anchor}>{link.title}</a>
                      )}
                    </summary>
                    <ul>
                      {link.children.map((child) => (
                        <li key={child.id}>
                          {child.url ? (
                            <Link to={child.url}>{child.title}</Link>
                          ) : (
                            <a href={child.anchor}>{link.title}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )}
            </>
          ))}
        </ul>
        <label className="input border-[#BBBBBB] text-[#D5D5D5] bg-transparent rounded-[15px] px-3 h-9 flex items-center gap-2">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_28_76669)">
              <path
                d="M12.9559 11.34H12.1356L11.8621 11.07C12.9559 9.81 13.5027 8.34 13.5027 6.66C13.5027 5.46 13.1989 4.35 12.5913 3.33C11.9836 2.31 11.1633 1.5 10.1304 0.899999C9.09739 0.299999 7.95807 -7.15256e-07 6.71242 -7.15256e-07C5.46678 -7.15256e-07 4.32746 0.299999 3.29449 0.899999C2.26151 1.5 1.4412 2.31 0.83357 3.33C0.225936 4.35 -0.0778809 5.475 -0.0778809 6.705C-0.0778809 7.935 0.225936 9.06 0.83357 10.08C1.4412 11.1 2.26151 11.91 3.29449 12.51C4.32746 13.11 5.45158 13.41 6.66685 13.41C8.36823 13.41 9.85693 12.87 11.133 11.79L11.4064 12.06V12.87L16.6017 18L18.1511 16.47L12.9559 11.34ZM6.66685 11.34C5.39082 11.34 4.29708 10.89 3.38563 9.99C2.47418 9.09 2.01846 7.995 2.01846 6.705C2.01846 5.415 2.47418 4.32 3.38563 3.42C4.29708 2.52 5.40601 2.07 6.71242 2.07C8.01884 2.07 9.12777 2.52 10.0392 3.42C10.9507 4.32 11.4064 5.415 11.4064 6.705C11.4064 7.995 10.9507 9.09 10.0392 9.99C9.12777 10.89 8.00365 11.34 6.66685 11.34Z"
                fill="#D5D5D5"
              />
            </g>
            <defs>
              <clipPath id="clip0_28_76669">
                <rect
                  width="18.3457"
                  height="18"
                  fill="white"
                  transform="matrix(1 0 0 -1 0 18)"
                />
              </clipPath>
            </defs>
          </svg>
          <input
            type="text"
            className="grow text-sm placeholder:text-[#D5D5D5]"
            placeholder="Поиск"
          />
        </label>
      </div>
    </>
  )
}

export default HeaderCenter
