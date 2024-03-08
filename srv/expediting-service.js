async function getUserInfo(token) {
    return new Promise((resolve, reject) => {
        xssec.createSecurityContext(token, xsenv.getServices({
            uaa: {
                tag: 'xsuaa'
            }
        }).uaa, function (error, securityContext) {
            if (error) {
                console.log('security context creation failed');
                return;
            }
            // console.log("-------->>><<<<---------")
            // console.log(securityContext);
            // console.log(securityContext.getEmail());
            console.log(securityContext.getUserName());
            resolve(securityContext);
        })
    });
}

async function getOAuthToken() {
    return new Promise((resolve, reject) => {
        // console.log("oAuthUrlString="+oAuthUrlString);
        // console.log("sUaaCredentials="+sUaaCredentialsDest);

        const config = {
            headers: {
                Authorization:
                    "Basic " +
                    Buffer.from(sUaaCredentialsDest).toString("base64"),
            },
        };
        axios
            .get(oAuthUrlString, config)
            .then((response) => {
                resolve(response.data.access_token);
            })
            .catch((error) => {
                reject(error);
            });
    });
}
