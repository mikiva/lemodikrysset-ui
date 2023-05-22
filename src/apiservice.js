import { getAuth } from "@firebase/auth";


export function ping() {


    const user = getAuth().currentUser.getIdToken(true).then(token => {

        console.log(user.accessToken);
        const url = "/api/ping"

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(async (res) => {
            const r = await res.json()
        })

    })

}

