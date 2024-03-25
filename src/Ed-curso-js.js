/* ejercicio 2 */
const paintings = [
    {
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        date: 1503
    }]
    
function Image(title, artist, date) {
    this.title = title
    this.artist = artist
    this.date = date
}

function getImage(title, artist, date) {
    return new Image(title, artist, date)
}

const images1 = paintings.map(paint => {
    return new Image(paint.title, paint.artist, paint.date)
})

const images2 = images1.map(image => {
    return getImage(image.title, image.artist, image.date)
})


images2.map(paint => {
    console.log(paint.title, paint.artist, paint.date)
})



/* ejercicio 3 */
function Images() {
    this.data = []
    this.contains = (title) => {
        return this.data.some(item => item.title === title)
    }
    this.add = (title, artist, date) => {
        this.data = [...this.data, {
            title,
            artist,
            date
        }]
    }
    this.clear = () => {
        this.data = []
    }
    this.show = () => {
        this.data.map(item => {
            console.log(item.title, item.artist, item.date)
        })
    }
}

const images = new Images()

images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.show();
// -> Mona Lisa (Leonardo da Vinci, 1503)
// -> Last Supper (Leonardo da Vinci, 1495)
// -> The Starry Night (Vincent van Gogh, 1889)
images.clear();
images.show();

