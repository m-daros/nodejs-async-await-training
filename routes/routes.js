const express = require ( "express" )

const myController = require ( "../constrollers/my-controller" )

const router = express.Router ()

router.get ( "/expensive-computation-async-await",  myController.expensiveComputationAsyncAwait )
router.get ( "/expensive-computation-async-promise",  myController.expensiveComputationAsyncPromise )
router.get ( "/expensive-computation-sync",  myController.expensiveCompoutationSync )

router.use ( ( error, request, response, next ) => {

    console.error ( `Global error handler. Intercepted the error: ${error}` )
    response.status ( 500 )
        .send ( `Global error handler. Intercepted the error: ${error}` )
} )

module.exports = router