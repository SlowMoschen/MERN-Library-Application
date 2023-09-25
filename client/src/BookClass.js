export default class Book {
    constructor(title, pages, rating, author, genre, language, haveRead, format) {
        this.title = title,
        this.pages = pages,
        this.rating = rating,
        this.author = author,
        this.genre = genre,
        this.language = language,
        this.haveRead = haveRead,
        this.format = format
    }

    set setTitle(name) {
        this.title = name
    }

    set setPages(pages) {
        this.title = pages
    }

    set setRating(rating) {
        this.title = rating
    }
    
    set setAuthor(name) {
        this.title = name
    }
    
    set setGenre(genre) {
        this.title = genre
    }
    
    set setLanguage(language) {
        this.title = language
    }
    
    set setHaveRead(boolean) {
        this.title = boolean
    }
    
    set setFormat(format) {
        this.title = format
    }
}