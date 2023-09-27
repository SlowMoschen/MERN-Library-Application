import './App.css'
import Header from './components/Header'
import Logo from './assets/logo.png'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import BookGrid from './components/BookGrid'
import Overview from './components/Overview'
import Button from './components/Button'
import AddModal from './components/AddModal'
import BookCard from './components/BookCard'
import EditModal from './components/EditModal'

function App() {

  const [isLibraryActive, setIsLibraryActive] = useState(true)
  const [isModalActive, setIsModalActive] = useState(false)
  const [editModeActive, setEditModeActive] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [editBook, setEditBook] = useState([])

  const updateData = () => {
    const fetchAllBooks = async () => {
      const APIURL = 'http://localhost:3001/'
  
      try {
        const response = await fetch(APIURL)
        const data = response.json()
        data.then(result => { setAllBooks(result)})
        return
      } catch (error) {
        console.error(error)
        return
      }
    }
    fetchAllBooks()
  }

useEffect(() => {
   updateData()
}, [])

return (
    <>
     <Header className='bg-secondary flex items-center justify-between p-2 h-[10%] z-10 w-full'>
        <img src={Logo} height='100px' width='100px'/>
        <Navbar className='flex items-center mx-10' isLibraryActive={isLibraryActive} setIsLibraryActive={setIsLibraryActive}/>
        <p>Keep track of your Books</p>
     </Header>
     {isLibraryActive 
     ? <BookGrid className='h-[90%] grid grid-cols-4 overflow-scroll overflow-x-hidden'>
        {isModalActive 
        ? <AddModal className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 bg-secondary border-2 border-accent p-5 rounded-lg flex flex-col items-center' 
          isModalActive={isModalActive}  
          setIsModalActive={setIsModalActive}
          updateData={updateData}
          /> 
        : ''}
        {editModeActive 
        ? <EditModal
          className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 bg-secondary border-2 border-accent p-5 rounded-lg flex flex-col items-center'
          editModeActive={editModeActive}
          setEditModeActive={setEditModeActive}
          editBook={editBook}
          updateData={updateData}
        />
        : ''}
        {allBooks.length === 0 
        ? <div className='absolute top top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary p-5 rounded-lg text-xl'>Add a Book by clicking the Button in the bottom right corner.</div> 
        : allBooks.map((book, index) => {
        return <BookCard 
                book={book} 
                key={index} 
                className='flex flex-col items-center justify-start w-90 m-10 h-80 max-w-sm rounded-lg bg-secondary relative capitalize hover:shadow-md hover:scale-105' 
                updateData={updateData}
                editModeActive={editModeActive}
                setEditModeActive={setEditModeActive}
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
                editBook={editBook}
                setEditBook={setEditBook}
                />
      })}
       <Button className='absolute bottom-3 right-5 flex items-start bg-accent px-3 py-1 rounded-lg hover:scale-105' onClick={() => { setIsModalActive(!isModalActive) }}>
          Add Book
          <span className="material-symbols-outlined">add</span>
        </Button>
     </BookGrid> 
     : <Overview 
     className='h-[100%] w-full p-2 grid grid-cols-2 grid-rows-1 items-center overflow-scroll overflow-x-hidden'
     allBooks={allBooks}
     />}

    </>
  )
}

export default App
