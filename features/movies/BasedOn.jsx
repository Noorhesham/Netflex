import Spinner from "../../ui/loading/Spinner"
import useGetWatchLater from "./useGetWatchLater"
function BasedOn() {
    const{watchLater,isGettingWatchLater}=useGetWatchLater()
    if(isGettingWatchLater)return<Spinner/>
    const recommendations=watchLater.map(w=>w.recommendations.results)
    console.log(watchLater)
    return (
        <div>
            
        </div>
    )
}

export default BasedOn

