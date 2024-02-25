
export const RegisterHeader = ({
    title='', 
    onClose
}) => {
    return (
        <div className="flex justify-between items-center mb-7 font-semibold text-xl">
            <section className="font-medium text-xl"> 
                <h1>{title}</h1>
            </section>

            <section>
                <span className="cursor-pointer text-[1.7rem]" onClick={onClose}>x</span>
            </section>
        </div>
    )
}
