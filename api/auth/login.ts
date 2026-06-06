import { createHandler } from "../../server/vercelAdapter";
import { login } from "../../server/routes/auth";

export default createHandler(login);
