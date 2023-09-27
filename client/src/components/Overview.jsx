import Chart from 'chart.js/auto'


export default function Overview({ className, allBooks }) {

    const readBooks = allBooks.filter((obj) => obj.readStatus === true)
    const unreadBooks = allBooks.filter((obj) => obj.readStatus === false)

    const calculateSum = (array, property) => {
        return array.reduce((total, obj) => {
            return total + parseInt(obj[property])
        }, 0)
    }

    const langauge = (arr, property, searchTerms) => {
        for(let i = 0; i < searchTerms.length; i++) {
            return arr.filter((obj) => obj[property] === searchTerms[i]).length
        }
    }

    const sortedByPages = [...allBooks].sort((a, b) => a.pages - b.pages)

    const sumOfPages = calculateSum(allBooks, 'pages')
    const sumOfReadPages = calculateSum(readBooks, 'pages')
    const sumOfNotReadPages = calculateSum(unreadBooks, 'pages')
    const avgOfRatings = calculateSum(allBooks, 'rating') / allBooks.length
    
    setTimeout(() => {
        const pieGraph = document.querySelector('#pieGraph')
        const barGraph = document.querySelector('#barGraph')
        new Chart(pieGraph, {
            type: 'pie',
            data: {
                labels: ['Read', 'not read'],
                datasets: [{
                    label: '# of Pages',
                    data:[sumOfReadPages, sumOfNotReadPages],
                    borderWidth: 1
                }]
            },
        });

        new Chart(barGraph, {
            type: 'bar',
            data: {
                labels: sortedByPages.map(book => book.title),
                datasets: [{
                    label: 'Pages',
                    data: sortedByPages.map(book => book.pages),
                    borderWidth: 1
                }]
            }
        })
    }, 300);

    return (
        <>
        { allBooks.length === 0 
        ? <div className='absolute top top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary p-5 rounded-lg text-xl'>Enter a book in your Library to see the Statistics.</div>
        : <div className={className}>
                <div className="w-full h-full flex flex-col items-center justify-center">
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
                            <tr key={index} className="grid grid-cols-4 items-center min-h-[2rem]">
                                <td className="w-full">{title}</td>
                                <td className="w-full">{pages}</td>
                                <td className="w-full">{(readStatus ? '✓' : '✕')}</td>
                                <td className="w-full">{rating}/5</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                </div>
                <div className="h-full w-full flex flex-col">
                <h3 className="text-center text-2xl">Statistics</h3>
                <div className="bg-secondary h-full w-full">
                    <p>Books in your Library: <span className="font-bold">{allBooks.length}</span></p>
                    <p>Total Pages: <span className="font-bold">{sumOfPages}</span></p>
                    <p>Average Rating: <span className="font-bold">{avgOfRatings.toFixed(2)}/5</span></p>
                    <p>Read Books: <span className="font-bold">{`${readBooks.length}/${allBooks.length}`}</span></p>
                    <p>Book with the most Pages: <span className="font-bold">{sortedByPages[sortedByPages.length - 1].title}</span></p>
                </div>
                </div>
                <div className="col-span-2 flex flex-col">
                <h3 className='text-center text-2xl'>Graphs</h3>
                <div className='flex items-center justify-evenly'>
                    <div className='w-1/4 h-[208px] text-center items-center flex flex-col'>
                        <h3>have read/have not read</h3>
                        <canvas id='pieGraph'></canvas>
                    </div>
                    <div className='h-full w-1/3 text-center'>
                        <h3>Books by Pages</h3>
                        <canvas id='barGraph'></canvas>
                    </div>
                </div>
                </div>
            </div>
    
        }
            
        </>
    )
}