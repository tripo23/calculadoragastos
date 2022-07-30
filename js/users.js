let username = localStorage.getItem("user");
let usrID = "";

const usrApiID = () => {
    switch (username) {
        case "Tripo":
            usrID = "62c9f4fff023111c706ec860";
            break;
        case "Belu":
            usrID = "62cb12e45d53821c30993b74";
            break;
        case "Ash":
            usrID = "62cb19485d53821c30994742";
            break;
        default:
            usrID = "62cb17a25d53821c30994443";
            break;
    }

    return usrID;
}

export {
    usrApiID
};