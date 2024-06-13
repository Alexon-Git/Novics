const AdminRequestSkelet = () => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-4 border-[1px] border-primary rounded-[20px]">
      <div className="skeleton w-32 h-8"></div>
      <div className="flex items-center gap-4">
        <div className="skeleton w-20 h-8" />
        <div className="skeleton w-20 h-8" />
        <div className="skeleton w-20 h-8" />
      </div>
    </div>
  )
}

export default AdminRequestSkelet
