function set_step_list() {
    var ver_data = serializeForm();
    var console = ver_data[0];
    var vers = Number(ver_data[1] + ver_data[2] + ver_data[3]);
    var browser = ver_data[4];

    var step_list = [];
    //Hard-coded, will make it updatable later on
    switch(console){
        case "OLD":
            if (vers >= 900) {
                //Soundhax
                step_list.push("soundhax");
                //d9 (hb)
                step_list.push("d9(hb)");
                //ctr
                step_list.push("2.1_ctr");
                //arm9
                step_list.push("install");
            }

            if (vers >= 400 && vers <= 810) {
                switch (browser <= 25) {
                    case true:
                        //Update latest
                        break;

                    case false:
                        //d9 browser
                        break;
                }
            }

            if (vers >= 100 && vers <= 310) {
                switch (browser > 0) {
                    case true:
                        if (vers == 210) {
                            //install arm9
                            //9.2 ctr
                        } else {
                            //Update latest
                        }
                        break;

                    case false:
                        //Update latest
                        break;
                }
            }
            break;

        case "NEW":
            break;
    }
    return step_list;
}