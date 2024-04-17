import { Link } from "react-router-dom"
import HomeDocsCard from "../../ui/card/HomeDocsCard/HomeDocsCard"
import { IDocsCard } from "../../../types/section.interface"

const HomeDocs = () => {
  const docs: IDocsCard[] = [
    {
      id: 0,
      title: 'Обязательство о неразглашении конфиденциальной информации ',
      size: '222кб',
      date: '06.02.2023',
      url: 'https://vk.com'
    },
    {
      id: 1,
      title: 'Обязательство о неразглашении конфиденциальной информации ',
      size: '222кб',
      date: '06.02.2023',
      url: 'https://vk.com'
    },
    {
      id: 2,
      title: 'Обязательство о неразглашении конфиденциальной информации ',
      size: '222кб',
      date: '06.02.2023',
      url: 'https://vk.com'
    },
    {
      id: 3,
      title: 'Обязательство о неразглашении конфиденциальной информации ',
      size: '222кб',
      date: '06.02.2023',
      url: 'https://vk.com'
    }
  ]
  return (
    <section id="docs" className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Документы</h2>
          <div className="flex flex-col justify-between items-center gap-8">
            {docs.map((doc) => (
              <HomeDocsCard key={doc.id} props={doc} />
            ))}
          </div>
          <Link to="https://vk.com" className="flex justify-end items-center gap-2 opacity-65">
            <p>Все документы</p>
            <svg
              width="14"
              height="9"
              viewBox="0 0 14 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.29697e-05 4.50002C8.29697e-05 4.63263 0.0527611 4.75981 0.146529 4.85357C0.240297 4.94734 0.367475 5.00002 0.500083 5.00002H12.2931L9.14608 8.14602C9.0522 8.23991 8.99945 8.36725 8.99945 8.50002C8.99945 8.6328 9.0522 8.76013 9.14608 8.85402C9.23997 8.94791 9.36731 9.00065 9.50008 9.00065C9.63286 9.00065 9.7602 8.94791 9.85408 8.85402L13.8541 4.85402C13.9006 4.80758 13.9376 4.7524 13.9628 4.69165C13.988 4.63091 14.001 4.56579 14.001 4.50002C14.001 4.43425 13.988 4.36913 13.9628 4.30839C13.9376 4.24764 13.9006 4.19247 13.8541 4.14602L9.85408 0.146021C9.8076 0.0995332 9.75241 0.0626571 9.69167 0.037498C9.63093 0.0123389 9.56583 -0.000610352 9.50008 -0.000610352C9.36731 -0.000610352 9.23997 0.0521345 9.14608 0.146021C9.0522 0.239908 8.99945 0.367245 8.99945 0.500021C8.99945 0.632797 9.0522 0.760135 9.14608 0.854021L12.2931 4.00002H0.500083C0.367475 4.00002 0.240297 4.0527 0.146529 4.14647C0.0527611 4.24024 8.29697e-05 4.36741 8.29697e-05 4.50002Z"
                fill="black"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HomeDocs
