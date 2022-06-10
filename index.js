/* YOUR CODE HERE! */



class Meneger {

    constructor() {
        this.id = 0;
        this.colour_list = [
            'blue',
            'yellow',
            'rgb(17, 255, 0)',
            'red',
            'magenta',
            'cyan',
        ]
    }

    getId() {
        this.id += 1
        return this.id
    }

    getNextColour(box) {
        box.colourId = (box.colourId + 1) % this.colour_list.length
        return this.colour_list[box.colourId]
    }
}


function getBoxContainer() {
    return [...document.getElementsByClassName('box-container')][0]
}


function getFirstChildBox(id_counter) {
    return [...getBoxContainer().children][0]
}


function initialiseBoxProperties(new_box, parent, meneger, new_id) {
    new_box.id = new_id;
    new_box.role = 'button'
    new_box.isBig = 0
    new_box.colourId = -1
    new_box.style.backgroundColor = meneger.getNextColour(new_box);

    addChangeOfColour(new_box, meneger)
    addBoxMoving(new_box)
    addBoxResizer(new_box)
    addCloner(new_box, parent, meneger)
    addRemover(new_box, parent)
}


function addChangeOfColour(box, meneger) {

    box.addEventListener('contextmenu', (event) => {
        event.target.style.backgroundColor = meneger.getNextColour(box);
    })

}


function addBoxMoving(box) {
    box.mousedown = false
    box.x = 0
    box.y = 0

    box.addEventListener('mousedown', function (event) {
        if (event.button === 0) {
            box.mousedown = true;
            box.x = box.offsetLeft - event.clientX;
            box.y = box.offsetTop - event.clientY;
        }
    })

    box.addEventListener('mousemove', function (event) {
        if (box.mousedown) {
            box.style.left = event.clientX + box.x + 'px';
            box.style.top = event.clientY + box.y + 'px';
        }
    })

    box.addEventListener('mouseup', function (event) {
        if (event.button === 0) {
            box.mousedown = false;
        }
    })
}


function addBoxResizer(box) {

    box.addEventListener('click', function (event) {

        if (event.shiftKey) {

            if (box.isBig === 0) {
                box.classList.add('box-large')
            } else {
                box.classList.remove('box-large')
            }
            box.isBig = (box.isBig + 1) % 2;
        }
    })
}


function addCloner(box, parent, meneger) {

    box.addEventListener('dblclick', function (event) {

        if (!event.altKey) {
            let new_id = meneger.getId()

            const new_box = box.cloneNode()
            const text = document.createTextNode(`${new_id}`)

            new_box.appendChild(text)
            initialiseBoxProperties(new_box, parent, meneger, new_id)

            parent.appendChild(new_box)
        }
    })
}


function addRemover(box, parent) {

    box.addEventListener('dblclick', function (event) {

        if (event.altKey) {
            parent.removeChild(box)
        }
    })
}

//help function to see what key are pressed 
//(actually I don't use it)
function addKeyboardListener(doc_keypress) {

    document.addEventListener('keydown', function (event) {
        doc_keypress[event.code] = true
    })
    document.addEventListener('keyup', function (event) {
        doc_keypress[event.code] = false
    })
}


function main() {
    const doc_keypress = {}
    addKeyboardListener(doc_keypress)

    const meneger = new Meneger();
    const container = getBoxContainer()
    const box = getFirstChildBox(meneger)

    initialiseBoxProperties(box, container, meneger, meneger.getId())
}


main()
