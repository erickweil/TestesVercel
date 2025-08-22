import {jest,describe,expect,test,afterAll, beforeAll} from "@jest/globals";
import { desconetarBanco } from "../src/config/dbConnect.js";

beforeAll(async () => {

});

afterAll(async () => {
    await desconetarBanco();
});
