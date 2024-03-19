import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateProduct from "./component/CreateProduct";
import ShowProduct from "./component/ShowProduct";
import UpdateProduct from "./component/UpdateProduct";

function App()
{
    const [count, setCount] = useState(0)

    return (
        <div className="container">
                <Routes>
                    <Route exact path='/' element={<CreateProduct />} />
                    <Route exact path='/showproduct' element={<ShowProduct />} />
                    <Route exact path={`/updateproduct/:id`} element={<UpdateProduct />} />
                </Routes>
            {/* <CreateProduct /> */}
            {/* <ShowProduct /> */}
        </div>
    )
}

export default App