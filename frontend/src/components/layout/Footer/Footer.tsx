const Footer = () => {
  return (
    <footer className="footer px-16 py-5 items-center p-4 bg-primary text-base-100 font-bold">
      <aside className="items-center grid-flow-col">
        <h6 className="text-4xl">Контакты</h6>
      </aside>
      <nav className="grid-flow-col gap-16 md:place-self-center md:justify-self-end text-2xl">
        <a href="tel:+79876543210">+7 987 654 32 10</a>
        <a href="email:failmail@gmail.com">failmail@gmail.com</a>
      </nav>
    </footer>
  )
}

export default Footer
