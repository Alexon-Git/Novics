import { Links } from '../Header'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import autoAnimate from '@formkit/auto-animate'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'

const HeaderCenter = () => {
  const { pathname } = useLocation()
  const currentUser = useTypedSelector((state) => state.user.user)
  const [show, setShow] = useState<boolean>(false)
  const parent = useRef(null)
  const containerRef = useRef(null)
  const [unactiveRoles, setUnactiveRoles] = useState<string[]>([
    'user',
    'moderator',
    'admin'
  ])
  const [currentDashboard, setCurrentDashboard] = useState<string>(
    pathname.split('/')[2] !== currentUser?.role
      ? pathname.split('/')[2]
      : currentUser?.role
  )
  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent])

  useEffect(() => {
    pathname.split('/')[2] ? setCurrentDashboard(pathname.split('/')[2]) : null
  }, [pathname])

  useEffect(() => {
    setUnactiveRoles((roles) =>
      roles.filter((item) => item !== currentDashboard)
    )
  }, [currentDashboard])
  const handleDashboard = (s: string) => {
    setUnactiveRoles([...unactiveRoles, currentDashboard])
    setCurrentDashboard(s)
    setShow(false)
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !(containerRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShow(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [containerRef])
  return (
    <>
      <div
        ref={containerRef}
        className="navbar-center hidden gap-8 lg:flex lg:gap-32"
      >
        {pathname === '/' ? (
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
        ) : currentUser && currentUser.is_active ? (
          <>
            {currentUser.role === 'admin' ? (
              <>
                <div className="relative uppercase px-4" ref={parent}>
                  <div
                    className={`flex gap-8 ${currentDashboard === 'moderator' ? 'lg:min-w-[200px] ' : ''}`}
                  >
                    <Link
                      to={`/dashboard/${currentDashboard || currentUser.role}`}
                      className="text-base-100 text-xl font-semibold"
                      onClick={() => setShow(false)}
                    >
                      {currentDashboard === 'admin'
                        ? 'Администратор'
                        : currentDashboard === 'user' ||
                            currentDashboard === 'supervisor'
                          ? 'Представитель'
                          : 'Модератор'}
                    </Link>
                    <button className="-m-5 p-5" onClick={() => setShow(!show)}>
                      {!show ? (
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.8239 5.85666C21.8239 5.6719 21.7508 5.48281 21.609 5.34101C21.3254 5.05742 20.8614 5.05742 20.5778 5.34101L10.8711 15.0477L1.30628 5.48281C1.02268 5.19922 0.55862 5.19922 0.275026 5.48281C-0.00856781 5.7664 -0.00856781 6.23047 0.275026 6.51406L10.3555 16.5988C10.6391 16.8824 11.1032 16.8824 11.3867 16.5988L21.609 6.37656C21.7551 6.23047 21.8239 6.04572 21.8239 5.85666Z"
                            fill="white"
                          />
                        </svg>
                      ) : (
                        <div className=" rotate-180">
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.8239 5.85666C21.8239 5.6719 21.7508 5.48281 21.609 5.34101C21.3254 5.05742 20.8614 5.05742 20.5778 5.34101L10.8711 15.0477L1.30628 5.48281C1.02268 5.19922 0.55862 5.19922 0.275026 5.48281C-0.00856781 5.7664 -0.00856781 6.23047 0.275026 6.51406L10.3555 16.5988C10.6391 16.8824 11.1032 16.8824 11.3867 16.5988L21.609 6.37656C21.7551 6.23047 21.8239 6.04572 21.8239 5.85666Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                  {show && (
                    <div className="w-full absolute flex flex-col gap-4 bg-primary text-base-100 text-xl font-semibold px-4 py-2 left-0 -bottom-24">
                      {unactiveRoles.map((role, index) => {
                        return (
                          <Link
                            key={index}
                            to={`/dashboard/${role}`}
                            onClick={() => handleDashboard(role)}
                          >
                            {role === 'admin'
                              ? 'Администратор'
                              : role === 'moderator'
                                ? 'Модератор'
                                : 'Представитель'}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <h1 className="uppercase text-xl font-semibold text-base-100">
                  {currentUser.role === 'admin'
                    ? 'Администратор'
                    : currentUser.role === 'moderator'
                      ? 'Модератор'
                      : 'Представитель'}
                </h1>
              </>
            )}
          </>
        ) : (
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
        )}
      </div>
    </>
  )
}

export default HeaderCenter
