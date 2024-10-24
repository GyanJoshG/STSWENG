/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const controller = {
    getIndex: (req, res) => {
        try {
            console.log('Requested home page');
            res.status(200).render('index');
        } catch (err) {
            console.error(err);
        }
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
export default controller;