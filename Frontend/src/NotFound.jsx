import './NotFound.css'
function NotFound() {
    return ( 
        <div className="container mb-5">
            <div className="row mt-5 text-center">
                
                <h1 className="text-muted p-3">404 Not Found </h1>
                <h5 className="text-muted mb-4">The page you are requesting does not exists!</h5>
            </div>
        </div> 
        );
}

export default NotFound;