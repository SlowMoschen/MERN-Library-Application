import Chart from 'chart.js/auto'


export default function Overview({ className, allBooks }) {

    const readBooks = allBooks.filter((obj) => obj.readStatus === true)
    const unreadBooks = allBooks.filter((obj) => obj.readStatus === false)

    const calculateSum = (array, property) => {
        return array.reduce((total, obj) => {
            return total + parseInt(obj[property])
        }, 0)
    }

    const sortedByPages = [...allBooks].sort((a, b) => a.pages - b.pages)

    const sumOfPages = calculateSum(allBooks, 'pages')
    const sumOfReadPages = calculateSum(readBooks, 'pages')
    const sumOfNotReadPages = calculateSum(unreadBooks, 'pages')
    const avgOfRatings = calculateSum(allBooks, 'rating') / allBooks.length

    
    
    const genres = allBooks.map(book => book.genre)
    const filteredGenres = genres.filter((item, index) => genres.indexOf(item) === index).filter(item => item)

    const genreLength = () => {

        let counts = []

        const getSum = (searchGenre) => {
            const filteredBooks = allBooks.filter(book => book.genre === searchGenre)
            return filteredBooks.length
        }

        for(const genre of filteredGenres) {
            counts = [...counts, getSum(genre)]
        }
        return counts
    }
    genreLength()

    const renderGraphs = () => {
        const pieGraph = document.querySelector('#pieGraph')
        const barGraph = document.querySelector('#barGraph')
        const genreGraph = document.querySelector('#genreGraph')

        // Pages Graph
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
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
        
        // Books Bar Graph
        new Chart(barGraph, {
            type: 'bar',
            data: {
                labels: sortedByPages.map(book => book.title),
                datasets: [{
                    label: 'Pages',
                    data: sortedByPages.map(book => book.pages),
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })

        // Genre Graph
        new Chart(genreGraph, {
            type: 'bar',
            data: {
                labels: filteredGenres.map(genre => genre),
                datasets: [{
                    label: 'Genre',
                    data: genreLength().map(count => count),
                    borderWidth: 1,
                    backgroundColor: 'rgba(255,99,132, 0.6)'
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        })
    }
    
    setTimeout(renderGraphs, 100)

    return (
        <>
        { allBooks.length === 0 
        ? <div className='absolute top top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary p-5 rounded-lg text-xl'>Enter a book in your Library to see the Statistics.</div>
        : (
            <>
                <div className="w-full h-full min-h-[20rem] flex flex-col items-center justify-center">
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
                <div className="h-[70%] min-h-[20rem] w-full flex flex-col">
                <h3 className="text-center text-2xl">Statistics</h3>
                <div className="bg-secondary h-full w-full">
                    <p>Books in your Library: <span className="font-bold">{allBooks.length}</span></p>
                    <p>Total Pages: <span className="font-bold">{sumOfPages}</span></p>
                    <p>Average Rating: <span className="font-bold">{avgOfRatings.toFixed(2)}/5</span></p>
                    <p>Read Books: <span className="font-bold">{`${readBooks.length}/${allBooks.length}`}</span></p>
                    <p>Book with the most Pages: <span className="font-bold">{sortedByPages[sortedByPages.length - 1].title}</span></p>
                </div>
                </div>
                <div className="col-span-2 flex flex-col h-full">
                <h3 className='text-center text-2xl'>Graphs</h3>
                <div className='grid grid-cols-2 items-center'>
                    <div className='w-full h-1/2 text-center items-center flex flex-col'>
                        <h3>have read/have not read</h3>
                        <canvas id='pieGraph'></canvas>
                    </div>
                    <div className='h-full w-full text-center'>
                        <h3>Books by Pages</h3>
                        <canvas id='barGraph'></canvas>
                    </div>
                    <div className='h-full w-full text-center'>
                        <h3>Genres</h3>
                        {filteredGenres.length === 0 ? <div>No Genres entered</div> : <canvas id='genreGraph'></canvas>}
                    </div>
                </div>
                </div>
                <div className='h-40'></div>
            </>
        )
        }
        </>
    )
}