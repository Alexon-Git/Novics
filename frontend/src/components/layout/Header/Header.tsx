const Header = ({ children }: { children: React.ReactElement }) => {
  return (
    <header>
      <div className="navbar bg-base-100">{children}</div>
    </header>
  )
}

export default Header
