const { catchErrors } = require ( "../utils/error-handling" )

var count = 0

// Async handlers requires catchErrors ( asyncFn ) function wrapper to catch unhandled errors on global error handler
exports.expensiveComputationAsyncAwait = catchErrors ( async ( request, response, next ) => {

    console.log ( `${new Date ()} Starting expensive computation ASYNC / AWAIT ${++count}` )
    await  expensiveComputation ( count )
    console.log ( `${new Date ()} Ending expensive computation ASYNC / AWAIT ${count}` )
    response.status ( 200 ).send ( `OK ASYNC / AWAIT ${count}` )
} )

// catchErrors ( asyncFn ) function wrapper doesn't catch unhandled errors using Promises and .then () syntax
exports.expensiveComputationAsyncPromise = catchErrors ( ( request, response, next ) => {

    console.log ( `${new Date ()} Starting expensive computation PROMISE ${++count}` )
    expensiveComputation ( count )
        .then ( () => {

            console.log ( `${new Date ()} Ending expensive computation PROMISE ${count}` )
            response.status ( 200 ).send ( `OK PROMISE ${count}` )
        } )
} )

// Sync handlers doesn't require catchErrors ( asyncFn ) function wrapper to catch unhandled errors on global error handler
exports.expensiveCompoutationSync = ( request, response, next ) => {

    console.log ( `${new Date ()} Starting expensive computation SYNC ${++count}` )

    if ( count % 2 === 0 ) {

        console.log ( "Throwing a dummy exception" )
        throw new Error ( "Dummy exception" )
    }

    console.log ( `${new Date ()} Ending expensive computation SYNC ${count}` )
    response.status ( 200 ).send ( `OK SYNC ${count}` )

}

const expensiveComputation = async ( counter ) => {

    return sleep ( 5000 )
        .then ( () => {

            if ( counter % 2 === 0 ) {

                console.log ( "Throwing a dummy exception" )
                throw new Error ( "Dummy exception" )
            }
        } )
}

const sleep = ( milliseconds ) => {

    return new Promise (( resolve ) => {

        setTimeout ( resolve, milliseconds );
    } );
}