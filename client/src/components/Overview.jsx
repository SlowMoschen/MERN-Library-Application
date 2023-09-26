export default function Overview({ className, allBooks }) {

    return (
        <>
            <div className={className}>
                <div className="w-full h-1/2 flex flex-col items-center justify-center">
                    <h3 className="text-center text-2xl">Overview List</h3>
                    <table className="w-full border-accent border-2 max-w-[90%]">
                        <thead className="bg-secondary flex">
                        <tr className="flex w-full">
                            <th className="w-1/4">Title</th>
                            <th className="w-1/4">Pages</th>
                            <th className="w-1/4">Read?</th>
                            <th className="w-1/4">Rating</th>
                        </tr>
                        </thead>
                        <tbody className="text-center bg-primary [&>*:nth-child(even)]:bg-secondary overflow-y-scroll overflow-x-hidden max-h-[15rem] block">
                        {allBooks.map((book, index) => {
                            const { title, pages, readStatus, rating } = book
                            return (
                                <tr key={index} className="h-6">
                                    <td className="w-1/4">{title}</td>
                                    <td className="w-1/4">{pages}</td>
                                    <td className="w-1/4">{(readStatus ? '✓' : '✕')}</td>
                                    <td className="w-1/4">{rating}/5</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                <div className="h-1/2 w-full">
                    <h3>Some Stats</h3>
                </div>
                <div className="">
                    <h3>MORE STATS</h3>
                </div>
            </div>
        </>
    )
}