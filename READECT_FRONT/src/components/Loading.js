import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='loader col-md-6 col-6 mx-auto text-center'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading