/**
 * 餐厅
 * */
class Restaurant {
    constructor(data) {
        this.cash = data.cash || '';
        this.seats = data.seats || '';
        this.staff = {
            cook: [],
            waiter: []
        };
    }

    /**
     * 雇佣
     * */
    hire(person, type = 'waiter') {
        if (this.staff[type] && this.staff[type].length > 0) {
            return false
        } else {
            this.staff[type].push(person);
        }
    }

    /**
     * 解除雇佣
     * */
    fire(person, type = 'waiter') {
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
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
        this.work = this.work.bind(this);
    }

    work() {
        console.log('111');
    }
}

/**
 * 服务员
 * */
class Waiter extends Staff {
    constructor(name, salary) {
        super(name, salary);
        this.orderDishes = [];

    }

    /**
     * 添加顾客点菜内容
     * */
    addOrder(data) {
        this.orderDishes = data;
    }

    /**
     * 获取顾客点菜内容
     * */
    // tellCook(callback) {
    //     let that = this;
    //     console.log(callback);
    //     callback(that.orderDishes);
    // }

    /**
     * 获取点菜数据
     * */
    getOrderDishes() {
        return this.orderDishes;
    }

    /**
     * 上菜
     * */
    serving() {
        this.orderDishes = [];
    }
}

/**
 * 厨师
 * */
class Cook extends Staff {
    constructor(...person) {
        super(...person);
        this.orderDishes = [];
    }

    /**
     * 获取需要做的菜
     * */
    addToDoList(data) {
        let that = this;
        that.orderDishes = data;
    }

    /***
     * 做菜
     */
    cooking() {
        this.orderDishes = [];
    }
}

/**
 * 顾客
 * */
class Customer {
    constructor() {
        this.name = '';
        this.order = [];
    }

    /**
     *添加顾客
     * @param data eg:{name:''}
     * */
    addCustomer(data) {
        if (this.name) {
            console.log('顾客已存在');
            return false;
        } else {
            this.name = data.name;
        }
    }

    /**
     *添加离开
     * */
    removeCustomer() {
        this.name = null;
        this.order = [];
        // for (let i = 0, leg = this.customerList.length; i < leg; i++) {
        //     if (JSON.stringify(this.customerList[i]) === JSON.stringify(data)) {
        //         this.customerList.splice(i, 1);
        //     }
        // }
    }

    /**
     * 点菜
     * @param data 菜单内容
     * */
    addOrderDishes(data) {
        for (let i = 0, leg = this.order.length; i < leg; i++) {
            if (this.order[i].name === data.name) {
                return false
            }
        }
        this.order.push(data);
    }

    /**
     * 获取点菜菜单
     * */
    getOrderDishes() {
        return this.order
    }

    /**
     * 吃饭
     * */
    eating() {
        this.removeCustomer();
    }
}

/**
 * 菜品
 * */
class Food {
    constructor(data) {
        this.menu = [];
    }

    /**
     * 添加菜单
     * @param data eg:{name:'', cost:'',price:''}
     * */
    addMenu(data) {
        for (let i = 0, leg = this.menu.length; i < leg; i++) {
            if (this.menu.name === data.name) {
                console.info('菜品已存在');
                return false;
            }
        }
        this.menu.push(data);
    }

    /**
     * 点菜时根据菜名获得菜单内数据
     * @param name //菜名
     * */
    getDishes(name) {
        return this.menu.filter((val, index) => {
            if (val.name === name) {
                return val;
            }
        })[0]
    }
}

/**
 * *******************************
 * 测试内容
 * *******************************
 * */
let ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});
let cook = new Cook("Cook", 10000);
let waiter = new Waiter("Waiter", 10000);

ifeRestaurant.hire(cook, 'cook');
ifeRestaurant.hire(waiter, 'waiter');
console.log('餐厅厨师：' + JSON.stringify(ifeRestaurant.staff.cook));
console.log('餐厅服务员：' + JSON.stringify(ifeRestaurant.staff.waiter));
let food = new Food();
food.addMenu({
    name: '番茄炒蛋',
    cost: '10',
    price: '15'
});
food.addMenu({
    name: '水蒸蛋',
    cost: '5',
    price: '10'
});
food.addMenu({
    name: '凉拌黄瓜',
    cost: '5',
    price: '10'
});
food.addMenu({
    name: '水煮鱼',
    cost: '50',
    price: '80'
});
console.log('菜单：' + JSON.stringify(food.menu));

/**
 * 流程开始
 * */
let customer = new Customer();
let cumsterList = ['customerAAA', 'customerBBB', 'customerCCC'];
let menuList = ['番茄炒蛋', '水蒸蛋', '凉拌黄瓜', '水煮鱼'];


for (let i = 0, leg = cumsterList.length; i < leg; i++) {
    console.log('======================');
    customer.addCustomer({
        name: cumsterList[i]
    });
    console.info(`顾客入座，顾客名：${customer.name}`);
    let thisFood = menuList[Math.floor(Math.random() * 4)];

    customer.addOrderDishes(food.getDishes(thisFood));
    console.info(`${customer.name}点菜，菜名：${(JSON.stringify(customer.order))}`);

    waiter.addOrder(customer.getOrderDishes());
    console.info(`${waiter.name}获取顾客${customer.name}点的菜，菜名：${(JSON.stringify(waiter.orderDishes))}`);

    cook.addToDoList(waiter.getOrderDishes());
    console.info(`${cook.name}告诉厨师${cook.name}要做的菜：${(JSON.stringify(cook.orderDishes))}`);

    cook.cooking();
    console.log(`厨师${cook.name}做菜，orderDishes：${cook.orderDishes}`);

    waiter.serving();
    console.log(`服务员${waiter.name}上菜，orderDishes：${waiter.orderDishes}`);

    customer.eating();
    console.log(`顾客${customer.name}吃饭，order：${customer.order}`);
}
