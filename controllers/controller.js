/*
    Defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const controller = {
    getFavicon: function (req, res) {
        console.log('getFavicon() called');

        res.status(204);
    },
    getIndex: (req, res) => {
        console.log('getIndex() called');

        try {
            if(req.session.user) {
                res.status(200).render('index', { isLogin: false });
            } else {
                res.status(200).render('index', { isLogin: true });
            }
        } catch (err) {
            console.error(err);
        }
    },
    getSignUp: (req, res) => {
        console.log('getSignUp() called');

        try {
            console.log('Requested sign up page');
            res.status(200).render('signup');
        } catch (err) {
            console.error(err);
        }
    },
};

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
export default controller;