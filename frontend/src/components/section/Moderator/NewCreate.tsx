const NewCreate = () => {
  return (
    <section className="my-20">
      <div className="hero mx-auto container">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-[36px] font-bold">Добавление новости</h2>
          <div className="flex flex-col justify-between items-center gap-6">
            {/* {requests.map((request, index) => (
              <ModeratorRequest key={index} user={request.user} doc={request.doc} />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewCreate