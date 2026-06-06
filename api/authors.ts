import { createHandler } from "../server/vercelAdapter";
import { getAuthors } from "../server/routes/authors";

export default createHandler(getAuthors);
