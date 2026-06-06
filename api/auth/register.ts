import { createHandler } from "../../server/vercelAdapter";
import { register } from "../../server/routes/auth";

export default createHandler(register);
