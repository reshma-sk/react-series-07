import { useRouteError } from "react-router-dom";
const Error = ()=>{
    const err = useRouteError();
    return(
        <div>
            <h2 className="text-red-700">Opps something went wrong</h2>
            <h3>{err.data}</h3>
        </div>
    )
}
export default Error;