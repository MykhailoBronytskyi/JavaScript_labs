/* DONT CHANGE THIS CODE - START */
function wait(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

class Dish {

    constructor(cookingTime) {
        this.cookingTime = cookingTime;
    }

    async cook() {
        const actualCookingTime = this.cookingTime * (1 + Math.random()) * 100;
        await wait(actualCookingTime);
        return this;
    }
}
/* DONT CHANGE THIS CODE - END */


// YOUR CODE HERE

class Bolognese extends Dish {
    constructor() {
        super(10)
        this.ingridients = { 'spaghetti': 1, 'tomato': 1 }
    }
}


class MashedPotatoes extends Dish {
    constructor() {
        super(8)
        this.ingridients = { 'potato': 1, 'meat': 1 }
    }
}


class Steak extends Dish {
    constructor() {
        super(7)
        this.ingridients = { 'meat': 2 }
    }
}


class SteakAndFries extends Dish {
    constructor() {
        super(12)
        this.ingridients = { 'meat': 1, 'fries': 1 }
    }
}


class Ingridient {

    constructor(name, amount) {

        if (!(typeof (name) === 'string' || name instanceof String)) {
            throw new Error('Value error: name parameter (in Ingridient) should be a String');

        } else if (!(typeof (amount) === 'number' || amount instanceof Number)) {
            throw new Error('Value error: amount parameter (in Ingridient) should be a Number');
        }
        this.name = name;
        this.amount = amount;
    }
}


class Kitchen {

    static get(object, key, default_value) {
        let result = object[key];

        if (object[key] === undefined) {
            result = default_value;
            delete object[key];
        }
        return result;
    }

    constructor() {
        this.fridge = {};
        this.allOrders = {};
        this.log = []
        this.orderId = 0;
    }

    addToFridge(ingridient) {
        if (ingridient instanceof Ingridient) {
            this.fridge[ingridient.name] = Kitchen.get(this.fridge, ingridient.name, 0) + ingridient.amount
            this.log.push(`"${ingridient.name}" in amount ` +
                `${ingridient.amount} was added to fridge, ` +
                `total amount in fridge: ${this.fridge[ingridient.name]}`)

        } else if (ingridient instanceof Array) {

            for (let part of ingridient)
                this.addToFridge(part)

        } else {
            throw new Error('Value error: Kitchen.addToFridge method ' +
                'should take istance of Ingridient or array of Ingridients');
        }
    }

    order(dish) {
        if (!(dish instanceof Dish)) {
            throw new Error('Value error: argument of Kitchen.order() should be a Dish');
        }

        for (let ingridient in dish.ingridients) {
            let amount = dish.ingridients[ingridient]

            if (Kitchen.get(this.fridge, ingridient, 0) - amount < 0) {
                throw new Error('Kitchen error: not enough ingridient (' + ingridient + ') in Kitchen.fridge')
            } else {
                this.fridge[ingridient] -= amount;
            }
        }
        this.orderId += 1;
        this.allOrders[this.orderId] = dish
        dish.orderId = this.orderId

        return dish;
    }


    async cookFastestOrder() {

        let allPromises = [];
        for (let [id, dish] of Object.entries(this.allOrders)) {
            allPromises.push(dish.cook())
        }

        let fastestOrder;
        let now = new Date().getTime()

        fastestOrder = await Promise.any(allPromises).then((dish) => {

            now = new Date().getTime() - now
            // console.log(dish, now)
            return dish
        })

        // console.log(fastestOrder.orderId in this.allOrders, this.allOrders, 'allOrders before delete')
        delete this.allOrders[fastestOrder.orderId]
        this.log.push(`${fastestOrder.constructor.name} was made and delete from kitchen.allOrders`)
        // console.log(fastestOrder.orderId in this.allOrders, this.allOrders, 'allOrders after delete')

        return fastestOrder
    }


    async cookAllOrders() {

        let allPromises = [];
        for (let [id, dish] of Object.entries(this.allOrders)) {
            allPromises.push(dish.cook())
        }

        let resultOrders;
        let now = new Date().getTime()

        resultOrders = await Promise.all(allPromises).then((dish) => {

            now = new Date().getTime() - now
            // console.log(dish, now)
            return dish
        })

        // console.log(this.allOrders, 'allOrders before delete')
        for (let dish of resultOrders) {
            delete this.allOrders[dish.orderId]
            this.log.push(`${dish.constructor.name} was made and delete from kitchen.allOrders`)
        }
        // console.log(this.allOrders, 'allOrders after delete')

        return resultOrders
    }
}

// YOUR CODE ENDS


async function test() {

    const kitchen = new Kitchen();

    kitchen.addToFridge([
        new Ingridient('potato', 1),
        new Ingridient('spaghetti', 1),
        new Ingridient('meat', 3),
        new Ingridient('tomato', 2)
    ])

    kitchen.order(new Bolognese()); // Bolognese extends Dish (cookingTime = 10)
    kitchen.order(new MashedPotatoes()); // MashedPotatoes extends Dish (cookingTime = 8)
    kitchen.order(new Steak()); // Steak extends Dish (cookingTime = 7)

    // Feel free to experiment with various dishes and ingridients

    let a = await kitchen.cookFastestOrder(); // Returns fastest dish to make
    console.log(a, 'cookFastestOrder')

    let b = await kitchen.cookAllOrders(); // Returns two dishes in array
    console.log(b, 'cookAllOrders')

    // kitchen.order(new SteakAndFries()); // Throws Error: Not enough ingridients in fridge
}

test();
