import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SyntheticEvent, useState } from 'react'
import { NewsService } from '../../../services/news/news.service'
import { INew } from '../../../services/news/news.interface'

const CreateNewForm = () => {
  const [file, setFile] = useState<File | null>()
  const [fileUrl, setFileUrl] = useState<string>()
  const [title, setTitle] = useState<string>()
  const [text, setText] = useState<string>()
  const [url, setUrl] = useState<string>()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
      setFileUrl(URL.createObjectURL(event.target.files[0]))
    }
  }
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: NewsService.createNew,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['news'] })
    }
  })

  const submit = (event: SyntheticEvent) => {
    event.preventDefault()
    const formData = new FormData()
    if (file && title && text && url) {
      formData.append("image", file)
      formData.append("title", title)
      formData.append("text", text)
      formData.append("url", url)
      console.log(formData)
      mutation.mutate(formData as Partial<INew>)
    }
  }
  return (
    <div className="w-full flex justify-between gap-48">
      <div className="w-1/2 flex flex-col gap-4">
        {!file ? (
          <div className="h-[300px] w-full bg-[#D9D9D9] flex justify-center items-center rounded-2xl">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_113_3286)">
                <path
                  d="M0.00624847 9.375C0.00624847 7.7174 0.664729 6.12769 1.83683 4.95558C3.00893 3.78348 4.59865 3.125 6.25625 3.125H43.7562C45.4139 3.125 47.0036 3.78348 48.1757 4.95558C49.3478 6.12769 50.0062 7.7174 50.0062 9.375V40.625C50.0062 42.2826 49.3478 43.8723 48.1757 45.0444C47.0036 46.2165 45.4139 46.875 43.7562 46.875H6.25625C4.59865 46.875 3.00893 46.2165 1.83683 45.0444C0.664729 43.8723 0.00624847 42.2826 0.00624847 40.625V9.375ZM3.13125 37.5V40.625C3.13125 41.4538 3.46049 42.2487 4.04654 42.8347C4.63259 43.4208 5.42745 43.75 6.25625 43.75H43.7562C44.5851 43.75 45.3799 43.4208 45.966 42.8347C46.552 42.2487 46.8812 41.4538 46.8812 40.625V29.6875L35.0781 23.6031C34.7851 23.4563 34.4533 23.4054 34.1297 23.4576C33.8061 23.5097 33.5071 23.6623 33.275 23.8937L21.6812 35.4875L13.3687 29.95C13.0686 29.7502 12.7086 29.6603 12.3498 29.6956C11.991 29.7309 11.6554 29.8893 11.4 30.1437L3.13125 37.5ZM18.7562 17.1875C18.7562 15.9443 18.2624 14.752 17.3833 13.8729C16.5042 12.9939 15.312 12.5 14.0687 12.5C12.8255 12.5 11.6333 12.9939 10.7542 13.8729C9.87511 14.752 9.38125 15.9443 9.38125 17.1875C9.38125 18.4307 9.87511 19.623 10.7542 20.5021C11.6333 21.3811 12.8255 21.875 14.0687 21.875C15.312 21.875 16.5042 21.3811 17.3833 20.5021C18.2624 19.623 18.7562 18.4307 18.7562 17.1875Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_113_3286">
                  <rect width="50" height="50" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        ) : (
          <img
            className="h-[300px] object-cover w-full rounded-2xl"
            src={fileUrl}
            alt="file"
          />
        )}
        <h3 className="text-xl font-bold">{title}</h3>
        <p>{text}</p>
      </div>
      <form onSubmit={submit} className="w-full flex flex-col gap-4">
        <label
          className="w-full flex justify-between items-center px-4 py-2 border-[1px] border-[#DEDEDE] rounded-[10px] cursor-pointer"
          htmlFor="fileUpload"
        >
          <p className="text-[#A9A9A9]">
            {file?.name ? file.name : 'Добавление фотографии'}
          </p>
          <button className="text-base-100 bg-[black] rounded-[6px] px-2 py-1">
            Добавить
          </button>
        </label>
        <input
          id="fileUpload"
          onChange={handleFileChange}
          type="file"
          className="hidden"
        />
        <input
          type="text"
          className="input border-[1px] border-[#DEDEDE] rounded-[10px] w-full"
          placeholder="Заголовок"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
        />
        <textarea
          placeholder="Текст новости"
          className="input border-[1px] border-[#DEDEDE] text-base p-4 rounded-[10px] w-full min-h-32"
          cols={50}
          rows={10}
          value={text}
          onChange={(event) => {
            setText(event.target.value)
          }}
        ></textarea>
        <input
          type="text"
          className="input border-[1px] border-[#DEDEDE] rounded-[10px] w-full"
          placeholder="Ссылка на источник"
          value={url}
          onChange={(event) => {
            setUrl(event.target.value)
          }}
        />
        <div className="w-full flex justify-end">
          <button
            type="submit"
            className="btn btn-primary rounded-[8px] text-base-100"
          >
            Опубликовать
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNewForm
