import { createHandler } from "../server/vercelAdapter";
import { getCategories } from "../server/routes/categories";

export default createHandler(getCategories);
