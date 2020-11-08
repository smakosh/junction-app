import { Container } from "./styles";
import { FiPlus } from "react-icons/fi";

const AddDonutHealthy: React.FC = () => {

    return (
        <Container>
            <p>Add new healthy habits</p>
            <FiPlus size={80} />
        </Container>
    );
};
export default AddDonutHealthy;
