import Book from "../BookClass";
import Button from "./Button";

export default function BookModal({ className, isModalActive, setIsModalActive, updateData }) {

    const handleError = (state) => {
        const errorBox = document.querySelector('.error')
        
        if(state === 'empty') {
            errorBox.textContent = 'Please enter *-required Inputs'
        }

        if(state === 'NaN') {
            errorBox.textContent = 'Please enter a correct Value'
        }

        setTimeout(() => {
            errorBox.textContent = ''
        }, 1500);
    }
    
    const clearInputs = (element) => {
        element.value = ''
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        const textInputs = document.querySelectorAll('form input[type="text"]')
        const selectInputs = document.querySelectorAll('form select')
        const haveReadInput = document.querySelector('form input[type="checkbox"]')
        
        if(textInputs[0].value === '' || textInputs[1].value === '') {
            handleError('empty')
            return
        }

        if(isNaN(textInputs[1].value)) {
            handleError('NaN')
            textInputs[1].focus()
            return
        }
        
        const book = new Book(
        textInputs[0].value.trim().toLowerCase(), 
        textInputs[1].value.trim().toLowerCase(), 
        selectInputs[0].value.trim().toLowerCase(), 
        textInputs[2].value.trim().toLowerCase(), 
        textInputs[3].value.trim().toLowerCase(), 
        textInputs[4].value.trim().toLowerCase(), 
        haveReadInput.checked, 
        selectInputs[1].value.trim().toLowerCase()
        )
            
        const addData = async () => {
            const APIURL = 'http://localhost:3001/'
            try {
                const addedBook = await fetch(APIURL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(book)
                })
                console.log(addedBook.json())
                updateData()
                return
            } catch (error) {
                console.error(error)
                return
            }
        }
        addData()

        
        textInputs.forEach(input => {
            clearInputs(input)
        })
        setIsModalActive(!isModalActive)
    }

    return (
        <>
            <div className={className}>
                <Button className='absolute right-2 top-2 text-red hover:scale-105' 
                onClick={() => { setIsModalActive(!isModalActive) }}>
                    <span className="material-symbols-outlined">close</span>
                </Button>
                <h3 className="text-2xl mb-5 font-bold">New Book</h3>
                <form className="flex flex-col" onSubmit={(e) => { handleSubmit(e) }}>
                    <div className="flex justify-between mb-3">
                        <label htmlFor="title">Title *</label>
                        <input type="text" id="title" className="ml-5 outline-accent p-1"/>
                    </div>
                    <div className="flex justify-between mb-3">
                        <label htmlFor="pages">Number of Pages *</label>
                        <input type="text" id="pages" className="ml-5 outline-accent p-1"/>
                    </div>
                    <div className="flex justify-between mb-3">
                        <label htmlFor="rating">Rating *</label>
                        <select id="rating" defaultValue={3} className="ml-5 outline-accent p-1">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className="flex justify-between mb-3">
                        <label htmlFor="author">Author</label>
                        <input type="text" id="author" className="ml-5 outline-accent p-1"/>
                    </div>
                    <div className="flex justify-between mb-3">
                        <label htmlFor="genre">Genre</label>
                        <input type="text" id="genre" className="ml-5 outline-accent p-1"/>
                    </div>
                    <div className="flex justify-between mb-3">
                        <label htmlFor="language">Language</label>
                        <input type="text" id="language" className="ml-5 outline-accent p-1"/>
                    </div>
                    <div className="flex justify-between mb-3">
                        <label htmlFor="readStatus">Have you read it?</label>
                        <input type="checkbox" id="readStatus" className="ml-5 outline-accent p-1"/>
                    </div>
                    <div className="flex justify-between mb-3">
                        <label htmlFor="format">Format of the Book</label>
                        <select id="format" className="ml-5 outline-accent p-1">
                            <option value="Hardcover">Hardcover</option>
                            <option value="Paperback">Paperback</option>
                            <option value="E-book">E-Book</option>
                        </select>
                    </div>
                    <Button className="bg-accent p-2 mt-2 rounded-lg hover:scale-105">Add to your Library</Button>
                    <div className="error mt-3 text-center flex items-center justify-center w-full h-4 text-red"></div>
                </form>
            </div>
        </>
    )
}