import UploadFileForm from "../../../ui/form/UploadFileForm"

const UploadFile = () => {
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Выгрузить файл</h2>
          <UploadFileForm />
        </div>
      </div>
    </section>
  )
}

export default UploadFile