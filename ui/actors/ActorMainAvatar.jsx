import { IMAGE_URL } from "../../utils/Constans"

function ActorMainAvatar({image}) {
    return (
        <div className="text-center  lg:max-w-[18rem] relative flex justify-start  mr-3">
         <img 
    alt="name" 
    src={`${IMAGE_URL}${image}`}
    className="object-fit object-cover -full custom-position" />
    </div>
    )
}

export default ActorMainAvatar
