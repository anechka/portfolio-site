/**
 * Created by menangen on 01.05.16.
 */
function view_controller () {

    var counterView = new Vue({
        el: '#counter',
        data: {
            count: Math.floor(Math.random() * (3 - 1 + 1)) + 1
        },
        // define methods under the `methods` object
        methods: {
            hello: function () {
                // `this` inside methods point to the Vue instance
                this.count++;
            }
        }
    });

    new Vue({
        el: '#tags',

        methods: {
            update: function (income) {
                // `this` inside methods point to the Vue instance
                counterView.hello();
                console.info(income)
            }
        }
    });

}