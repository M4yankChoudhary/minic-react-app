import {useParams} from "react-router-dom";

const DoctorDetails = () => {

    let { id } = useParams();

    return (
        <div>
            <h1>Id{id}</h1>
        </div>
    )

}

export default DoctorDetails;