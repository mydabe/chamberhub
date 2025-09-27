import bcrypt from "bcryptjs";
import {createClient} from "@supabase/supabase-js";


const supabase = createClient(
    "https://nhzrnivuaumqjknussat.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oenJuaXZ1YXVtcWprbnVzc2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2ODkwMDAsImV4cCI6MjA3NDI2NTAwMH0.z1kT7Ochev8TYdMl-z_1dhtnrDT3XuV_2F-uVdur2LI"
);


async function insertData() {
    const { data, error, statusText } =  await supabase.from("Profiles")
        .insert(
            {
                id: 123,
                name: "Myles",
                instrument: "Violin",
                password_hash: bcrypt.hashSync("password", 10),
                email: "mylesbell@gmail.com"
            }).select()
    console.log(error)

}

insertData()

