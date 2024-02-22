export const PictureContainer = ({children}) => {
  return (
    <div className="flex items-center content-start p-[8px] gap-[3px] mb-[8px]
        border-2 border-dashed border-[#f9d70b] rounded-[5px]
        bg-[#f9d70b1a] relatve max-w-[400px] max-h-[400px]">
        {children}
    </div>
  )
}
