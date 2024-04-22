import CreateNewForm from "../../ui/form/CreateNewForm"

const NewCreate = () => {
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Добавление новости</h2>
          <CreateNewForm />
        </div>
      </div>
    </section>
  )
}

export default NewCreate