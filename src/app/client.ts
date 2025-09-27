import { supabase } from "@/auth";
import bcrypt from "bcryptjs";
import {createClient} from "@supabase/supabase-js";


async function insertData() {
    const { data, error, statusText } =  await supabase.from("Profiles")
        .insert(
            {
                name: "Myles",
                instrument: "Violin",
                password_hash: bcrypt.hashSync("password", 10),
                email: "mylesbell@gmail.com"
            }).select()
    console.log(error)

}

insertData()

