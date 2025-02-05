import { createBrowserRouter } from "react-router-dom";

import { Detalhes } from "./pages/detalhes";
import { Home } from "./pages/home";
import { NotFound } from "./pages/notFound";
import { Layout } from "./components/layout";

const router = createBrowserRouter([
    {
       element: <Layout/>,
       children:[
        {
            path: '/',
            element: <Home/>
        },
        {
            path: 'detalhes/:cripto',
            element:<Detalhes/>
        },
        {
            path: '*',
            element: <NotFound/>
        }
    ] 
    }
])
export { router };
