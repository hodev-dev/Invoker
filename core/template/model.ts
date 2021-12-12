import Database from "@config/database";
import useRawQuery from "@core/database/query/useRawQuery";

var MODEL_NAME = () => {
    const [firstdb] = Database();
    const rawQuery = useRawQuery();

    const test = async () => {
    };

    return {
        test,
    };
};

export default MODEL_NAME;
