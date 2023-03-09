import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearPlayerInfo } from "../../features/player/playerSlice";
import { clearGameHistory } from "../../features/player/historyGameSlice";
import { useTranslation } from "react-i18next";
import CustomButton from "../CustomButton";

const ButtonAgain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const handleAgainClick = () => {
        dispatch(clearPlayerInfo());
        dispatch(clearGameHistory());
        navigate("/");
    }

    return(
        <CustomButton onClick={handleAgainClick} buttonText={t("buttonAgain.again")} />
    )
};

export default ButtonAgain;