const Footer = () => {
  return (
    <footer className="w-full py-5 items-center bg-primary text-base-100 font-bold">
      <div className="mx-auto container flex flex-col justify-center gap-8 lg:gap-0 lg:flex-row lg:justify-between">
        <aside className="flex items-center justify-center lg:justify-normal">
          <h6 className="text-4xl">Контакты</h6>
        </aside>
        <nav className="flex flex-col justify-center items-center gap-4 md:flex-row md:gap-16 lg:justify-self-end text-2xl">
          <a href="tel:+79876543210">+7 987 654 32 10</a>
          <a href="email:failmail@gmail.com">failmail@gmail.com</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
