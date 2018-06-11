/**
 * 餐厅
 * */
class Restaurant {
    constructor(data) {
        this.cash = data.cash || '';
        this.seats = data.seats || '';
        this.staff = data.staff || [];
    }

    /**
     * 雇佣
     * */
    hire(person) {
        this.staff.push(person);
    }

    /**
     * 解除雇佣
     * */
    fire(person) {
        for (let i = 0, leg = this.staff.length; i < leg; i++) {
            if (this.staff[i] === person) {
                this.staff.splice(i, 1);
            }
        }
    }
}

/**
 * 职员
 * */
class Staff {
    constructor(name,salary) {
        console.log(name,salary)
        this.name =name;
        this.salary =salary;
        this.work = this.work.bind(this);
    }

    work() {
    }
}

/**
 * 服务员
 * */
class Waiter extends Staff {
    constructor(name,salary) {
        super(name,salary);
    }
    work(data) {
        if (data.isArray()) {
            console.log('点菜');
        } else {
            console.log('上菜');
        }
    }
}

/**
 * 厨师
 * */
class Cook extends Staff {
    constructor(...person) {
        super(...person);
    }
    work(data) {
        console.log('做菜');
    }
}

/**
 * 顾客
 * */
class Customer {
    constructor() {
    }

    menu() {
        console.log('点菜')
    }

    eat() {
        console.log('吃')
    }
}

/**
 * 菜品
 * */
class Food {
    constructor(data) {
        this.name = data.name || '';
        this.cost = data.cost || '';
        this.price = data.price || '';
    }

}



var ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

var newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staff);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staff);
