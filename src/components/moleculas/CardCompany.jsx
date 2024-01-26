
export const CardCompany = ({
    title,
    value,
    image
}) => {
    return (
        <div className="w-[190px] bg-bgTemplate-light p-[1rem] border rounded-md shadow-lg shadow-black overflow-hidden text-textTemplate-light">
            <div className="flex h-100 flex-col gap-[1rem]">
                <p className="text-black text-[1.3rem] font-bold leading-5">{title}</p>
                <div className="text-black text-[1.8rem] font-bold leading-5 flex justify-center">
                    <p className="priceNumber">{value}</p>
                    {
                        image && <img src={image} alt="" />
                    }
                </div>
            </div>
        </div>
    )
}
